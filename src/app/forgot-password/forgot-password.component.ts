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

  //if there is an error, this will be set to true and an error message will be displayed
  error: boolean = false;

  //shows the 'password reset successfully' page if true
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

  /**
   * calls the server to reset the password. catches error if invalid email to passed
   */
  resetPassword() {
    if (this.validateEmail()) {
      this.auth_service
        .resetPassword(this.email)
        .then(() => (this.password_reset_success = true))
        .catch(() => this.inputError());
    }
  }

  /**
   * validates whether the email field is empty or not
   * @returns true if not empty, false if empty
   */
  validateEmail() {
    if (this.email === '') {
      this.inputError();
      return false;
    }
    return true;
  }

  /**
   * highlights textbox if error is caught and applies animation
   */
  inputError() {
    let element = document.getElementById('email') as HTMLInputElement;

    element.classList.add('email__input--danger');
    element.classList.add('animate__shakeX');
    this.error = true;

    setTimeout(() => {
      element.classList.remove('animate__shakeX');
    }, 1000);
  }

  /**
   * removes error message from screen after error is corrected
   * @param event 
   */
  clearDanger(event: Event) {
    (event.target as HTMLInputElement).classList.remove('email__input--danger');
    this.error = false;
  }
}
