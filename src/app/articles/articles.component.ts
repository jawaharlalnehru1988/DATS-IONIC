import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon, IonButton, IonActionSheet, AlertController } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { languageOutline, add, ellipsisVertical, create, trash, eye, chatbubbleOutline, createOutline, trashOutline } from 'ionicons/icons';
import { Blog, BlogService } from '../services/blog.service';
import { BlogFormComponent } from '../components/blog-form/blog-form.component';
import { ThemeService, ThemeType } from '../services/theme.service';
import { LanguageService } from '../services/language.service';
import { NavigationService } from '../services/navigation.service';
import { RoleBasedUIService } from '../services/role-based-ui.service';
import { ShowForRolesDirective } from '../directives/show-for-roles.directive';
import { Subscription, Observable } from 'rxjs';
import { ReusableHeaderComponent } from '../components/reusable-header/reusable-header.component';
import { SegmentedTabsComponent, TabItem } from "../components/segmented-tabs/segmented-tabs.component";
import { SkeletonLoaderComponent } from '../components/skeleton-loader/skeleton-loader.component';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  standalone: true,
  imports: [ReusableHeaderComponent, IonButton, IonIcon, IonContent, CommonModule, BlogFormComponent, ShowForRolesDirective, IonActionSheet, SegmentedTabsComponent, SkeletonLoaderComponent],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  selectedTopic: string = 'how';
  blogs: Blog[] = [];
  isLoading: boolean = true;
  currentTheme: ThemeType = 'theme-royal';
  private themeSubscription: Subscription = new Subscription();
  private languageSubscription: Subscription = new Subscription();
  private dataLoaded: boolean = false; // Track if data has been loaded at least once
  
  contentCategories: TabItem[] = [];

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
    private languageService: LanguageService,
    private navigationService: NavigationService,
    private roleBasedUIService: RoleBasedUIService,
    private alertController: AlertController
  ) {
    addIcons({createOutline,trashOutline,add,ellipsisVertical,chatbubbleOutline,languageOutline,create,trash,eye});
    
    // Initialize role-based observables
    this.canShowAdminFeatures$ = this.roleBasedUIService.canShowAdminFeatures();
    this.isAuthenticated$ = this.roleBasedUIService.isUserAuthenticated();
    
    // Initialize categories with current language
    this.updateContentCategories();
  }

  ngOnInit() {
    
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
    
    // Subscribe to language changes
    this.languageSubscription = this.languageService.texts$.subscribe(() => {
      this.updateContentCategories();
    });

    // Subscribe to blogs from service
    console.log('Setting isLoading to true, about to fetch blogs');
    this.isLoading = true;

    this.blogService.getBlogs().subscribe({
      next: (blogs: Blog[]) => {
        console.log('Blogs received:', blogs.length, 'blogs');
        this.blogs = blogs;
        if (blogs.length === 0) {
          // Use fallback data if no blogs are available
          this.blogs = this.defaultBlogs;
          this.isLoading = true;
        }
        this.dataLoaded = true;
        this.isLoading = false;
        console.log('Setting isLoading to false, dataLoaded to true');
      },
      error: (error) => {
        console.error('Error loading blogs:', error);
        this.dataLoaded = true;
        this.isLoading = false;
        console.log('Setting isLoading to false due to error, dataLoaded to true');
      }
    });
  }

  // Get filtered blogs based on selected category
  get filteredBlogs(): Blog[] {
    if (!this.blogs || this.blogs.length === 0) {
      return [];
    }
    
    // Filter blogs by the selected category
    const filtered = this.blogs.filter(blog => {
      // Handle case-insensitive comparison and ensure category exists
      return blog.category && blog.category.toLowerCase() === this.selectedTopic.toLowerCase();
    });
    
    return filtered;
  }

  // Check if current category has any blogs
  get hasCurrentCategoryBlogs(): boolean {
    return this.dataLoaded && this.filteredBlogs.length > 0;
  }

  private updateContentCategories(): void {
    const texts = this.languageService.getTexts();
    this.contentCategories = [
      { value: 'how', label: texts.articlesCategoryHow },
      { value: 'why', label: texts.articlesCategoryWhy },
      { value: 'when', label: texts.articlesCategoryWhen },
      { value: 'who', label: texts.articlesCategoryWho },
      { value: 'where', label: texts.articlesCategoryWhere },
      { value: 'what', label: texts.articlesCategoryWhat },
    ];
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    
    // Unsubscribe from language changes
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  onLanguageChange(event: any) {
    const newTopic = event.detail.value;
    
    // Simply update the selected topic - no artificial loading
    if (newTopic !== this.selectedTopic) {
      this.selectedTopic = newTopic;
    }
  }

  onTabChanged(newTab: string) {
    // Simply update the selected topic - no artificial loading
    if (newTab !== this.selectedTopic) {
      this.selectedTopic = newTab;
    }
  }

  onCardClick(blogId: string) {
    console.log('Card clicked with blogId:', blogId);
    // Navigate to blog details page with language awareness
    this.navigationService.navigateToBlogDetails(blogId);
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

  onBlogSaved(_blog: Blog) {
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
