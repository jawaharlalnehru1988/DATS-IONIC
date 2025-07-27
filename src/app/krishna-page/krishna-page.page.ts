import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButtons, IonButton, IonMenuButton, IonSegment, IonSegmentButton, IonLabel, IonFooter, IonSkeletonText, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDownOutline, notificationsOutline, optionsOutline, home, heartOutline, cafeOutline, personOutline, chevronBack, chevronForward, add } from 'ionicons/icons';
import { DisplayCardListComponent, } from '../components/display-card-list/display-card-list.component';
import { CardItem, InputData } from '../Utils/models';
import { KrishnaServiceService } from './krishna-service.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';
import { CategoryFormService } from '../Utils/components/category-form/category-form.service';
import { ThemeService, ThemeType } from '../services/theme.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-krishna-page',
  templateUrl: './krishna-page.page.html',
  styleUrls: ['./krishna-page.page.scss'],
  standalone: true,
  imports: [IonFooter, NgFor, IonLabel, IonSegmentButton, IonMenuButton, IonSegment, IonButton, IonButtons, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, DisplayCardListComponent, IonSkeletonText]
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

// Theme management
currentTheme: ThemeType = 'theme-royal';
private themeSubscription: Subscription = new Subscription();

// HostBinding to apply theme class to the component's host element
@HostBinding('class')
get themeClass() {
  console.log('HostBinding class getter called, returning:', this.currentTheme);
  return this.currentTheme;
}

// Carousel properties
currentImageIndex = 0;
carouselInterval: any;
isCarouselPaused = false;
readonly carouselImages = [
  {
    src: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1753597101/allrasas_qlm3xn.png',
    alt: 'All Rasas of Krishna'
  },
  {
    src: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1753597101/goplakrishna_c7brm3.png',
    alt: 'Gopala Krishna'
  },
  {
    src: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1753596032/astasaki_ko67v3.png',
    alt: 'Krishna with Gopis'
  },
  {
    src: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1753597100/lordKrishnaMadhurya_nzmhpf.png',
    alt: 'Lord Krishna Madhurya'
  }
];

selectedLang: string = 'Arati';

  constructor(
    private krishnaService: KrishnaServiceService, 
    private categoryService: CategoryFormService, 
    private router: Router, 
    private dataSharingService: DataSharingService, 
    private modalController: ModalController,
    private themeService: ThemeService
  ) { 
    addIcons({chevronBack,chevronForward,add,home,heartOutline,cafeOutline,personOutline,chevronDownOutline,notificationsOutline,optionsOutline});
    
    // Set default data from Krishna service
    this.inputDatas = this.krishnaService.defaultInputData;
    // Keep loading true initially to show skeleton, will be set to false in ngOnInit
    this.isLoading = true;
  }

ngOnInit() {
  // Subscribe to theme changes
  this.themeSubscription = this.themeService.currentTheme$.subscribe(
    theme => {
      console.log('Krishna page theme changed to:', theme);
      this.currentTheme = theme;
    }
  );
  
  this.startCarousel();
  this.isLoading = true; // Set loading to true before fetching data
  this.categoryService.getAllCategories('krishna-page').subscribe({
    next: (data:InputData[]) => {
      if (data && data.length > 0) {
        this.inputDatas = data;
        console.log('API data loaded:', data);
      } else {
        // Use default data if API returns empty
        this.inputDatas = this.krishnaService.defaultInputData;
        console.log('Using default data from service');
      }
      this.isLoading = false; // Set loading to false when data is received
    },
    error: (error) => {
      console.error('Error fetching Krishna data:', error);
      // Fall back to default data on error
      this.inputDatas = this.krishnaService.defaultInputData;
      console.log('Error occurred, using default data from service');
      this.isLoading = false; // Set loading to false even on error
    }
  })
}

ngOnDestroy() {
  this.stopCarousel();
  
  // Unsubscribe from theme changes
  if (this.themeSubscription) {
    this.themeSubscription.unsubscribe();
  }
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
  // Collect all card items from all categories to create playlist
  const allCardItems: CardItem[] = [];
  
  this.inputDatas.forEach(inputData => {
    if (inputData?.cardItems) {
      allCardItems.push(...inputData.cardItems);
    }
  });
  
  // Sort all items same way as display-card-list component
  const sortedItems = allCardItems.sort((a, b) => {
    const categoryA = parseInt(a.category, 10);
    const categoryB = parseInt(b.category, 10);
    
    if (isNaN(categoryA) && isNaN(categoryB)) {
      return a.category.localeCompare(b.category);
    }
    if (isNaN(categoryA)) return 1;
    if (isNaN(categoryB)) return -1;
    
    return categoryA - categoryB;
  });
  
  this.dataSharingService.setPlaylistData(sortedItems);
  console.log('Playlist set for krishna-page with', sortedItems.length, 'items from', this.inputDatas.length, 'categories');
  
  this.dataSharingService.setSelectedCardItem(item);
  this.router.navigate(['/card-details']);
}

onPlayAllClicked(cardItems: CardItem[]) {
  // Set the playlist with the sorted card items from this specific category
  this.dataSharingService.setPlaylistData(cardItems);
  console.log('Play All clicked - Playlist set with', cardItems.length, 'items');
  
  // Set the first card as selected and navigate to card details
  if (cardItems.length > 0) {
    this.dataSharingService.setSelectedCardItem(cardItems[0]);
    this.router.navigate(['/card-details']);
  }
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
