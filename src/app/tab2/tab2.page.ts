import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { SongService } from '../shared/services/song.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, ValueChangeEvent } from '@angular/forms';
import { catchError, debounceTime, EMPTY, filter, map, switchMap, tap } from 'rxjs';
import { addIcons } from 'ionicons';
import { playCircle } from 'ionicons/icons';
import { PlayerService } from '../shared/services/player.service';
import { Song } from '../shared/interfaces/song';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, ReactiveFormsModule]
})
export class Tab2Page {

  private songService = inject(SongService);
  private playerService = inject(PlayerService);

  public query = new FormControl<string>('', { nonNullable: true });
  public searchResults = toSignal(this.query.events.pipe(
    filter(event => event instanceof ValueChangeEvent),
    map(query => query.source.value as string),
    debounceTime(300),
    tap(data => console.log(data)),
    switchMap(data => this.songService.getSongsByName(data).pipe(catchError(err => EMPTY)))
  ));
  public state = this.playerService.state;

  public play(song: Song) {
    this.playerService.song.set(song);
    this.playerService.play();
  }

  public pause() {
    this.playerService.pause();
  }

  constructor() {
    addIcons({ playCircle });
  }
}
