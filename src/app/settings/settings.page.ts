import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonMenuButton, IonSelectOption, IonHeader, IonTitle, IonToolbar, IonFooter, IonButtons, IonButton, IonIcon, IonSelect, IonToggle, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle } from '@ionic/angular/standalone';
import { ThemeService, ThemeType, ThemeOption } from '../services/theme.service';
import { LanguageService, SupportedLanguage, LanguageTexts } from '../services/language.service';
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
  language: SupportedLanguage = 'en';
  displayPanel = true;
  currentTheme: ThemeType = 'theme-royal';
  themes: ThemeOption[] = [];
  texts: LanguageTexts = {} as LanguageTexts;
  private themeSubscription: Subscription = new Subscription();
  private languageSubscription: Subscription = new Subscription();

  // HostBinding to apply theme class to the component's host element
  @HostBinding('class')
  get themeClass() {
    return this.currentTheme;
  }

  get languages() {
    return this.languageService.getAvailableLanguages();
  }

  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService
  ) { 
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

    // Subscribe to language changes
    this.languageSubscription = this.languageService.texts$.subscribe((texts: LanguageTexts) => {
      this.texts = texts;
    });

    // Set current language
    this.language = this.languageService.getCurrentLanguage();
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  selectTheme(theme: ThemeType) {
    this.themeService.setTheme(theme);
  }

  selectLanguage(event: any) {
    const selectedLanguage = event.detail.value as SupportedLanguage;
    this.language = selectedLanguage;
    this.languageService.setLanguage(selectedLanguage);
    
    // Apply theme class to popover for proper styling
    setTimeout(() => {
      const popover = document.querySelector('ion-popover');
      if (popover && this.currentTheme) {
        popover.classList.add(`${this.currentTheme.replace('theme-', '')}-theme`);
      }
    }, 100);
  }
}
