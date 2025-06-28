import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PoojaRulesModel } from './tutorial.model';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getTutorials() {
    return this.http.get<PoojaRulesModel[]>(environment.AuthUrl+'/blog');
  }

  getTutorialById(_id: string) {
    return this.http.get<PoojaRulesModel>(`${environment.AuthUrl}+'/blog/${_id}'`);
  }
}
