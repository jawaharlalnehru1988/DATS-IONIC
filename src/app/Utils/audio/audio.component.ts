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
  @Input() languages: { native: string; lang: string }[] = []; // Input for dynamic data
  @Output() cardSelected = new EventEmitter<{ native: string; lang: string }>(); // Output for card selection

  constructor() {}

  ngOnInit() {}

  onCardClick(language: { native: string; lang: string }) {
    this.cardSelected.emit(language); // Emit the selected card data
  }
}
