import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, HostBinding } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/angular/standalone';
import { ThemeService, ThemeType } from '../../services/theme.service';
import { Subscription } from 'rxjs';

export interface TabItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-segmented-tabs',
  templateUrl: './segmented-tabs.component.html',
  styleUrls: ['./segmented-tabs.component.scss'],
  standalone: true,
  imports: [FormsModule, IonSegment, IonSegmentButton, IonLabel]
})
export class SegmentedTabsComponent implements OnInit, OnDestroy {
  @Input() tabs: TabItem[] = [];
  @Input() selectedTab: string = '';
  @Input() containerClass: string = 'tabs-container';
  
  @Output() tabChanged = new EventEmitter<string>();

  // Theme management
  currentTheme: ThemeType = 'theme-royal';
  private themeSubscription: Subscription = new Subscription();

  // HostBinding to apply theme class to the component's host element
  @HostBinding('class')
  get themeClass() {
    return this.currentTheme;
  }

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    // If no tab is selected and we have tabs, select the first one
    if (!this.selectedTab && this.tabs.length > 0) {
      this.selectedTab = this.tabs[0].value;
    }

    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  onTabChange(event: any) {
    this.selectedTab = event.detail.value;
    this.tabChanged.emit(this.selectedTab);
  }

  ngOnDestroy() {
    // Clean up subscriptions
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
