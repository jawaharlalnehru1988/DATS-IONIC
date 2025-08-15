import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  
  constructor(
    private router: Router,
    private languageService: LanguageService
  ) {}

  /**
   * Navigate to a route with current language prefix
   */
  navigateWithLanguage(path: string, params?: any): void {
    const languageAwarePath = this.languageService.generateLanguageUrl(path);
    
    if (params) {
      this.router.navigate([languageAwarePath], { queryParams: params });
    } else {
      this.router.navigate([languageAwarePath]);
    }
  }

  /**
   * Navigate to blog details with language prefix
   */
  navigateToBlogDetails(blogId: string): void {
    const path = `blog-details/${blogId}`;
    this.navigateWithLanguage(path);
  }

  /**
   * Navigate to articles page with language prefix
   */
  navigateToArticles(): void {
    this.navigateWithLanguage('articles');
  }

  /**
   * Navigate to dashboard with language prefix
   */
  navigateToDashboard(): void {
    this.navigateWithLanguage('dashboard');
  }

  /**
   * Navigate to settings with language prefix
   */
  navigateToSettings(): void {
    this.navigateWithLanguage('settings');
  }

  /**
   * Navigate to contacts with language prefix
   */
  navigateToContacts(): void {
    this.navigateWithLanguage('contacts');
  }

  /**
   * Navigate to Krishna page with language prefix
   */
  navigateToKrishnaPage(): void {
    this.navigateWithLanguage('krishna-page');
  }

  /**
   * Navigate to Srila Prabhupada page with language prefix
   */
  navigateToSrilaPrabhupada(): void {
    this.navigateWithLanguage('srilaprabhupada');
  }

  /**
   * Navigate to audios page with language prefix
   */
  navigateToAudios(): void {
    this.navigateWithLanguage('audios');
  }

  /**
   * Navigate to music details with language prefix
   */
  navigateToMusicDetails(language: string): void {
    const path = `music-details/${language}`;
    this.navigateWithLanguage(path);
  }

  /**
   * Navigate to calendar with language prefix
   */
  navigateToCalendar(): void {
    this.navigateWithLanguage('calender');
  }

  /**
   * Navigate to login with language prefix
   */
  navigateToLogin(): void {
    this.navigateWithLanguage('login');
  }

  /**
   * Navigate to register with language prefix
   */
  navigateToRegister(): void {
    this.navigateWithLanguage('register');
  }

  /**
   * Navigate to chant page with language prefix
   */
  navigateToChant(): void {
    this.navigateWithLanguage('chant');
  }

  /**
   * Navigate to tutorial with language prefix
   */
  navigateToTutorial(): void {
    this.navigateWithLanguage('tutorial');
  }

  /**
   * Navigate to tutorial details with language prefix
   */
  navigateToTutorialDetails(id: string): void {
    const path = `tutorial-details/${id}`;
    this.navigateWithLanguage(path);
  }

  /**
   * Navigate to questions page with language prefix
   */
  navigateToQuestions(): void {
    this.navigateWithLanguage('questionanswered');
  }

  /**
   * Navigate to card details with language prefix
   */
  navigateToCardDetails(): void {
    this.navigateWithLanguage('card-details');
  }

  /**
   * Navigate to rich text demo with language prefix
   */
  navigateToRichTextDemo(): void {
    this.navigateWithLanguage('rich-text-demo');
  }

  /**
   * Get language-aware route path (for use in templates)
   */
  getLanguageAwareRoute(path: string): string {
    return this.languageService.generateLanguageUrl(path);
  }

  /**
   * Navigate back with language awareness
   */
  navigateBack(fallbackRoute: string = 'dashboard'): void {
    // Try to go back in history, or navigate to fallback route
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.navigateWithLanguage(fallbackRoute);
    }
  }

  /**
   * Replace current route with language-aware route
   */
  replaceWithLanguageRoute(path: string): void {
    const languageAwarePath = this.languageService.generateLanguageUrl(path);
    this.router.navigate([languageAwarePath], { replaceUrl: true });
  }
}
