import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PoojaRulesModel } from './tutorial.model';
import { Observable, catchError, of, timeout, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getTutorials(): Observable<PoojaRulesModel[]> {
    console.log('🔍 TutorialService - Attempting to fetch tutorials from:', environment.apiNestBaseUrl + '/blog');
    
    return this.http.get<PoojaRulesModel[]>(environment.apiNestBaseUrl + '/blog')
      .pipe(
        timeout(10000),
        retry(2),
        catchError((error: HttpErrorResponse) => {
          console.error('❌ TutorialService - API Error:', error.status, error.message);
          console.warn('⚠️ TutorialService - Backend unavailable, returning empty array');
          return of([]);
        })
      );
  }

  getTutorialById(_id: string): Observable<PoojaRulesModel | null> {
    console.log('🔍 TutorialService - Attempting to fetch tutorial:', _id);
    
    return this.http.get<PoojaRulesModel>(`${environment.apiNestBaseUrl}/blog/${_id}`)
      .pipe(
        timeout(10000),
        retry(2),
        catchError((error: HttpErrorResponse) => {
          console.error('❌ TutorialService - API Error for tutorial', _id, ':', error.status, error.message);
          console.warn('⚠️ TutorialService - Backend unavailable, returning null');
          return of(null);
        })
      );
  }
}
