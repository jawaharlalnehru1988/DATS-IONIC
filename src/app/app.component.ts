import { Component, OnInit, OnDestroy } from '@angular/core';
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
  IonRouterLink
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ThemeService, ThemeType } from './services/theme.service';
import { Subscription } from 'rxjs';
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
    IonRouterOutlet
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  currentTheme: ThemeType = 'theme-royal';
  private themeSubscription: Subscription = new Subscription();

  public appPages = [
    { title: 'Lord Sri Krishna', url: '/lordkrishna', icon: 'person-circle', iconColor: '#B34E05' },
    { title: 'Srila Prabhupada', url: '/srilaprabhupada', icon: 'person-circle', iconColor: '#B34E05' },
    { title: 'Audios', url: '/audios', icon: 'musical-notes', iconColor: 'orange' },
    { title: 'Articles', url: '/articles', icon: 'document-text', iconColor: '#045B40' },
    { title: 'Vaishnava Calender', url: '/calender', icon: 'calendar', iconColor: '#230568' },
    { title: 'Tutorial', url: '/tutorial', icon: 'easel', iconColor: '#7D0250' },
    { title: 'Chant Hare Krishna', url: '/chant', icon: 'person-circle', iconColor: '#B34E05' },
  ];

  public additionals = [
    { title: 'Contacts', url: '/contacts', icon: 'call', iconColor: 'orange' },
    { title: 'Free Membership', url: '/membership', icon: 'person-add', iconColor: '#0E7B8A' },
    { title: 'Settings', url: '/settings', icon: 'settings', iconColor: '#230568' },
  ];

  constructor(private themeService: ThemeService) {
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
  }

  ngOnInit() {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy() {
    // Clean up subscription
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
