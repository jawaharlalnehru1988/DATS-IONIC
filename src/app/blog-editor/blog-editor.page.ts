import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonToast
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { 
  copyOutline, 
  refreshOutline, 
  arrowBackOutline, 
  arrowBack,
  codeOutline, 
  documentTextOutline 
} from 'ionicons/icons';
import { ThemeService, ThemeType } from '../services/theme.service';
import { Subscription } from 'rxjs';
import { QuillModule } from 'ngx-quill';
import { ReusableHeaderComponent } from '../components/reusable-header/reusable-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.page.html',
  styleUrls: ['./blog-editor.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    QuillModule,
    ReusableHeaderComponent,
    IonContent,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonToast
  ]
})
export class BlogEditorPage implements OnInit, OnDestroy {
  // Theme management
  currentTheme: ThemeType = 'theme-royal';
  private themeSubscription: Subscription = new Subscription();

  // Editor content
  editorContent: string = '';
  showPreview: boolean = false;
  
  // Toast properties
  isToastOpen = false;
  toastMessage = '';
  toastColor = 'success';

  // Quill editor configuration
  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],
        ['link', 'image', 'video']
      ]
    },
    theme: 'snow'
  };

  // HostBinding to apply theme class to the component's host element
  @HostBinding('class')
  get themeClass() {
    return this.currentTheme;
  }

  constructor(
    private themeService: ThemeService,
    private router: Router
  ) {
    addIcons({arrowBack, codeOutline,documentTextOutline,copyOutline,refreshOutline,arrowBackOutline});
  }

  ngOnInit() {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy() {
    // Clean up subscriptions
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  // Handle Quill editor content changes
  onContentChanged(event: any) {
    console.log('🎨 Rich Text Editor - Content Changed');
    console.log('📝 Content HTML:', event.html);
    console.log('📄 Content Text:', event.text);
    console.log('🔄 Content Delta:', event.delta);
    console.log('📊 Content Length (chars):', event.text?.length || 0);
    console.log('📊 HTML Length (chars):', event.html?.length || 0);
    
    // Update preview if needed
    this.showPreview = !!(event.html && event.html.trim() !== '<p><br></p>');
  }

  // Copy HTML content to clipboard
  async copyHtmlToClipboard() {
    if (this.editorContent && this.editorContent.trim()) {
      try {
        await navigator.clipboard.writeText(this.editorContent);
        this.showToast('✅ HTML content copied to clipboard!', 'success');
      } catch (err) {
        console.error('Failed to copy HTML content: ', err);
        this.showToast('❌ Failed to copy HTML content', 'danger');
      }
    } else {
      this.showToast('⚠️ No HTML content to copy', 'warning');
    }
  }

  // Copy plain text to clipboard
  async copyPlainTextToClipboard() {
    if (this.editorContent && this.editorContent.trim()) {
      try {
        // Create a temporary div to extract plain text from HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.editorContent;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
        
        await navigator.clipboard.writeText(plainText);
        this.showToast('✅ Plain text copied to clipboard!', 'success');
      } catch (err) {
        console.error('Failed to copy plain text: ', err);
        this.showToast('❌ Failed to copy plain text', 'danger');
      }
    } else {
      this.showToast('⚠️ No content to copy', 'warning');
    }
  }

  // Copy embed code to clipboard
  async copyEmbedCodeToClipboard() {
    if (this.editorContent && this.editorContent.trim()) {
      try {
        const embedCode = `<div class="embedded-content">\n${this.editorContent}\n</div>`;
        await navigator.clipboard.writeText(embedCode);
        this.showToast('✅ Embed code copied to clipboard!', 'success');
      } catch (err) {
        console.error('Failed to copy embed code: ', err);
        this.showToast('❌ Failed to copy embed code', 'danger');
      }
    } else {
      this.showToast('⚠️ No content to embed', 'warning');
    }
  }

  // Clear editor content
  clearEditor() {
    this.editorContent = '';
    this.showPreview = false;
    this.showToast('🗑️ Editor cleared', 'medium');
  }

  // Navigate back to articles
  goBack() {
    this.router.navigate(['/articles']);
  }

  // Helper method to show toast messages
  private showToast(message: string, color: string) {
    this.toastMessage = message;
    this.toastColor = color;
    this.isToastOpen = true;
  }
}