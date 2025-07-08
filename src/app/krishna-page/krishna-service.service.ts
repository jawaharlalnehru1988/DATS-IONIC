import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KrishnaServiceService {

  constructor(private http: HttpClient) { }

  getKrishnaData() {
    return this.http.get<any[]>(environment.AuthUrl+'/ram-bhajan'); // Replace with actual API endpoint
  }

}
