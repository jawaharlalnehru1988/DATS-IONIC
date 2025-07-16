import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Language, ResponseUserData, UserData, UserWithRole } from '../Utils/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AuthUrl = environment.AuthUrl;

  constructor(private http: HttpClient) { }

  register( userData: UserData):Observable<ResponseUserData> {
    return this.http.post<ResponseUserData>(`${this.AuthUrl}/user`, {...userData, role: 'devotee', isActive:true});
  }

  login(email: string, password: string) {
    return this.http.post(`${this.AuthUrl}/user/login`, { email, password });
  }

  language: WritableSignal<Language[]> = signal<Language[]>([{ native: 'தமிழ்', lang: 'Tamil' }]);

  setLanguage(languages: Language[]){
    this.language.set(languages);
  }

}
