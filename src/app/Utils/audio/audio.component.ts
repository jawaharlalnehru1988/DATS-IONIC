import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButtons, IonMenuButton, FormsModule, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonHeader, IonToolbar, IonTitle],
})
export class AudioComponent implements OnInit {
  @Input() topics: { topic: string; title: string }[] = []; // Input for dynamic data
  @Output() cardSelected = new EventEmitter<{ topic: string; title: string }>(); // Output for card selection

  constructor() {}

  ngOnInit() {}

  onCardClick(selectedTopic: { topic: string; title: string }) {
    this.cardSelected.emit(selectedTopic); // Emit the selected card data
  }
}
