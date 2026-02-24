import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleBasedUIService {

  constructor() { }

  /**
   * Check if user has permission to see certain UI elements
   * UPDATED: Now always returns true to remove role-based restrictions
   */
  canShowAdminFeatures(): Observable<boolean> {
    return of(true);
  }

  canShowDevoteeFeatures(): Observable<boolean> {
    return of(true);
  }

  canShowPremiumFeatures(): Observable<boolean> {
    return of(true);
  }

  /**
   * Check if user is authenticated
   * UPDATED: Now always returns true to remove auth restrictions
   */
  isUserAuthenticated(): Observable<boolean> {
    return of(true);
  }

  /**
   * Get current user role
   * UPDATED: Returns 'admin' by default to bypass checks
   */
  getCurrentUserRole(): Observable<string | null> {
    return of('admin');
  }

  /**
   * Check if user can access specific features based on role
   * UPDATED: Now always returns true
   */
  hasRole(role: string): Observable<boolean> {
    return of(true);
  }

  /**
   * Check if user has any of the specified roles
   * UPDATED: Now always returns true
   */
  hasAnyRole(roles: string[]): Observable<boolean> {
    return of(true);
  }

  /**
   * Get user display name for UI
   */
  getUserDisplayName(): Observable<string> {
    return of('Guest User');
  }
}
