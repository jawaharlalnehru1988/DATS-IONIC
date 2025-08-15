import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { LANGUAGE_ROUTES, getLanguageRouteByPrefix } from '../models/language-routes.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageGuard implements CanActivate {
  
  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Check if this is a direct English route (no language prefix)
    if (route.data && route.data['language'] === 'en') {
      // Set language to English for direct routes
      const currentLang = this.languageService.getCurrentLanguage();
      if (currentLang !== 'en') {
        this.languageService.setLanguage('en');
      }
      return true;
    }

    // Handle language-prefixed routes
    const langParam = route.params['lang'];
    
    if (langParam) {
      // Check if the language parameter is valid (excluding English)
      const validLanguage = getLanguageRouteByPrefix(langParam);
      
      if (validLanguage && validLanguage.code !== 'en') {
        // Set the language in the service if it's different from current
        const currentLang = this.languageService.getCurrentLanguage();
        if (currentLang !== validLanguage.code) {
          this.languageService.setLanguage(validLanguage.code as any);
        }
        return true;
      } else if (langParam === 'en') {
        // Redirect /en/path to /path for English
        const pathSegments = route.url.map(segment => segment.path);
        const pathWithoutLang = pathSegments.slice(1); // Remove the 'en' segment
        
        if (pathWithoutLang.length > 0) {
          this.router.navigate(['/' + pathWithoutLang.join('/')]);
        } else {
          this.router.navigate(['/dashboard']);
        }
        return false;
      } else {
        // Invalid language, redirect to English dashboard
        this.router.navigate(['/dashboard']);
        return false;
      }
    }

    // This shouldn't happen with our current routing setup
    return true;
  }
}
