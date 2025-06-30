import { Component, OnInit } from '@angular/core';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel,  IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons } from '@ionic/angular/standalone';
import { BabyName } from './babyName';
import { NgFor } from '@angular/common';



@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  imports: [IonAccordion, NgFor, IonAccordionGroup, IonItem, IonLabel,  IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons],
})
export class ArticlesComponent  implements OnInit {
   babyNames = new BabyName(); 
   babyNamesList: any;
   
   constructor() { }
   
   ngOnInit() {
     this.babyNamesList = [this.babyNames][0].babyNames;
  }

}
