import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonSegment, IonSegmentButton, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { languageOutline } from 'ionicons/icons';

interface ArticleCard {
  id: string;
  articleTitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  content?: string;
}

interface ArticleCategory {
  id: string;
  categoryTitle: string;
  cards: ArticleCard[];
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonSegmentButton, IonSegment, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, CommonModule],
})
export class ArticlesComponent implements OnInit {
  selectedLanguage: string = 'english';
   
  articleCategories: ArticleCategory[] = [
    {
      id: 'memorize-slokas',
      categoryTitle: 'How to Memorize Slokas',
      cards: [
        {
          id: 'bhagavad-gita',
          articleTitle: 'Bhagavad Gita',
          description: 'Tips and techniques to memorize Bhagavad Gita slokas',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1753315996/bhagavad_gita_sloka_f2eq9e.png',
          imageAlt: 'Bhagavad Gita Slokas',
          content: ``
        },
        {
          id: 'bhagavatam',
          articleTitle: 'Bhagavatam',
          description: 'Effective ways to remember Bhagavatam verses',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1753316350/bhagavatam-01_mogmef.jpg',
          imageAlt: 'Bhagavatam Slokas',
          content: ``
        },
        {
          id: 'other-slokas',
          articleTitle: 'Other Slokas',
          description: 'General methods for memorizing various slokas',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1753316150/devotee_children_recites_sloka_dcjlnc.png',
          imageAlt: 'Other Slokas',
          content: ``
        }
      ]
    },
    {
      id: 'baby-names',
      categoryTitle: 'Baby Names',
      cards: [
        {
          id: 'boy-baby-names',
          articleTitle: 'Boy Baby Names',
          description: 'Meaningful and spiritual names for baby boys',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936751/boy_baby_images_nudsxs.jpg',
          imageAlt: 'Boy Baby Names',
          content: ``
        },
        {
          id: 'girl-baby-names',
          articleTitle: 'Girl Baby Names',
          description: 'Beautiful and divine names for baby girls',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/girlbaby_vbvkdb.jpg',
          imageAlt: 'Girl Baby Names',
          content: ``
        }
      ]
    },
    {
      id: 'vaishnava-etiquettes',
      categoryTitle: 'Vaishnava Etiquettes',
      cards: [
        {
          id: 'etiquette-men',
          articleTitle: 'For Men',
          description: 'Spiritual guidelines and conduct for men',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936753/vaishnava_ettiquate_men_ftgqsq.jpg',
          imageAlt: 'Etiquette for Men',
          content: ``
        },
        {
          id: 'etiquette-women',
          articleTitle: 'For Women',
          description: 'Spiritual guidelines and conduct for women',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936753/vaishnava_ettiquate_women_e9tieb.jpg',
          imageAlt: 'Etiquette for Women',
          content: ``
        },
        {
          id: 'etiquette-husband-wife',
          articleTitle: 'Husband & Wife',
          description: 'Sacred relationship guidelines for couples',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/vaishnava_ettiquate_husband_wife_qa0qp4.jpg',
          imageAlt: 'Between Husband and Wife',
          content: ``
        },
        {
          id: 'etiquette-colleagues',
          articleTitle: 'Between Colleagues',
          description: 'Professional conduct with spiritual awareness',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/vaishnava_ettiquate_colleagues_vhze4i.jpg',
          imageAlt: 'Between Colleagues',
          content: ``
        }
      ]
    },
    {
      id: 'social-issues',
      categoryTitle: 'Social Issues Solutions',
      cards: [
        {
          id: 'social-national',
          articleTitle: 'National Solutions',
          description: 'Addressing national challenges with wisdom',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/social_issues_clkl4n.jpg',
          imageAlt: 'National Issues',
          content: ``
        },
        {
          id: 'social-local',
          articleTitle: 'Local Solutions',
          description: 'Community-based problem solving approaches',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/personal_issue_tw8fx4.jpg',
          imageAlt: 'Local Issues',
          content: ``
        },
        {
          id: 'social-international',
          articleTitle: 'International Solutions',
          description: 'Global perspectives on social harmony',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/social_issues_clkl4n.jpg',
          imageAlt: 'International Issues',
          content: ``
        }
      ]
    },
    {
      id: 'life-schedules',
      categoryTitle: 'Happy Life Schedule Formulas',
      cards: [
        {
          id: 'schedule-students',
          articleTitle: 'For Students',
          description: 'Balanced life schedules for academic success',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/devotee_student_mwfllt.jpg',
          imageAlt: 'For Students',
          content: ``
        },
        {
          id: 'schedule-workers',
          articleTitle: 'For Workers',
          description: 'Work-life balance with spiritual practice',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936753/workers_wbbkof.jpg',
          imageAlt: 'For Workers',
          content: ``
        },
        {
          id: 'schedule-business',
          articleTitle: 'For Business Men',
          description: 'Ethical business practices with success',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752937255/devotee_in_business_cxgec7.png',
          imageAlt: 'For Business Men',
          content: ``
        },
        {
          id: 'schedule-devotees',
          articleTitle: 'For Devotees',
          description: 'Spiritual life balance and daily practices',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/devotee_student_mwfllt.jpg',
          imageAlt: 'For Devotees',
          content: ``
        }
      ]
    },
    {
      id: 'harinam-kirtan',
      categoryTitle: 'Importance of Harinam Kirtan',
      cards: [
        {
          id: 'japa-meditation',
          articleTitle: 'Japa Meditation',
          description: 'The power of personal chanting practice',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936753/chanting_harekrishna_ukdwhd.jpg',
          imageAlt: 'Japa Meditation',
          content: ``
        },
        {
          id: 'music-kirtan',
          articleTitle: 'Music Kirtan',
          description: 'Community chanting and devotional music',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/hare_krishna_kirtan_cn4xvk.jpg',
          imageAlt: 'Music Kirtan',
          content: ``
        }
      ]
    },
    
  ];

  constructor(private router: Router) { 
    addIcons({ languageOutline });
  }
   
  ngOnInit() {
    // Initialize any needed data here
  }

  onLanguageChange(event: any) {
    this.selectedLanguage = event.detail.value;
    console.log('Language changed to:', this.selectedLanguage);
  }

  isEnglishSelected(): boolean {
    return this.selectedLanguage === 'english';
  }

  onCardClick(articleId: string) {
    console.log('Article card clicked:', articleId);
    // TODO: Navigate to specific article page or open article details
    // For now, we'll just log the article ID
    // Example: this.router.navigate(['/article-details', articleId]);
  }
}
