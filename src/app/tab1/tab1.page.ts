import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import recentlyPlayed from '../../assets/mockdata/recentlyPlayed.json';
import heavyRotation from '../../assets/mockdata/heavyRotation.json';
import jumpBackIn from '../../assets/mockdata/jumpBackIn.json';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { logIn, settingsOutline } from 'ionicons/icons';
import { PlaylistService } from '../shared/services/playlist.service';
import { Playlist } from '../shared/interfaces/playlist';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonRow, IonCol, IonButton, IonIcon, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private playlistsService = inject(PlaylistService);

  public isLoggedIn = inject(AuthService).isLoggedIn();
  public playlists = toSignal(this.playlistsService.getPlaylists());
  public data: { title: string, albums: Playlist[] | undefined }[] = [
    {
      title: 'Recently Played',
      albums: this.playlists()
    },
    {
      title: 'Heavy Rotation',
      albums: this.playlists()
    },
    {
      title: 'Jump back in',
      albums: this.playlists()
    }
  ];

  constructor() {
    addIcons({ logIn, settingsOutline })
  }

  openAlbum(album: string): void {
    const title = encodeURIComponent(album);

    this.router.navigate([album], { relativeTo: this.route });
  }
}
