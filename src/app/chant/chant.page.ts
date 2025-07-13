import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonMenuButton, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonButton,
  IonIcon,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonProgressBar,
  IonFab,
  IonFabButton,
  IonAlert,
  IonToast
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  colorPaletteOutline, 
  close, 
  flowerOutline, 
  refreshOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-chant',
  templateUrl: './chant.page.html',
  styleUrls: ['./chant.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonMenuButton, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButton,
    IonIcon,
    IonModal,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonProgressBar,
    IonFab,
    IonFabButton,
    IonAlert,
    IonToast,
    CommonModule, 
    FormsModule
  ]
})
export class ChantPage implements OnInit {
  // Theme management
  currentTheme: string = 'theme-ocean';
  isThemeSelectorOpen: boolean = false;

  // Chanting counters
  currentRound: number = 0;
  roundsCompleted: number = 0;
  mahaRounds: number = 0;

  // Radial progress properties
  circumference: number = 0;
  strokeDashoffset: number = 0;
  radius: number = 100; // Updated SVG circle radius for larger button

  // UI state
  showResetAlert: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';

  // Alert button configuration
  alertButtons = [
    {
      text: 'No',
      role: 'cancel',
      handler: () => {
        this.showResetAlert = false;
      }
    },
    {
      text: 'Yes, Reset',
      role: 'confirm',
      handler: () => {
        this.resetProgress();
      }
    }
  ];

  // Toast button configuration
  toastButtons = [
    {
      text: '🙏',
      role: 'cancel'
    }
  ];

  constructor() {
    addIcons({
      colorPaletteOutline,
      close,
      flowerOutline,
      refreshOutline
    });
  }

  ngOnInit() {
    // Initialize radial progress
    this.circumference = 2 * Math.PI * this.radius;
    this.updateProgress();
    
    // Load saved progress from localStorage
    this.loadProgress();
  }

  // Theme management methods
  showThemeSelector() {
    this.isThemeSelectorOpen = true;
  }

  closeThemeSelector() {
    this.isThemeSelectorOpen = false;
  }

  setTheme(theme: string) {
    this.currentTheme = theme;
    this.closeThemeSelector();
    // Save theme preference
    localStorage.setItem('chantTheme', theme);
  }

  // Main chanting method
  chant() {
    this.currentRound++;

    // Check if round completed (108 chants)
    if (this.currentRound >= 108) {
      this.roundsCompleted++;
      this.currentRound = 0;
      
      // Show round completion message
      this.toastMessage = '🎉 Congratulations! Lord Krishna is pleased with you!! 🙏';
      this.showToast = true;

      // Check if 16 rounds completed (Maha Round)
      if (this.roundsCompleted >= 16) {
        this.mahaRounds++;
        this.roundsCompleted = 0;
        
        // Show Maha Round completion message
        setTimeout(() => {
          this.toastMessage = '🌟 Congratulations! Sri Prabhupada is pleased with you!! 🙏✨';
          this.showToast = true;
        }, 3500);
      }
    }

    // Update radial progress
    this.updateProgress();
    
    // Save progress
    this.saveProgress();
  }

  // Reset confirmation
  showResetConfirmation() {
    this.showResetAlert = true;
  }

  // Reset all progress
  resetProgress() {
    this.currentRound = 0;
    this.roundsCompleted = 0;
    this.mahaRounds = 0;
    this.showResetAlert = false;
    
    // Update radial progress
    this.updateProgress();
    
    // Clear saved progress
    this.clearProgress();
    
    // Show reset confirmation
    this.toastMessage = '🔄 Progress reset successfully! 🙏';
    this.showToast = true;
  }

  // Save progress to localStorage
  private saveProgress() {
    const progress = {
      currentRound: this.currentRound,
      roundsCompleted: this.roundsCompleted,
      mahaRounds: this.mahaRounds
    };
    localStorage.setItem('chantProgress', JSON.stringify(progress));
  }

  // Load progress from localStorage
  private loadProgress() {
    const savedProgress = localStorage.getItem('chantProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      this.currentRound = progress.currentRound || 0;
      this.roundsCompleted = progress.roundsCompleted || 0;
      this.mahaRounds = progress.mahaRounds || 0;
    }

    // Load theme preference
    const savedTheme = localStorage.getItem('chantTheme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
    }
    
    // Update progress after loading
    this.updateProgress();
  }

  // Clear progress from localStorage
  private clearProgress() {
    localStorage.removeItem('chantProgress');
  }

  // Update radial progress
  private updateProgress() {
    const progress = this.currentRound / 108;
    const offset = this.circumference - (progress * this.circumference);
    this.strokeDashoffset = offset;
  }
}
