import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent,
  IonIcon, 
  IonButton, 
  IonSpinner, 
  IonItem, 
  IonTextarea, 
  IonChip, 
  IonLabel,
  IonAvatar,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  personOutline, 
  chatbubbleOutline, 
  chatbubblesOutline, 
  send, 
  lockClosedOutline, 
  logInOutline, 
  person, 
  alertCircleOutline, 
  arrowBack 
} from 'ionicons/icons';
import { Blog, BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { ThemeService, ThemeType } from '../../services/theme.service';
import { RoleBasedUIService } from '../../services/role-based-ui.service';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    IonButton,
    IonSpinner,
    IonItem,
    IonTextarea,
    IonChip,
    IonLabel,
    IonAvatar,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton
  ]
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  blog: Blog | null = null;
  blogId: string = '';
  newComment: string = '';
  isLoading: boolean = true;
  hasError: boolean = false;
  currentTheme: ThemeType = 'theme-royal';
  
  // Authentication observables
  isAuthenticated$: Observable<boolean>;
  
  // Subscriptions
  private subscriptions = new Subscription();
  
  // HostBinding to apply theme class
  @HostBinding('class')
  get themeClass() {
    return this.currentTheme;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private authService: AuthService,
    private themeService: ThemeService,
    private roleBasedUIService: RoleBasedUIService
  ) {
    addIcons({
      personOutline,
      chatbubbleOutline,
      chatbubblesOutline,
      send,
      lockClosedOutline,
      logInOutline,
      person,
      alertCircleOutline,
      arrowBack
    });
    
    // Initialize authentication observable
    this.isAuthenticated$ = this.roleBasedUIService.isUserAuthenticated();
  }

  ngOnInit() {
    // Subscribe to theme changes
    this.subscriptions.add(
      this.themeService.currentTheme$.subscribe(theme => {
        this.currentTheme = theme;
      })
    );
    
    // Get blog ID from route params
    this.subscriptions.add(
      this.route.params.subscribe(params => {
        console.log('Blog detail route params:', params);
        this.blogId = params['id'];
        console.log('Extracted blogId:', this.blogId);
        if (this.blogId) {
          this.loadBlog();
        } else {
          this.hasError = true;
          this.isLoading = false;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private loadBlog() {
    this.isLoading = true;
    this.hasError = false;
    
    // First try to get from service
    this.subscriptions.add(
      this.blogService.getBlogs().subscribe({
        next: (blogs: Blog[]) => {
          const foundBlog = blogs.find((blog: Blog) => blog._id === this.blogId);
          if (foundBlog) {
            this.blog = foundBlog;
            this.isLoading = false;
          } else {
            // Try hardcoded blogs (fallback for sample data)
            this.loadHardcodedBlog();
          }
        },
        error: (error: any) => {
          console.error('Error loading blog:', error);
          // Fallback to hardcoded blogs
          this.loadHardcodedBlog();
        }
      })
    );
  }

  private loadHardcodedBlog() {
    // Fallback to hardcoded sample blogs
    const sampleBlogs: Blog[] = [
      {
        _id: 'bhagavad-gita-1',
        blogTitle: 'Understanding the Bhagavad Gita: Chapter 2 - Sankhya Yoga',
        blogImgUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1753316350/bg-01_z7y26k.jpg',
        content: `<div class="rich-content">
          <p>The second chapter of the Bhagavad Gita, known as "Sankhya Yoga" or "The Yoga of Knowledge," is where Lord Krishna begins His profound teachings to Arjuna.</p>
          
          <h3>The Eternal Soul</h3>
          <p>In this chapter, Krishna explains the eternal nature of the soul (atma) and how it is different from the temporary material body. He states:</p>
          
          <blockquote>
            "For the soul there is neither birth nor death nor, having once been, does he ever cease to be. He is unborn, eternal, permanent and primeval. He is not slain when the body is slain." (BG 2.20)
          </blockquote>
          
          <h3>Key Teachings</h3>
          <ul>
            <li><strong>The Nature of the Soul:</strong> The soul is eternal, indestructible, and beyond the influence of material elements.</li>
            <li><strong>Duty and Dharma:</strong> Krishna emphasizes the importance of performing one's duty according to one's position in society.</li>
            <li><strong>Equipoise in Success and Failure:</strong> The concept of maintaining balance in both success and failure is introduced.</li>
            <li><strong>Yoga of the Intellect:</strong> The importance of discriminating intelligence in spiritual advancement.</li>
          </ul>
          
          <h3>Practical Application</h3>
          <p>This chapter provides practical guidance for living a spiritually conscious life while fulfilling our material duties. The key is to act without attachment to results, offering all actions to the Supreme.</p>
          
          <p>The teachings of this chapter form the foundation for understanding the entire Bhagavad Gita and provide essential knowledge for anyone seeking spiritual advancement.</p>
        </div>`,
        author: 'His Divine Grace A.C. Bhaktivedanta Swami Prabhupada',
        comments: [
          {
            userName: 'Devotee Krishna',
            comment: 'This chapter completely transformed my understanding of life and death. The concept of the eternal soul gives so much peace and clarity. Thank you for this beautiful explanation!'
          },
          {
            userName: 'Devotee Radha',
            comment: 'This explanation beautifully captures the essence of the Gita. The practical applications you mentioned are very helpful for daily spiritual practice. Hare Krishna!'
          },
          {
            userName: 'Seeker Arjun',
            comment: 'I\'ve been struggling with understanding dharma and duty. This chapter breakdown makes it much clearer. Could you elaborate more on how to apply this in modern professional life?'
          }
        ]
      },
      {
        _id: 'bhagavatam-1',
        blogTitle: 'Srimad Bhagavatam: The Beautiful Narration',
        blogImgUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1753316350/bhagavatam-01_mogmef.jpg',
        content: `<div class="rich-content">
          <p>Srimad-Bhagavatam is known as the "beautiful narration" of the Supreme Lord and His devotees. It stands as the ripened fruit of the tree of Vedic literature.</p>
          
          <h3>The Spotless Purana</h3>
          <p>Srila Prabhupada describes Srimad-Bhagavatam as the "spotless Purana" because it is free from the material contamination found in other scriptures. Its purpose is purely spiritual - to establish loving relationship with the Supreme Lord.</p>
          
          <blockquote>
            "This Bhagavata Purana is as brilliant as the sun, and it has arisen just after the departure of Lord Krishna to His own abode, accompanied by religious knowledge and devotion. Persons who have lost their vision due to the dense darkness of ignorance in the age of Kali shall get light from this Purana." (SB 1.3.43)
          </blockquote>
          
          <h3>Twelve Cantos of Spiritual Advancement</h3>
          <p>The Bhagavatam is divided into twelve cantos, each representing a different stage of spiritual development:</p>
          
          <ol>
            <li><strong>First Canto:</strong> Creation and the appearance of Vyasadeva</li>
            <li><strong>Second Canto:</strong> The cosmic manifestation</li>
            <li><strong>Third Canto:</strong> The status of devotional service</li>
            <li><strong>Fourth through Ninth Cantos:</strong> Various incarnations and devotees</li>
            <li><strong>Tenth Canto:</strong> The life and pastimes of Lord Krishna</li>
            <li><strong>Eleventh and Twelfth Cantos:</strong> The ultimate goal of life</li>
          </ol>
          
          <h3>The Natural Commentary on Vedanta</h3>
          <p>Srimad-Bhagavatam serves as the natural commentary on the Vedanta-sutra. While Vedanta-sutra gives the codes, Bhagavatam provides the explanations through stories, philosophy, and practical guidance.</p>
          
          <p>Regular study of this transcendental literature gradually elevates the consciousness and brings one closer to the Supreme Lord Krishna.</p>
        </div>`,
        author: 'His Divine Grace A.C. Bhaktivedanta Swami Prabhupada',
        comments: []
      },
      {
        _id: 'spiritual-names-1',
        blogTitle: 'Choosing Spiritual Names for Children',
        blogImgUrl: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1752936751/boy_baby_images_nudsxs.jpg',
        content: `<div class="rich-content">
          <p>Choosing a spiritual name for your child is one of the most important gifts you can give. These names carry divine vibrations and connect the child to the spiritual realm from birth.</p>
          
          <h3>The Power of Divine Names</h3>
          <p>In Vedic tradition, names are not just labels but carry spiritual significance and influence the child's consciousness throughout life. When we chant or hear divine names, they purify our hearts and minds.</p>
          
          <blockquote>
            "The holy name of Krishna is transcendentally blissful. It bestows all spiritual benedictions, for it is Krishna Himself, the reservoir of all pleasure." (Siksastaka 1)
          </blockquote>
          
          <h3>Popular Spiritual Names for Boys</h3>
          <ul>
            <li><strong>Krishna:</strong> The all-attractive Supreme Lord</li>
            <li><strong>Rama:</strong> The source of all pleasure</li>
            <li><strong>Govinda:</strong> One who gives pleasure to the senses and cows</li>
            <li><strong>Arjuna:</strong> The pure-hearted devotee</li>
            <li><strong>Bhakta:</strong> Devotee of the Lord</li>
            <li><strong>Hari:</strong> One who removes all inauspiciousness</li>
            <li><strong>Damodara:</strong> One whose belly is bound by rope (Krishna)</li>
          </ul>
          
          <h3>Popular Spiritual Names for Girls</h3>
          <ul>
            <li><strong>Radha:</strong> The divine consort of Krishna</li>
            <li><strong>Sita:</strong> The beloved of Lord Rama</li>
            <li><strong>Ganga:</strong> The sacred river</li>
            <li><strong>Yamuna:</strong> The beloved river of Krishna</li>
            <li><strong>Vrinda:</strong> Related to Vrindavan</li>
            <li><strong>Tulasi:</strong> The sacred plant dear to Krishna</li>
            <li><strong>Rukmini:</strong> The principal queen of Krishna</li>
          </ul>
          
          <h3>Benefits of Spiritual Names</h3>
          <p>Children with spiritual names often develop:</p>
          <ul>
            <li>Natural inclination toward spiritual activities</li>
            <li>Protection from negative influences</li>
            <li>Connection to divine consciousness</li>
            <li>Positive character development</li>
            <li>Inner peace and contentment</li>
          </ul>
          
          <h3>How to Choose</h3>
          <p>When selecting a spiritual name:</p>
          <ul>
            <li>Meditate and pray for guidance</li>
            <li>Consider the meaning and pronunciation</li>
            <li>Ensure it resonates with your heart</li>
            <li>Consult with spiritual teachers if possible</li>
            <li>Trust your divine intuition</li>
          </ul>
          
          <p>Remember, the most important thing is that the name is chosen with love and devotion, creating a lifelong connection between your child and the divine realm.</p>
        </div>`,
        author: 'His Divine Grace A.C. Bhaktivedanta Swami Prabhupada',
        comments: [
          {
            userName: 'Krishna Das',
            comment: 'Very helpful guidance for new parents. We named our son Govinda after reading this article. Thank you for the detailed explanations!'
          },
          {
            userName: 'Devotee Priya',
            comment: 'Beautiful article! Could you also suggest some names that work well in both traditional and modern contexts? We want our daughter to feel comfortable in all environments.'
          }
        ]
      }
    ];

    const foundBlog = sampleBlogs.find(blog => blog._id === this.blogId);
    if (foundBlog) {
      this.blog = foundBlog;
    } else {
      this.hasError = true;
    }
    this.isLoading = false;
  }

  addComment() {
    if (!this.newComment.trim() || !this.blog) {
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    const userName = currentUser?.name || currentUser?.email || 'Anonymous User';

    const comment = {
      userName: userName,
      comment: this.newComment.trim()
    };

    // Add comment to local blog object
    if (!this.blog.comments) {
      this.blog.comments = [];
    }
    this.blog.comments.push(comment);

    // Save to service (if available)
    this.blogService.addComment(this.blogId, comment).subscribe({
      next: (response) => {
        console.log('Comment added successfully:', response);
      },
      error: (error) => {
        console.log('Comment added locally (service unavailable):', error);
        // Comment is still added locally, so we continue
      }
    });

    // Clear the form
    this.newComment = '';
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/articles']);
  }

  getCommentDate(index: number): string {
    // For demo purposes, return relative dates
    const dates = ['2 hours ago', '1 day ago', '3 days ago', '1 week ago', '2 weeks ago'];
    return dates[index] || 'Recently';
  }
}
