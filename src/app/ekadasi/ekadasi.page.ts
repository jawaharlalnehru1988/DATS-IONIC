import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ekadasi',
  templateUrl: './ekadasi.page.html',
  styleUrls: ['./ekadasi.page.scss'],
  standalone: true,
  imports: [IonButtons,IonMenuButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EkadasiPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
