import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ThemeService, ThemeType } from '../../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chant-section',
  templateUrl: './chant-section.component.html',
  styleUrls: ['./chant-section.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ChantSectionComponent implements OnInit, OnDestroy {
  
  @Input() title: string = '✨ Chant and Be Happy ✨';
  
  currentTheme$: Observable<ThemeType>;
  private mantraAudio: HTMLAudioElement | null = null;
  public isMantraPlaying = false;

  constructor(private themeService: ThemeService) {
    this.currentTheme$ = this.themeService.currentTheme$;
    this.initializeMantraAudio();
  }

  ngOnInit() {}

  private initializeMantraAudio() {
    try {
      this.mantraAudio = new Audio('assets/music/SrilaPrabhupadaChanting.mp3');
      this.mantraAudio.preload = 'auto';
      
      // Set up event listeners
      this.mantraAudio.addEventListener('ended', () => {
        this.isMantraPlaying = false;
        console.log('🕉️ Mantra playback completed');
      });
      
      this.mantraAudio.addEventListener('error', (e) => {
        console.error('Error loading mantra audio:', e);
        this.isMantraPlaying = false;
      });
      
      this.mantraAudio.addEventListener('canplaythrough', () => {
        console.log('🕉️ Mantra audio ready to play');
      });
      
    } catch (error) {
      console.error('Failed to initialize mantra audio:', error);
    }
  }

  private async playMantraAudio(): Promise<void> {
    if (!this.mantraAudio || this.isMantraPlaying) {
      return;
    }

    try {
      this.isMantraPlaying = true;
      this.mantraAudio.currentTime = 0; // Reset to beginning
      await this.mantraAudio.play();
      console.log('🕉️ Playing Hare Krishna mantra...');
    } catch (error) {
      console.error('Error playing mantra:', error);
      this.isMantraPlaying = false;
    }
  }

  onMantraClick(mantraType: string) {
    // Prevent rapid clicking while mantra is playing
    if (this.isMantraPlaying) {
      console.log('🕉️ Mantra is already playing. Please wait for it to finish.');
      return;
    }

    // Create inspiring visual feedback
    const element = event?.target as HTMLElement;
    if (element) {
      element.style.transform = 'scale(1.1)';
      element.style.transition = 'all 0.2s ease';
      element.style.background = 'rgba(255, 215, 0, 0.2)';
      
      setTimeout(() => {
        element.style.transform = 'scale(1.0)';
        element.style.background = '';
      }, 300);
    }

    // Play the mantra audio
    this.playMantraAudio();

    // Log the mantra chanting for analytics
    console.log(`🕉️ User initiated chanting: ${mantraType}`);
    
    // Optional: Add haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }

  // Cleanup method for component destruction
  ngOnDestroy() {
    if (this.mantraAudio) {
      this.mantraAudio.pause();
      this.mantraAudio = null;
    }
  }
}
