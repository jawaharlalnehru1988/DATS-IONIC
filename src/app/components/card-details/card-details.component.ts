import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonBadge, IonToast } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/data-sharing.service';
import { RatingService } from '../../services/rating.service';
import { IonicAudioPlayerComponent } from '../ionic-audio-player/ionic-audio-player.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';

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

  constructor(
    private router: Router,
    private dataSharingService: DataSharingService,
    private ratingService: RatingService
  ) {
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

  goBack() {
    // Clear data and navigate back
    this.dataSharingService.clearData();
    this.router.navigate(['/krishna-page']);
  }
}
