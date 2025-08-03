import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Language, ResponseUserData, UserData, UserWithRole } from '../Utils/models';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { JwtUtil, DecodedToken } from '../Utils/jwt.util';
import { CookieUtil } from '../Utils/cookie.util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AuthUrl = environment.apiNestBaseUrl;
  
  // Authentication state management
  private currentUserSubject = new BehaviorSubject<ResponseUserData | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Check if user is already logged in on service initialization
    this.checkAuthState();
  }

  register(userData: UserData): Observable<ResponseUserData> {
    return this.http.post<ResponseUserData>(`${this.AuthUrl}/user/register`, {...userData, role: 'guest', isActive: true});
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.AuthUrl}/user/login`, { email, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            // Decode JWT token to extract user details
            const decodedToken: DecodedToken | null = JwtUtil.decodeToken(response.token);
            
            if (decodedToken) {
              // Create user object with decoded token data
              const userWithDecodedData = {
                ...response.user,
                name: decodedToken.name,
                email: decodedToken.email,
                role: decodedToken.role,
                sub: decodedToken.sub
              };
              
              // Store token and user data in localStorage
              this.setSession(response, userWithDecodedData);
              
              // Store essential user data in cookies for easy access
              this.setUserCookies(decodedToken);
              
              // Update observables
              this.currentUserSubject.next(userWithDecodedData);
              this.isAuthenticatedSubject.next(true);
            } else {
              // Store token and user data without decoding if JWT decode fails
              this.setSession(response);
              this.currentUserSubject.next(response.user);
              this.isAuthenticatedSubject.next(true);
            }
          }
        })
      );
  }

  logout(): void {
    // Remove token and user data from storage
    this.clearAuthStorage();
    
    // Clear user cookies
    this.clearUserCookies();
    
    // Redirect to login page
    this.router.navigate(['/login']);
  }

  private setSession(authResult: any, userData?: ResponseUserData): void {
    const token = authResult.token;
    
    // Decode token to get actual expiry time
    const decodedToken = JwtUtil.decodeToken(token);
    let expiresAt: Date;
    
    if (decodedToken && decodedToken.exp) {
      // Use actual token expiry time (convert from seconds to milliseconds)
      expiresAt = new Date(decodedToken.exp * 1000);
      console.log('🔐 AuthService.setSession() - Using token expiry:', expiresAt);
    } else {
      // Fallback to 1 hour if token doesn't have expiry
      expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);
      console.log('⚠️ AuthService.setSession() - Using fallback 1 hour expiry:', expiresAt);
    }

    const userDataToStore = userData || authResult.user;
    const tokenExpiryTime = expiresAt.getTime().toString();

    // Store in both localStorage and sessionStorage for redundancy
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userDataToStore));
    localStorage.setItem('tokenExpiry', tokenExpiryTime);
    
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(userDataToStore));
    sessionStorage.setItem('tokenExpiry', tokenExpiryTime);
    sessionStorage.setItem('authTimestamp', Date.now().toString());
    
    console.log('✅ AuthService.setSession() - Session set successfully in both localStorage and sessionStorage');
    console.log('🔐 AuthService.setSession() - Token expires at:', expiresAt);
  }

  private setUserCookies(decodedToken: DecodedToken): void {
    // Store essential user data in cookies for 1 day
    CookieUtil.setCookie('userRole', decodedToken.role, 1);
    CookieUtil.setCookie('userName', decodedToken.name, 1);
    CookieUtil.setCookie('userEmail', decodedToken.email, 1);
    CookieUtil.setCookie('userId', decodedToken.sub, 1);
  }

  private clearUserCookies(): void {
    // Clear all user-related cookies
    CookieUtil.deleteCookie('userRole');
    CookieUtil.deleteCookie('userName');
    CookieUtil.deleteCookie('userEmail');
    CookieUtil.deleteCookie('userId');
  }

  private checkAuthState(): void {
    // Check localStorage first, then sessionStorage as fallback
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    let source = 'localStorage';
    
    if (!token || !user) {
      token = sessionStorage.getItem('token');
      user = sessionStorage.getItem('user');
      source = 'sessionStorage';
      
      // If found in sessionStorage, restore to localStorage
      if (token && user) {
        const tokenExpiry = sessionStorage.getItem('tokenExpiry');
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        if (tokenExpiry) localStorage.setItem('tokenExpiry', tokenExpiry);
        console.log('� AuthService.checkAuthState() - Restored from sessionStorage to localStorage');
      }
    }
    
    console.log('🔍 AuthService.checkAuthState() - Checking authentication state...');
    console.log('🔍 AuthService.checkAuthState() - Source:', source);
    console.log('🔍 AuthService.checkAuthState() - Token exists:', !!token);
    console.log('🔍 AuthService.checkAuthState() - User exists:', !!user);
    
    if (token && user) {
      try {
        // Use JWT utility to check if token is expired
        const isExpired = JwtUtil.isTokenExpired(token);
        console.log('🔍 AuthService.checkAuthState() - Token expired:', isExpired);
        
        if (!isExpired) {
          const parsedUser = JSON.parse(user);
          console.log('🔍 AuthService.checkAuthState() - Parsed user:', parsedUser);
          
          // Restore authentication state
          this.currentUserSubject.next(parsedUser);
          this.isAuthenticatedSubject.next(true);
          
          console.log('✅ AuthService.checkAuthState() - User restored from', source);
          console.log('✅ AuthService.checkAuthState() - Authentication state restored');
          
          // Restore cookies if they don't exist but we have token
          if (!CookieUtil.hasCookie('userRole') && token) {
            const decodedToken = JwtUtil.decodeToken(token);
            if (decodedToken) {
              this.setUserCookies(decodedToken);
              console.log('🍪 AuthService.checkAuthState() - Cookies restored');
            }
          }
          
          // Force update of authentication state
          setTimeout(() => {
            console.log('🔄 AuthService.checkAuthState() - Final auth state check:');
            console.log('🔄 Is authenticated:', this.isAuthenticatedSubject.getValue());
            console.log('🔄 Current user:', this.currentUserSubject.getValue());
          }, 100);
          
        } else {
          // Token expired, clean up
          console.log('⚠️ AuthService.checkAuthState() - Token expired, logging out');
          this.clearAuthStorageWithoutRedirect();
        }
      } catch (error) {
        // Invalid JSON or other parsing error, clean up storage
        console.error('❌ AuthService.checkAuthState() - Error parsing user data:', error);
        this.clearAuthStorageWithoutRedirect();
      }
    } else {
      console.log('ℹ️ AuthService.checkAuthState() - No token or user data found');
      // Ensure auth state is properly cleared
      this.currentUserSubject.next(null);
      this.isAuthenticatedSubject.next(false);
    }
  }

  private clearAuthStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiry');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('tokenExpiry');
    sessionStorage.removeItem('authTimestamp');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  private clearAuthStorageWithoutRedirect(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiry');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('tokenExpiry');
    sessionStorage.removeItem('authTimestamp');
    this.clearUserCookies();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    console.log('🧹 AuthService.clearAuthStorageWithoutRedirect() - All auth data cleared from both storages');
  }

  getToken(): string | null {
    // Check localStorage first, then sessionStorage
    let token = localStorage.getItem('token');
    
    if (!token) {
      token = sessionStorage.getItem('token');
      if (token) {
        // If found in sessionStorage, restore to localStorage
        const user = sessionStorage.getItem('user');
        const tokenExpiry = sessionStorage.getItem('tokenExpiry');
        if (user && tokenExpiry) {
          localStorage.setItem('token', token);
          localStorage.setItem('user', user);
          localStorage.setItem('tokenExpiry', tokenExpiry);
          console.log('🔄 AuthService.getToken() - Restored token from sessionStorage to localStorage');
        }
      }
    }
    
    if (token) {
      // Use JWT utility to check if token is expired
      const isExpired = JwtUtil.isTokenExpired(token);
      console.log('🔐 AuthService.getToken() - Token exists:', !!token);
      console.log('🔐 AuthService.getToken() - Token expired:', isExpired);
      
      if (isExpired) {
        console.log('⚠️ AuthService.getToken() - Token expired, clearing storage');
        this.clearAuthStorage();
        this.clearUserCookies();
        return null;
      }
      
      return token;
    }
    
    console.log('⚠️ AuthService.getToken() - No token found in either storage');
    return null;
  }

  getCurrentUser(): ResponseUserData | null {
    return this.currentUserSubject.getValue();
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.getValue();
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }

  // Cookie-based user data access methods
  getUserRoleFromCookie(): string | null {
    return CookieUtil.getCookie('userRole');
  }

  getUserNameFromCookie(): string | null {
    return CookieUtil.getCookie('userName');
  }

  getUserEmailFromCookie(): string | null {
    return CookieUtil.getCookie('userEmail');
  }

  getUserIdFromCookie(): string | null {
    return CookieUtil.getCookie('userId');
  }

  isUserAdminFromCookie(): boolean {
    const role = this.getUserRoleFromCookie();
    return role ? role.toLowerCase() === 'admin' : false;
  }

  // Language management
  language: WritableSignal<Language[]> = signal<Language[]>([{ native: 'தமிழ்', lang: 'Tamil' }]);

  setLanguage(languages: Language[]): void {
    this.language.set(languages);
  }

  // Force restore authentication state (useful for debugging)
  forceRestoreAuthState(): void {
    console.log('🔄 AuthService.forceRestoreAuthState() - Manually triggering auth state restoration');
    this.checkAuthState();
  }

  // Get detailed auth state for debugging
  getAuthStateDebug(): any {
    return {
      isAuthenticated: this.isAuthenticatedSubject.getValue(),
      currentUser: this.currentUserSubject.getValue(),
      localStorage: {
        hasToken: !!localStorage.getItem('token'),
        hasUser: !!localStorage.getItem('user'),
        tokenExpiry: localStorage.getItem('tokenExpiry')
      },
      sessionStorage: {
        hasToken: !!sessionStorage.getItem('token'),
        hasUser: !!sessionStorage.getItem('user'),
        tokenExpiry: sessionStorage.getItem('tokenExpiry'),
        authTimestamp: sessionStorage.getItem('authTimestamp')
      },
      cookies: {
        userRole: CookieUtil.getCookie('userRole'),
        userName: CookieUtil.getCookie('userName'),
        userEmail: CookieUtil.getCookie('userEmail'),
        userId: CookieUtil.getCookie('userId')
      }
    };
  }
}
