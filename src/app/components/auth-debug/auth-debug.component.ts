import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { JwtUtil } from '../../Utils/jwt.util';

@Component({
  selector: 'app-auth-debug',
  templateUrl: './auth-debug.component.html',
  styleUrls: ['./auth-debug.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonItem,
    IonLabel
  ]
})
class AuthDebugComponent implements OnInit {
  authInfo: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.refreshAuthInfo();
  }

  refreshAuthInfo() {
    const token = this.authService.getToken();
    const user = this.authService.getCurrentUser();
    const isAuthenticated = this.authService.isAuthenticated();
    
    let decodedToken = null;
    let tokenExpiry = null;
    let isTokenExpired = false;
    
    if (token) {
      decodedToken = JwtUtil.decodeToken(token);
      isTokenExpired = JwtUtil.isTokenExpired(token);
      if (decodedToken && decodedToken.exp) {
        tokenExpiry = new Date(decodedToken.exp * 1000);
      }
    }

    this.authInfo = {
      hasToken: !!token,
      tokenLength: token?.length || 0,
      isAuthenticated,
      user,
      decodedToken,
      tokenExpiry,
      isTokenExpired,
      currentTime: new Date(),
      localStorage: {
        token: !!localStorage.getItem('token'),
        user: !!localStorage.getItem('user'),
        tokenExpiry: localStorage.getItem('tokenExpiry')
      },
      sessionStorage: {
        token: !!sessionStorage.getItem('token'),
        user: !!sessionStorage.getItem('user'),
        tokenExpiry: sessionStorage.getItem('tokenExpiry'),
        authTimestamp: sessionStorage.getItem('authTimestamp')
      },
      cookies: {
        userRole: this.getCookie('userRole'),
        userName: this.getCookie('userName'),
        userEmail: this.getCookie('userEmail'),
        userId: this.getCookie('userId')
      }
    };

    console.log('🔍 Auth Debug Info:', this.authInfo);
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  clearAuth() {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });
    this.refreshAuthInfo();
  }

  forceRestoreAuth() {
    // Use the new method from AuthService
    (this.authService as any).forceRestoreAuthState();
    setTimeout(() => this.refreshAuthInfo(), 500);
  }
}
