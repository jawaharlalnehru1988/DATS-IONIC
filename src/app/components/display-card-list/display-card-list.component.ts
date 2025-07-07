import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { IonGrid, IonRow, IonCol, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, add } from 'ionicons/icons';
import { AudioItem, CardItem, InputData } from 'src/app/Utils/models';



@Component({
  selector: 'app-display-card-list',
  templateUrl: './display-card-list.component.html',
  styleUrls: ['./display-card-list.component.scss'],
  standalone: true,
  imports: [CommonModule, NgFor, IonGrid, IonRow, IonCol, IonIcon, IonButton]
})
export class DisplayCardListComponent {
  @Input() inputData!: InputData;
  @Output() cardSelected = new EventEmitter<CardItem>();

  constructor() {
    addIcons({ star, add });
  }

  onCardClick(item: CardItem) {
    this.cardSelected.emit(item);
  }
}
