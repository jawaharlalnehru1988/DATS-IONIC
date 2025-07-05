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
  } = { audioSrc: '', imageSrc: '', auther: '', title: '' };

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
