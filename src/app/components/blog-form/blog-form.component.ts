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
  IonSelect,
  IonSelectOption,
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
import { close, save } from 'ionicons/icons';
import { Blog, BlogService } from '../../services/blog.service';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss'],
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
    IonSelect,
    IonSelectOption,
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
export class BlogFormComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() editingBlog: Blog | null = null;
  @Output() modalClosed = new EventEmitter<void>();
  @Output() blogSaved = new EventEmitter<Blog>();

  blogForm: FormGroup;
  isEditing = false;
  isToastOpen = false;
  toastMessage = '';
  toastColor = 'success';

  // Category options for the dropdown
  categoryOptions = [
    { value: 'how', label: 'How' },
    { value: 'why', label: 'Why' },
    { value: 'when', label: 'When' },
    { value: 'who', label: 'Who' },
    { value: 'where', label: 'Where' },
    { value: 'what', label: 'What' },
    { value: 'ekadashi', label: 'Ekadashi' } // Added Ekadashi category
   
  ];

  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService
  ) {
    addIcons({ close, save });
    
    this.blogForm = this.formBuilder.group({
      blogTitle: ['', [Validators.required, Validators.minLength(3)]],
      blogImgUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      category: ['', [Validators.required]] // Added category field
    });
  }

  ngOnInit() {
    if (this.editingBlog) {
      this.isEditing = true;
      this.loadBlogData();
    }
  }

  ngOnChanges() {
    if (this.editingBlog) {
      this.isEditing = true;
      this.loadBlogData();
    } else {
      this.isEditing = false;
      this.resetForm();
    }
  }

  private loadBlogData() {
    if (this.editingBlog) {
      this.blogForm.patchValue({
        blogTitle: this.editingBlog.blogTitle,
        blogImgUrl: this.editingBlog.blogImgUrl,
        content: this.editingBlog.content,
        author: this.editingBlog.author,
        category: this.editingBlog.category || '' // Added category field
      });
    }
  }

  private resetForm() {
    this.blogForm.reset();
    this.blogForm.patchValue({
      blogTitle: '',
      blogImgUrl: '',
      content: '',
      author: '',
      category: '' // Added category field
    });
  }

  closeModal() {
    this.modalClosed.emit();
    this.resetForm();
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const blogData: Blog = {
        ...this.blogForm.value,
        comments: this.editingBlog?.comments || []
      };

      if (this.isEditing && this.editingBlog?._id) {
        // Update existing blog
        this.blogService.updateBlog(this.editingBlog._id, blogData).subscribe({
          next: (updatedBlog) => {
            this.showToast('Blog updated successfully!', 'success');
            this.blogSaved.emit(updatedBlog);
            this.blogService.refreshBlogs(); // Refresh the list
            setTimeout(() => this.closeModal(), 1500);
          },
          error: (error) => {
            console.error('Error updating blog:', error);
            this.showToast('Failed to update blog. Please try again.', 'danger');
          }
        });
      } else {
        // Add new blog
        this.blogService.addBlog(blogData).subscribe({
          next: (newBlog) => {
            this.showToast('Blog created successfully!', 'success');
            this.blogSaved.emit(newBlog);
            this.blogService.refreshBlogs(); // Refresh the list
            setTimeout(() => this.closeModal(), 1500);
          },
          error: (error) => {
            console.error('Error creating blog:', error);
            this.showToast('Failed to create blog. Please try again.', 'danger');
          }
        });
      }
    } else {
      this.markFormGroupTouched();
      this.showToast('Please fill in all required fields correctly.', 'warning');
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.blogForm.controls).forEach(key => {
      const control = this.blogForm.get(key);
      control?.markAsTouched();
    });
  }

  private showToast(message: string, color: string) {
    this.toastMessage = message;
    this.toastColor = color;
    this.isToastOpen = true;
  }

  getErrorMessage(fieldName: string): string {
    const control = this.blogForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required.`;
      }
      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `${this.getFieldLabel(fieldName)} must be at least ${requiredLength} characters long.`;
      }
      if (control.errors['pattern']) {
        if (fieldName === 'blogImgUrl') {
          return 'Please enter a valid image URL (jpg, jpeg, png, webp, gif).';
        }
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'blogTitle': 'Blog Title',
      'blogImgUrl': 'Image URL',
      'content': 'Content',
      'author': 'Author',
      'category': 'Category' // Added category field
    };
    return labels[fieldName] || fieldName;
  }
}
