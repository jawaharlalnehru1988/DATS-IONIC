import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { RoleBasedUIService } from '../services/role-based-ui.service';
import { AuthService } from '../services/auth.service';
import { ThemeService, ThemeType } from '../services/theme.service';
import { LanguageService, LanguageTexts, SupportedLanguage } from '../services/language.service';
import { ShowForRolesDirective } from '../directives/show-for-roles.directive';
import { ChantSectionComponent } from '../components/chant-section/chant-section.component';
import { ReusableHeaderComponent } from '../components/reusable-header/reusable-header.component';
import { Observable, combineLatest, map } from 'rxjs';
import { FeatureCard, getFeatureCardsByLanguage } from './dashboard.data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    ShowForRolesDirective,
    ChantSectionComponent,
    ReusableHeaderComponent
  ]
})
export class DashboardPage implements OnInit {
  
  isAuthenticated$: Observable<boolean>;
  userRole$: Observable<string | null>;
  canShowAdminFeatures$: Observable<boolean>;
  userDisplayName$: Observable<string>;
  currentTheme$: Observable<ThemeType>;
  texts$: Observable<LanguageTexts>;
  featureCards$: Observable<FeatureCard[]>;

  constructor(
    private roleBasedUIService: RoleBasedUIService,
    private authService: AuthService,
    private themeService: ThemeService,
    private languageService: LanguageService,
    private router: Router
  ) {
    this.isAuthenticated$ = this.roleBasedUIService.isUserAuthenticated();
    this.userRole$ = this.roleBasedUIService.getCurrentUserRole();
    this.canShowAdminFeatures$ = this.roleBasedUIService.canShowAdminFeatures();
    this.userDisplayName$ = this.roleBasedUIService.getUserDisplayName();
    this.currentTheme$ = this.themeService.currentTheme$;
    this.texts$ = this.languageService.texts$;
    
    // Create observable for feature cards that updates when language changes
    this.featureCards$ = this.languageService.currentLanguage$.pipe(
      map((language: SupportedLanguage) => getFeatureCardsByLanguage(language))
    );
  }

  ngOnInit() {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  onLogout() {
    this.authService.logout();
  }

  onAdminAction() {
    console.log('Admin action triggered');
  }

  onDevoteeAction() {
    console.log('Devotee action triggered');
  }

  onPremiumAction() {
    console.log('Premium action triggered');
  }

  onGuestAction() {
    console.log('Guest action triggered');
  }

  getTranslatedTitle(titleKey: keyof LanguageTexts): string {
    return this.languageService.getText(titleKey);
  }
}
