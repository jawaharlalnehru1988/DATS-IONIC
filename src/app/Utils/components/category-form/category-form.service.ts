import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryCardInput } from '../../models/card.model';
import { InputData } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CategoryFormService {

  constructor(private http: HttpClient) { }

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
    return this.http.post(environment.apiNestBaseUrl + endpoint, categoryData);
  }

  updateCategory(categoryId: string, categoryData: CategoryCardInput, pageIdentifier: string = 'music-details') {
    const endpoint = this.getEndpoint(pageIdentifier);
    return this.http.put(environment.apiNestBaseUrl + `${endpoint}/${categoryId}`, categoryData);
  }
  
  deleteCategory(categoryId: string, pageIdentifier: string = 'music-details') {
    const endpoint = this.getEndpoint(pageIdentifier);
    return this.http.delete(environment.apiNestBaseUrl + `${endpoint}/${categoryId}`);
  }
  
  getCategoryById(categoryId: string, pageIdentifier: string = 'music-details') {
    const endpoint = this.getEndpoint(pageIdentifier);
    return this.http.get(environment.apiNestBaseUrl + `${endpoint}/${categoryId}`);
  }
  
  getAllCategories(pageIdentifier: string = 'music-details') {
    const endpoint = this.getEndpoint(pageIdentifier);
    return this.http.get<InputData[]>(environment.apiNestBaseUrl + endpoint);
  }

}
