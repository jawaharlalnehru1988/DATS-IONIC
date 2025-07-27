import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeType = 'theme-ocean' | 'theme-sunset' | 'theme-forest' | 'theme-cyberpunk' | 'theme-royal' | 'theme-midnight';

export interface ThemeOption {
  value: ThemeType;
  name: string;
  description: string;
  primaryColor: string;
  previewGradient: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<ThemeType>('theme-royal');
  public currentTheme$ = this.currentThemeSubject.asObservable();

  public readonly themes: ThemeOption[] = [
    {
      value: 'theme-ocean',
      name: 'Ocean',
      description: 'Ocean Breeze - Blue gradient theme',
      primaryColor: '#00f5ff',
      previewGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      value: 'theme-sunset',
      name: 'Sunset',
      description: 'Sunset Vibes - Orange/red gradient theme',
      primaryColor: '#ff6b6b',
      previewGradient: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)'
    },
    {
      value: 'theme-forest',
      name: 'Forest',
      description: 'Forest Mystic - Green gradient theme',
      primaryColor: '#71b280',
      previewGradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)'
    },
    {
      value: 'theme-cyberpunk',
      name: 'Cyber',
      description: 'Cyberpunk Neon - Purple/pink neon theme',
      primaryColor: '#00ff41',
      previewGradient: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)'
    },
    {
      value: 'theme-royal',
      name: 'Royal',
      description: 'Royal Purple - Deep purple/gold theme',
      primaryColor: '#ffd700',
      previewGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      value: 'theme-midnight',
      name: 'Midnight',
      description: 'Midnight Blue - Dark blue/black theme',
      primaryColor: '#3498db',
      previewGradient: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
    }
  ];

  constructor() {
    // Load saved theme from localStorage
    this.loadSavedTheme();
  }

  /**
   * Get the current theme
   */
  getCurrentTheme(): ThemeType {
    return this.currentThemeSubject.value;
  }

  /**
   * Set a new theme
   */
  setTheme(theme: ThemeType): void {
    this.currentThemeSubject.next(theme);
    this.saveTheme(theme);
    this.applyThemeToBody(theme);
  }

  /**
   * Get theme options
   */
  getThemes(): ThemeOption[] {
    return this.themes;
  }

  /**
   * Get a specific theme by value
   */
  getTheme(themeValue: ThemeType): ThemeOption | undefined {
    return this.themes.find(theme => theme.value === themeValue);
  }

  /**
   * Apply theme class to document body for global styling
   */
  private applyThemeToBody(theme: ThemeType): void {
    // Remove all existing theme classes
    this.themes.forEach(t => {
      document.body.classList.remove(t.value);
    });
    
    // Add the new theme class
    document.body.classList.add(theme);
  }

  /**
   * Save theme to localStorage
   */
  private saveTheme(theme: ThemeType): void {
    try {
      localStorage.setItem('selectedTheme', theme);
    } catch (error) {
      console.warn('Could not save theme to localStorage:', error);
    }
  }

  /**
   * Load saved theme from localStorage
   */
  private loadSavedTheme(): void {
    try {
      const savedTheme = localStorage.getItem('selectedTheme') as ThemeType;
      if (savedTheme && this.themes.some(theme => theme.value === savedTheme)) {
        this.setTheme(savedTheme);
      } else {
        // Set default theme to royal
        this.setTheme('theme-royal');
      }
    } catch (error) {
      console.warn('Could not load theme from localStorage:', error);
      this.setTheme('theme-royal');
    }
  }
}
