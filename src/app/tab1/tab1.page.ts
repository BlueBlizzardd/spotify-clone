import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import recentlyPlayed from '../../assets/mockdata/recentlyPlayed.json';
import heavyRotation from '../../assets/mockdata/heavyRotation.json';
import jumpBackIn from '../../assets/mockdata/jumpBackIn.json';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonRow, IonCol, IonButton, IonIcon],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public data: { title: string, albums: { id: number, image: string, title: string }[] }[] = [
    {
      title: 'Recently Played',
      albums: recentlyPlayed
    },
    {
      title: 'Heavy Rotation',
      albums: heavyRotation
    },
    {
      title: 'Jump back in',
      albums: jumpBackIn
    }
  ]

  openAlbum(album: string): void {
    const title = encodeURIComponent(album);

    this.router.navigate([album], { relativeTo: this.route });
  }
}
