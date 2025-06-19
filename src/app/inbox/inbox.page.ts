import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons } from '@ionic/angular/standalone';
import { IonGrid, IonRow, IonCol, IonButton, IonLabel, IonIcon, IonList, IonItem, IonAvatar, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
  standalone: true,
  imports: [IonContent, IonList, IonItem, IonAvatar, IonLabel, IonHeader, IonTitle, IonToolbar, IonImg, CommonModule, FormsModule, IonButtons, IonMenuButton],
})
export class InboxPage implements OnInit {
  notifications = [
    {
      avatar: "./assets/prabhupada.png",
      title: 'Biography of Srila Prabhupada',
      message: 'Who is Srila Prabhupada? Learn more about his life and his contributions to the world and your life.',
      alt: 'Srila Prabhupada',
    },
    {
      avatar: './assets/splookingup.jpg',
      title: 'Important Instructions of Srila Prabhupada',
      message: 'Follow the teachings of Srila Prabhupada to lead a life to attract Lord Krishna towards you.',
      alt: 'Srila Prabhupada',
    },
    {
      avatar: './assets/prabhupada-namaskar.png',
      title: 'Vishwa Guru Srila Prabhupada',
      message: 'How Srila Prabhupada is our eternal spritual master and guide.',
    alt: 'Srila Prabhupada',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
