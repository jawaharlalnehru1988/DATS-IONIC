import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonTextarea, IonLabel, IonButton, IonText, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { ResponseUserData } from '../Utils/models';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { addIcons } from 'ionicons';
import { eyeOutline, eyeOffOutline, add } from 'ionicons/icons';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonButtons, IonMenuButton, IonText, IonContent, ReactiveFormsModule, FormsModule,  IonHeader, IonTitle, IonToolbar, IonText, CommonModule, FormsModule, IonItem, IonInput, IonTextarea, IonLabel, IonButton, IonIcon, NgxIntlTelInputModule]
})
export class RegisterPage implements OnInit {
  authForm!: FormGroup;
  isLoginMode = true; // Toggle between login and register modes
  showPassword = false; // Toggle password visibility
  phoneNumber: any = {}; // For international phone input
  formFields = {
    login: ['email', 'phone', 'password', "code"],
    register: ['name', 'phone', 'email', "code", 'address', 'password']
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService // Use ToastService
  ) {
    // Register the eye icons
    addIcons({ eyeOutline, eyeOffOutline });
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    const formGroup: any = {};
    const fields = this.isLoginMode ? this.formFields.login : this.formFields.register;
    
    fields.forEach(field => {
      let validators: any[] = [];
      
      if (field === 'email') {
        // Email is optional but must be valid if provided
        validators = [Validators.email];
      } else if (field === 'phone') {
        // Phone validation handled by intl-tel-input component
        validators = [];
      } else if (field === 'password') {
        validators = [Validators.required, Validators.minLength(6)];
      } else if (this.isLoginMode && (field === 'code')) {
        // Code field is not required in login mode
        validators = [];
      } else if (!this.isLoginMode && (field === 'name' || field === 'address')) {
        // Required fields for registration
        validators = [Validators.required];
      }
      
      formGroup[field] = ['', validators];
    });

    this.authForm = this.fb.group(formGroup);
  }

  // Custom validation for login form
  isFormValid(): boolean {
    if (this.isLoginMode) {
      const email = this.authForm.get('email')?.value?.trim();
      const phone = this.authForm.get('phone')?.value;
      const password = this.authForm.get('password')?.value;
      
      // For login: password is required AND (email OR phone must be provided and valid)
      const hasValidPassword = password && password.length >= 6;
      const hasValidEmail = email && email !== '' && !this.authForm.get('email')?.hasError('email');
      const hasValidPhone = this.isPhoneValid();
      
      return hasValidPassword && (hasValidEmail || hasValidPhone);
    } else {
      // For register mode: name, address, password are required + (email OR phone must be valid)
      const requiredFieldsValid = this.authForm.get('name')?.valid && 
                                 this.authForm.get('address')?.valid && 
                                 this.authForm.get('password')?.valid;
      
      const email = this.authForm.get('email')?.value?.trim();
      const hasValidEmail = email && email !== '' && !this.authForm.get('email')?.hasError('email');
      const hasValidPhone = this.isPhoneValid();
      
      return requiredFieldsValid && (hasValidEmail || hasValidPhone);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.showPassword = false; // Reset password visibility when switching modes
    this.phoneNumber = {}; // Reset phone number when switching modes
    this.initializeForm();
  }

  onSubmit() {
    console.log('Form valid:', this.isFormValid());
    
    if (this.isFormValid()) {
      const formValue = this.authForm.value;
      console.log('Form value:', formValue);
      
      if (this.isLoginMode) {
        // For login, use whichever field has a value (email or phone)
        const loginIdentifier = formValue.email?.trim() || formValue.phone;
        const loginType = formValue.email?.trim() ? 'email' : 'phone';
        
        console.log('Login with:', loginType, loginIdentifier);
        
        this.authService.login(loginIdentifier, formValue.password).subscribe({
          next: (response) => {
            console.log('Login successful', response);
            this.toastService.presentToast('Login successful', 'success');
            this.router.navigate(['/lordkrishna']);
          },
          error: (error) => {
            console.error('Login failed', error);
            this.toastService.presentToast('Login failed. Please check your credentials.', 'danger');
          }
        });
      } else {
        // For registration, ensure at least email or phone is provided
        if (!formValue.email?.trim() && !this.isPhoneValid()) {
          this.toastService.presentToast('Please provide either email or phone number', 'danger');
          return;
        }

        const registrationData = {
          name: formValue.name,
          phone: formValue.phone.internationalNumber,
          email: formValue.email?.trim(),
          address: formValue.address,
          password: formValue.password
        }
        
        console.log('formValue :', formValue);
        this.authService.register(registrationData).subscribe({
          next: (response: ResponseUserData) => {
            console.log('Registration successful', response);
            this.toastService.presentToast('You are successfully Registered', 'success');
            this.isLoginMode = true;
            this.initializeForm();
          },
          error: (error: ResponseUserData) => {
            console.error('Registration failed', error);
            this.toastService.presentToast('There is something error on Registering, contact admin +91 6382043976', 'danger');
          }
        });
      }
    } else {
      // Show specific error messages
      if (this.isLoginMode) {
        if (!this.authForm.get('password')?.value || this.authForm.get('password')?.value.length < 6) {
          this.toastService.presentToast('Password is required and must be at least 6 characters', 'danger');
        } else {
          this.toastService.presentToast('Please provide either email or phone number', 'danger');
        }
      } else {
        this.toastService.presentToast('Please fill all required fields correctly', 'danger');
      }
    }
  }

  onPhoneNumberChange(phoneNumber: any) {
    this.phoneNumber = phoneNumber;
    // Update the form control with the international number format
    if (phoneNumber && phoneNumber.internationalNumber) {
      this.authForm.get('phone')?.setValue(phoneNumber.internationalNumber);
    } else {
      this.authForm.get('phone')?.setValue('');
    }
  }

  isPhoneValid(): boolean {
    // Check if we have a valid phone number from the component
    if (this.phoneNumber && this.phoneNumber.e164Number && this.phoneNumber.e164Number.length > 5) {
      return true;
    }
    
    // Fallback: check if the form control has a value that looks like a valid phone number
    const phoneValue = this.authForm.get('phone')?.value;
    if (phoneValue && typeof phoneValue === 'string') {
      // Basic validation: should have at least 10 digits and start with +
      const cleanNumber = phoneValue.replace(/\s+/g, '');
      return cleanNumber.length >= 10 && cleanNumber.startsWith('+');
    }
    
    return false;
  }

  // Handle floating label for phone input
  get isPhoneLabelFloating(): boolean {
    const phoneValue = this.authForm.get('phone')?.value;
    return phoneValue && phoneValue.length > 0;
  }
}
