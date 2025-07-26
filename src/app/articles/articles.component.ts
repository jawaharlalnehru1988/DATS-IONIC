import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonSegment, IonSegmentButton, IonLabel, IonIcon, IonButton, IonActionSheet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { languageOutline, add, ellipsisVertical, create, trash, eye } from 'ionicons/icons';
import { ArticleService, ArticleCard, ArticleCategory } from '../services/article.service';
import { ArticleFormComponent } from '../components/article-form/article-form.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  standalone: true,
  imports: [IonActionSheet, IonButton, IonIcon, IonLabel, IonSegmentButton, IonSegment, IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, CommonModule, ArticleFormComponent],
})
export class ArticlesComponent implements OnInit {
  selectedLanguage: string = 'english';
  articleCategories: ArticleCategory[] = [];
  
  // Form modal properties
  isFormOpen = false;
  editingArticle: ArticleCard | null = null;
  
  // Action sheet properties
  isActionSheetOpen = false;
  selectedArticleId: string = '';
  
  actionSheetButtons = [
    {
      text: 'View',
      icon: 'eye',
      handler: () => this.viewArticle()
    },
    {
      text: 'Edit',
      icon: 'create',
      handler: () => this.editArticle()
    },
    {
      text: 'Delete',
      icon: 'trash',
      role: 'destructive',
      handler: () => this.deleteArticle()
    },
    {
      text: 'Cancel',
      role: 'cancel'
    }
  ];
  
