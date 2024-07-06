import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, FormSubmittedEvent, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonRow, IonCol, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonButton } from '@ionic/angular/standalone';
import { PlaylistService } from 'src/app/shared/services/playlist.service';
import { catchError, EMPTY, exhaustMap, filter, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Playlist } from 'src/app/shared/interfaces/playlist';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.page.html',
  styleUrls: ['./add-playlist.page.scss'],
  standalone: true,
  imports: [IonButton, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCol, IonRow, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule]
})
export class AddPlaylistPage implements OnInit {

  private fb = inject(FormBuilder);
  private playlistService = inject(PlaylistService);

  public playlistForm = this.fb.group({
    name: ['', Validators.required],
    image: ['']
  });

  public submit$ = this.playlistForm.events.pipe(
    filter(event => (event instanceof FormSubmittedEvent && event.source.valid)),
    map(submission => submission.source.value as Playlist),
    exhaustMap(data => this.playlistService.setPlaylist(data).pipe(catchError(err => EMPTY))),
    takeUntilDestroyed()
  ).subscribe();

  constructor() { }

  ngOnInit() {
  }

}
