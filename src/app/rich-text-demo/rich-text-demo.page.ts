import { Component, OnInit, HostBinding, ViewChild, OnDestroy } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonButtons,
  IonMenuButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { copyOutline, refreshOutline } from 'ionicons/icons';
import { ThemeService, ThemeType } from '../services/theme.service';
import { Subscription } from 'rxjs';

// Import simple rich text component
import { SimpleRichTextComponent } from '../components/simple-rich-text/simple-rich-text.component';

@Component({
  selector: 'app-rich-text-demo',
  templateUrl: './rich-text-demo.page.html',
  styleUrls: ['./rich-text-demo.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    SimpleRichTextComponent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonButtons,
    IonMenuButton
]
})
export class RichTextDemoPage implements OnInit, OnDestroy {
  // Theme management
  currentTheme: ThemeType = 'theme-royal';
  private themeSubscription: Subscription = new Subscription();

  // Rich text editor content
  initialContent: string = '<p>This is a simple rich text editor focused on <strong>pasting content</strong> from other platforms like <em>MS Word</em> or <em>Google Docs</em>.</p><p>Try pasting formatted content from another application and see how it preserves basic formatting.</p>';
  previewContent: string = '';
  
  // Reference to our rich text editor component
  @ViewChild(SimpleRichTextComponent) simpleEditor?: SimpleRichTextComponent;

  // HostBinding to apply theme class to the component's host element
  @HostBinding('class')
  get themeClass() {
    return this.currentTheme;
  }

  constructor(private themeService: ThemeService) { 
    addIcons({ copyOutline, refreshOutline });
  }

  ngOnInit() {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
    
    // Initialize preview content
    this.previewContent = this.initialContent;
  }

  ngOnDestroy() {
    // Clean up subscriptions
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  // Methods
  updatePreview() {
    if (this.simpleEditor) {
      this.previewContent = this.simpleEditor.getContent();
    }
  }

  resetEditor() {
    if (this.simpleEditor) {
      this.simpleEditor.setContent(this.initialContent);
      this.previewContent = this.initialContent;
    }
  }

  copyContent() {
    if (this.simpleEditor) {
      const content = this.simpleEditor.getContent();
      
      navigator.clipboard.writeText(content)
        .then(() => {
          alert('HTML content copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy content: ', err);
        });
    }
  }

  onContentChanged(_html: string) {
    // You can perform actions when content changes
    console.log('Content changed');
  }
}