  // Original static data for fallback
  defaultArticleCategories: ArticleCategory[] = [
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
          content: ``,
          categoryTitle: 'How to Memorize Slokas'
        },
        {
          id: 'bhagavatam',
          articleTitle: 'Bhagavatam',
          description: 'Effective ways to remember Bhagavatam verses',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1753316350/bhagavatam-01_mogmef.jpg',
          imageAlt: 'Bhagavatam Slokas',
          content: ``,
          categoryTitle: 'How to Memorize Slokas'
        },
        {
          id: 'other-slokas',
          articleTitle: 'Other Slokas',
          description: 'General methods for memorizing various slokas',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1753316150/devotee_children_recites_sloka_dcjlnc.png',
          imageAlt: 'Other Slokas',
          content: ``,
          categoryTitle: 'How to Memorize Slokas'
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
          content: ``,
          categoryTitle: 'Baby Names'
        },
        {
          id: 'girl-baby-names',
          articleTitle: 'Girl Baby Names',
          description: 'Beautiful and divine names for baby girls',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/girlbaby_vbvkdb.jpg',
          imageAlt: 'Girl Baby Names',
          content: ``,
          categoryTitle: 'Baby Names'
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
          content: ``,
          categoryTitle: 'Vaishnava Etiquettes'
        },
        {
          id: 'etiquette-women',
          articleTitle: 'For Women',
          description: 'Spiritual guidelines and conduct for women',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936753/vaishnava_ettiquate_women_e9tieb.jpg',
          imageAlt: 'Etiquette for Women',
          content: ``,
          categoryTitle: 'Vaishnava Etiquettes'
        },
        {
          id: 'etiquette-husband-wife',
          articleTitle: 'Husband & Wife',
          description: 'Sacred relationship guidelines for couples',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/vaishnava_ettiquate_husband_wife_qa0qp4.jpg',
          imageAlt: 'Between Husband and Wife',
          content: ``,
          categoryTitle: 'Vaishnava Etiquettes'
        },
        {
          id: 'etiquette-colleagues',
          articleTitle: 'Between Colleagues',
          description: 'Professional conduct with spiritual awareness',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/vaishnava_ettiquate_colleagues_vhze4i.jpg',
          imageAlt: 'Between Colleagues',
          content: ``,
          categoryTitle: 'Vaishnava Etiquettes'
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
          content: ``,
          categoryTitle: 'Social Issues Solutions'
        },
        {
          id: 'social-local',
          articleTitle: 'Local Solutions',
          description: 'Community-based problem solving approaches',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/personal_issue_tw8fx4.jpg',
          imageAlt: 'Local Issues',
          content: ``,
          categoryTitle: 'Social Issues Solutions'
        },
        {
          id: 'social-international',
          articleTitle: 'International Solutions',
          description: 'Global perspectives on social harmony',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/social_issues_clkl4n.jpg',
          imageAlt: 'International Issues',
          content: ``,
          categoryTitle: 'Social Issues Solutions'
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
          content: ``,
          categoryTitle: 'Happy Life Schedule Formulas'
        },
        {
          id: 'schedule-workers',
          articleTitle: 'For Workers',
          description: 'Work-life balance with spiritual practice',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936753/workers_wbbkof.jpg',
          imageAlt: 'For Workers',
          content: ``,
          categoryTitle: 'Happy Life Schedule Formulas'
        },
        {
          id: 'schedule-business',
          articleTitle: 'For Business Men',
          description: 'Ethical business practices with success',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752937255/devotee_in_business_cxgec7.png',
          imageAlt: 'For Business Men',
          content: ``,
          categoryTitle: 'Happy Life Schedule Formulas'
        },
        {
          id: 'schedule-devotees',
          articleTitle: 'For Devotees',
          description: 'Spiritual life balance and daily practices',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/devotee_student_mwfllt.jpg',
          imageAlt: 'For Devotees',
          content: ``,
          categoryTitle: 'Happy Life Schedule Formulas'
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
          content: ``,
          categoryTitle: 'Importance of Harinam Kirtan'
        },
        {
          id: 'music-kirtan',
          articleTitle: 'Music Kirtan',
          description: 'Community chanting and devotional music',
          imageUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936752/hare_krishna_kirtan_cn4xvk.jpg',
          imageAlt: 'Music Kirtan',
          content: ``,
          categoryTitle: 'Importance of Harinam Kirtan'
        }
      ]
    },
    
  ];

  constructor(private router: Router, private articleService: ArticleService) { 
    addIcons({ languageOutline, add, ellipsisVertical, create, trash, eye });
  }
   
  ngOnInit() {
    // Load articles from service or initialize with default data
    this.articleService.getArticles().subscribe(articles => {
      if (articles.length === 0) {
        // Initialize with default data if no articles exist
        this.articleService.setArticles(this.defaultArticleCategories);
      } else {
        this.articleCategories = articles;
      }
    });
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

  // Form related methods
  openAddArticleForm() {
    this.editingArticle = null;
    this.isFormOpen = true;
  }

  openEditArticleForm(article: ArticleCard) {
    this.editingArticle = article;
    this.isFormOpen = true;
  }

  closeArticleForm() {
    this.isFormOpen = false;
    this.editingArticle = null;
  }

  onArticleSaved(article: ArticleCard) {
    // Refresh the articles list
    this.articleService.getArticles().subscribe(articles => {
      this.articleCategories = articles;
    });
  }

  // Action sheet methods
  openActionSheet(articleId: string, event: Event) {
    event.stopPropagation(); // Prevent card click
    this.selectedArticleId = articleId;
    this.isActionSheetOpen = true;
  }

  closeActionSheet() {
    this.isActionSheetOpen = false;
    this.selectedArticleId = '';
  }

  viewArticle() {
    if (this.selectedArticleId) {
      this.onCardClick(this.selectedArticleId);
    }
    this.closeActionSheet();
  }

  editArticle() {
    if (this.selectedArticleId) {
      const article = this.articleService.getArticleById(this.selectedArticleId);
      if (article) {
        this.openEditArticleForm(article);
      }
    }
    this.closeActionSheet();
  }

  deleteArticle() {
    if (this.selectedArticleId) {
      if (confirm('Are you sure you want to delete this article?')) {
        this.articleService.deleteArticle(this.selectedArticleId);
        // Refresh the articles list
        this.articleService.getArticles().subscribe(articles => {
          this.articleCategories = articles;
        });
      }
    }
    this.closeActionSheet();
  }
}
