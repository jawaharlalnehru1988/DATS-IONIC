import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { TutorialService } from './tutorial.service';
import { addIcons } from 'ionicons';
import { playCircle, arrowForward } from 'ionicons/icons';
import { ThemeService, ThemeType } from '../services/theme.service';
import { Subscription } from 'rxjs';
import { ReusableHeaderComponent } from '../components';
import { SegmentedTabsComponent } from "../components/segmented-tabs/segmented-tabs.component";
 
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
  imports: [IonIcon, ReusableHeaderComponent, IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, SegmentedTabsComponent]
})
export class TutorialPage implements OnInit, OnDestroy {
   isLoading = true;
   
  contentCategories = [
    { value: 'ebooks', label: 'E-Books' },
    { value: 'pdf', label: 'PDFs' }
  ];

  selectedTopic: string = 'ebooks';
  // Theme management
  currentTheme: ThemeType = 'theme-royal';
  private themeSubscription: Subscription = new Subscription();
  
  // HostBinding to apply theme class to the component's host element
  @HostBinding('class')
  get themeClass() {
    return this.currentTheme;
  }
   
  cards: CardModel[] = [
    {
      blogId: 1,
      image: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751940289/tulasiArati_oh7aui.jpg',
      title: 'பூஜை விதிகள்',
      subtitle: 'பூஜை செய்யும் போது சொல்ல வேண்டிய மந்திரங்கள்',
      content: "ஹரே கிருஷ்ணா மந்திரத்தை பின்தொடர்ந்து பகவான் ஸ்ரீ கிருஷ்ணரை பூஜை செய்யும் பொழுது பல்வேறு விதமான மந்திரங்கள் சொல்வது மிகவும் அடிப்படையான விஷயம்.  பகவான் ஸ்ரீ கிருஷ்ணரும் மிகவும் ஆனந்தப்படுவார்.  பகவான் ஸ்ரீ கிருஷ்ணரின் எழுப்புவதில் இருந்து அவரை ஸ்நானம் செய்தல்,  அவருக்கு ஆடை அணிவித்தல்,  அவருக்கு விளக்கு ஏற்றுதல்,  ஆரத்தி காட்டுதல்,  நைவேத்தியம் செய்தல் போன்ற பல்வேறு விதமான சேவைகளின் போது இந்த மந்திரங்களை  அதன் அர்த்தத்தோடு உள் உணர்வுடன் சொன்னால் பகவான் ஸ்ரீ கிருஷ்ணர் மிகவும் ஆனந்த படுவார்."
    },
    
  ];

  constructor(private router: Router, private tutorialService: TutorialService, private themeService: ThemeService) {
    addIcons({ playCircle, arrowForward });
  }

  ngOnInit() {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(
      theme => this.currentTheme = theme
    );
  }

  ngOnDestroy() {
    // Unsubscribe from theme changes
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  showFullContent(card: CardModel) {
    this.router.navigate(['/tutorial-details', card.blogId]);

  }

}
