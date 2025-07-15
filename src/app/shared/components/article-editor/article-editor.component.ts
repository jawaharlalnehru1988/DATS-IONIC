import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditorModule],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  template: `
    <div class="article-editor">
      <editor
        [formControl]="editorControl"
        [init]="editorConfig"
        (onInit)="onEditorCreated($event)"
      ></editor>
    </div>
  `,
  styles: [`
    .article-editor {
      width: 100%;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    :host ::ng-deep .ql-container {
      font-size: 16px;
      font-family: var(--ion-font-family, inherit);
    }

    :host ::ng-deep .ql-editor {
      padding: 20px;
      min-height: 200px;
    }

    :host ::ng-deep .ql-toolbar {
      border-top: none;
      border-left: none;
      border-right: none;
      background: #f8f9fa;
    }
  `]
})
export class ArticleEditorComponent implements OnInit {
  @Input() placeholder: string = 'Start writing your article...';
  @Input() initialContent: string = '';
  @Output() contentChange = new EventEmitter<string>();

  editorControl: FormControl = new FormControl('');
  
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    height: 400,
    menubar: true,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | ' +
      'bold italic backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    branding: false,
    promotion: false,
    placeholder: this.placeholder
  };

  ngOnInit() {
    if (this.initialContent) {
      this.editorControl.setValue(this.initialContent);
    }

    this.editorControl.valueChanges.subscribe(content => {
      this.contentChange.emit(content);
    });
  }

  onEditorCreated(editor: any) {
    // You can customize the editor instance here if needed
  }
}
