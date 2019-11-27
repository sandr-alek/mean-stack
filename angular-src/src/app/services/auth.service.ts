import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers });
  }

  authenticateUser(user) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/login', user, { headers: headers });
  }

  getProfile() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', { headers: headers });
  }

  saveToken(token) {
    localStorage.setItem('mean:token', token);
  }

  loadToken() {
    return localStorage.getItem('mean:token');
  }

  isAuthorized() {
    return !!this.loadToken();
  }

  logout() {
    localStorage.removeItem('mean:token');
  }
}
