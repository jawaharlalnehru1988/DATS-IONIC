import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
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
  arrowBack, shareOutline } from 'ionicons/icons';
import { Blog, BlogService } from '../../services/blog.service';
import { AuthService } from '../../services/auth.service';
import { ThemeService, ThemeType } from '../../services/theme.service';
import { RoleBasedUIService } from '../../services/role-based-ui.service';
import { IonicMetaService } from '../../services/ionic-meta.service';
import { SocialShareService } from '../../services/social-share.service';
import { ShareButtonComponent } from '../share-button/share-button.component';
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
    IonBackButton,
    ShareButtonComponent
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
    private roleBasedUIService: RoleBasedUIService,
    private ionicMetaService: IonicMetaService,
    private socialShareService: SocialShareService
  ) {
    addIcons({personOutline,chatbubbleOutline,shareOutline,chatbubblesOutline,send,lockClosedOutline,logInOutline,person,alertCircleOutline,arrowBack});
    
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
    // Reset meta tags to defaults when leaving the component
    this.ionicMetaService.resetToDefaults();
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
            // Use Ionic meta service for clean URLs and proper meta tags
            this.ionicMetaService.updateBlogMetaTags(foundBlog);
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
    const sampleBlogs: Blog[] = [ ];

    const foundBlog = sampleBlogs.find(blog => blog._id === this.blogId);
    if (foundBlog) {
      this.blog = foundBlog;
      this.ionicMetaService.updateBlogMetaTags(foundBlog);
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
