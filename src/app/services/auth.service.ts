import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

const AUTH_API = 'http://localhost:4000/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loginEvent = new EventEmitter();

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email,
      password
    }, httpOptions);
  }

  register(username: string, lastname: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      lastname,
      email,
      password
    }, httpOptions);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['login'])
  }
}
