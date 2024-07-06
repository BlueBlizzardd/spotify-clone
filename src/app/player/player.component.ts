import { Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { PlayerService } from '../shared/services/player.service';
import { IonRow, IonCol, IonIcon, IonProgressBar } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { pauseSharp, playSharp } from 'ionicons/icons';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  standalone: true,
  imports: [IonProgressBar, IonIcon, IonCol, IonRow,]
})
export class PlayerComponent implements OnInit {

  private playerService = inject(PlayerService);
  public song = this.playerService.song();
  public state = this.playerService.state;

  constructor() {
    addIcons({ playSharp, pauseSharp });
  }

  ngOnInit() {
  }

  play() {
    this.playerService.play();
  }

  pause() {
    this.playerService.pause();
  }

  stop() {
    this.playerService.stop();
  }

}
