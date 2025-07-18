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
    return this.http.post(environment.AuthUrl + endpoint, categoryData);
  }

  updateCategory(categoryId: string, categoryData: CategoryCardInput, pageIdentifier: string = 'music-details') {
    const endpoint = this.getEndpoint(pageIdentifier);
    return this.http.put(environment.AuthUrl + `${endpoint}/${categoryId}`, categoryData);
  }
  
  deleteCategory(categoryId: string, pageIdentifier: string = 'music-details') {
    const endpoint = this.getEndpoint(pageIdentifier);
    return this.http.delete(environment.AuthUrl + `${endpoint}/${categoryId}`);
  }
  
  getCategoryById(categoryId: string, pageIdentifier: string = 'music-details') {
    const endpoint = this.getEndpoint(pageIdentifier);
    return this.http.get(environment.AuthUrl + `${endpoint}/${categoryId}`);
  }
  
  getAllCategories(pageIdentifier: string = 'music-details') {
    const endpoint = this.getEndpoint(pageIdentifier);
    return this.http.get<InputData[]>(environment.AuthUrl + endpoint);
  }

}
