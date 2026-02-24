import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

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

        // Handle different types of errors
        if (error.status === 0) {
          console.error('🚨 AuthInterceptor - Network Error: Unable to connect to server');
          console.error('🚨 This could be due to:');
          console.error('   - Server is down or unavailable');
          console.error('   - CORS configuration issues');
          console.error('   - Network connectivity problems');
          console.error('   - Wrong API URL');
        } else if (error.status === 401) {
          console.log('🚨 AuthInterceptor - 401 Unauthorized, but keeping session active');
          // Removed automatic logout on 401
        } else if (error.status === 404) {
          console.error('🚨 AuthInterceptor - 404 Not Found: Endpoint does not exist');
        } else if (error.status >= 500) {
          console.error('🚨 AuthInterceptor - Server Error:', error.status);
        }

        return throwError(() => error);
      })
    );
  }
}
