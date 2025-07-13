import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  musicalNotes, 
  musicalNote, 
  searchOutline, 
  libraryOutline, 
  play, 
  star, 
  headset 
} from 'ionicons/icons';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, CommonModule, IonButtons, IonMenuButton, FormsModule, IonContent, IonGrid, IonRow, IonCol, IonHeader, IonToolbar, IonTitle],
})
export class AudioComponent implements OnInit {
  @Input() topics: { topic: string; title: string }[] = []; // Input for dynamic data
  @Output() cardSelected = new EventEmitter<{ topic: string; title: string }>(); // Output for card selection

  constructor() {
    addIcons({
      musicalNotes,
      musicalNote,
      searchOutline,
      libraryOutline,
      play,
      star,
      headset
    });
  }

  ngOnInit() {}

  onCardClick(selectedTopic: { topic: string; title: string }) {
    this.cardSelected.emit(selectedTopic); // Emit the selected card data
  }
}
