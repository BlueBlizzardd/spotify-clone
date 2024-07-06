import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Playlist } from '../interfaces/playlist';
import { BASE_URL } from 'src/environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private http = inject(HttpClient);
  private url = `${BASE_URL}/pl`;

  getPlaylists() {
    return this.http.get<Playlist[]>(`${this.url}/playlists`).pipe(
      tap(res => console.log(res))
    );
  };

  setPlaylist(playlist: Playlist) {
    return this.http.post<string>(`${this.url}/Createplaylist`, playlist).pipe(
      tap(res => console.log(res))
    )
  }

  updatePlaylist(id: number, update: Partial<Playlist>) {
    return this.http.put<Playlist>(`${this.url}/editplaylist`, { id, ...update }).pipe(
      tap(res => console.log(res))
    );
  };

  deletePlaylist(plID: number) {
    return this.http.delete<string>(`${this.url}/Deleteplaylist/${plID}`).pipe(
      tap(res => console.log(res))
    );
  };

  removeFromPlaylist(plID: number, songID: number) {
    return this.http.delete<string>(`${this.url}/playlist/${plID}/song/${songID}`).pipe(
      tap(res => console.log(res))
    );
  }
}
