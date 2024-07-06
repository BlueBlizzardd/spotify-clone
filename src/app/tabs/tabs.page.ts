import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { library, search, home } from 'ionicons/icons';
import { PlayerComponent } from '../player/player.component';
import { PlayerService } from '../shared/services/player.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, PlayerComponent],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  public song = inject(PlayerService).song;

  constructor() {
    addIcons({ home, library, search });
  }
}
