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
    private roleBasedUIService: RoleBasedUIService,
    private meta: Meta,
    private titleService: Title
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
            this.updateSocialMetaTags(foundBlog); // Add meta tags update
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
      this.updateSocialMetaTags(foundBlog); // Add meta tags update
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

  private updateSocialMetaTags(blog: Blog) {
    // Update page title
    this.titleService.setTitle(`${blog.blogTitle} - DATS`);

    // Clear existing meta tags first
    this.meta.removeTag('name="description"');
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:image"');
    this.meta.removeTag('property="og:url"');
    this.meta.removeTag('property="og:type"');
    this.meta.removeTag('property="og:image:width"');
    this.meta.removeTag('property="og:image:height"');
    this.meta.removeTag('name="twitter:card"');
    this.meta.removeTag('name="twitter:title"');
    this.meta.removeTag('name="twitter:description"');
    this.meta.removeTag('name="twitter:image"');

    // Set new meta tags
    const description = blog.content.substring(0, 160) + '...'; // First 160 chars
    const currentUrl = window.location.href;
    
    // Ensure absolute URL for image
    let imageUrl = blog.blogImgUrl;
    if (imageUrl && !imageUrl.startsWith('http')) {
      // If relative URL, make it absolute
      imageUrl = window.location.origin + '/' + imageUrl.replace(/^\//, '');
    }

    // Basic meta tags
    this.meta.addTag({ name: 'description', content: description });

    // Open Graph tags
    this.meta.addTag({ property: 'og:title', content: blog.blogTitle });
    this.meta.addTag({ property: 'og:description', content: description });
    this.meta.addTag({ property: 'og:image', content: imageUrl });
    this.meta.addTag({ property: 'og:image:width', content: '1200' });
    this.meta.addTag({ property: 'og:image:height', content: '630' });
    this.meta.addTag({ property: 'og:url', content: currentUrl });
    this.meta.addTag({ property: 'og:type', content: 'article' });
    this.meta.addTag({ property: 'og:site_name', content: 'DATS' });

    // Twitter Card tags
    this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.addTag({ name: 'twitter:title', content: blog.blogTitle });
    this.meta.addTag({ name: 'twitter:description', content: description });
    this.meta.addTag({ name: 'twitter:image', content: imageUrl });
    
    console.log('Social media meta tags updated:', {
      title: blog.blogTitle,
      description: description.substring(0, 50) + '...',
      image: imageUrl,
      url: currentUrl
    });
  }
}
