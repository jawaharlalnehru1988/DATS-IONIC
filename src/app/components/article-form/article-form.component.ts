import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { 
  IonModal, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonButtons, 
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonToast
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { close, save, create } from 'ionicons/icons';
import { ArticleCard, ArticleService } from '../../services/article.service';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonToast,
    QuillModule
]
})
class ArticleFormComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = false;
  @Input() editingArticle: ArticleCard | null = null;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() articleSaved = new EventEmitter<ArticleCard>();

  articleForm: FormGroup;
  categoryTitles: string[] = [];
  isToastOpen = false;
  toastMessage = '';
  toastColor = 'success';

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService
  ) {
    addIcons({ close, save, create });
    
    this.articleForm = this.fb.group({
      id: [''],
      articleTitle: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      imageAlt: ['', [Validators.required]],
      categoryTitle: ['', [Validators.required]],
      content: ['']
    });
  }

  ngOnInit() {
    this.loadCategoryTitles();
    
    // Subscribe to articles changes to update category list
    this.articleService.getArticles().subscribe(() => {
      this.loadCategoryTitles();
    });
  }

  ngOnChanges() {
    if (this.editingArticle) {
      this.populateForm(this.editingArticle);
    } else {
      this.resetForm();
    }
  }

  loadCategoryTitles() {
    this.categoryTitles = this.articleService.getCategoryTitles();
  }

  populateForm(article: ArticleCard) {
    this.articleForm.patchValue({
      id: article.id,
      articleTitle: article.articleTitle,
      description: article.description,
      imageUrl: article.imageUrl,
      imageAlt: article.imageAlt,
      categoryTitle: article.categoryTitle || '',
      content: article.content || ''
    });
  }

  resetForm() {
    this.articleForm.reset();
    this.articleForm.patchValue({
      id: this.generateId(),
      content: ''
    });
  }

  onSubmit() {
    if (this.articleForm.valid) {
      const formData = this.articleForm.value;
      const article: ArticleCard = {
        id: formData.id || this.generateId(),
        articleTitle: formData.articleTitle,
        description: formData.description,
        imageUrl: formData.imageUrl,
        imageAlt: formData.imageAlt,
        categoryTitle: formData.categoryTitle,
        content: formData.content
      };

      if (this.editingArticle) {
        this.articleService.updateArticle(this.editingArticle.id, article);
        this.showToast('Article updated successfully!', 'success');
      } else {
        this.articleService.addArticle(article);
        this.showToast('Article created successfully!', 'success');
      }

      this.articleSaved.emit(article);
      this.closeModal();
    } else {
      this.markFormGroupTouched();
      this.showToast('Please fill in all required fields correctly.', 'danger');
    }
  }

  closeModal() {
    this.isOpen = false;
    this.modalClosed.emit();
    this.resetForm();
  }

  markFormGroupTouched() {
    Object.keys(this.articleForm.controls).forEach(key => {
      const control = this.articleForm.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.articleForm.get(fieldName);
    if (control?.errors && control?.touched) {
      if (control.errors['required']) {
        return `${fieldName} is required`;
      }
      if (control.errors['minlength']) {
        return `${fieldName} must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
      if (control.errors['pattern']) {
        return `${fieldName} must be a valid URL starting with http:// or https://`;
      }
    }
    return '';
  }

  showToast(message: string, color: string) {
    this.toastMessage = message;
    this.toastColor = color;
    this.isToastOpen = true;
  }

  private generateId(): string {
    return 'article_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  get isEditing(): boolean {
    return !!this.editingArticle;
  }
}
