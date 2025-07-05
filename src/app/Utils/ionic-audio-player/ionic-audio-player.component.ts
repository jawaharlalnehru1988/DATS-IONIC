import { IonCardHeader, IonCardTitle, IonCard, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonRange } from '@ionic/angular/standalone';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-ionic-audio-player',
  templateUrl: './ionic-audio-player.component.html',
  styleUrls: ['./ionic-audio-player.component.scss'],
  imports: [IonCardHeader, IonCardTitle, IonCard, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonRange ]
})
export class IonicAudioPlayerComponent  {

  @Input() audioData: {
    audioSrc: string,
    imageSrc: string,
    auther: string,
    title: string
  } = { audioSrc: 'https://jawaharlalnehru1988.github.io/bgsloka/assets/tamilBgChapters/bgTamilChapter-2.mp3', imageSrc: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751499819/birthkrishna_xmngov.jpg', auther: 'Lord Krishna', title: 'bhagavad gita' };

  @ViewChild('audioElement', { static: false }) audioElement!: ElementRef<HTMLAudioElement>;
  isPlaying = false;
  isLoop = false;
  volume = 1;

  play() {
    this.audioElement.nativeElement.play();
    this.isPlaying = true;
  }

  pause() {
    this.audioElement.nativeElement.pause();
    this.isPlaying = false;
  }

  stop() {
    this.audioElement.nativeElement.pause();
    this.audioElement.nativeElement.currentTime = 0;
    this.isPlaying = false;
  }

  toggleLoop() {
    this.isLoop = !this.isLoop;
    this.audioElement.nativeElement.loop = this.isLoop;
  }

  onVolumeChange(event: any) {
    this.volume = event.detail.value;
    this.audioElement.nativeElement.volume = this.volume;
  }
}
