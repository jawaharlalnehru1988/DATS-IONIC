import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonTextarea, IonLabel, IonButton, IonText, IonButtons } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { ResponseUserData } from '../Utils/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonButtons, IonMenuButton, IonText, IonContent, ReactiveFormsModule, FormsModule,  IonHeader, IonTitle, IonToolbar, IonText, CommonModule, FormsModule, IonItem, IonInput, IonTextarea, IonLabel, IonButton]
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: (response:ResponseUserData) => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error: (error:ResponseUserData) => {
          console.error('Registration failed', error);
        }
      });
    }
  }
}
