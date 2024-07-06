import { computed, Injectable, Signal, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, switchMap, takeUntil, takeWhile } from 'rxjs';
import { Stream } from '../interfaces/stream';
import { Song } from '../interfaces/song';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private audioObj = new Audio();
  private audioEvents = ["ended", "error", "play", "playing", "pause", "timeupdate", "canplay", "loadedmetadata", "loadstart"];

  song = signal<Song>({
    title: '',
    artistid: [],
    artistname: [],
    Album: '',
    long: 0,
    spotifyCode: '',
    _id: '',
    __v: 0
  });

  stream = toSignal(toObservable(this.song).pipe(
    switchMap(song => this.stream$(song.spotifyCode).pipe(takeWhile(() => !this.#stop())))
  ));

  state = signal<Stream>({
    playing: false,
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false
  });
  #stop = signal<boolean>(false);

  private stream$(url: string) {
    return new Observable(observer => {
      // Play audio
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event) => {
        this.stateUpdate(event);
        observer.next(event);
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);

      return () => {
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        this.stateReset();
      };
    });
  }

  private addEvents(obj: HTMLAudioElement, events: string[], handler: (event: Event) => void) {
    events.forEach(event => obj.addEventListener(event, handler));
  }

  private removeEvents(obj: HTMLAudioElement, events: string[], handler: (event: Event) => void) {
    events.forEach(event => obj.removeEventListener(event, handler));
  }

  private stateUpdate(event: Event) {
    switch (event.type) {
      case "canplay":
        this.state.update((value) => ({ ...value, duration: this.audioObj.duration, canplay: true }))
        break;
      case "playing":
        this.state.update(value => ({ ...value, playing: true }));
        break;
      case "pause":
        this.state.update(value => ({ ...value, playing: false }));
        break;
      case "timeupdate":
        this.state.update(value => ({ ...value, currentTime: this.audioObj.currentTime }))
        break;
      case "error":
        this.stateReset();
        this.state.update(value => ({ ...value, error: true }));
        break;
    }
  }

  private stateReset() {
    this.state.set({
      playing: false,
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false
    })
  }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.#stop.update((value) => !value);
  }

  seekTo(seconds: number) {
    this.audioObj.currentTime = seconds;
  }
}
