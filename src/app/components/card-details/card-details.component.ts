import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonBadge, IonToast, IonButton, IonIcon, IonSelect, IonSelectOption, ModalController } from '@ionic/angular/standalone';
import { Router, ActivatedRoute } from '@angular/router';
import { DataSharingService } from '../../services/data-sharing.service';
import { RatingService } from '../../services/rating.service';
import { IonicAudioPlayerComponent } from '../ionic-audio-player/ionic-audio-player.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { addIcons } from 'ionicons';
import { createOutline } from 'ionicons/icons';
import { AudioRange } from '../../Utils/models';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonBackButton, 
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardTitle, 
    IonItem, 
    IonLabel, 
    IonBadge,
    IonToast,
    IonButton,
    IonIcon,
    IonSelect,
    IonSelectOption,
    IonicAudioPlayerComponent,
    StarRatingComponent
  ]
})
export class CardDetailsComponent implements OnInit {
  // Get signals from the service
  selectedCard = this.dataSharingService.getSelectedCardItem();
  audioData = this.dataSharingService.getAudioData();

  // Computed properties for easier access
  cardItem = computed(() => this.selectedCard());
  audioItem = computed(() => this.audioData());

  // Rating-related signals
  userRating = signal<number>(0);
  averageRating = signal<number>(0);
  totalRatings = signal<number>(0);
  isRatingLoading = signal<boolean>(false);
  ratingMessage = signal<string>('');
  showToast = signal<boolean>(false);

  // Audio range selection
  selectedAudioRange = signal<AudioRange | null>(null);
  audioRanges: AudioRange[] = [
    { name: "Introduction", start: 0.00, end: 0.30 },
    { name: "Sloka 1", start: 0.30, end: 1.15 },
    { name: "Sloka 2", start: 1.15, end: 2.00 },
    { name: "Sloka 3", start: 2.00, end: 2.45 },
    { name: "Sloka 4", start: 2.45, end: 3.30 },
    { name: "Conclusion", start: 3.30, end: 4.00 }
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataSharingService: DataSharingService,
    private ratingService: RatingService,
    private modalController: ModalController
  ) {
    addIcons({ createOutline });
    
    // Effect to handle navigation when no data is available
    effect(() => {
      const card = this.selectedCard();
      if (!card) {
        // If no card data, redirect back to krishna-page
        this.router.navigate(['/krishna-page']);
      } else {
        // Load rating data when card is available
        this.loadRatingData(card._id);
      }
    });
  }

  ngOnInit() {
    // Additional initialization if needed
  }

  // Format description to handle newlines for lyrics display
  formatLyrics(description: string): string {
    if (!description) return '';
    
    // Replace different types of newline characters with <br> tags
    return description
      .replace(/\r\n/g, '<br>')  // Windows line endings
      .replace(/\r/g, '<br>')    // Mac line endings
      .replace(/\n/g, '<br>')    // Unix line endings
      .replace(/\\n/g, '<br>');  // Escaped newlines
  }

  private loadRatingData(cardId: string) {
    this.isRatingLoading.set(true);
    
    // Load user's current rating
    this.ratingService.getCardRating(cardId).subscribe({
      next: (rating) => {
        this.userRating.set(rating);
      },
      error: (error) => {
        console.error('Error loading user rating:', error);
      }
    });

    // Load average rating
    this.ratingService.getAverageRating(cardId).subscribe({
      next: (data) => {
        this.averageRating.set(data.average);
        this.totalRatings.set(data.total);
        this.isRatingLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading average rating:', error);
        this.isRatingLoading.set(false);
      }
    });
  }

