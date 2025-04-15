import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserData, UserWithRole } from '../Utils/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AuthUrl = environment.AuthUrl;

  constructor(private http: HttpClient) { }

  register( userData: UserData) {
    return this.http.post<UserWithRole>(this.AuthUrl, {...userData, role: 'devotee'});
  }

  login(username: string, password: string) {
    return this.http.post(this.AuthUrl, { username, password });
  }

}
