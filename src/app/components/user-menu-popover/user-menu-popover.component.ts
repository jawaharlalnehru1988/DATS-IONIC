import { Component, Input } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ThemeService, ThemeType } from '../../services/theme.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DecodedToken } from '../../Utils/jwt.util';
import { addIcons } from 'ionicons';
import { personOutline, mailOutline, shieldOutline, logOutOutline, logInOutline } from 'ionicons/icons';

@Component({
  selector: 'app-user-menu-popover',
  templateUrl: './user-menu-popover.component.html',
  styleUrls: ['./user-menu-popover.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class UserMenuPopoverComponent {
  @Input() userInfo: DecodedToken | null = null;
  @Input() isAuthenticated: boolean = false;
  
  currentTheme$: Observable<ThemeType>;

  constructor(
    private popoverController: PopoverController,
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) {
    this.currentTheme$ = this.themeService.currentTheme$;
    addIcons({ personOutline, mailOutline, shieldOutline, logOutOutline, logInOutline });
  }

  async logout() {
    // Close the popover first
    await this.popoverController.dismiss();
    
    // Then logout the user
    this.authService.logout();
  }

  async login() {
    // Close the popover first
    await this.popoverController.dismiss();
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }

  async closePopover() {
    await this.popoverController.dismiss();
  }
}