  onRatingChange(newRating: number) {
    const cardId = this.cardItem()?._id;
    if (!cardId) return;

    this.isRatingLoading.set(true);
    
    const ratingObservable = this.userRating() === 0 
      ? this.ratingService.submitRating(cardId, newRating)
      : this.ratingService.updateRating(cardId, newRating);

    ratingObservable.subscribe({
      next: (response) => {
        this.userRating.set(newRating);
        this.ratingMessage.set(response.message);
        this.showToast.set(true);
        
        // Reload average rating
        this.loadAverageRating(cardId);
      },
      error: (error) => {
        console.error('Error submitting rating:', error);
        this.ratingMessage.set('Failed to submit rating. Please try again.');
        this.showToast.set(true);
        this.isRatingLoading.set(false);
      }
    });
  }

  private loadAverageRating(cardId: string) {
    this.ratingService.getAverageRating(cardId).subscribe({
      next: (data) => {
        this.averageRating.set(data.average);
        this.totalRatings.set(data.total);
        this.isRatingLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading average rating:', error);
        this.isRatingLoading.set(false);
      }
    });
  }

  deleteRating() {
    const cardId = this.cardItem()?._id;
    if (!cardId || this.userRating() === 0) return;

    this.isRatingLoading.set(true);
    
    this.ratingService.deleteRating(cardId).subscribe({
      next: (response) => {
        this.userRating.set(0);
        this.ratingMessage.set('Rating removed successfully');
        this.showToast.set(true);
        
        // Reload average rating
        this.loadAverageRating(cardId);
      },
      error: (error) => {
        console.error('Error deleting rating:', error);
        this.ratingMessage.set('Failed to remove rating. Please try again.');
        this.showToast.set(true);
        this.isRatingLoading.set(false);
      }
    });
  }

  onToastDismiss() {
    this.showToast.set(false);
  }

  // Open edit modal with current card data
  async openEditModal() {
    const card = this.cardItem();
    const audio = this.audioItem();
    
    if (!card || !audio) {
      console.error('No card or audio data available for editing');
      return;
    }

    // Determine page identifier based on the current route or card category
    let pageIdentifier = 'music-details'; // default
    if (card.category && card.category.toLowerCase().includes('krishna')) {
      pageIdentifier = 'krishna-page';
    }

    // Transform card data to match CategoryCard format for editing
    const editData = {
      _id: card._id,
      categoryName: card.category || '',
      cardItems: [{
        img: card.img,
        title: card.title,
        category: card.category,
        desc: card.desc,
        audioData: {
          audioSrc: audio.audioSrc,
          imageSrc: audio.imageSrc,
          auther: audio.auther,
          title: audio.title
        },
        rating: card.rating,
        action: card.action
      }]
    };

    const { CategoryFormModalComponent } = await import('../../Utils/components/category-form-modal/category-form-modal.component');
    
    const modal = await this.modalController.create({
      component: CategoryFormModalComponent,
      componentProps: {
        pageIdentifier: pageIdentifier,
        initialData: editData,
        isEditMode: true
      },
      cssClass: 'category-form-modal',
      backdropDismiss: false,
      showBackdrop: true
    });

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.updated) {
        // Refresh the current card data or navigate back
        console.log('Card updated successfully');
        // You might want to refresh the data here
      }
    });

    await modal.present();

    // Apply modal styles
    setTimeout(() => {
      const modalElement = document.querySelector('ion-modal.category-form-modal') as HTMLElement;
      if (modalElement) {
        modalElement.style.setProperty('--width', '95%');
        modalElement.style.setProperty('--max-width', '95vw');
        modalElement.style.setProperty('--height', '95%');
        modalElement.style.setProperty('--max-height', '95vh');
        modalElement.style.setProperty('--border-radius', '12px');
      }
    }, 100);
  }

  // Handle audio range selection change
  onAudioRangeChange(event: any) {
    const selectedRange = event.detail.value;
    this.selectedAudioRange.set(selectedRange);
    console.log('Audio range changed:', {
      selectedRange: selectedRange,
      rangeName: selectedRange?.name,
      rangeStart: selectedRange?.start,
      rangeEnd: selectedRange?.end
    });
  }
  
  goBack() {
    // Clear data and navigate back to previous page
    this.dataSharingService.clearData();
    window.history.back();
  }
  }
