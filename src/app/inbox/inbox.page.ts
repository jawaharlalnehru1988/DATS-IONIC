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
  imports: [IonContent, IonList, IonItem, IonAvatar, IonLabel, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton],
})
export class InboxPage implements OnInit {
  notifications = [
    {
      avatar: 'assets/avatar1.png',
      title: 'New Message from John',
      message: 'Hey, are you available for a meeting tomorrow?',
      time: '10:30 AM',
    },
    {
      avatar: 'assets/avatar2.png',
      title: 'Promotion Alert',
      message: 'Get 50% off on your next purchase!',
      time: '9:15 AM',
    },
    {
      avatar: 'assets/avatar3.png',
      title: 'System Update',
      message: 'Your system will be updated tonight at 2:00 AM.',
      time: 'Yesterday',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
