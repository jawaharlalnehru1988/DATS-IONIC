import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButtons, IonButton, IonMenuButton, IonSegment, IonSegmentButton, IonLabel, IonFooter, IonItem, IonSpinner, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDownOutline, notificationsOutline, optionsOutline, home, heartOutline, cafeOutline, personOutline, chevronBack, chevronForward, add } from 'ionicons/icons';
import { DisplayCardListComponent, } from '../components/display-card-list/display-card-list.component';
import { CardItem, InputData } from '../Utils/models';
import { KrishnaServiceService } from './krishna-service.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';
import { CategoryFormService } from '../Utils/components/category-form/category-form.service';
@Component({
  selector: 'app-krishna-page',
  templateUrl: './krishna-page.page.html',
  styleUrls: ['./krishna-page.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonItem, IonFooter, NgFor, IonLabel, IonSegmentButton, IonMenuButton, IonSegment, IonButton, IonButtons, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, DisplayCardListComponent]
})
export class KrishnaPagePage implements OnInit, OnDestroy {
  languages = [
  { value: 'Arati', label: 'Arati' },
  { value: 'Hare Krishna Kirtan', label: 'Hare Krishna Kirtan' },
  { value: 'Stories', label: 'Stories' },
  { value: 'Philosophy', label: 'Philosophy' },
  { value: 'Discussion', label: 'Discussion' },
  { value: 'Images', label: 'Images' }
];

inputDatas: InputData[] = [];
isLoading: boolean = true; // Add loading state

// Carousel properties
currentImageIndex = 0;
carouselInterval: any;
isCarouselPaused = false;
readonly carouselImages = [
  {
    src: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751499823/balakrishna_i8eykp.jpg',
    alt: 'Bala Krishna'
  },
  {
    src: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752102810/convincing_gopis_ymrmnm.jpg',
    alt: 'Krishna with Gopis'
  },
  {
    src: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751941178/astasaki_drhwrf.jpg',
    alt: 'Astasaki Krishna'
  },
  {
    src: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751499810/krishnabalaram_iaduro.jpg',
    alt: 'Astasaki Krishna'
  }
];

selectedLang: string = 'Arati';

  constructor(private krishnaService: KrishnaServiceService, private categoryService: CategoryFormService, private router: Router, private dataSharingService: DataSharingService, private modalController: ModalController) { 
    addIcons({chevronBack,chevronForward,add,home,heartOutline,cafeOutline,personOutline,chevronDownOutline,notificationsOutline,optionsOutline});
  }

ngOnInit() {
  this.startCarousel();
  this.isLoading = true; // Set loading to true before fetching data
  this.categoryService.getAllCategories('krishna-page').subscribe({
    next: (data:InputData[]) => {
      this.inputDatas = data;
      this.isLoading = false; // Set loading to false when data is received
    },
    error: (error) => {
      console.error('Error fetching Krishna data:', error);
      this.isLoading = false; // Set loading to false even on error
    }
  })
}

ngOnDestroy() {
  this.stopCarousel();
}

startCarousel() {
  this.carouselInterval = setInterval(() => {
    this.nextImage();
  }, 5000); // Change image every 5 seconds
}

stopCarousel() {
  if (this.carouselInterval) {
    clearInterval(this.carouselInterval);
    this.carouselInterval = null;
  }
}

nextImage() {
  this.currentImageIndex = (this.currentImageIndex + 1) % this.carouselImages.length;
}

previousImage() {
  this.currentImageIndex = this.currentImageIndex === 0 
    ? this.carouselImages.length - 1 
    : this.currentImageIndex - 1;
}

goToImage(index: number) {
  this.currentImageIndex = index;
  // Reset the carousel timer when user manually navigates
  this.stopCarousel();
  if (!this.isCarouselPaused) {
    this.startCarousel();
  }
}

pauseCarousel() {
  this.isCarouselPaused = true;
  this.stopCarousel();
}

resumeCarousel() {
  this.isCarouselPaused = false;
  this.startCarousel();
}

onCardSelected(item: CardItem) {
  this.dataSharingService.setSelectedCardItem(item);
  this.router.navigate(['/card-details']);
}

// Open category form in modal
async openCategoryModal() {
  const { CategoryFormModalComponent } = await import('../Utils/components/category-form-modal/category-form-modal.component');
  
  const modal = await this.modalController.create({
    component: CategoryFormModalComponent,
    componentProps: {
      pageIdentifier: 'krishna-page'
    },
    cssClass: 'category-form-modal',
    backdropDismiss: false,
    showBackdrop: true
  });

  modal.onDidDismiss().then((result) => {
    if (result.data && result.data.submitted) {
      // Handle submission result if needed
    }
  });

  const presentResult = await modal.present();
  
  // Apply styles after modal is presented with a small delay
  setTimeout(() => {
    const modalElement = document.querySelector('ion-modal.category-form-modal');
    if (modalElement) {
      (modalElement as HTMLElement).style.setProperty('--width', '90%');
      (modalElement as HTMLElement).style.setProperty('--max-width', '500px');
      (modalElement as HTMLElement).style.setProperty('--height', 'auto');
      (modalElement as HTMLElement).style.setProperty('--max-height', '90vh');
    }
  }, 100);

  return presentResult;
}



}
