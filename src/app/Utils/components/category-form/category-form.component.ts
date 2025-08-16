import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Input() pageIdentifier: string = 'music-details'; // Default to music-details
  @Input() isEditMode: boolean = false; // Flag for edit mode
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

    // Pre-populate form if in edit mode
    if (this.isEditMode && this.initialData && this.initialData.cardItems && this.initialData.cardItems.length > 0) {
      const cardItem = this.initialData.cardItems[0]; // Get first card item
      this.categoryForm.patchValue({
        categoryName: this.initialData.categoryName,
        img: cardItem.img,
        title: cardItem.title,
        category: cardItem.category,
        desc: cardItem.desc,
        audioData: {
          audioSrc: cardItem.audioData.audioSrc,
          imageSrc: cardItem.audioData.imageSrc,
          auther: cardItem.audioData.auther,
          title: cardItem.audioData.title
        },
        rating: cardItem.rating || 0,
        action: cardItem.action || 'Play'
      });
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

      // Choose between add or update based on edit mode
      if (this.isEditMode && this.initialData && this.initialData._id) {
        // Update existing category
        this.categoryService.updateCategory(this.initialData._id, result, this.pageIdentifier).subscribe({
          next: async (response) => {
            console.log('Category updated successfully:', response);
            
            // Show success toast
            await this.showToast('✅ Category updated successfully!', 'success');
            
            // Emit the result but don't reset the form
            this.formSubmit.emit(result);
          }, 
          error: async (error) => {
            console.error('Error updating category:', error);
            
            // Show error toast
            await this.showToast('❌ Failed to update category. Please try again.', 'danger');
          }
        });
      } else {
        // Add new category
        this.categoryService.addCategory(result, this.pageIdentifier).subscribe({
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
      }

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
