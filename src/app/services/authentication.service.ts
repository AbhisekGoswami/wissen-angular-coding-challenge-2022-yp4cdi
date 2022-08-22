import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  constructor(private http: HttpClient) {}
  private login_url = 'https://reqres.in/api/login';
  private userList_url = 'https://reqres.in/api/unknown';

  // modify the return type to properly use the full response

  user = {
    username: '',
    password: '',
  };

  login(username: string, password: string): any {
    // implement here
    this.user.username = username;
    this.user.password = password;
    return this.http.post<any>(this.login_url, this.user);
  }

  getUserList(token: any): any {
    var header = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    });
    return this.http.get<any>(this.userList_url, { headers: header });
  }
}
