import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButtons, IonButton, IonMenuButton, IonBadge, IonSegment, IonSegmentButton, IonLabel, IonGrid, IonRow, IonCol, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDownOutline, notificationsOutline, optionsOutline, star, add, home, heartOutline, cafeOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-krishna-page',
  templateUrl: './krishna-page.page.html',
  styleUrls: ['./krishna-page.page.scss'],
  standalone: true,
  imports: [IonFooter, IonCol, IonRow, IonGrid, IonLabel, IonSegmentButton, IonMenuButton, IonSegment, IonBadge, IonButton, IonButtons, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class KrishnaPagePage implements OnInit {
  languages = [
  { value: 'Tamil', label: 'Tamil' },
  { value: 'English', label: 'English' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Kannada', label: 'Kannada' }
];

 krishnaItems = [
    {
      img: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751499819/birthkrishna_xmngov.jpg', // Lord Krishna child image
      title: 'Baal Krishna',
      category: "Chilhood Pastimes",
      desc: 'Abhisheka',
      rating: '4.9',
      price: ' read'
    },
    {
      img: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751499820/carrykrishna_uhy8eg.jpg',
      title: 'Vasudeva Krishna',
      category: "Chilhood Pastimes",
      desc: 'Vasudev Carries',
      rating: '4.8',
      price: ' read'
    },
    {
      img: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751499813/mangokrishna_zgpndj.jpg',
      title: 'Exchange for Love',
      category: "Chilhood Pastimes",
      desc: 'Lord Krishna',
      rating: '4.7',
      price: ' read'
    },
    {
      img: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751499809/flutekrishna_p3jpyh.jpg',
      title: 'Gopal Krishna',
      category: "Chilhood Pastimes",
      desc: 'Protector of cows',
      rating: '4.9',
      price: ' read'
    }
  ];
  constructor() { 
    addIcons({star,add,home,heartOutline,cafeOutline,personOutline,chevronDownOutline,notificationsOutline,optionsOutline});
  }

  ngOnInit() {
  }

}
