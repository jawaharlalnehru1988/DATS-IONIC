import { Component, Input, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeType } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { LanguageService, LanguageTexts } from '../../services/language.service';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { JwtUtil, DecodedToken } from '../../Utils/jwt.util';
import { UserMenuPopoverComponent } from '../user-menu-popover/user-menu-popover.component';

@Component({
  selector: 'app-reusable-header',
  templateUrl: './reusable-header.component.html',
  styleUrls: ['./reusable-header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ReusableHeaderComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Welcome';
  @Input() titleKey?: keyof LanguageTexts; // New input for translation key
  @Input() showMenuButton: boolean = true;
  @Input() translucent: boolean = true;
  @Input() showPersonIcon: boolean = true;
  @Input() onPersonIconClick?: () => void;

  currentTheme$: Observable<ThemeType>;
  userInitials$: Observable<string>;
  isAuthenticated$: Observable<boolean>;
  userInfo$: Observable<DecodedToken | null>;
  texts$: Observable<LanguageTexts>;
  dynamicTitle$: Observable<string>;
  private subscriptions = new Subscription();

  @HostBinding('class') get themeClass() {
    return this.currentTheme;
  }

  private currentTheme: ThemeType = 'theme-ocean';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private languageService: LanguageService,
    private popoverController: PopoverController
  ) {
    this.currentTheme$ = this.themeService.currentTheme$;
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.texts$ = this.languageService.texts$;
    
    // Create dynamic title observable that uses either translation key or fallback title
    this.dynamicTitle$ = this.texts$.pipe(
      map(texts => {
        if (this.titleKey && texts[this.titleKey]) {
          return texts[this.titleKey];
        }
        return this.title;
      })
    );
    
    // Create observable for user initials
    this.userInitials$ = combineLatest([
      this.authService.isAuthenticated$,
      this.authService.currentUser$
    ]).pipe(
      map(([isAuthenticated, user]) => {
        if (!isAuthenticated) return '';
        
        // Try to get initials from stored user data first
        if (user && user.name) {
          return JwtUtil.getUserInitials(user.name);
        }
        
        // Fallback: decode token if user data is not available
        const token = this.authService.getToken();
        if (token) {
          // First try to get name from cookie (faster)
          const nameFromCookie = this.authService.getUserNameFromCookie();
          if (nameFromCookie) {
            return JwtUtil.getUserInitials(nameFromCookie);
          }
          
          // If cookie not available, decode token
          const decodedToken = JwtUtil.decodeToken(token);
          if (decodedToken && decodedToken.name) {
            return JwtUtil.getUserInitials(decodedToken.name);
          }
        }
        
        return '';
      })
    );
    
    // Create observable for user info
    this.userInfo$ = combineLatest([
      this.authService.isAuthenticated$,
      this.authService.currentUser$
    ]).pipe(
      map(([isAuthenticated, user]) => {
        if (!isAuthenticated) return null;
        
        // Try to get info from stored user data first
        if (user && user.name) {
          return {
            name: user.name,
            email: user.email,
            sub: user._id || '',
            role: user.role
          } as DecodedToken;
        }
        
        // Fallback: decode token if user data is not available
        const token = this.authService.getToken();
        if (token) {
          return JwtUtil.decodeToken(token);
        }
        
        return null;
      })
    );
    
    addIcons({ personCircleOutline });
  }

  ngOnInit() {
    this.subscriptions.add(
      this.currentTheme$.subscribe(theme => {
        this.currentTheme = theme;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  async onPersonIconClicked(event: Event) {
    // If user provided a custom click handler, call it
    if (this.onPersonIconClick) {
      this.onPersonIconClick();
      return;
    }

    // Get current authentication state and user info
    const isAuthenticated = this.authService.isAuthenticated();
    let userInfo = null;

    if (isAuthenticated) {
      userInfo = await this.userInfo$.pipe(first()).toPromise();
    }

    // Create and present the popover (for both authenticated and guest users)
    const popover = await this.popoverController.create({
      component: UserMenuPopoverComponent,
      componentProps: {
        userInfo: userInfo,
        isAuthenticated: isAuthenticated
      },
      event: event,
      translucent: true,
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: 'user-menu-popover-class'
    });

    await popover.present();
  }
}
