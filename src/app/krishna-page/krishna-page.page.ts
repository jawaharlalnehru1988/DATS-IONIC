import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButtons, IonButton, IonMenuButton, IonBadge, IonSegment, IonSegmentButton, IonLabel, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronDownOutline, notificationsOutline, optionsOutline, home, heartOutline, cafeOutline, personOutline } from 'ionicons/icons';
import { DisplayCardListComponent, } from '../components/display-card-list/display-card-list.component';
import { CardItem, InputData } from '../Utils/models';
import { KrishnaServiceService } from './krishna-service.service';
import { Router } from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';
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


inputDatas: InputData[] = [];

  constructor(private krishnaService: KrishnaServiceService, private router: Router, private dataSharingService: DataSharingService) { 
    addIcons({home,heartOutline,cafeOutline,personOutline,chevronDownOutline,notificationsOutline,optionsOutline});
  }

onCardSelected(item: CardItem) {
  this.dataSharingService.setSelectedCardItem(item);
  this.router.navigate(['/card-details']);
}

ngOnInit() {
  this.krishnaService.getKrishnaData().subscribe({
    next: (data:InputData[]) => {
      this.inputDatas = data;
    },
    error: (error) => {
      console.error('Error fetching Krishna data:', error);
    }
  })
}

}
