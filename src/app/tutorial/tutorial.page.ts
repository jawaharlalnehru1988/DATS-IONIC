import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
 
export interface CardModel{
  blogId: number;
  image: string;
  title: string;
  subtitle: string;
  content: string;
}

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
  standalone: true,
  imports: [IonCard,  IonCardHeader, IonCardSubtitle, IonCardTitle, IonButtons, IonContent, IonButtons, IonMenuButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TutorialPage implements OnInit {
  cards: CardModel[] = [
    {
      blogId: 1,
      image: '../../assets/worshipkrishna.png',
      title: 'பூஜை விதிகள்',
      subtitle: 'பூஜை செய்யும் போது சொல்ல வேண்டிய மந்திரங்கள்',
      content: "ஹரே கிருஷ்ணா மந்திரத்தை பின்தொடர்ந்து பகவான் ஸ்ரீ கிருஷ்ணரை பூஜை செய்யும் பொழுது பல்வேறு விதமான மந்திரங்கள் சொல்வது மிகவும் அடிப்படையான விஷயம்.  பகவான் ஸ்ரீ கிருஷ்ணரும் மிகவும் ஆனந்தப்படுவார்.  பகவான் ஸ்ரீ கிருஷ்ணரின் எழுப்புவதில் இருந்து அவரை ஸ்நானம் செய்தல்,  அவருக்கு ஆடை அணிவித்தல்,  அவருக்கு விளக்கு ஏற்றுதல்,  ஆரத்தி காட்டுதல்,  நைவேத்தியம் செய்தல் போன்ற பல்வேறு விதமான சேவைகளின் போது இந்த மந்திரங்களை  அதன் அர்த்தத்தோடு உள் உணர்வுடன் சொன்னால் பகவான் ஸ்ரீ கிருஷ்ணர் மிகவும் ஆனந்த படுவார்."
    },
    {
      blogId: 2,
      image: '../../assets/prabhupada.png',
      title: 'ஸ்ரீல பிரபுபாதாவின் வாழ்க்கை',
      subtitle: 'ஸ்ரீல பிரபுபாதாவின் வாழ்க்கை வரலாறு மற்றும் பங்களிப்பு',
      content: "ஸ்ரீல பிரபுபாதா உலகம் முழுவதும் பக்தி யோகத்தை பரப்பியவர். அவரது வாழ்க்கை, அர்ப்பணிப்பு மற்றும் உலகிற்கு அளித்த ஆன்மீக அறிவு பற்றி அறிந்து கொள்ளுங்கள்."
    },
    {
      blogId: 3,
      image: '../../assets/splookingup.jpg',
      title: 'பக்தி யோகத்தின் முக்கியத்துவம்',
      subtitle: 'பக்தி யோகத்தின் அடிப்படை கருத்துகள்',
      content: "பக்தி யோகம் என்பது பகவானுடன் ஆன்மீக உறவை வளர்க்கும் ஒரு பாதை. இதன் மூலம் மனம் அமைதி பெறும், வாழ்க்கை அர்த்தமுள்ளதாகும்."
    },
    {
      blogId: 4,
      image: '../../assets/krishna.jpg',
      title: 'கிருஷ்ணர் மீது பக்தி',
      subtitle: 'கிருஷ்ண பக்தியின் வழிகள்',
      content: "கிருஷ்ணரை நினைத்து, அவரது பெயரை ஜபம் செய்து, அவரை பூஜித்து, பக்தி பாட்டுகளை பாடி, பக்தி வாழ்க்கையை முன்னெடுக்கலாம்."
    },
    {
      blogId: 5,
      image: '../../assets/prabhupada-namaskar.png',
      title: 'ஆராதனை முறைகள்',
      subtitle: 'வீட்டில் செய்யக்கூடிய ஆராதனை முறைகள்',
      content: "தினசரி பூஜை, தீபம் ஏற்றுதல், நைவேத்யம், ஆரத்தி, மற்றும் மந்திர ஜபம் ஆகியவை வீட்டில் செய்யக்கூடிய ஆராதனை முறைகள்."
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  showFullContent(card: CardModel) {
    this.router.navigate(['/tutorial-details', card.blogId]);

  }

}
