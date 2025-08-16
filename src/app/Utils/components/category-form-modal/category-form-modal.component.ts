import { Component, OnInit } from '@angular/core';

import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonButtons, 
  IonIcon,
  ModalController 
} from '@ionic/angular/standalone';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { CategoryCard } from '../../models/card.model';
import { addIcons } from 'ionicons';
import { close, checkmark } from 'ionicons/icons';

@Component({
  selector: 'app-category-form-modal',
  templateUrl: './category-form-modal.component.html',
  styleUrls: ['./category-form-modal.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    CategoryFormComponent
]
})
export class CategoryFormModalComponent implements OnInit {
  pageIdentifier: string = 'music-details'; // Default to music-details
  initialData: any = null; // Data for editing
  isEditMode: boolean = false; // Flag to determine if in edit mode

  constructor(private modalController: ModalController) {
    addIcons({ close, checkmark });
  }

  ngOnInit() {}

  // Close modal without saving
  dismissModal() {
    this.modalController.dismiss({
      submitted: false
    });
  }

  // Handle form submission - don't close modal, just notify parent
  onFormSubmit(categoryData: CategoryCard) {
    // Don't close the modal, just log success or show a toast
    console.log('Form submitted successfully, modal staying open for next submission');
    
    // Optional: You could emit an event to show a toast notification
    // or update some UI indicator that submission was successful
  }
}
