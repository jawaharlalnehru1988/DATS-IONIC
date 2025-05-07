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
    { native: 'தமிழ்', lang: 'Tamil' },
    { native: 'English', lang: 'English' },
    { native: 'ಕನ್ನಡ', lang: 'Kannada' },
    { native: 'हिंदी', lang: 'Hindi' },
  ];
  isShowGrid: boolean = true; // Flag to control grid visibility

  languageList: Language[] = [ ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onCardClick(language: { native: string; lang: string }) {
    switch (language.lang) {
      case 'Tamil':
        this.router.navigate(['/music-details']);
        this.languageList = [
          { native: 'பகவத் கீதை', lang: 'சமஸ்கிருத ஸ்லோகம் தமிழ் மொழிபெயர்ப்புடன்' },
          { native: 'ஸ்ரீமத் பாகவதம்', lang: 'தமிழ் உபன்யாசம்' },
          { native: 'இராமாயணம்', lang: 'வால்மீகி இராமாயணம்' },
          { native: 'சைதன்ய சரிதாமிருதம்', lang: 'விரிவான விளக்கம்' },
        ];
        break;
      case 'English':
        this.languageList = [
          { native: 'Bhagavad Gita', lang: 'Sanskrit Sloka with Tamil Translation' },
          { native: 'Srimad Bhagavatam', lang: 'English Lecture' },
          { native: 'Ramayanam', lang: 'Valmiki Ramayanam' },
          { native: 'Caithanya Charitamritam', lang: 'Elaborate Explanation' },
        ]
        break;
      case 'Kannada':
        this.languageList = [
          { native: 'ಭಗವದ್ಗೀತೆ', lang: 'ಸಂಸ್ಕೃತ ಶ್ಲೋಕ ಕನ್ನಡ ಅನುವಾದದೊಂದಿಗೆ' },
          { native: 'ಶ್ರೀಮದ್ಭಾಗವತ', lang: 'ಕನ್ನಡ ಉಪನ್ಯಾಸ' },
          { native: 'ರಾಮಾಯಣ', lang: 'ವಾಲ್ಮೀಕಿ ರಾಮಾಯಣ' },
          { native: 'ಚೈತನ್ಯ ಚರಿತಾಮೃತ', lang: 'ವಿಸ್ತೃತ ವಿವರಣೆ' },
        ];
        break;
      case 'Hindi':
        this.languageList = [
          { native: 'भगवद गीता', lang: 'संस्कृत श्लोक हिंदी अनुवाद के साथ' },
          { native: 'श्रीमद भागवतम', lang: 'हिंदी प्रवचन' },
          { native: 'रामायण', lang: 'वाल्मीकि रामायण' },
          { native: 'चैतन्य चरितामृत', lang: 'विस्तृत व्याख्या' },
        ];
        break;
      default:
        console.log('Unknown language selected');
    }
  }

  onLanguageSelected(language: { native: string; lang: string }) {
    console.log('Selected Language:', language);
  }

}
