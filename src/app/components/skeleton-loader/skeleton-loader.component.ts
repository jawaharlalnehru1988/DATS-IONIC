import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

/**
 * Reusable Skeleton Loader Component
 * 
 * Usage Examples:
 * 
 * 1. Cards Layout (Grid):
 * <app-skeleton-loader [config]="{type: 'cards', itemCount: 5, showCategoryTitle: true, cardLayout: 'grid'}"></app-skeleton-loader>
 * 
 * 2. Cards Layout (Horizontal):
 * <app-skeleton-loader [config]="{type: 'cards', itemCount: 3, cardLayout: 'horizontal'}"></app-skeleton-loader>
 * 
 * 3. Hero + Cards Layout (for pages with hero sections):
 * <app-skeleton-loader [config]="{type: 'hero-cards', itemCount: 4, showCategoryTitle: true, showHeroSection: true, showAddButton: true}"></app-skeleton-loader>
 * 
 * 4. List Layout:
 * <app-skeleton-loader [config]="{type: 'list', itemCount: 8, showCategoryTitle: true}"></app-skeleton-loader>
 * 
 * 5. Article Layout:
 * <app-skeleton-loader [config]="{type: 'article', showCategoryTitle: false}"></app-skeleton-loader>
 * 
 * 6. Custom Layout:
 * <app-skeleton-loader [config]="{
 *   type: 'custom', 
 *   customItems: [
 *     {width: '100%', height: '200px', borderRadius: '12px'},
 *     {width: '80%', height: '20px', marginTop: '16px'},
 *     {width: '60%', height: '16px', marginTop: '8px'}
 *   ]
 * }"></app-skeleton-loader>
 */

export interface SkeletonConfig {
  type: 'cards' | 'list' | 'article' | 'hero-cards' | 'custom';
  itemCount?: number;
  showCategoryTitle?: boolean;
  cardLayout?: 'grid' | 'horizontal' | 'vertical';
  customItems?: SkeletonItem[];
  showHeroSection?: boolean;
  showAddButton?: boolean;
}

export interface SkeletonItem {
  width: string;
  height: string;
  borderRadius?: string;
  marginTop?: string;
  marginBottom?: string;
}

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SkeletonLoaderComponent {
  @Input() config: SkeletonConfig = {
    type: 'cards',
    itemCount: 5,
    showCategoryTitle: true,
    cardLayout: 'grid'
  };

  get skeletonItems(): number[] {
    return Array.from({ length: this.config.itemCount || 5 }, (_, i) => i + 1);
  }

  get cardItems(): number[] {
    return Array.from({ length: 3 }, (_, i) => i + 1);
  }
}
