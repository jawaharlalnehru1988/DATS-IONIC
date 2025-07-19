import { Injectable, signal, computed } from '@angular/core';
import { CardItem } from '../Utils/models';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  // Signals for playlist management
  private playlistItems = signal<CardItem[]>([]);
  private currentIndex = signal<number>(-1);

  constructor() {}

  // Computed properties
  currentItem = computed(() => {
    const index = this.currentIndex();
    const items = this.playlistItems();
    return index >= 0 && index < items.length ? items[index] : null;
  });

  hasNext = computed(() => {
    const index = this.currentIndex();
    const items = this.playlistItems();
    return index >= 0 && index < items.length - 1;
  });

  hasPrevious = computed(() => {
    const index = this.currentIndex();
    return index > 0;
  });

  playlistLength = computed(() => this.playlistItems().length);

  // Set the playlist from sorted card items
  setPlaylist(items: CardItem[]) {
    console.log('Setting playlist with items:', items.length);
    this.playlistItems.set([...items]);
    
    // Reset current index if playlist changes
    this.currentIndex.set(-1);
  }

  // Set current playing item and find its index in playlist
  setCurrentItem(item: CardItem) {
    const items = this.playlistItems();
    const index = items.findIndex(card => card._id === item._id);
    
    console.log('Setting current item:', {
      itemTitle: item.title,
      foundIndex: index,
      playlistLength: items.length
    });
    
    if (index >= 0) {
      this.currentIndex.set(index);
    } else {
      // If item not found in playlist, add it as single item
      this.playlistItems.set([item]);
      this.currentIndex.set(0);
      console.log('Item not in playlist, setting as single item');
    }
  }

  // Navigate to next item
  playNext(): CardItem | null {
    const index = this.currentIndex();
    const items = this.playlistItems();
    
    if (index >= 0 && index < items.length - 1) {
      const nextIndex = index + 1;
      this.currentIndex.set(nextIndex);
      const nextItem = items[nextIndex];
      
      console.log('Playing next:', {
        nextIndex: nextIndex,
        nextItemTitle: nextItem.title,
        totalItems: items.length
      });
      
      return nextItem;
    }
    
    console.log('No next item available');
    return null;
  }

  // Navigate to previous item
  playPrevious(): CardItem | null {
    const index = this.currentIndex();
    const items = this.playlistItems();
    
    if (index > 0) {
      const prevIndex = index - 1;
      this.currentIndex.set(prevIndex);
      const prevItem = items[prevIndex];
      
      console.log('Playing previous:', {
        prevIndex: prevIndex,
        prevItemTitle: prevItem.title,
        totalItems: items.length
      });
      
      return prevItem;
    }
    
    console.log('No previous item available');
    return null;
  }

  // Get current playlist info
  getPlaylistInfo() {
    return {
      currentIndex: this.currentIndex(),
      totalItems: this.playlistItems().length,
      currentItem: this.currentItem(),
      hasNext: this.hasNext(),
      hasPrevious: this.hasPrevious()
    };
  }

  // Clear playlist
  clearPlaylist() {
    this.playlistItems.set([]);
    this.currentIndex.set(-1);
    console.log('Playlist cleared');
  }
}
