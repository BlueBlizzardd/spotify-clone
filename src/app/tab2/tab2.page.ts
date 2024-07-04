import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { SongService } from '../shared/services/song.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, ValueChangeEvent } from '@angular/forms';
import { catchError, debounceTime, EMPTY, filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, ReactiveFormsModule]
})
export class Tab2Page {

  private songService = inject(SongService);

  public query = new FormControl<string>('', { nonNullable: true });
  public searchResults = toSignal(this.query.events.pipe(
    filter(event => event instanceof ValueChangeEvent),
    map(query => query.value as string),
    debounceTime(300),
    switchMap(data => this.songService.getSongs(data).pipe(catchError(err => EMPTY)))
  ));



}
