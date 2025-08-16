import { Component, Input, Output, EventEmitter } from '@angular/core';

import { 
  IonModal, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonButtons, 
  IonIcon
} from '@ionic/angular/standalone';
import { ThemeService, ThemeType, ThemeOption } from '../../services/theme.service';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
  standalone: true,
  imports: [
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon
]
})
class ThemeSelectorComponent {
  @Input() isOpen: boolean = false;
  @Output() modalClosed = new EventEmitter<void>();

  themes: ThemeOption[] = [];
  currentTheme: ThemeType = 'theme-royal';

  constructor(private themeService: ThemeService) {
    addIcons({ close });
    this.themes = this.themeService.getThemes();
    this.currentTheme = this.themeService.getCurrentTheme();
    
    // Subscribe to theme changes
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  closeModal() {
    this.modalClosed.emit();
  }

  selectTheme(theme: ThemeType) {
    this.themeService.setTheme(theme);
    this.closeModal();
  }
}
