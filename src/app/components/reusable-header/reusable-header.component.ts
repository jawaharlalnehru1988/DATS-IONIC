import { Component, Input, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeType } from '../../services/theme.service';
import { Observable, Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-reusable-header',
  templateUrl: './reusable-header.component.html',
  styleUrls: ['./reusable-header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ReusableHeaderComponent implements OnInit, OnDestroy {
  @Input() title: string = 'Welcome';
  @Input() showMenuButton: boolean = true;
  @Input() translucent: boolean = true;
  @Input() showPersonIcon: boolean = true;

  currentTheme$: Observable<ThemeType>;
  private themeSubscription: Subscription = new Subscription();

  @HostBinding('class') get themeClass() {
    return this.currentTheme;
  }

  private currentTheme: ThemeType = 'theme-ocean';

  constructor(private themeService: ThemeService) {
    this.currentTheme$ = this.themeService.currentTheme$;
    addIcons({ personCircleOutline });
  }

  ngOnInit() {
    this.themeSubscription = this.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
