import { Injectable, signal } from '@angular/core';
import { CardItem, AudioItem } from '../Utils/models';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  // Signal to store the selected card item
  private selectedCardItem = signal<CardItem | null>(null);
  
  // Signal to store the audio data for the audio player
  private audioData = signal<AudioItem | null>(null);

  constructor() { }

  // Methods to set data
  setSelectedCardItem(item: CardItem) {
    this.selectedCardItem.set(item);
    if (item.audioData) {
      this.audioData.set(item.audioData);
    }
  }

  setAudioData(audio: AudioItem) {
    this.audioData.set(audio);
  }

  // Methods to get data (readonly signals)
  getSelectedCardItem() {
    return this.selectedCardItem.asReadonly();
  }

  getAudioData() {
    return this.audioData.asReadonly();
  }

  // Clear data
  clearData() {
    this.selectedCardItem.set(null);
    this.audioData.set(null);
  }
}
