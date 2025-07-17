import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonList, IonText, IonTextarea, ToastController } from '@ionic/angular/standalone';
import { CategoryCard } from '../../models/card.model';
import { addIcons } from 'ionicons';
import { star, add, trash } from 'ionicons/icons';
import { CategoryFormService } from './category-form.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonText
  ]
})
export class CategoryFormComponent implements OnInit {
  @Input() initialData?: CategoryCard;
  @Output() formSubmit = new EventEmitter<CategoryCard>();

  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder, private categoryService: CategoryFormService, private toastController: ToastController) {
    addIcons({ star, add, trash });
  }

  ngOnInit() {
    console.log('CategoryFormComponent initialized');
    this.initForm();
  }

  

  private initForm() {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      img: ['', Validators.required],
      title: ['', Validators.required],
      category: ['', Validators.required],
      desc: [''],
      audioData: this.fb.group({
        audioSrc: ['', Validators.required],
        imageSrc: ['', Validators.required],
        auther: ['', Validators.required],
        title: ['', Validators.required]
      }),
      rating: ['0'],
      action: ['Play']
    });

    if (this.initialData) {
      this.categoryForm.patchValue(this.initialData);
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
       
      const formValue = this.categoryForm.value;
      const result = {
        categoryName: formValue.categoryName,
        cardItems: [
          {
            img: formValue.img,
            title: formValue.title,
            category: formValue.category,
            desc: formValue.desc,
            audioData: formValue.audioData,
            rating: formValue.rating,
            action: formValue.action
          }
        ]
      };

      this.categoryService.addCategory(result).subscribe({
        next: async (response) => {
          console.log('Category added successfully:', response);
          
          // Show success toast
          await this.showToast('✅ Category added successfully!', 'success');
          
          // Emit the result but don't reset the form
          this.formSubmit.emit(result);
        }, 
        error: async (error) => {
          console.error('Error adding category:', error);
          
          // Show error toast
          await this.showToast('❌ Failed to add category. Please try again.', 'danger');
        }
      });

      // Note: Form values are intentionally NOT cleared to allow easy editing and resubmission
    } else {
      // Show validation error toast
      this.showToast('⚠️ Please fill in all required fields correctly.', 'warning');
      
      // Mark all fields as touched to show validation errors
      this.categoryForm.markAllAsTouched();
    }
  }

  // Validation helper methods
  isFieldInvalid(fieldName: string): boolean {
    const field = this.categoryForm.get(fieldName);
    return field ? (field.invalid && field.touched) : false;
  }

  isNestedFieldInvalid(groupName: string, fieldName: string): boolean {
    const field = this.categoryForm.get(`${groupName}.${fieldName}`);
    return field ? (field.invalid && field.touched) : false;
  }

  // Toast helper method
  private async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color,
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }
}
