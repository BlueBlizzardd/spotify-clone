import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private url = `${BASE_URL}/auth`;

  signUp(username: string, password: string, email: string) {
    return this.http.post(`${this.url}/signup`, { username, password, email }).pipe(
      tap(res => console.log(res))
    )
  };

  login(email: string, password: string) {
    return this.http.post(`${this.url}/login`, { email, password }).pipe(
      tap(res => console.log(res))
    )
  };
}
