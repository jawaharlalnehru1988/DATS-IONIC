import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioComponent } from '../Utils/audio/audio.component';
import { Language } from '../Utils/models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
  standalone: true,
  imports: [AudioComponent, CommonModule, FormsModule],
})
export class MusicPage implements OnInit {
  languages = [
    { topic: 'Srimad Bhagavat Gita', title: 'English' }
  ];
  isShowGrid: boolean = true; // Flag to control grid visibility

  languageList: Language[] = [ ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onCardClick(language: { topic: string; title: string }) {
  console.log('language :', language);
    this.router.navigate(['/music-details', language.topic]);
    
  }

  
}
