import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonContent, IonToolbar, IonIcon, IonButtons, IonButton, IonFooter, IonRefresher, IonRefresherContent, ModalController } from '@ionic/angular/standalone';
import { SegmentedTabsComponent, TabItem } from '../components/segmented-tabs/segmented-tabs.component';
import { addIcons } from 'ionicons';
import { chevronDownOutline, notificationsOutline, optionsOutline, home, heartOutline, cafeOutline, personOutline, chevronBack, chevronForward, add, chevronDownCircleOutline } from 'ionicons/icons';
import { DisplayCardListComponent, } from '../components/display-card-list/display-card-list.component';
import { CardItem, InputData } from '../Utils/models';
import { KrishnaServiceService } from './krishna-service.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';
import { CategoryFormService } from '../Utils/components/category-form/category-form.service';
import { ThemeService, ThemeType } from '../services/theme.service';
import { GlobalStateService } from '../services/global-state.service';
import { LanguageService } from '../services/language.service';
import { Subscription } from 'rxjs';
import { ReusableHeaderComponent } from '../components/reusable-header/reusable-header.component';
import { SkeletonLoaderComponent } from '../components/skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-krishna-page',
  templateUrl: './krishna-page.page.html',
  styleUrls: ['./krishna-page.page.scss'],
  standalone: true,
  imports: [IonFooter, IonButton, IonButtons, IonIcon, IonContent, IonToolbar, IonRefresher, IonRefresherContent, FormsModule, DisplayCardListComponent, ReusableHeaderComponent, SegmentedTabsComponent, SkeletonLoaderComponent]
})
export class KrishnaPagePage implements OnInit, OnDestroy {
  contentCategories: TabItem[] = [];

// Use signals from global state service
get inputDatas() {
  return this.globalStateService.krishnaPageData();
}

get isLoading() {
  return this.globalStateService.krishnaPageLoading();
}

get hasError() {
  return this.globalStateService.krishnaPageError();
}

// Theme management
currentTheme: ThemeType = 'theme-royal';
private themeSubscription: Subscription = new Subscription();
private languageSubscription: Subscription = new Subscription();

// HostBinding to apply theme class to the component's host element
@HostBinding('class')
get themeClass() {
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

selectedTopic: string = 'Arati';

  constructor(
    private krishnaService: KrishnaServiceService, 
    private categoryService: CategoryFormService, 
    private router: Router, 
    private dataSharingService: DataSharingService, 
    private modalController: ModalController,
    private themeService: ThemeService,
    private globalStateService: GlobalStateService,
    private languageService: LanguageService
  ) { 
    addIcons({chevronBack,chevronForward,add,home,heartOutline,cafeOutline,personOutline,chevronDownOutline,notificationsOutline,optionsOutline,chevronDownCircleOutline});
    
    // Initialize categories with current language
    this.updateContentCategories();
  }

ngOnInit() {
  // Subscribe to theme changes
  this.themeSubscription = this.themeService.currentTheme$.subscribe(
    theme => {
      this.currentTheme = theme;
    }
  );
  
  // Subscribe to language changes
  this.languageSubscription = this.languageService.texts$.subscribe(() => {
    this.updateContentCategories();
  });
  
  this.startCarousel();
  
  // Use global state service to get data with intelligent caching
  this.globalStateService.getKrishnaPageData().catch(error => {
    console.error('Failed to load Krishna page data:', error);
  });

  this.getAllStories();
}

private updateContentCategories(): void {
  const texts = this.languageService.getTexts();
  this.contentCategories = [
    { value: 'Arati', label: texts.categoryArati },
    { value: 'Hare Krishna Kirtan', label: texts.categoryHareKrishnaKirtan },
    { value: 'Stories', label: texts.categoryStories },
    { value: 'philosophy', label: texts.categoryPhilosophy },
    { value: 'discussion', label: texts.categoryDiscussion },
    { value: 'images', label: texts.categoryImages },
    { value: 'videos', label: texts.categoryVideos },
  ];
}

getAllStories(){
  this.krishnaService.getAllStries().subscribe({
    next: (stories) => {
      console.log('Stories loaded successfully:', stories);
      // Handle stories data if needed
    },
    error: (error) => {
      console.error('Error loading stories:', error);
    }
  });
}


ngOnDestroy() {
  this.stopCarousel();
  
  // Unsubscribe from theme changes
  if (this.themeSubscription) {
    this.themeSubscription.unsubscribe();
  }
  
  // Unsubscribe from language changes
  if (this.languageSubscription) {
    this.languageSubscription.unsubscribe();
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
  
  this.inputDatas.forEach((inputData: InputData) => {
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
  
  this.dataSharingService.setSelectedCardItem(item);
  this.router.navigate(['/card-details']);
}

// Pull to refresh handler
async handleRefresh(event: any) {
  console.log('🔄 Pull to refresh triggered on Krishna page');
  
  try {
    // Force refresh data from backend
    await this.globalStateService.refreshPageData('krishna');
    console.log('✅ Krishna page data refreshed successfully');
  } catch (error) {
    console.error('❌ Error refreshing Krishna page data:', error);
  } finally {
    // Complete the refresh animation
    event.target.complete();
  }
}

onPlayAllClicked(cardItems: CardItem[]) {
  // Set the playlist with the sorted card items from this specific category
  this.dataSharingService.setPlaylistData(cardItems);
  
  // Set the first card as selected and navigate to card details
  if (cardItems.length > 0) {
    this.dataSharingService.setSelectedCardItem(cardItems[0]);
    this.router.navigate(['/card-details']);
  }
}



}
