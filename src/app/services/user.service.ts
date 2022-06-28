import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:4000/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  // getPublicContent(): Observable<any> {
  //   return this.http.get(API_URL + 'all', { responseType: 'text', headers: this.headers });
  // }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text', headers: this.headers });
  }
  // getModeratorBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'mod', { responseType: 'text', headers: this.headers });
  // }
  // getAdminBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'admin', { responseType: 'text', headers: this.headers });
  // }
  deleteUser(id): Observable<any> {
    return this.http.get(`${API_URL}delete/${id}`, { responseType: 'text', headers: this.headers });
  }
}
