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
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user', JSON.stringify(userData || authResult.user));
    localStorage.setItem('tokenExpiry', expiresAt.getTime().toString());
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
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    
    if (token && user && tokenExpiry) {
      try {
        const isExpired = new Date().getTime() > parseInt(tokenExpiry);
        
        if (!isExpired) {
          const parsedUser = JSON.parse(user);
          this.currentUserSubject.next(parsedUser);
          this.isAuthenticatedSubject.next(true);
          
          // Restore cookies if they don't exist but we have token
          if (!CookieUtil.hasCookie('userRole') && token) {
            const decodedToken = JwtUtil.decodeToken(token);
            if (decodedToken) {
              this.setUserCookies(decodedToken);
            }
          }
        } else {
          // Token expired, clean up
          this.logout();
        }
      } catch (error) {
        // Invalid JSON or other parsing error, clean up storage
        console.error('Error parsing user data from localStorage:', error);
        this.clearAuthStorage();
        this.clearUserCookies();
      }
    }
  }

  private clearAuthStorage(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiry');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
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
}
