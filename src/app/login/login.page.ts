import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonTextarea, IonLabel, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonInput, IonLabel, IonButton]
})
export class LoginPage implements OnInit {
 loginForm!:FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    // Handle login logic here  
    if (this.loginForm.valid) {
    const value = this.loginForm.value;
    this.authService.login(value.email, value.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/dashboard']);

      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
    }
  }

}
