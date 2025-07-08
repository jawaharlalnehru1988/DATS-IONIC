import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonBackButton } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { playOutline, pauseOutline, arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonBackButton]
})
export class AudioPlayerComponent implements OnInit {
  audioSrc: string = '';
  imageSrc: string = '';
  author: string = '';
  title: string = '';
  cardTitle: string = '';
  description: string = '';
  category: string = '';
  
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  
  private audio: HTMLAudioElement | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    addIcons({ playOutline, pauseOutline, arrowBackOutline });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.audioSrc = params['audioSrc'] || '';
      this.imageSrc = params['imageSrc'] || '';
      this.author = params['author'] || '';
      this.title = params['title'] || '';
      this.cardTitle = params['cardTitle'] || '';
      this.description = params['description'] || '';
      this.category = params['category'] || '';
      
      this.initializeAudio();
    });
  }

  initializeAudio() {
    if (this.audioSrc) {
      this.audio = new Audio(this.audioSrc);
      
      this.audio.addEventListener('loadedmetadata', () => {
        this.duration = this.audio!.duration;
      });
      
      this.audio.addEventListener('timeupdate', () => {
        this.currentTime = this.audio!.currentTime;
      });
      
      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
      });
    }
  }

  togglePlayPause() {
    if (!this.audio) return;
    
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  seek(event: any) {
    if (!this.audio) return;
    const seekTime = (event.target.value / 100) * this.duration;
    this.audio.currentTime = seekTime;
  }

  goBack() {
    this.router.navigate(['/krishna-page']);
  }

  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }
}
