import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioComponent } from '../Utils/audio/audio.component';
import { Language } from '../Utils/models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
  standalone: true,
  imports: [AudioComponent, CommonModule, FormsModule],
})
export class MusicPage implements OnInit {
  languages = [
    { topic: 'ஸ்ரீமத் பகவத் கீதை', title: 'Tamil' },
    { topic: 'ஸ்ரீமத் பகவத் கீதை', title: '41sloka' },
    { topic: 'Srimad Bhagavat Gita', title: 'English' },
    { topic: 'ಶ್ರೀಮದ್ ಭಗವದ್ಗೀತಾ', title: 'Kannada' },
    { topic: 'श्रीमद्भगवद गीता', title: 'Hindi' },
  ];
  isShowGrid: boolean = true; // Flag to control grid visibility

  languageList: Language[] = [ ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onCardClick(language: { topic: string; title: string }) {
    if (['Tamil', 'English', 'Kannada', 'Hindi', '41sloka'].includes(language.title)) {
      this.router.navigate(['/music-details', language.title]);
    } else {
      console.log('Unknown language selected');
    }
  }

  onLanguageSelected(language: { native: string; lang: string }) {
    console.log('Selected Language:', language);
  }

}
