import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InputData } from '../Utils/models';

@Injectable({
  providedIn: 'root'
})
export class KrishnaServiceService {

  constructor(private http: HttpClient) { }

  getKrishnaData() {
    return this.http.get<InputData[]>(environment.AuthUrl+'/ram-bhajan'); 
  }

}
