import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  params;
  password = '';
  user: User = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
  };

  show_login = true;
  show_register = false;
  register_success = false;

  invalid_error = false;
  empty_error = false;

  error_messages: string[] = [];

  constructor(
    private auth_service: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    if (await this.auth_service.getCurrentUser()) {
      this.router.navigate(['/']);
    }

    this.route.queryParams.subscribe((params) => {
      this.params = params;
    });
  }

  login() {
    if (this.validateLoginFields()) {
      this.auth_service
        .login(this.user.username, this.password)
        .then(() => this.navigateToReturnUrl())
        .catch(() => {
          this.password = '';
          this.inputError();
          this.invalid_error = true;
        });
    }
  }

  register() {
    if (this.validateRegisterFields()) {
      this.auth_service
        .registerUser(this.user, this.password)
        .then(() => this.showRegisterSuccess())
        .catch((error) => {
          this.error_messages = [];
          Object.keys(error.error).forEach((key) =>
            this.error_messages.push(error.error[key])
          );
          this.invalid_error = true;
        });
    }
  }

  validateLoginFields() {
    if (this.user.username === '' || this.password === '') {
      this.inputError();
      this.empty_error = true;
      this.invalid_error = false;
      return false;
    }
    return true;
  }

  validateRegisterFields() {
    if (
      this.user.username === '' ||
      this.password === '' ||
      this.user.email === '' ||
      this.user.first_name === '' ||
      this.user.last_name === ''
    ) {
      this.inputError();
      this.empty_error = true;
      this.invalid_error = false;
      return false;
    }
    return true;
  }

  inputError() {
    let elements = document.getElementsByClassName('login__input');
    for (let i = 0; i < elements.length; i++) {
      let element = elements.item(i) as HTMLInputElement;
      if (element.value === '') {
        this.empty_error = true;
        element.classList.add('animate__shakeX');
        element.classList.add('login__input--danger');
        setTimeout(() => {
          element.classList.remove('animate__shakeX');
        }, 1000);
      }
    }
  }

  navigateToReturnUrl() {
    if (this.params['returnUrl']) {
      this.router.navigate([this.params['returnUrl']]);
    } else {
      this.router.navigate(['/']);
    }
  }

  toggleLogin() {
    this.show_login = !this.show_login;
    this.show_register = false;
    this.register_success = false;
  }

  toggleRegister() {
    this.show_register = !this.show_register;
    this.show_login = false;
    this.register_success = false;
  }

  showRegisterSuccess() {
    this.register_success = true;
    this.show_register = false;
    this.user.username = '';
    this.password = '';
  }

  clearDanger(event: Event) {
    (event.target as HTMLInputElement).classList.remove('login__input--danger');
    this.empty_error = false;
    this.invalid_error = false;
  }
}
