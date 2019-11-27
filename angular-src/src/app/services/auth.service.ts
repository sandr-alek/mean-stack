import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers });
  }

  authenticateUser(user) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/login', user, { headers });
  }

  saveToken(token, user) {
    localStorage.setItem('mean:id_token', token);
    localStorage.setItem('mean:user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('mean:id_token');
    localStorage.removeItem('mean:user');
  }
}
