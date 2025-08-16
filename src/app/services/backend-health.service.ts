import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject, interval } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface BackendStatus {
  isAvailable: boolean;
  url: string;
  lastChecked: Date;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
class BackendHealthService {
  private statusSubject = new BehaviorSubject<BackendStatus>({
    isAvailable: false,
    url: environment.apiNestBaseUrl,
    lastChecked: new Date(),
    error: 'Not checked yet'
  });

  public status$ = this.statusSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check backend health every 5 minutes
    this.startHealthCheck();
  }

  private startHealthCheck(): void {
    interval(300000) // 5 minutes
      .pipe(
        startWith(0), // Start immediately
        switchMap(() => this.checkBackendHealth())
      )
      .subscribe(status => {
        this.statusSubject.next(status);
        console.log('🏥 Backend Health Check:', status);
      });
  }

  private checkBackendHealth(): Observable<BackendStatus> {
    const checkUrl = environment.apiNestBaseUrl;
    
    return this.http.get(checkUrl, { 
      responseType: 'text'
    }).pipe(
      map(() => ({
        isAvailable: true,
        url: checkUrl,
        lastChecked: new Date()
      })),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Unknown error';
        
        if (error.status === 0) {
          errorMessage = 'Network error - server unreachable';
        } else if (error.status === 404) {
          errorMessage = 'Server found but endpoint not available';
        } else if (error.status >= 500) {
          errorMessage = `Server error: ${error.status}`;
        } else {
          errorMessage = `HTTP ${error.status}: ${error.message}`;
        }

        return of({
          isAvailable: false,
          url: checkUrl,
          lastChecked: new Date(),
          error: errorMessage
        });
      })
    );
  }

  public manualHealthCheck(): Observable<BackendStatus> {
    return this.checkBackendHealth();
  }

  public getCurrentStatus(): BackendStatus {
    return this.statusSubject.value;
  }

  public isBackendAvailable(): boolean {
    return this.statusSubject.value.isAvailable;
  }
}
