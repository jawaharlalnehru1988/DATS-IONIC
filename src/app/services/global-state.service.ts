import { Injectable, signal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { InputData } from '../Utils/models';
import { CategoryFormService } from '../Utils/components/category-form/category-form.service';
import { KrishnaServiceService } from '../krishna-page/krishna-service.service';

export interface CacheState {
  data: InputData[];
  lastFetched: number;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {
  // Cache duration: 5 minutes (300,000 ms)
  private readonly CACHE_DURATION = 5 * 60 * 1000;
  
  // Krishna page state
  private krishnaPageState = signal<CacheState>({
    data: [],
    lastFetched: 0,
    isLoading: false,
    hasError: false
  });

  // Music details page state
  private musicDetailsState = signal<CacheState>({
    data: [],
    lastFetched: 0,
    isLoading: false,
    hasError: false
  });

  // Page refresh detection
  private isPageRefresh = signal<boolean>(false);

  constructor(
    private categoryService: CategoryFormService,
    private krishnaService: KrishnaServiceService
  ) {
    // Detect page refresh
    this.detectPageRefresh();
  }

  private detectPageRefresh(): void {
    // Check if this is a page refresh by looking at navigation type
    const navigation = (performance as any).getEntriesByType?.('navigation')?.[0];
    if (navigation?.type === 'reload') {
      this.isPageRefresh.set(true);
      // Clear all cached data on page refresh
      this.clearAllCache();
    }
  }

  // Public getters for components to access state
  get krishnaPageData() {
    return computed(() => this.krishnaPageState().data);
  }

  get krishnaPageLoading() {
    return computed(() => this.krishnaPageState().isLoading);
  }

  get krishnaPageError() {
    return computed(() => this.krishnaPageState().hasError);
  }

  get musicDetailsData() {
    return computed(() => this.musicDetailsState().data);
  }

  get musicDetailsLoading() {
    return computed(() => this.musicDetailsState().isLoading);
  }

  get musicDetailsError() {
    return computed(() => this.musicDetailsState().hasError);
  }

  /**
   * Get Krishna page data with intelligent caching
   * @param forceRefresh - Force fetch from API even if cache is valid
   * @returns Promise<InputData[]>
   */
  async getKrishnaPageData(forceRefresh: boolean = false): Promise<InputData[]> {
    const currentState = this.krishnaPageState();
    const now = Date.now();
    const isCacheValid = !forceRefresh && 
                        currentState.data.length > 0 && 
                        (now - currentState.lastFetched) < this.CACHE_DURATION &&
                        !this.isPageRefresh();

    // Return cached data if valid
    if (isCacheValid && !currentState.hasError) {
      console.log('🚀 Returning cached Krishna page data');
      return currentState.data;
    }

    // Set loading state
    this.krishnaPageState.update(state => ({
      ...state,
      isLoading: true,
      hasError: false
    }));

    try {
      console.log('📡 Fetching Krishna page data from backend');
      const data = await this.fetchKrishnaData();
      
      // Update state with new data
      this.krishnaPageState.set({
        data,
        lastFetched: now,
        isLoading: false,
        hasError: false
      });

      // Reset page refresh flag after successful fetch
      this.isPageRefresh.set(false);

      return data;
    } catch (error) {
      console.error('❌ Error fetching Krishna data:', error);
      
      // Update error state but keep any existing data
      this.krishnaPageState.update(state => ({
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      }));

      // Return fallback data if API fails
      const fallbackData = this.krishnaService.defaultInputData;
      
      // Update state with fallback data if no cached data exists
      if (currentState.data.length === 0) {
        this.krishnaPageState.update(state => ({
          ...state,
          data: fallbackData,
          lastFetched: now,
          hasError: false // Clear error since we have fallback data
        }));
      }

      return currentState.data.length > 0 ? currentState.data : fallbackData;
    }
  }

  /**
   * Get Music details page data with intelligent caching
   * @param forceRefresh - Force fetch from API even if cache is valid
   * @returns Promise<InputData[]>
   */
  async getMusicDetailsData(forceRefresh: boolean = false): Promise<InputData[]> {
    const currentState = this.musicDetailsState();
    const now = Date.now();
    const isCacheValid = !forceRefresh && 
                        currentState.data.length > 0 && 
                        (now - currentState.lastFetched) < this.CACHE_DURATION &&
                        !this.isPageRefresh();

    // Return cached data if valid
    if (isCacheValid && !currentState.hasError) {
      console.log('🚀 Returning cached Music details data');
      return currentState.data;
    }

    // Set loading state
    this.musicDetailsState.update(state => ({
      ...state,
      isLoading: true,
      hasError: false
    }));

    try {
      console.log('📡 Fetching Music details data from backend');
      const data = await this.fetchMusicDetailsData();
      
      // Update state with new data
      this.musicDetailsState.set({
        data,
        lastFetched: now,
        isLoading: false,
        hasError: false
      });

      // Reset page refresh flag after successful fetch
      this.isPageRefresh.set(false);

      return data;
    } catch (error) {
      console.error('❌ Error fetching Music details data:', error);
      
      // Update error state but keep any existing data
      this.musicDetailsState.update(state => ({
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      }));

      // Return existing cached data or empty array
      return currentState.data;
    }
  }

  /**
   * Force refresh data for a specific page
   * @param pageType - 'krishna' | 'music-details'
   */
  async refreshPageData(pageType: 'krishna' | 'music-details'): Promise<InputData[]> {
    console.log(`🔄 Force refreshing ${pageType} page data...`);
    
    if (pageType === 'krishna') {
      // Set loading state before refresh
      this.krishnaPageState.update(state => ({
        ...state,
        isLoading: true,
        hasError: false
      }));
      
      return this.getKrishnaPageData(true);
    } else {
      // Set loading state before refresh
      this.musicDetailsState.update(state => ({
        ...state,
        isLoading: true,
        hasError: false
      }));
      
      return this.getMusicDetailsData(true);
    }
  }

  /**
   * Clear cache for a specific page
   * @param pageType - 'krishna' | 'music-details' | 'all'
   */
  clearCache(pageType: 'krishna' | 'music-details' | 'all' = 'all'): void {
    if (pageType === 'krishna' || pageType === 'all') {
      this.krishnaPageState.set({
        data: [],
        lastFetched: 0,
        isLoading: false,
        hasError: false
      });
    }

    if (pageType === 'music-details' || pageType === 'all') {
      this.musicDetailsState.set({
        data: [],
        lastFetched: 0,
        isLoading: false,
        hasError: false
      });
    }

    console.log(`🗑️ Cache cleared for: ${pageType}`);
  }

  /**
   * Clear all cached data
   */
  private clearAllCache(): void {
    this.clearCache('all');
  }

  /**
   * Check if cache is valid for a specific page
   * @param pageType - 'krishna' | 'music-details'
   * @returns boolean
   */
  isCacheValid(pageType: 'krishna' | 'music-details'): boolean {
    const state = pageType === 'krishna' ? this.krishnaPageState() : this.musicDetailsState();
    const now = Date.now();
    
    return state.data.length > 0 && 
           (now - state.lastFetched) < this.CACHE_DURATION && 
           !state.hasError &&
           !this.isPageRefresh();
  }

  /**
   * Get cache info for debugging
   */
  getCacheInfo(): {
    krishna: { dataCount: number; lastFetched: Date | null; isValid: boolean };
    musicDetails: { dataCount: number; lastFetched: Date | null; isValid: boolean };
  } {
    const krishnaState = this.krishnaPageState();
    const musicState = this.musicDetailsState();

    return {
      krishna: {
        dataCount: krishnaState.data.length,
        lastFetched: krishnaState.lastFetched ? new Date(krishnaState.lastFetched) : null,
        isValid: this.isCacheValid('krishna')
      },
      musicDetails: {
        dataCount: musicState.data.length,
        lastFetched: musicState.lastFetched ? new Date(musicState.lastFetched) : null,
        isValid: this.isCacheValid('music-details')
      }
    };
  }

  // Private methods to fetch data
  private fetchKrishnaData(): Promise<InputData[]> {
    return new Promise((resolve, reject) => {
      this.categoryService.getAllCategories('krishna-page').subscribe({
        next: (data: InputData[]) => {
          if (data && data.length > 0) {
            resolve(data);
          } else {
            // Use default data if API returns empty
            resolve(this.krishnaService.defaultInputData);
          }
        },
        error: (error) => reject(error)
      });
    });
  }

  private fetchMusicDetailsData(): Promise<InputData[]> {
    return new Promise((resolve, reject) => {
      this.categoryService.getAllCategories('music-details').subscribe({
        next: (data: InputData[]) => resolve(data || []),
        error: (error) => reject(error)
      });
    });
  }
}
