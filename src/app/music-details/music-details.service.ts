import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DetailModel } from './music.model';

@Injectable({
  providedIn: 'root'
})
export class MusicDetailsService {

  constructor(private http: HttpClient) { }

getAll41Slokas() {
  return this.http.get<DetailModel[]>(environment.apiNestBaseUrl + "/bg-sloka");
}

getAllSlokaChapters(){
  return this.http.get<any[]>(environment.apiNestBaseUrl + "/bg-sloka-chapters");
}

}
