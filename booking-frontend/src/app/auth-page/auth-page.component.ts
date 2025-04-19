import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import {
  AuthService,
  LoginData,
  RegisterData,
  UserRole,
} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthComponent implements AfterViewInit {
  title = 'booking-frontend';
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

  authForm = new FormGroup({
    name: new FormControl<string>(null, Validators.required),
    email: new FormControl<string>(null, Validators.required),
    password: new FormControl<string>(null, Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngAfterViewInit(): void {
    this.tabGroup.selectedIndexChange.subscribe((index) => {
      const control = this.authForm.get('name');

      if (index === 1) {
        control.clearValidators();
        control.updateValueAndValidity();
      } else if (index === 0) {
        control.setValidators(Validators.required);
        control.updateValueAndValidity();
      }

      this.authForm.updateValueAndValidity();
      this.authForm.reset();
    });
  }

  login(): void {
    const body: LoginData = {
      email: this.authForm.controls.email.value,
      password: this.authForm.controls.password.value,
    };

    this.authService.login(body).subscribe({
      next: (authData) => {
        this.authService.setAuthState(true);
        localStorage.setItem('token', authData.access_token);
        localStorage.setItem('user_id', authData.id.toString());

        if (authData?.role == UserRole.Admin) {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['main']);
        }
      },
      error(err) {
        console.log(err);
      },
    });
  }

  register(): void {
    const body: RegisterData = {
      name: this.authForm.controls.name.value,
      email: this.authForm.controls.email.value,
      password: this.authForm.controls.password.value,
    };

    this.authService.register(body).subscribe({
      next: () => {
        this.authService.setAuthState(true);
        alert('Регистрация прошла успешно!');
        this.login()
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
