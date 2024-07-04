import { Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormSubmittedEvent, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonHeader, IonRow, IonTitle, IonToolbar, IonItem, IonList } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EMPTY, catchError, filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonRow, IonCol, IonButton, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  private fb = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);

  public loginForm = this.fb.nonNullable.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  })

  public submit$ = this.loginForm.events.pipe(
    filter(event => (event instanceof FormSubmittedEvent && event.source.valid)),
    map(submission => submission.source.value as { email: string, password: string }),
    switchMap(data => this.authService.login(data.email, data.password).pipe(catchError(err => EMPTY))),
    takeUntilDestroyed()
  ).subscribe();

  ngOnInit() {

  }

}
