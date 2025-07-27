import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonMenuButton, IonSelectOption, IonHeader, IonTitle, IonToolbar, IonFooter, IonButtons, IonButton, IonIcon, IonSelect, IonToggle, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle } from '@ionic/angular/standalone';
import { ThemeService, ThemeType, ThemeOption } from '../services/theme.service';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { searchOutline, menuOutline, heartOutline, homeOutline, headsetOutline, settingsOutline, checkmarkCircle, colorPalette } from 'ionicons/icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonToggle, IonSelect, IonIcon, FormsModule, IonMenuButton, ReactiveFormsModule, IonSelectOption, IonButton, IonButtons, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit, OnDestroy {
  language = 'en';
  displayPanel = true;
  currentTheme: ThemeType = 'theme-royal';
  themes: ThemeOption[] = [];
  private themeSubscription: Subscription = new Subscription();

  // HostBinding to apply theme class to the component's host element
  @HostBinding('class')
  get themeClass() {
    return this.currentTheme;
  }

  languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'bn', label: 'Bengali' },
    { value: 'te', label: 'Telugu' },
    { value: 'mr', label: 'Marathi' },
    { value: 'ta', label: 'Tamil' },
    { value: 'gu', label: 'Gujarati' },
    { value: 'kn', label: 'Kannada' }
  ];

  constructor(private themeService: ThemeService) { 
    addIcons({ 
      searchOutline, 
      menuOutline, 
      heartOutline, 
      homeOutline, 
      headsetOutline, 
      settingsOutline,
      checkmarkCircle,
      colorPalette
    });
  }

  ngOnInit() {
    // Initialize themes
    this.themes = this.themeService.getThemes();
    
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  selectTheme(theme: ThemeType) {
    this.themeService.setTheme(theme);
  }
}
