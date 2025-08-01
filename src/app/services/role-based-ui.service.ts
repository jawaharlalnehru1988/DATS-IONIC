import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleBasedUIService {

  constructor(private authService: AuthService) {}

  /**
   * Check if user has permission to see certain UI elements
   */
  canShowAdminFeatures(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => user?.role === 'admin')
    );
  }

  canShowDevoteeFeatures(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => user?.role === 'guest' || user?.role === 'admin')
    );
  }

  canShowPremiumFeatures(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => user?.role === 'premium' || user?.role === 'admin')
    );
  }

  /**
   * Check if user is authenticated
   */
  isUserAuthenticated(): Observable<boolean> {
    return this.authService.isAuthenticated$;
  }

  /**
   * Get current user role
   */
  getCurrentUserRole(): Observable<string | null> {
    return this.authService.currentUser$.pipe(
      map(user => user?.role || null)
    );
  }

  /**
   * Check if user can access specific features based on role
   */
  hasRole(role: string): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => user?.role === role)
    );
  }

  /**
   * Check if user has any of the specified roles
   */
  hasAnyRole(roles: string[]): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => user ? roles.includes(user.role) : false)
    );
  }

  /**
   * Get user display name for UI
   */
  getUserDisplayName(): Observable<string> {
    return this.authService.currentUser$.pipe(
      map(user => user?.name || 'Guest User')
    );
  }
}
