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

  addCategory(categoryData: CategoryCardInput) {

    return this.http.post(environment.AuthUrl + '/bg-sloka-chapters', categoryData)
  }

  updateCategory(categoryId: string, categoryData: CategoryCardInput) {
    return this.http.put(environment.AuthUrl + `/bg-sloka-chapters/${categoryId}`, categoryData);
  }
  deleteCategory(categoryId: string) {
    return this.http.delete(environment.AuthUrl + `/bg-sloka-chapters/${categoryId}`);
  }
  getCategoryById(categoryId: string) {
    return this.http.get(environment.AuthUrl + `/bg-sloka-chapters/${categoryId}`);
  }
  getAllCategories() {
    return this.http.get<InputData[]>(environment.AuthUrl + '/bg-sloka-chapters');
  }

}
