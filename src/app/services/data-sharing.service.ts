import { Injectable, signal, inject } from '@angular/core';
import { CardItem, AudioItem } from '../Utils/models';
import { PlaylistService } from './playlist.service';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  // Signal to store the selected card item
  private selectedCardItem = signal<CardItem | null>(null);
  
  // Signal to store the audio data for the audio player
  private audioData = signal<AudioItem | null>(null);

  // Inject playlist service
  private playlistService = inject(PlaylistService);

  constructor() { }

  // Methods to set data
  setSelectedCardItem(item: CardItem) {
    this.selectedCardItem.set(item);
    if (item.audioData) {
      this.audioData.set(item.audioData);
    }
    
    // Update playlist current item
    this.playlistService.setCurrentItem(item);
  }

  setAudioData(audio: AudioItem) {
    this.audioData.set(audio);
  }

  // New method to set playlist data
  setPlaylistData(items: CardItem[]) {
    this.playlistService.setPlaylist(items);
  }

  // Methods to get data (readonly signals)
  getSelectedCardItem() {
    return this.selectedCardItem.asReadonly();
  }

  getAudioData() {
    return this.audioData.asReadonly();
  }

  // Get playlist service for navigation
  getPlaylistService() {
    return this.playlistService;
  }

  // Navigate to next item in playlist
  playNext(): CardItem | null {
    const nextItem = this.playlistService.playNext();
    if (nextItem) {
      this.selectedCardItem.set(nextItem);
      if (nextItem.audioData) {
        this.audioData.set(nextItem.audioData);
      }
    }
    return nextItem;
  }

  // Navigate to previous item in playlist
  playPrevious(): CardItem | null {
    const prevItem = this.playlistService.playPrevious();
    if (prevItem) {
      this.selectedCardItem.set(prevItem);
      if (prevItem.audioData) {
        this.audioData.set(prevItem.audioData);
      }
    }
    return prevItem;
  }

  // Clear data
  clearData() {
    this.selectedCardItem.set(null);
    this.audioData.set(null);
    this.playlistService.clearPlaylist();
  }
}
