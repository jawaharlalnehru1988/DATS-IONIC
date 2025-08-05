import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonSegment, IonSegmentButton, IonLabel, IonIcon, IonButton, IonActionSheet, IonSkeletonText, AlertController } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { languageOutline, add, ellipsisVertical, create, trash, eye, chatbubbleOutline, createOutline, trashOutline } from 'ionicons/icons';
import { Blog, BlogService } from '../services/blog.service';
import { BlogFormComponent } from '../components/blog-form/blog-form.component';
import { AuthDebugComponent } from '../components/auth-debug/auth-debug.component';
import { ThemeService, ThemeType } from '../services/theme.service';
import { RoleBasedUIService } from '../services/role-based-ui.service';
import { ShowForRolesDirective } from '../directives/show-for-roles.directive';
import { Subscription, Observable } from 'rxjs';
import { ReusableHeaderComponent } from '../components';
import { SegmentedTabsComponent } from "../components/segmented-tabs/segmented-tabs.component";

export interface Blogs {
  _id: string
  blogTitle: string
  blogImgUrl: string
  content: string
  author: string
  comments: any[]
  createdAt: string
  updatedAt: string
  __v: number
}


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  standalone: true,
  imports: [ReusableHeaderComponent, IonButton, IonIcon, IonContent, CommonModule, BlogFormComponent, ShowForRolesDirective, IonActionSheet, IonSkeletonText, SegmentedTabsComponent],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  selectedTopic: string = 'how';
  blogs: Blog[] = [];
  isLoading: boolean = true;
  currentTheme: ThemeType = 'theme-royal';
  private themeSubscription: Subscription = new Subscription();
   contentCategories = [
  { value: 'how', label: 'How to...?' },
  { value: 'why', label: 'Why...?' },
  { value: 'when', label: 'When...?' },
  { value: 'who', label: 'Who...?' },
  { value: 'where', label: 'Where...?' },
  { value: 'what', label: 'What...?' },

];

  // Role-based UI properties
  canShowAdminFeatures$: Observable<boolean>;
  isAuthenticated$: Observable<boolean>;
  
  // HostBinding to apply theme class to the component's host element
  @HostBinding('class')
  get themeClass() {
    return this.currentTheme;
  }
  
  // Form modal properties
  isFormOpen = false;
  editingBlog: Blog | null = null;
  
  // Action sheet properties
  isActionSheetOpen = false;
  selectedBlogId: string = '';
  
  actionSheetButtons = [
    {
      text: 'View',
      icon: 'eye',
      handler: () => this.viewBlog()
    },
    {
      text: 'Edit',
      icon: 'create',
      handler: () => this.editBlog()
    },
    {
      text: 'Delete',
      icon: 'trash',
      role: 'destructive',
      handler: () => this.deleteBlog()
    },
    {
      text: 'Cancel',
      role: 'cancel'
    }
  ];
  
  // Original static data for fallback
  defaultBlogs: Blog[] = [];

  constructor(
    private router: Router, 
    private blogService: BlogService, 
    private themeService: ThemeService,
    private roleBasedUIService: RoleBasedUIService,
    private alertController: AlertController
  ) {
    addIcons({createOutline,trashOutline,add,ellipsisVertical,chatbubbleOutline,languageOutline,create,trash,eye});
    
    // Initialize role-based observables
    this.canShowAdminFeatures$ = this.roleBasedUIService.canShowAdminFeatures();
    this.isAuthenticated$ = this.roleBasedUIService.isUserAuthenticated();
  }

  ngOnInit() {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });

    // Subscribe to blogs from service
    this.isLoading = true;
    this.blogService.getBlogs().subscribe({
      next: (blogs: Blog[]) => {
        this.blogs = blogs;
        console.log('this.blogs :', this.blogs);
        if (blogs.length === 0) {
          // Use fallback data if no blogs are available
          this.blogs = this.defaultBlogs;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading blogs:', error);
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  onLanguageChange(event: any) {
    this.selectedTopic = event.detail.value;
  }

  isHowSelected(): boolean {
    return this.selectedTopic === 'how';
  }

  onCardClick(blogId: string) {
    console.log('Card clicked with blogId:', blogId);
    // Navigate to blog details page
    this.router.navigate(['/blog-details', blogId]);
  }

  openAddBlogForm() {
    this.editingBlog = null;
    this.isFormOpen = true;
  }

  closeBlogForm() {
    this.isFormOpen = false;
    this.editingBlog = null;
  }

  openEditBlogForm(blog: Blog) {
    this.editingBlog = blog;
    this.isFormOpen = true;
  }

  onBlogSaved(blog: Blog) {
    // The service will handle the backend call and refresh the list
    this.closeBlogForm();
  }

  openActionSheet(blogId: string, event: Event) {
    event.stopPropagation();
    this.selectedBlogId = blogId;
    this.isActionSheetOpen = true;
  }

  closeActionSheet() {
    this.isActionSheetOpen = false;
    this.selectedBlogId = '';
  }

  viewBlog() {
    if (this.selectedBlogId) {
      this.onCardClick(this.selectedBlogId);
    }
  }

  editBlog(blogId?: string, event?: Event) {
    if (event) {
      event.stopPropagation(); // Prevent card click when button is clicked
    }
    
    const id = blogId || this.selectedBlogId;
    if (id) {
      const blog = this.blogs.find(b => b._id === id);
      if (blog) {
        this.openEditBlogForm(blog);
      }
    }
  }

  async confirmDeleteBlog(blogId: string, event: Event) {
    event.stopPropagation(); // Prevent card click when button is clicked
    
    const blog = this.blogs.find(b => b._id === blogId);
    if (!blog) return;

    const alert = await this.alertController.create({
      header: 'Delete Article',
      message: `Are you sure you want to delete "${blog.blogTitle}"? This action cannot be undone.`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Yes, Delete',
          role: 'destructive',
          cssClass: 'danger',
          handler: () => {
            this.deleteBlog(blogId);
          }
        }
      ],
      cssClass: 'delete-confirmation-alert'
    });

    await alert.present();
  }

  deleteBlog(blogId?: string) {
    const id = blogId || this.selectedBlogId;
    if (id) {
      this.blogService.deleteBlog(id).subscribe({
        next: () => {
          console.log('Blog deleted successfully');
          this.blogService.refreshBlogs(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting blog:', error);
          alert('Failed to delete blog. Please try again.');
        }
      });
    }
  }
}
