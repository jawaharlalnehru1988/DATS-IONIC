import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

interface RatingData {
  cardId: string;
  userId?: string;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RatingResponse {
  success: boolean;
  message: string;
  data?: RatingData;
  averageRating?: number;
  totalRatings?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private baseUrl = environment.apiNestBaseUrl;
  
  // Local storage for ratings when offline or no backend
  private localRatings = new BehaviorSubject<Map<string, number>>(new Map());

  constructor(private http: HttpClient) {
    this.loadLocalRatings();
  }

  /**
   * Submit a rating for a card
   */
  submitRating(cardId: string, rating: number, userId?: string): Observable<RatingResponse> {
    const ratingData: RatingData = {
      cardId,
      rating,
      userId: userId || 'anonymous',
      createdAt: new Date()
    };

    // Try to submit to backend
    return new Observable(observer => {
      this.http.post<RatingResponse>(`${this.baseUrl}/ratings`, ratingData).subscribe({
        next: (response) => {
          // Update local storage on successful backend submission
          this.updateLocalRating(cardId, rating);
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          console.warn('Backend rating submission failed, storing locally:', error);
          // Fallback to local storage
          this.updateLocalRating(cardId, rating);
          const fallbackResponse: RatingResponse = {
            success: true,
            message: 'Rating saved locally',
            data: ratingData
          };
          observer.next(fallbackResponse);
          observer.complete();
        }
      });
    });
  }

  /**
   * Get rating for a specific card
   */
  getCardRating(cardId: string): Observable<number> {
    return new Observable(observer => {
      // Try to get from backend first
      this.http.get<RatingResponse>(`${this.baseUrl}/ratings/${cardId}`).subscribe({
        next: (response) => {
          const rating = response.data?.rating || 0;
          observer.next(rating);
          observer.complete();
        },
        error: (error) => {
          console.warn('Backend rating fetch failed, using local storage:', error);
          // Fallback to local storage
          const localRating = this.getLocalRating(cardId);
          observer.next(localRating);
          observer.complete();
        }
      });
    });
  }

  /**
   * Get average rating for a card
   */
  getAverageRating(cardId: string): Observable<{ average: number; total: number }> {
    return new Observable(observer => {
      this.http.get<RatingResponse>(`${this.baseUrl}/ratings/${cardId}/average`).subscribe({
        next: (response) => {
          observer.next({
            average: response.averageRating || 0,
            total: response.totalRatings || 0
          });
          observer.complete();
        },
        error: (error) => {
          console.warn('Backend average rating fetch failed:', error);
          // Fallback to local rating
          const localRating = this.getLocalRating(cardId);
          observer.next({
            average: localRating,
            total: localRating > 0 ? 1 : 0
          });
          observer.complete();
        }
      });
    });
  }

  /**
   * Get all user ratings
   */
  getUserRatings(userId: string): Observable<RatingData[]> {
    return this.http.get<RatingData[]>(`${this.baseUrl}/ratings/user/${userId}`);
  }

  /**
   * Update a rating
   */
  updateRating(cardId: string, rating: number, userId?: string): Observable<RatingResponse> {
    const ratingData: RatingData = {
      cardId,
      rating,
      userId: userId || 'anonymous',
      updatedAt: new Date()
    };

    return new Observable(observer => {
      this.http.put<RatingResponse>(`${this.baseUrl}/ratings/${cardId}`, ratingData).subscribe({
        next: (response) => {
          this.updateLocalRating(cardId, rating);
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          console.warn('Backend rating update failed, storing locally:', error);
          this.updateLocalRating(cardId, rating);
          const fallbackResponse: RatingResponse = {
            success: true,
            message: 'Rating updated locally',
            data: ratingData
          };
          observer.next(fallbackResponse);
          observer.complete();
        }
      });
    });
  }

  /**
   * Delete a rating
   */
  deleteRating(cardId: string, userId?: string): Observable<RatingResponse> {
    return new Observable(observer => {
      this.http.delete<RatingResponse>(`${this.baseUrl}/ratings/${cardId}?userId=${userId || 'anonymous'}`).subscribe({
        next: (response) => {
          this.removeLocalRating(cardId);
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          console.warn('Backend rating deletion failed:', error);
          this.removeLocalRating(cardId);
          const fallbackResponse: RatingResponse = {
            success: true,
            message: 'Rating removed locally'
          };
          observer.next(fallbackResponse);
          observer.complete();
        }
      });
    });
  }

  // Local storage methods
  private loadLocalRatings(): void {
    try {
      const stored = localStorage.getItem('cardRatings');
      if (stored) {
        const ratingsObject = JSON.parse(stored) as Record<string, number>;
        const ratingsMap = new Map<string, number>();
        for (const [key, value] of Object.entries(ratingsObject)) {
          ratingsMap.set(key, value);
        }
        this.localRatings.next(ratingsMap);
      }
    } catch (error) {
      console.error('Error loading local ratings:', error);
    }
  }

  private updateLocalRating(cardId: string, rating: number): void {
    const currentRatings = this.localRatings.value;
    currentRatings.set(cardId, rating);
    this.localRatings.next(currentRatings);
    this.saveToLocalStorage();
  }

  private removeLocalRating(cardId: string): void {
    const currentRatings = this.localRatings.value;
    currentRatings.delete(cardId);
    this.localRatings.next(currentRatings);
    this.saveToLocalStorage();
  }

  private getLocalRating(cardId: string): number {
    return this.localRatings.value.get(cardId) || 0;
  }

  private saveToLocalStorage(): void {
    try {
      const ratingsObject: Record<string, number> = {};
      this.localRatings.value.forEach((value, key) => {
        ratingsObject[key] = value;
      });
      localStorage.setItem('cardRatings', JSON.stringify(ratingsObject));
    } catch (error) {
      console.error('Error saving ratings to local storage:', error);
    }
  }

  // Observable for reactive updates
  getLocalRatings(): Observable<Map<string, number>> {
    return this.localRatings.asObservable();
  }
}
