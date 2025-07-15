import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleEditorComponent } from './article-editor.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ArticleEditorComponent
  ],
  exports: [
    ArticleEditorComponent
  ]
})
export class ArticleEditorModule { }
