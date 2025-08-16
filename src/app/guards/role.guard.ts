import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRoles = route.data['roles'] as string[];
    
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        if (!user) {
          // User not logged in, redirect to login
          return this.router.createUrlTree(['/login']);
        }
        
        if (!expectedRoles || expectedRoles.length === 0) {
          // No specific roles required, user is authenticated
          return true;
        }
        
        if (expectedRoles.includes(user.role)) {
          // User has required role
          return true;
        } else {
          // User doesn't have required role, redirect to unauthorized page or home
          return this.router.createUrlTree(['/lordkrishna']);
        }
      })
    );
  }
}
