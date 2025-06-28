import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonHeader, IonTitle, IonMenuButton, IonToolbar, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButtons } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MusicDetailsService } from './music-details.service';
import { DetailModel } from './music.model';

@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.page.html',
  styleUrls: ['./music-details.page.scss'],
  standalone: true,
  imports: [IonButtons, IonMenuButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonAccordion, IonAccordionGroup, IonItem, IonLabel]
})
export class MusicDetailsPage implements OnInit {
  topics:{ title: string; content: string; } = { title: '', content: '' };
  msDatas: DetailModel[] = [];
  constructor(private route: ActivatedRoute, private mdService: MusicDetailsService) { }
  language:string | null = '';

  ngOnInit() {
    this.getRoutingDetails();
    this.mdService.getAll41Slokas().subscribe({
      next:(res:DetailModel[])=>{
      this.msDatas = res;
      console.log('this.msDatas :', this.msDatas);
      },
      error:()=>{
        console.log("there is something wrong with the network");

        
      }
    })
  }

  getRoutingDetails(){
this.route.paramMap.subscribe(params => {
    this.language = params.get('language');
    console.log('this.language :', this.language);
    switch (this.language) {
      case 'Tamil':
        this.topics =  { title: 'ஸ்ரீமத் பகவத் கீதை', content: 'தமிழில் கேட்டு மகிழுங்கள்' };
          break;
      case '41sloka':
        this.topics =  { title: '35 ஸ்ரீமத் பகவத் கீதை ஸ்லோகங்கள்', content: '35 ஸ்லோகங்கள் தமிழில் கேட்டு மனனம் செய்யுங்கள்' };
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
