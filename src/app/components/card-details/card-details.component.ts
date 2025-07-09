import { Component, OnInit, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonBadge } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { DataSharingService } from '../../services/data-sharing.service';
import { IonicAudioPlayerComponent } from '../ionic-audio-player/ionic-audio-player.component';

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
    IonicAudioPlayerComponent
  ]
})
export class CardDetailsComponent implements OnInit {
  // Get signals from the service
  selectedCard = this.dataSharingService.getSelectedCardItem();
  audioData = this.dataSharingService.getAudioData();

  // Computed properties for easier access
  cardItem = computed(() => this.selectedCard());
  audioItem = computed(() => this.audioData());

  constructor(
    private router: Router,
    private dataSharingService: DataSharingService
  ) {
    // Effect to handle navigation when no data is available
    effect(() => {
      const card = this.selectedCard();
      if (!card) {
        // If no card data, redirect back to krishna-page
        this.router.navigate(['/krishna-page']);
      }
    });
  }

  ngOnInit() {
    // Additional initialization if needed
  }

  goBack() {
    // Clear data and navigate back
    this.dataSharingService.clearData();
    this.router.navigate(['/krishna-page']);
  }
}
