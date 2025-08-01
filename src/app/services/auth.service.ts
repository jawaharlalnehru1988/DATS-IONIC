import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Language, ResponseUserData, UserData, UserWithRole } from '../Utils/models';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AuthUrl = environment.AuthUrl;
  
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
    return this.http.post<ResponseUserData>(`${this.AuthUrl}/user/register`, {...userData, role: 'devotee', isActive: true});
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.AuthUrl}/user/login`, { email, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            // Store token and user data
            this.setSession(response);
            this.currentUserSubject.next(response.user);
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  logout(): void {
    // Remove token and user data from storage
    this.clearAuthStorage();
    
    // Redirect to login page
    this.router.navigate(['/login']);
  }

  private setSession(authResult: any): void {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user', JSON.stringify(authResult.user));
    localStorage.setItem('tokenExpiry', expiresAt.getTime().toString());
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
        } else {
          // Token expired, clean up
          this.logout();
        }
      } catch (error) {
        // Invalid JSON or other parsing error, clean up storage
        console.error('Error parsing user data from localStorage:', error);
        this.clearAuthStorage();
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

  // Language management
  language: WritableSignal<Language[]> = signal<Language[]>([{ native: 'தமிழ்', lang: 'Tamil' }]);

  setLanguage(languages: Language[]): void {
    this.language.set(languages);
  }
}
