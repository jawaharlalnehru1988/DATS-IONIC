import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service
    const authToken = this.authService.getToken();
    
    console.log('🔐 AuthInterceptor - Request URL:', request.url);
    console.log('🔐 AuthInterceptor - Token available:', !!authToken);
    console.log('🔐 AuthInterceptor - User authenticated:', this.authService.isAuthenticated());
    
    // Clone the request and add the authorization header if token exists
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      console.log('🔐 AuthInterceptor - Added Authorization header');
    } else {
      console.log('⚠️ AuthInterceptor - No token available, request will be unauthenticated');
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('🚨 AuthInterceptor - HTTP Error:', error.status, error.message);
        
        // If we get a 401 unauthorized response, logout the user
        if (error.status === 401) {
          console.log('🚨 AuthInterceptor - 401 Unauthorized, logging out user');
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}
