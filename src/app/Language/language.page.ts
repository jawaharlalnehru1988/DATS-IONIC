import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonSelectOption, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonButton, IonIcon, IonToggle, IonFooter } from '@ionic/angular/standalone';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
  imports: [IonFooter, IonSelectOption, FormsModule, IonToggle, IonIcon, IonButton, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, ],
})
export class LanguagePage implements OnInit {
  public folder!: string;
   language = 'en';
  displayPanel = true;
  languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' }
  ];
  // private activatedRoute = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    // this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    // console.log('this.folder :', this.folder);
  }
}
