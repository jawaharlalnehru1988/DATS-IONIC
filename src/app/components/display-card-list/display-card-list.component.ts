import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, add, chevronForward } from 'ionicons/icons';
import { CardItem, InputData } from 'src/app/Utils/models';



@Component({
  selector: 'app-display-card-list',
  templateUrl: './display-card-list.component.html',
  styleUrls: ['./display-card-list.component.scss'],
  standalone: true,
  imports: [CommonModule, NgFor, IonIcon]
})
export class DisplayCardListComponent {
  @Input() inputData!: InputData;
  @Output() cardSelected = new EventEmitter<CardItem>();
  @Output() seeAllClicked = new EventEmitter<InputData>();

  constructor() {
    addIcons({star,chevronForward,add});
  }

  // Getter to return sorted card items in ascending numerical order by category
  get sortedCardItems(): CardItem[] {
    if (!this.inputData?.cardItems) {
      return [];
    }
    
    return [...this.inputData.cardItems].sort((a, b) => {
      const categoryA = parseInt(a.category, 10);
      const categoryB = parseInt(b.category, 10);
      
      // Handle cases where category might not be a valid number
      if (isNaN(categoryA) && isNaN(categoryB)) {
        return a.category.localeCompare(b.category); // Fallback to string comparison
      }
      if (isNaN(categoryA)) return 1;
      if (isNaN(categoryB)) return -1;
      
      return categoryA - categoryB;
    });
  }

  onCardClick(item: CardItem) {
    this.cardSelected.emit(item);
  }

  onSeeAllClick() {
    this.seeAllClicked.emit(this.inputData);
  }
}
