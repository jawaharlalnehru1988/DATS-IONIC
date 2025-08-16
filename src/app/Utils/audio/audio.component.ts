import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  musicalNotes, 
  musicalNote, 
  searchOutline, 
  libraryOutline, 
  play, 
  star, 
  headset 
} from 'ionicons/icons';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonButtons, IonMenuButton, FormsModule, IonContent, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle],
})
export class AudioComponent implements OnInit, OnDestroy {
  @Input() topics: { topic: string; title: string }[] = []; // Input for dynamic data
  @Output() cardSelected = new EventEmitter<{ topic: string; title: string }>(); // Output for card selection

  // Language service properties
  private languageSubscription: Subscription = new Subscription();
  
  // Translated text properties
  musicGalleryText: string = 'Music Gallery';
  discoverSacredSoundsText: string = 'Discover Sacred Sounds';
  immersiveAudioDescriptionText: string = 'Immerse yourself in divine melodies and spiritual audio content';
  audioCategoriesText: string = 'Audio Categories';
  featuredAudioText: string = 'Featured Audio';
  premiumAudioExperienceText: string = 'Premium Audio Experience';
  highQualityAudioDescriptionText: string = 'High-quality spiritual audio content curated for your journey';

  constructor(private languageService: LanguageService) {
    addIcons({
      musicalNotes,
      musicalNote,
      searchOutline,
      libraryOutline,
      play,
      star,
      headset
    });
  }

  ngOnInit() {
    // Subscribe to language changes
    this.languageSubscription = this.languageService.texts$.subscribe(() => {
      this.updateTexts();
    });
    
    // Initialize texts
    this.updateTexts();
  }

  ngOnDestroy() {
    // Unsubscribe from language changes
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private updateTexts(): void {
    const texts = this.languageService.getTexts();
    this.musicGalleryText = texts.musicGallery;
    this.discoverSacredSoundsText = texts.discoverSacredSounds;
    this.immersiveAudioDescriptionText = texts.immersiveAudioDescription;
    this.audioCategoriesText = texts.audioCategories;
    this.featuredAudioText = texts.featuredAudio;
    this.premiumAudioExperienceText = texts.premiumAudioExperience;
    this.highQualityAudioDescriptionText = texts.highQualityAudioDescription;
  }

  onCardClick(selectedTopic: { topic: string; title: string }) {
    this.cardSelected.emit(selectedTopic); // Emit the selected card data
  }
}
