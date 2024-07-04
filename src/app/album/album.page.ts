import { Component, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonCol, IonBackButton, IonItem, IonIcon, IonList, IonLabel, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
  standalone: true,
  imports: [IonRow, IonLabel, IonList, IonIcon, IonItem, IonBackButton, IonCol, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AlbumPage implements OnInit {

  album = input<string>();

  constructor() { }

  ngOnInit() {
  }

}
