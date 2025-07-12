import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { 
  IonApp, 
  IonSplitPane, 
  IonMenu, 
  IonContent, 
  IonList, 
  IonListHeader, 
  IonNote, 
  IonMenuToggle, 
  IonItem, 
  IonIcon, 
  IonLabel, 
  IonRouterOutlet, 
  IonRouterLink,
  IonButton,
  IonPopover,
  IonCheckbox
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  mailOutline, 
  mailSharp, 
  paperPlaneOutline, 
  paperPlaneSharp, 
  heartOutline, 
  heartSharp, 
  archiveOutline, 
  archiveSharp, 
  trashOutline, 
  trashSharp, 
  warningOutline, 
  warningSharp, 
  bookmarkOutline, 
  bookmarkSharp, 
  easel, 
  easelOutline, 
  easelSharp, 
  musicalNotesOutline, 
  musicalNoteSharp, 
  musicalNoteOutline, 
  musicalNotesSharp, 
  bookOutline, 
  bookSharp, 
  documentTextOutline, 
  documentTextSharp, 
  gitPullRequestOutline, 
  gitPullRequestSharp, 
  compassOutline, 
  compassSharp, 
  calendarOutline, 
  calendarSharp, 
  personCircleOutline, 
  personCircleSharp, 
  callOutline, 
  callSharp, 
  personAddOutline, 
  personAddSharp, 
  languageOutline, 
  languageSharp, 
  settingsOutline, 
  settingsSharp,
  colorPaletteOutline,
  colorPalette
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink, 
    RouterLinkActive, 
    IonApp, 
    IonSplitPane, 
    IonMenu, 
    IonContent, 
    IonList, 
    IonListHeader, 
    IonNote, 
    IonMenuToggle, 
    IonItem, 
    IonIcon, 
    IonLabel, 
    IonRouterLink, 
    IonRouterOutlet,
    IonButton,
    IonPopover,
    IonCheckbox
  ],
})
export class AppComponent {
  // Current theme
  currentTheme: string = 'theme-ocean';
  isThemePopoverOpen: boolean = false;

  // Available themes
  themes = [
    { name: 'theme-ocean', label: '🌊 Ocean Breeze', description: 'Calm blue ocean vibes' },
    { name: 'theme-sunset', label: '🌅 Sunset Vibes', description: 'Warm sunset colors' },
    { name: 'theme-forest', label: '🌲 Forest Mystic', description: 'Nature green tones' },
    { name: 'theme-cyberpunk', label: '🔮 Cyberpunk Neon', description: 'Matrix style green' },
    { name: 'theme-royal', label: '👑 Royal Purple', description: 'Majestic purple & gold' },
    { name: 'theme-midnight', label: '🌙 Midnight Blue', description: 'Professional dark blue' }
  ];

  public appPages = [
    { title: 'Lord Sri Krishna', url: '/lordkrishna', icon: 'person-circle', iconColor: '#B34E05' },
    { title: 'Srila Prabhupada', url: '/srilaprabhupada', icon: 'person-circle', iconColor: '#B34E05' },
    { title: 'Audios', url: '/audios', icon: 'musical-notes', iconColor: 'orange' },
    { title: 'Baby Names', url: '/articles', icon: 'document-text', iconColor: '#045B40' },
    { title: 'Vaishnava Calender', url: '/calender', icon: 'calendar', iconColor: '#230568' },
    { title: 'Tutorial', url: '/tutorial', icon: 'easel', iconColor: '#7D0250' },
    { title: 'Chant Hare Krishna', url: '/chant', icon: 'person-circle', iconColor: '#B34E05' },
  ];

  public additionals = [
    { title: 'Contacts', url: '/contacts', icon: 'call', iconColor: 'orange' },
    { title: 'Free Membership', url: '/membership', icon: 'person-add', iconColor: '#0E7B8A' },
    { title: 'Settings', url: '/settings', icon: 'settings', iconColor: '#230568' },
  ];

  constructor() {
    addIcons({ 
      mailOutline, 
      mailSharp, 
      callOutline, 
      settingsOutline, 
      settingsSharp, 
      personAddOutline, 
      languageOutline, 
      languageSharp, 
      personAddSharp, 
      callSharp, 
      paperPlaneOutline, 
      compassOutline, 
      personCircleOutline, 
      personCircleSharp, 
      calendarOutline, 
      calendarSharp, 
      compassSharp, 
      documentTextOutline, 
      documentTextSharp, 
      gitPullRequestOutline, 
      gitPullRequestSharp, 
      bookOutline, 
      bookSharp, 
      musicalNotesOutline, 
      musicalNotesSharp, 
      paperPlaneSharp, 
      heartOutline, 
      heartSharp, 
      archiveOutline, 
      archiveSharp, 
      trashOutline, 
      trashSharp, 
      warningOutline, 
      warningSharp, 
      bookmarkOutline, 
      bookmarkSharp, 
      easelOutline, 
      easelSharp,
      colorPaletteOutline,
      colorPalette
    });

    // Load saved theme
    this.loadTheme();
  }

  // Theme management methods
  openThemePopover(event: Event) {
    this.isThemePopoverOpen = true;
  }

  closeThemePopover() {
    this.isThemePopoverOpen = false;
  }

  selectTheme(themeName: string) {
    this.currentTheme = themeName;
    this.saveTheme();
    this.closeThemePopover();
    
    // Apply theme to document body for global effect
    document.body.className = '';
    document.body.classList.add(themeName);
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem('globalTheme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
      document.body.classList.add(savedTheme);
    } else {
      document.body.classList.add(this.currentTheme);
    }
  }

  private saveTheme() {
    localStorage.setItem('globalTheme', this.currentTheme);
  }
}
