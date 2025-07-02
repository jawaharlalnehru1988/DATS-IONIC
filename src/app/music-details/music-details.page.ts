import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  IonHeader, IonTitle, IonSpinner, IonMenuButton, IonToolbar, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButtons } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MusicDetailsService } from './music-details.service';
import { DetailModel, ISlokaChapters } from './music.model';
import { map } from 'rxjs';


@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.page.html',
  styleUrls: ['./music-details.page.scss'],
  standalone: true,
  imports: [IonButtons, IonSpinner, IonMenuButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonAccordion, IonAccordionGroup, IonItem, IonLabel]
})
export class MusicDetailsPage implements OnInit {
  topics:{ title: string; content: string; } = { title: '', content: '' };
  msDatas: DetailModel[] = [];
    isLoading = true;
  constructor(private route: ActivatedRoute, private mdService: MusicDetailsService) { }
  language:string | null = '';
  tamilChapters:ISlokaChapters[] = []

  ngOnInit() {
    this.getRoutingDetails();
    this.getImportantSlokas();
    this.getAllSlokas();
  }

  getAllSlokas(){
    this.mdService.getAllSlokaChapters().subscribe({
      next:(res:ISlokaChapters[])=>{
        this.tamilChapters = res;
      }, 
      error: (err)=>{
        console.error(err);
      }
    })
  }
  
  getImportantSlokas(){
    this.mdService.getAll41Slokas().pipe(
    map(arr => arr.sort((a, b) => (a.orderNo) - (b.orderNo)))
  ).subscribe({
      next:(res:DetailModel[])=>{
      this.msDatas = res;
       this.isLoading = false;
      },
      error:()=>{
        this.isLoading = false;
        console.error("there is something wrong with the network");
      }
    });
  }

  getRoutingDetails(){
this.route.paramMap.subscribe(params => {
    this.language = params.get('language');
    switch (this.language) {
      case 'Tamil':
        this.topics =  { title: 'ஸ்ரீமத் பகவத் கீதை', content: 'தமிழில் கேட்டு மகிழுங்கள்' };
          break;
      case 'sloka 35':
        this.topics =  { title: '35 ஸ்ரீமத் பகவத் கீதை ஸ்லோகங்கள்', content: 'தமிழில் கேட்டு மனனம் செய்யுங்கள்' };
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
