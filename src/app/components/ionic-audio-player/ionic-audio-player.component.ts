import { IonCardHeader, IonCardTitle, IonCard, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonRange, IonSpinner } from '@ionic/angular/standalone';
import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges, inject } from '@angular/core';

import { addIcons } from 'ionicons';
import { pause, play, repeat, stop, volumeHigh, volumeLow, playSkipBack, playSkipForward } from 'ionicons/icons';
import { AudioItem, AudioRange } from 'src/app/Utils/models';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-ionic-audio-player',
  templateUrl: './ionic-audio-player.component.html',
  styleUrls: ['./ionic-audio-player.component.scss'],
  imports: [IonCardHeader, IonCardTitle, IonCard, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonRange, IonSpinner]
})
export class IonicAudioPlayerComponent implements AfterViewInit, OnChanges {

  constructor(private cdr: ChangeDetectorRef){
    addIcons( {repeat, play, pause, stop, volumeHigh, volumeLow, playSkipBack, playSkipForward })
  }

  // Inject data sharing service for playlist functionality
  private dataSharingService = inject(DataSharingService);

  ngAfterViewInit() {
    // Setup audio element when component is initialized
    if (this.audioElement) {
      console.log('Setting up audio element...');
      
      // Set a small delay to ensure audio element is ready
      setTimeout(() => {
        this.isLoading = true;
        
        // Add event listeners for better audio handling
        this.audioElement.nativeElement.addEventListener('canplay', () => {
          console.log('Audio can play, setting up range and auto-playing...');
          this.isLoading = false;
          this.setupRangeIfSelected();
          
          // Auto-play audio when component is ready
          setTimeout(() => {
            this.play();
          }, 200); // Small delay to ensure range setup is complete
        });

        this.audioElement.nativeElement.addEventListener('error', (error) => {
          this.isLoading = false;
          console.error('Audio failed to load:', error);
        });

        this.audioElement.nativeElement.addEventListener('loadedmetadata', () => {
          console.log('Audio metadata loaded, duration:', this.audioElement.nativeElement.duration);
          this.duration = this.audioElement.nativeElement.duration;
        });

        // Load the audio
        this.audioElement.nativeElement.load();
      }, 100);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called with:', changes);
    
    // Handle selectedRange changes
    if (changes['selectedRange']) {
      console.log('selectedRange changed:', {
        previousValue: changes['selectedRange'].previousValue,
        currentValue: changes['selectedRange'].currentValue,
        audioElementExists: !!this.audioElement
      });
      
      this.setupRangeIfSelected();
      
      if (this.isPlaying) {
        console.log('Audio was playing, restarting with new range');
        this.pause();
        setTimeout(() => this.play(), 100); // Restart playback with new range
      }
    }
  }

  // Setup audio range based on selectedRange
  private setupRangeIfSelected() {
    console.log('setupRangeIfSelected called with:', this.selectedRange);
    
    if (this.selectedRange && this.selectedRange.start !== undefined && this.selectedRange.end !== undefined) {
      // Convert minutes.seconds format to total seconds
      this.rangeStartTime = this.convertMinutesSecondsToSeconds(this.selectedRange.start);
      this.rangeEndTime = this.convertMinutesSecondsToSeconds(this.selectedRange.end);
      this.isRangeMode = true;
      
      // Enable loop mode for range playback
      this.isLoop = true;
      
      console.log('Setting up audio range:', {
        rangeName: this.selectedRange.name,
        originalStart: this.selectedRange.start,
        originalEnd: this.selectedRange.end,
        convertedStart: this.rangeStartTime,
        convertedEnd: this.rangeEndTime,
        loopEnabled: this.isLoop
      });
      
      // Only set audio position if audio is not currently playing to avoid "krk" sound
      if (this.audioElement?.nativeElement && !this.isPlaying) {
        this.audioElement.nativeElement.currentTime = this.rangeStartTime;
        this.currentTime = this.rangeStartTime;
        console.log('Audio position set to range start:', this.rangeStartTime);
      } else if (this.isPlaying) {
        console.log('Audio is playing, position will be set when play() is called');
      } else {
        console.log('Audio element not ready, will set position on play');
      }
    } else {
      this.isRangeMode = false;
      this.rangeStartTime = 0;
      this.rangeEndTime = 0;
      // Disable loop when not in range mode
      this.isLoop = false;
      console.log('Range mode disabled, loop disabled');
    }
  }

  // Convert minutes.seconds format (e.g., 1.15) to total seconds (e.g., 75)
  // 1.15 means 1 minute and 15 seconds = 75 seconds total
  private convertMinutesSecondsToSeconds(minutesSeconds: number): number {
    const minutes = Math.floor(minutesSeconds);
    const seconds = Math.round((minutesSeconds - minutes) * 100);
    const totalSeconds = minutes * 60 + seconds;
    
    console.log('Time conversion:', {
      input: minutesSeconds,
      minutes: minutes,
      seconds: seconds,
      totalSeconds: totalSeconds
    });
    
    return totalSeconds;
  }

  @Input() audioData: AudioItem = { audioSrc: 'https://jawaharlalnehru1988.github.io/bgsloka/assets/tamilBgChapters/bgTamilChapter-2.mp3', imageSrc: 'https://res.cloudinary.com/dbmkctsda/image/upload/v1751499819/birthkrishna_xmngov.jpg', auther: 'Lord Krishna', title: 'bhagavad gita' };
  @Input() selectedRange: AudioRange | null = null;

  @ViewChild('audioElement', { static: false }) audioElement!: ElementRef<HTMLAudioElement>;
  isPlaying = false;
  isLoop = false;
  isLoading = false;
  volume = 1;

  duration = 0;
  currentTime = 0;
  
  // Range playback properties
  rangeStartTime = 0;
  rangeEndTime = 0;
  isRangeMode = false;
  audioInitialized = false;
  
  play() {
    console.log('Play button clicked. Current state:', {
      isPlaying: this.isPlaying,
      isRangeMode: this.isRangeMode,
      currentTime: this.currentTime,
      rangeStartTime: this.rangeStartTime,
      rangeEndTime: this.rangeEndTime,
      audioElementExists: !!this.audioElement?.nativeElement,
      audioInitialized: this.audioInitialized
    });
    
    if (!this.audioElement?.nativeElement) {
      console.error('Audio element not found!');
      return;
    }

    // Prevent multiple play attempts
    if (this.isPlaying) {
      console.log('Audio is already playing, ignoring play request');
      return;
    }

    // Initialize audio on first user interaction
    if (!this.audioInitialized) {
      this.audioElement.nativeElement.load();
      this.audioInitialized = true;
      console.log('Audio initialized on user interaction');
    }
    
    // If in range mode and not within range, set to start of range
    if (this.isRangeMode && (this.currentTime < this.rangeStartTime || this.currentTime >= this.rangeEndTime)) {
      console.log('Setting audio to range start:', {
        rangeStartTime: this.rangeStartTime,
        rangeEndTime: this.rangeEndTime,
        currentTimeBefore: this.currentTime
      });
      
      this.audioElement.nativeElement.currentTime = this.rangeStartTime;
      this.currentTime = this.rangeStartTime;
      
      console.log('Audio position set to:', {
        audioElementCurrentTime: this.audioElement.nativeElement.currentTime,
        componentCurrentTime: this.currentTime
      });
    }
    
    this.isLoading = true;
    const playPromise = this.audioElement.nativeElement.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.isLoading = false;
          console.log('Audio started playing successfully');
        })
        .catch((error) => {
          console.error('Play failed:', error);
          this.isPlaying = false;
          this.isLoading = false;
          
          // If auto-play fails due to browser policy, that's okay
          if (error.name === 'NotAllowedError') {
            console.log('Auto-play blocked by browser - user interaction required');
          }
        });
    } else {
      this.isPlaying = true;
      this.isLoading = false;
      console.log('Audio started playing (no promise)');
    }
  }

  pause() {
    console.log('Pause button clicked. Current state:', {
      isPlaying: this.isPlaying,
      currentTime: this.currentTime,
      audioElementExists: !!this.audioElement?.nativeElement
    });
    
    if (!this.audioElement?.nativeElement) {
      console.error('Audio element not found!');
      return;
    }
    
    this.audioElement.nativeElement.pause();
    this.isPlaying = false;
    console.log('Audio paused successfully');
  }

  stop() {
    console.log('Stop button clicked');
    
    if (!this.audioElement?.nativeElement) {
      console.error('Audio element not found!');
      return;
    }
    
    this.audioElement.nativeElement.pause();
    this.audioElement.nativeElement.currentTime = this.isRangeMode ? this.rangeStartTime : 0;
    this.isPlaying = false;
    this.currentTime = this.isRangeMode ? this.rangeStartTime : 0;
    console.log('Audio stopped and reset to:', this.currentTime);
  }
  
  toggleLoop() {
    this.isLoop = !this.isLoop;
    this.audioElement.nativeElement.loop = this.isLoop;
  }
  
  onVolumeChange(event: any) {
    this.volume = event.detail.value;
    this.audioElement.nativeElement.volume = this.volume;
  }
  
  onTimeUpdate() {
    const audioCurrentTime = this.audioElement.nativeElement.currentTime;
    this.currentTime = audioCurrentTime;
    
    // Handle range mode playback - only check when we're actually at or past the end
    if (this.isRangeMode && audioCurrentTime >= this.rangeEndTime) {
      console.log('Range end reached:', {
        currentTime: audioCurrentTime,
        rangeEndTime: this.rangeEndTime,
        isLoop: this.isLoop
      });
      
      if (this.isLoop) {
        // Loop the range - add a small buffer to prevent rapid jumping
        this.audioElement.nativeElement.currentTime = this.rangeStartTime;
        this.currentTime = this.rangeStartTime;
        console.log('Looping back to range start:', this.rangeStartTime);
      } else {
        // Stop when range ends
        console.log('Range finished, pausing audio');
        this.pause();
      }
    }
    
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
    let seekTime = event.detail.value;
    
    // If in range mode, constrain seeking within the range
    if (this.isRangeMode) {
      seekTime = Math.max(this.rangeStartTime, Math.min(this.rangeEndTime, seekTime));
    }
    
    this.audioElement.nativeElement.currentTime = seekTime;
    this.currentTime = seekTime;
  }

  // Get progress bar minimum value
  getProgressMin(): number {
    return this.isRangeMode ? this.rangeStartTime : 0;
  }

  // Get progress bar maximum value  
  getProgressMax(): number {
    return this.isRangeMode ? this.rangeEndTime : this.duration;
  }

  // Get current time for display (adjusted for range mode)
  getDisplayCurrentTime(): number {
    if (this.isRangeMode) {
      // Ensure current time is within the selected range for display
      return Math.max(this.rangeStartTime, Math.min(this.rangeEndTime, this.currentTime));
    }
    return this.currentTime;
  }

  // Toggle play/pause for image overlay
  togglePlayPause() {
    console.log('Image clicked. Current isPlaying state:', this.isPlaying);
    
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  // Playlist navigation methods
  playNext() {
    console.log('Next button clicked');
    
    // Pause current audio first
    if (this.isPlaying) {
      this.pause();
    }
    
    const nextItem = this.dataSharingService.playNext();
    if (nextItem) {
      console.log('Moving to next item:', nextItem.title);
      
      // Small delay to ensure new audio data is set
      setTimeout(() => {
        this.setupRangeIfSelected();
        this.play();
      }, 100);
    } else {
      console.log('No next item available');
    }
  }

  playPrevious() {
    console.log('Previous button clicked');
    
    // Pause current audio first
    if (this.isPlaying) {
      this.pause();
    }
    
    const prevItem = this.dataSharingService.playPrevious();
    if (prevItem) {
      console.log('Moving to previous item:', prevItem.title);
      
      // Small delay to ensure new audio data is set
      setTimeout(() => {
        this.setupRangeIfSelected();
        this.play();
      }, 100);
    } else {
      console.log('No previous item available');
    }
  }

  // Check if next item is available
  hasNext(): boolean {
    return this.dataSharingService.getPlaylistService().hasNext();
  }

  // Check if previous item is available
  hasPrevious(): boolean {
    return this.dataSharingService.getPlaylistService().hasPrevious();
  }

  // Get current playlist info for debugging
  getPlaylistInfo() {
    return this.dataSharingService.getPlaylistService().getPlaylistInfo();
  }

}
