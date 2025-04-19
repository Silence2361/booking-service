import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export enum UserRole {
  Admin = 'admin',
  User = 'user'
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}

export interface AuthData {
  id: number
  role: UserRole
  access_token: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL = 'http://localhost:3000';
  isAuth$: Observable<boolean>;

  constructor(private http: HttpClient) { }

  login(body: LoginData): Observable<AuthData> {
    console.log(body);
    return this.http.post<AuthData>(`${this.baseURL}/auth/login`, body)
  }

  register(body: RegisterData): Observable<void> {
    console.log(body);
    return this.http.post<void>(`${this.baseURL}/auth/register`, body);
  }

  setAuthState(isAuth: boolean) {
    this.isAuth$ = of(isAuth);
  }
}
