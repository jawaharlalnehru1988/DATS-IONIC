import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DetailModel } from './music.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDetailsService {

  constructor(private http: HttpClient) { }

getAll41Slokas() {
  return this.http.get<DetailModel[]>(environment.AuthUrl + "/bg-sloka");
}

getAllSlokaChapters(){
  return this.http.get<any[]>(environment.AuthUrl + "/bg-sloka-chapters");
}

}
