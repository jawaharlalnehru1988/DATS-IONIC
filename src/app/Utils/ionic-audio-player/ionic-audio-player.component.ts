import { IonCardHeader, IonCardTitle, IonCard, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonRange } from '@ionic/angular/standalone';
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { addIcons } from 'ionicons';
import { pause, play, repeat, stop, stopwatchSharp, volumeHigh, volumeLow } from 'ionicons/icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ionic-audio-player',
  templateUrl: './ionic-audio-player.component.html',
  styleUrls: ['./ionic-audio-player.component.scss'],
  imports: [IonCardHeader, DatePipe, IonCardTitle, IonCard, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonRange ]
})
export class IonicAudioPlayerComponent  {

  constructor(private cdr: ChangeDetectorRef){
    addIcons( {repeat, play, pause, stop, volumeHigh, volumeLow })
  }

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

  duration = 0;
  
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
  
  currentTime = 0;
    onTimeUpdate() {
    this.currentTime = this.audioElement.nativeElement.currentTime;
      this.cdr.detectChanges(); 
  }

formatTime(seconds: number): string {
  if (!seconds) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}
  onLoadedMetadata(e:Event) {
  console.log('e :', e.timeStamp);
    this.duration = this.audioElement.nativeElement.duration;
    console.log('    this.duration :',     this.duration);
  }

  seekTo(event: any) {
    this.audioElement.nativeElement.currentTime = event.detail.value;
    this.currentTime = event.detail.value;
  }

}
