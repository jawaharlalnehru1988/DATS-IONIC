import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.page.html',
  styleUrls: ['./archived.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton]
})
export class ArchivedPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
