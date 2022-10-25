import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';
import { AuthResponse } from './auth-response';
import { UserLogin } from './user-login';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:5000';
  authSubject = new BehaviorSubject(false);
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private storage: Storage
  ) {}

  register(user: User): Observable<AuthResponse> {
    this.authSubject.next(true);
    return this.httpClient.post<AuthResponse>(
      `${this.url}/api/users/signup`,
      user
    );
  }
  login(user: UserLogin): Observable<AuthResponse> {
    this.authSubject.next(true);
    return this.httpClient.post<AuthResponse>(
      `${this.url}/api/users/login`,
      user
    );
  }
  async logout() {
    this.authSubject.next(false);
    // this.storage.remove('ACCESS_TOKEN');
    this.router.navigate(['login'], { replaceUrl: true });
  }
  isLoggedIn() {
    return this.authSubject.value;
  }

  getAll() {
    return this.httpClient.get<any>(`${this.url}/api/users/`);
  }
}
