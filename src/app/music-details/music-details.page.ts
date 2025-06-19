import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AudioComponent } from '../Utils/audio/audio.component';

@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.page.html',
  styleUrls: ['./music-details.page.scss'],
  standalone: true,
  imports: [AudioComponent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MusicDetailsPage implements OnInit {
topics = []
  constructor() { }

  ngOnInit() {
  }

  onCardClick(language: any) {
    console.log(`Card clicked: ${language}`);
  }

}
