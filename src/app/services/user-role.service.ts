import { Injectable } from '@angular/core';
import { CookieUtil } from '../Utils/cookie.util';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  /**
   * Get current user role from cookie
   * @returns User role or 'guest' if not found
   */
  getCurrentUserRole(): string {
    return CookieUtil.getCookie('userRole') || 'guest';
  }

  /**
   * Check if current user is admin
   * @returns true if user is admin, false otherwise
   */
  isCurrentUserAdmin(): boolean {
    const role = this.getCurrentUserRole();
    return role.toLowerCase() === 'admin';
  }

  /**
   * Check if current user is authenticated (has role other than guest)
   * @returns true if authenticated, false otherwise
   */
  isAuthenticated(): boolean {
    const role = this.getCurrentUserRole();
    return role !== 'guest' && role !== null;
  }

  /**
   * Check if current user has specific role
   * @param role Role to check
   * @returns true if user has the role, false otherwise
   */
  hasRole(role: string): boolean {
    const currentRole = this.getCurrentUserRole();
    return currentRole.toLowerCase() === role.toLowerCase();
  }

  /**
   * Get current user name from cookie
   * @returns User name or null if not found
   */
  getCurrentUserName(): string | null {
    return CookieUtil.getCookie('userName');
  }

  /**
   * Get current user email from cookie
   * @returns User email or null if not found
   */
  getCurrentUserEmail(): string | null {
    return CookieUtil.getCookie('userEmail');
  }

  /**
   * Get current user ID from cookie
   * @returns User ID or null if not found
   */
  getCurrentUserId(): string | null {
    return CookieUtil.getCookie('userId');
  }

  /**
   * Get all user data from cookies
   * @returns Object with user data or null values if not found
   */
  getCurrentUserData(): {
    role: string | null;
    name: string | null;
    email: string | null;
    id: string | null;
  } {
    return {
      role: CookieUtil.getCookie('userRole'),
      name: CookieUtil.getCookie('userName'),
      email: CookieUtil.getCookie('userEmail'),
      id: CookieUtil.getCookie('userId')
    };
  }
}
