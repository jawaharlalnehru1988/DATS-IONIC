import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonAccordion, IonAccordionGroup } from '@ionic/angular/standalone';
import { IonLabel, IonList, IonItem, IonAvatar, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-srilaprabhupada',
  templateUrl: './srilaprabhupada.page.html',
  styleUrls: ['./srilaprabhupada.page.scss'],
  standalone: true,
  imports: [IonContent, IonList, IonItem, IonAvatar, IonLabel, IonHeader, IonTitle, IonToolbar, IonImg, IonAccordion, IonAccordionGroup, CommonModule, FormsModule, IonButtons, IonMenuButton],
})
export class InboxPage implements OnInit {
  articles = [
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
