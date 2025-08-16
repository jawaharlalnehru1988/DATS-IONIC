import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

import { IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton]
})
export class StarRatingComponent implements OnInit, OnChanges {
  @Input() rating: number = 0;
  @Input() maxStars: number = 5;
  @Input() readonly: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Output() ratingChange = new EventEmitter<number>();

  stars: boolean[] = [];
  hoveredRating: number = 0;

  constructor() {
    addIcons({ star, starOutline });
  }

  ngOnInit() {
    this.updateStars();
  }

  ngOnChanges() {
    this.updateStars();
  }

  private updateStars() {
    this.stars = Array(this.maxStars).fill(false).map((_, index) => index < this.rating);
  }

  onStarClick(index: number) {
    if (this.readonly) return;
    
    const newRating = index + 1;
    this.rating = newRating;
    this.updateStars();
    this.ratingChange.emit(newRating);
  }

  onStarHover(index: number) {
    if (this.readonly) return;
    this.hoveredRating = index + 1;
  }

  onMouseLeave() {
    this.hoveredRating = 0;
  }

  isStarFilled(index: number): boolean {
    if (this.hoveredRating > 0) {
      return index < this.hoveredRating;
    }
    return this.stars[index];
  }

  getSizeClass(): string {
    return `star-rating-${this.size}`;
  }
}
