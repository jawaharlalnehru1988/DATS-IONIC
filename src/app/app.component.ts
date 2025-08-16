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
import { AuthService } from './services/auth.service';
import { LanguageService, LanguageTexts } from './services/language.service';
import { NavigationService } from './services/navigation.service';
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
  colorPalette,
  logOutOutline,
  logOutSharp,
  logInOutline,
  logInSharp,
  gridOutline,
  gridSharp,
  globeOutline,
  informationCircleOutline,
  personOutline,
  diamondOutline,
  starOutline,
  peopleOutline,
  analyticsOutline,
  constructOutline,
  menuOutline
} from 'ionicons/icons';
import { ResponseUserData } from './Utils/models';
import { CommonModule } from '@angular/common';
import { ShowForRolesDirective } from './directives/show-for-roles.directive';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    CommonModule,
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
    ShowForRolesDirective
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  currentTheme: ThemeType = 'theme-royal';
  private themeSubscription: Subscription = new Subscription();
  private userSubscription: Subscription = new Subscription();
  private languageSubscription: Subscription = new Subscription();
  
  currentUser: ResponseUserData | null = null;
  isAuthenticated: boolean = false;
  texts: LanguageTexts = {} as LanguageTexts;

  public appPages = [
    { title: 'Dashboard', url: 'dashboard', icon: 'grid', iconColor: '#4CAF50', textKey: 'dashboard' },
    { title: 'Lord Sri Krishna', url: 'krishna-page', icon: 'person-circle', iconColor: '#B34E05', textKey: 'lordKrishna' },
    { title: 'Srila Prabhupada', url: 'srilaprabhupada', icon: 'person-circle', iconColor: '#B34E05', textKey: 'srilaPrabhupada' },
    { title: 'Audios', url: 'audios', icon: 'musical-notes', iconColor: 'orange', textKey: 'audios' },
    { title: 'Articles', url: 'articles', icon: 'document-text', iconColor: '#045B40', textKey: 'articles' },
    { title: 'Vaishnava Calender', url: 'calender', icon: 'calendar', iconColor: '#230568', textKey: 'vaishnavaCalendar' },
    { title: 'Books', url: 'tutorial', icon: 'easel', iconColor: '#7D0250', textKey: 'books' },
    { title: 'Chant Hare Krishna', url: 'chant', icon: 'person-circle', iconColor: '#B34E05', textKey: 'chantHareKrishna' },
  ];

  public additionals = [
    { title: 'Contacts', url: 'contacts', icon: 'call', iconColor: 'orange', textKey: 'contacts' },
    { title: 'Free Membership', url: 'register', icon: 'person-add', iconColor: '#0E7B8A', textKey: 'freeMembership' },
    { title: 'Rich Text Demo', url: 'rich-text-demo', icon: 'document-text', iconColor: '#9C27B0', textKey: 'richTextDemo' },
    { title: 'Settings', url: 'settings', icon: 'settings', iconColor: '#230568', textKey: 'settings' },
  ];

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private languageService: LanguageService,
    private navigationService: NavigationService
  ) {
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
      colorPalette,
      logOutOutline,
      logOutSharp,
      logInOutline,
      logInSharp,
      gridOutline,
      gridSharp,
      globeOutline,
      informationCircleOutline,
      personOutline,
      diamondOutline,
      starOutline,
      peopleOutline,
      analyticsOutline,
      constructOutline,
      menuOutline
    });
  }

  ngOnInit() {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });

    // Subscribe to language changes
    this.languageSubscription = this.languageService.texts$.subscribe((texts: LanguageTexts) => {
      this.texts = texts;
    });

    // Subscribe to authentication state
    this.userSubscription.add(
      this.authService.currentUser$.subscribe(user => {
        this.currentUser = user;
      })
    );

    this.userSubscription.add(
      this.authService.isAuthenticated$.subscribe(isAuth => {
        this.isAuthenticated = isAuth;
      })
    );
  }

  ngOnDestroy() {
    // Clean up subscriptions
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  onLogout() {
    this.authService.logout();
  }

  // Method to get translated text for menu items
  getMenuText(textKey: string): string {
    return this.languageService.getText(textKey as keyof LanguageTexts);
  }

  // Method to get language-aware route for menu items
  getLanguageAwareRoute(route: string): string {
    return this.navigationService.getLanguageAwareRoute(route);
  }
}
