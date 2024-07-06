import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private url = `${BASE_URL}/auth`;

  #isLoggedIn = signal<boolean>(false);

  private setSession(result: any) {
    localStorage.setItem('token', result.token);
    this.#isLoggedIn.set(true);
  }

  signUp(username: string, password: string, email: string) {
    return this.http.post(`${this.url}/signup`, { username, password, email }).pipe(
      tap(res => console.log(res)),
      tap(res => this.setSession(res))
    )
  };

  login(email: string, password: string) {
    return this.http.post(`${this.url}/login`, { email, password }).pipe(
      tap(res => console.log(res)),
      tap(res => this.setSession(res))
    )
  };

  deleteUser(id: number) {
    return this.http.delete(`${this.http}/delete/${id}`).pipe(
      tap(res => console.log(res)),
      tap(res => this.logout())
    )
  }

  editUser(id: number, user: { email: string, password: string }) {
    return this.http.put(`${this.url}/edit/${id}`, user).pipe(
      tap(res => console.log(res)),
      tap(res => this.logout())
    )
  }

  logout() {
    localStorage.removeItem('token');
    this.#isLoggedIn.set(false);
  }

  isLoggedIn() {
    return this.#isLoggedIn;
  }
}
