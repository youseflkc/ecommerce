import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
  error: boolean = false;
  password_reset_success = false;

  constructor(
    private auth_service: AuthenticationService,
    private router: Router
  ) {}

  async ngOnInit() {
    if (await this.auth_service.getCurrentUser()) {
      this.router.navigate(['/']);
    }
  }

  resetPassword() {
    if (this.validateEmail()) {
      this.auth_service
        .resetPassword(this.email)
        .then(() => (this.password_reset_success = true))
        .catch(() => this.inputError());
    }
  }

  validateEmail() {
    if (this.email === '') {
      this.inputError();
      return false;
    }
    return true;
  }

  inputError() {
    let element = document.getElementById('email') as HTMLInputElement;

    element.classList.add('email__input--danger');
    element.classList.add('animate__shakeX');
    this.error = true;

    setTimeout(() => {
      element.classList.remove('animate__shakeX');
    }, 1000);
  }

  clearDanger(event: Event) {
    (event.target as HTMLInputElement).classList.remove('email__input--danger');
    this.error = false;
  }
}
