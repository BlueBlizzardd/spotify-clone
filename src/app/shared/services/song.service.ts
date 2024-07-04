import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private http = inject(HttpClient);
  private url = `${BASE_URL}/song`;

  getSongs() {
    return this.http.get(this.url).pipe(
      tap(res => console.log(res))
    );
  };

  getSongByArtist() {
    return this.http.get(`${this.url}/searchartist`).pipe(
      tap(res => console.log(res))
    );
  };

}
