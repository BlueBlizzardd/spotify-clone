import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormSubmittedEvent, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonCard, IonCol, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EMPTY, catchError, filter, map, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonButton, IonItem, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCol, IonCard, IonRow, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule]
})
export class SignupPage implements OnInit {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  public signUpForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  public submit$ = this.signUpForm.events.pipe(
    filter(event => (event instanceof FormSubmittedEvent && event.source.valid)),
    map(submission => submission.source.value as { username: string, email: string, password: string }),
    switchMap(data => this.authService.signUp(data.username, data.password, data.email).pipe(catchError(err => EMPTY))),
    takeUntilDestroyed()
  ).subscribe();

  constructor() { }

  ngOnInit() {
  }

}
