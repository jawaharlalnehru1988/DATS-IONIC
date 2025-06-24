import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonHeader, IonTitle, IonToolbar, IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.page.html',
  styleUrls: ['./music-details.page.scss'],
  standalone: true,
  imports: [IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonAccordion, IonAccordionGroup, IonItem, IonLabel]
})
export class MusicDetailsPage implements OnInit {
  topics:{ title: string; content: string; } = { title: '', content: '' };
  constructor(private route: ActivatedRoute) { }
  language:string | null = '';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
    this.language = params.get('language');
    switch (this.language) {
      case 'Tamil':
        this.topics =  { title: 'ஸ்ரீமத் பகவத் கீதை', content: 'தமிழில் கேட்டு மகிழுங்கள்' };
          break;
      case 'English':
        this.topics = 
          { title: 'Srimad Bhagavad Gita', content: 'Enjoy by hearing in English' };
     
        break;
      case 'Kannada':
        this.topics = { title: 'ಶ್ರೀಮದ್ ಭಗವದ್ಗೀತಾ', content: 'ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ ಆನಂದಿಸಿ' }

        break;
      case 'Hindi':
        this.topics = { title: 'श्रीमद्भगवद गीता', content: 'हिन्दी में सुनकर आनंद लें' };
        break;
      default:
        this.topics = { title: 'Unknown Language', content: 'Content not available' };
        break;
    }
     
    });
  }

  onCardClick(language: any) {
    console.log(`Card clicked: ${language}`);
  }

}
