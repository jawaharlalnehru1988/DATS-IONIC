import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButtons, IonButton, IonMenuButton, IonBadge, IonSegment, IonSegmentButton, IonLabel, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDownOutline, notificationsOutline, optionsOutline, home, heartOutline, cafeOutline, personOutline } from 'ionicons/icons';
import { DisplayCardListComponent, } from '../components/display-card-list/display-card-list.component';
import { CardItem, InputData } from '../Utils/models';
@Component({
  selector: 'app-krishna-page',
  templateUrl: './krishna-page.page.html',
  styleUrls: ['./krishna-page.page.scss'],
  standalone: true,
  imports: [IonFooter, NgFor, IonLabel, IonSegmentButton, IonMenuButton, IonSegment, IonBadge, IonButton, IonButtons, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, DisplayCardListComponent]
})
export class KrishnaPagePage  {
  languages = [
  { value: 'Tamil', label: 'Tamil' },
  { value: 'English', label: 'English' },
  { value: 'Hindi', label: 'Hindi' },
  { value: 'Telugu', label: 'Telugu' },
  { value: 'Malayalam', label: 'Malayalam' },
  { value: 'Kannada', label: 'Kannada' }
];


inputDatas: InputData[] = [
  {
    categoryName: "RamBhajan",
    cardItems: [
      {
        img: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751499819/birthkrishna_xmngov.jpg',
        title: 'Baal Krishna',
        category: "Chilhood Pastimes",
        desc: 'Abhisheka',
        audioData: { audioSrc: 'https://jawaharlalnehru1988.github.io/bgsloka/assets/tamilBgChapters/bgTamilChapter-2.mp3', imageSrc: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751499819/birthkrishna_xmngov.jpg', auther: 'Lord Krishna', title: 'bhagavad gita' },
        rating: '4.9',
        price: ' read'
      }
      
    ]
  }
];
  constructor() { 
    addIcons({home,heartOutline,cafeOutline,personOutline,chevronDownOutline,notificationsOutline,optionsOutline});
  }

onCardSelected(item: CardItem) {
  // handle card click
  console.log('Card selected:', item);
}

}
