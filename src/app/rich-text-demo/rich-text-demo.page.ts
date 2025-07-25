import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonTextarea
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RichTextEditorComponent } from '../components/rich-text-editor/rich-text-editor.component';

@Component({
  selector: 'app-rich-text-demo',
  templateUrl: './rich-text-demo.page.html',
  styleUrls: ['./rich-text-demo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonLabel,
    IonTextarea,
    RichTextEditorComponent
  ]
})
export class RichTextDemoPage implements OnInit {
  demoForm: FormGroup;
  htmlOutput: string = '';
  plainTextOutput: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.demoForm = this.formBuilder.group({
      richTextContent: ['<p>Welcome to the <strong>Rich Text Editor</strong>! Try formatting this text with <em>italic</em>, <u>underline</u>, colors, and alignments.</p>', Validators.required]
    });
  }

  ngOnInit() {
    // Subscribe to form changes
    this.demoForm.get('richTextContent')?.valueChanges.subscribe(value => {
      this.htmlOutput = value || '';
      // Extract plain text
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = value || '';
      this.plainTextOutput = tempDiv.textContent || tempDiv.innerText || '';
    });

    // Initialize outputs
    const initialValue = this.demoForm.get('richTextContent')?.value;
    this.htmlOutput = initialValue || '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = initialValue || '';
    this.plainTextOutput = tempDiv.textContent || tempDiv.innerText || '';
  }

  onSave() {
    if (this.demoForm.valid) {
      const content = this.demoForm.get('richTextContent')?.value;
      console.log('Rich Text Content:', content);
      // Here you would typically save to a service or API
      alert('Content saved! Check console for the HTML output.');
    }
  }

  onClear() {
    this.demoForm.get('richTextContent')?.setValue('');
  }

  onLoadSample() {
    const sampleContent = `
      <h2 style="text-align: center; color: #667eea;">Rich Text Editor Demo</h2>
      <p style="text-align: justify;">
        This is a <strong>comprehensive rich text editor</strong> built with <em>Angular</em> and <u>Ionic</u>. 
        It supports various formatting options including:
      </p>
      <ul>
        <li><strong>Bold text</strong></li>
        <li><em>Italic text</em></li>
        <li><u>Underlined text</u></li>
        <li>Text with <span style="color: red;">custom colors</span></li>
        <li>Text with <span style="background-color: yellow;">background colors</span></li>
        <li>Mathematical expressions: H<sub>2</sub>O and E=mc<sup>2</sup></li>
      </ul>
      <p style="text-align: center;">
        <span style="font-size: large; color: green;">
          Perfect for articles, blogs, and content management!
        </span>
      </p>
    `;
    this.demoForm.get('richTextContent')?.setValue(sampleContent);
  }
}
