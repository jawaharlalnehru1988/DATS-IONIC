import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryCardInput } from '../../models/card.model';
import { InputData } from '../../models';
import { Observable, catchError, of, timeout, retry } from 'rxjs';
import { ToastService } from '../../../services/toast.service';
import { KrishnaServiceService } from '../../../krishna-page/krishna-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryFormService {

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private krishnaService: KrishnaServiceService
  ) { }

  private getEndpoint(pageIdentifier: string): string {
    switch (pageIdentifier) {
      case 'krishna-page':
        return '/ram-bhajan';
      case 'music-details':
      default:
        return '/bg-sloka-chapters';
    }
  }

  addCategory(categoryData: CategoryCardInput, pageIdentifier: string = 'music-details') {
    const endpoint = this.getEndpoint(pageIdentifier);
    return this.http.post(environment.apiNestBaseUrl + endpoint, categoryData)
      .pipe(
        timeout(15000),
        retry(1),
        catchError((error: HttpErrorResponse) => {
          console.error('❌ CategoryFormService - Add Category Error:', error.status, error.message);
          this.toastService.showError('Failed to add category. Please try again.');
          throw error;
        })
      );
  }

  updateCategory(categoryId: string, categoryData: CategoryCardInput, pageIdentifier: string = 'music-details') {
    const endpoint = this.getEndpoint(pageIdentifier);
    return this.http.put(environment.apiNestBaseUrl + `${endpoint}/${categoryId}`, categoryData)
      .pipe(
        timeout(15000),
        retry(1),
        catchError((error: HttpErrorResponse) => {
          console.error('❌ CategoryFormService - Update Category Error:', error.status, error.message);
          this.toastService.showError('Failed to update category. Please try again.');
          throw error;
        })
      );
  }
  
  deleteCategory(categoryId: string, pageIdentifier: string = 'music-details') {
    const endpoint = this.getEndpoint(pageIdentifier);
    return this.http.delete(environment.apiNestBaseUrl + `${endpoint}/${categoryId}`)
      .pipe(
        timeout(15000),
        retry(1),
        catchError((error: HttpErrorResponse) => {
          console.error('❌ CategoryFormService - Delete Category Error:', error.status, error.message);
          this.toastService.showError('Failed to delete category. Please try again.');
          throw error;
        })
      );
  }
  
  getCategoryById(categoryId: string, pageIdentifier: string = 'music-details') {
    const endpoint = this.getEndpoint(pageIdentifier);
    return this.http.get(environment.apiNestBaseUrl + `${endpoint}/${categoryId}`)
      .pipe(
        timeout(10000),
        retry(2),
        catchError((error: HttpErrorResponse) => {
          console.error('❌ CategoryFormService - Get Category Error:', error.status, error.message);
          this.toastService.showError('Failed to load category details.');
          throw error;
        })
      );
  }
  
  getAllCategories(pageIdentifier: string = 'music-details'): Observable<InputData[]> {
    const endpoint = this.getEndpoint(pageIdentifier);
    console.log('🔍 CategoryFormService - Fetching categories for:', pageIdentifier, 'from:', environment.apiNestBaseUrl + endpoint);
    
    return this.http.get<InputData[]>(environment.apiNestBaseUrl + endpoint)
      .pipe(
        timeout(10000),
        retry(2),
        catchError((error: HttpErrorResponse) => {
          console.error('❌ CategoryFormService - Get All Categories Error:', error.status, error.message);
          console.warn('⚠️ CategoryFormService - Backend unavailable, using fallback data');
          
          // Show user-friendly error message
          this.toastService.showBackendError();
          
          // Return fallback data based on page identifier
          if (pageIdentifier === 'krishna-page') {
            return of(this.krishnaService.defaultInputData);
          } else {
            // Return empty array for other pages if no fallback data available
            return of([]);
          }
        })
      );
  }
}
