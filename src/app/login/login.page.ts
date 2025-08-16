import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonButton, 
  IonText, 
  IonButtons, 
  IonBackButton,
  IonSpinner 
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ThemeService, ThemeType } from '../services/theme.service';
import { Subscription } from 'rxjs';
import { ReusableHeaderComponent } from '../components';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    ReusableHeaderComponent,
    IonText,
    IonContent,
    ReactiveFormsModule,
    FormsModule,
    IonItem,
    IonInput,
    IonLabel,
    IonButton
]
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loginError: string = '';
  isLoading: boolean = false;
  
  // Theme management
  currentTheme: ThemeType = 'theme-royal';
  private themeSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(
      theme => this.currentTheme = theme
    );
    
    // Initialize form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    // No need to check auth state - let users access login page anytime
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = '';
      
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          // Redirect to main page or dashboard
          this.router.navigate(['/lordkrishna']);
        },
        error: (error) => {
          console.error('Login failed', error);
          this.isLoading = false;
          this.loginError = error.error?.message || 'Login failed. Please check your credentials.';
        }
      });
    }
  }
}
