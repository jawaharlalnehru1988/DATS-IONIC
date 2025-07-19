import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

interface ArticleCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

interface ArticleCategory {
  id: string;
  title: string;
  cards: ArticleCard[];
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, CommonModule],
})
export class ArticlesComponent implements OnInit {
   
  articleCategories: ArticleCategory[] = [
    {
      id: 'baby-names',
      title: 'Baby Names',
      cards: [
        {
          id: 'boy-baby-names',
          title: 'Boy Baby Names',
          description: 'Meaningful and spiritual names for baby boys',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936751/boy_baby_images_nudsxs.jpg',
          imageAlt: 'Boy Baby Names'
        },
        {
          id: 'girl-baby-names',
          title: 'Girl Baby Names',
          description: 'Beautiful and divine names for baby girls',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/girlbaby_vbvkdb.jpg',
          imageAlt: 'Girl Baby Names'
        }
      ]
    },
    {
      id: 'vaishnava-etiquettes',
      title: 'Vaishnava Etiquettes',
      cards: [
        {
          id: 'etiquette-men',
          title: 'For Men',
          description: 'Spiritual guidelines and conduct for men',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936753/vaishnava_ettiquate_men_ftgqsq.jpg',
          imageAlt: 'Etiquette for Men'
        },
        {
          id: 'etiquette-women',
          title: 'For Women',
          description: 'Spiritual guidelines and conduct for women',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936753/vaishnava_ettiquate_women_e9tieb.jpg',
          imageAlt: 'Etiquette for Women'
        },
        {
          id: 'etiquette-husband-wife',
          title: 'Husband & Wife',
          description: 'Sacred relationship guidelines for couples',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/vaishnava_ettiquate_husband_wife_qa0qp4.jpg',
          imageAlt: 'Between Husband and Wife'
        },
        {
          id: 'etiquette-colleagues',
          title: 'Between Colleagues',
          description: 'Professional conduct with spiritual awareness',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/vaishnava_ettiquate_colleagues_vhze4i.jpg',
          imageAlt: 'Between Colleagues'
        }
      ]
    },
    {
      id: 'social-issues',
      title: 'Social Issues Solutions',
      cards: [
        {
          id: 'social-national',
          title: 'National Solutions',
          description: 'Addressing national challenges with wisdom',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/social_issues_clkl4n.jpg',
          imageAlt: 'National Issues'
        },
        {
          id: 'social-local',
          title: 'Local Solutions',
          description: 'Community-based problem solving approaches',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/personal_issue_tw8fx4.jpg',
          imageAlt: 'Local Issues'
        },
        {
          id: 'social-international',
          title: 'International Solutions',
          description: 'Global perspectives on social harmony',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/social_issues_clkl4n.jpg',
          imageAlt: 'International Issues'
        }
      ]
    },
    {
      id: 'life-schedules',
      title: 'Happy Life Schedule Formulas',
      cards: [
        {
          id: 'schedule-students',
          title: 'For Students',
          description: 'Balanced life schedules for academic success',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/devotee_student_mwfllt.jpg',
          imageAlt: 'For Students'
        },
        {
          id: 'schedule-workers',
          title: 'For Workers',
          description: 'Work-life balance with spiritual practice',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936753/workers_wbbkof.jpg',
          imageAlt: 'For Workers'
        },
        {
          id: 'schedule-business',
          title: 'For Business Men',
          description: 'Ethical business practices with success',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752937255/devotee_in_business_cxgec7.png',
          imageAlt: 'For Business Men'
        },
        {
          id: 'schedule-devotees',
          title: 'For Devotees',
          description: 'Spiritual life balance and daily practices',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/devotee_student_mwfllt.jpg',
          imageAlt: 'For Devotees'
        }
      ]
    },
    {
      id: 'harinam-kirtan',
      title: 'Importance of Harinam Kirtan',
      cards: [
        {
          id: 'japa-meditation',
          title: 'Japa Meditation',
          description: 'The power of personal chanting practice',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936753/chanting_harekrishna_ukdwhd.jpg',
          imageAlt: 'Japa Meditation'
        },
        {
          id: 'music-kirtan',
          title: 'Music Kirtan',
          description: 'Community chanting and devotional music',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/hare_krishna_kirtan_cn4xvk.jpg',
          imageAlt: 'Music Kirtan'
        }
      ]
    }
  ];

  constructor(private router: Router) { }
   
  ngOnInit() {
    // Initialize any needed data here
  }

  onCardClick(articleId: string) {
    console.log('Article card clicked:', articleId);
    // TODO: Navigate to specific article page or open article details
    // For now, we'll just log the article ID
    // Example: this.router.navigate(['/article-details', articleId]);
  }
}
