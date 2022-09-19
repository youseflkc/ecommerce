import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //gets the username input field from the dom to be focused when the page loads
  username_input_element!: ElementRef<HTMLInputElement>;
  @ViewChild('focused') set inputElRef(elRef: ElementRef<HTMLInputElement>) {
    if (elRef) {
      this.username_input_element = elRef;
      this.username_input_element.nativeElement.focus({ preventScroll: true });
    }
  }

  // url paramaters
  params;

  password = '';
  user: User = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
  };

  // shows the login form if set to true
  show_login = true;

  //shows register form if set to true
  show_register = false;

  //shows register success page if set to true
  register_success = false;

  // true if invalid data is submitted
  invalid_error = false;

  //true if form is submitted with empty fields
  empty_error = false;

  // error messages retrieved from server
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
      if (params['register'] && !this.show_register) {
        this.toggleRegister();
      } else if (!params['register'] && !this.show_login) {
        this.toggleLogin();
      }
    });
  }

  /**
   * validates fields and calls server to login user
   */
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

  /**
   * validates fields and calls server to register user
   */
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

  /**
   * checks if login fields are empty or not and if there are it calls method to display error message
   * @returns true if no errors, false if errors
   */
  validateLoginFields() {
    if (this.user.username === '' || this.password === '') {
      this.inputError();
      this.empty_error = true;
      this.invalid_error = false;
      return false;
    }
    return true;
  }

  /**
   * checks if register fields are empty or not and if there are it calls method to display error message
   * @returns true if no errors, false if errors
   */
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

  /**
   * highlights fields that are empty and displays error message
   */
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

  /**
   * navigates to return url specidied in the query parameters, or navigates home if no
   * return url is specified
   */
  navigateToReturnUrl() {
    if (this.params['returnUrl']) {
      this.router.navigate([this.params['returnUrl']]);
    } else {
      this.router.navigate(['/']);
    }
  }

  /**
   * displays the login form and removes other forms from view
   */
  toggleLogin() {
    this.show_login = !this.show_login;
    this.show_register = false;
    this.register_success = false;
    this.router.navigate([], {
      queryParams: { returnUrl: this.params['returnUrl'] },
    });
  }

  /**
   * displays the register form and removes other forms from view
   */
  toggleRegister() {
    this.show_register = !this.show_register;
    this.show_login = false;
    this.register_success = false;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        register: true,
        returnUrl: this.params['returnUrl'],
      },
    });
  }

  /**
   * displays the register success page and removes other forms from view
   */
  showRegisterSuccess() {
    this.register_success = true;
    this.show_register = false;
    this.user.username = '';
    this.password = '';
  }

  /**
   * removes error message
   * @param event 
   */
  clearDanger(event: Event) {
    (event.target as HTMLInputElement).classList.remove('login__input--danger');
    this.empty_error = false;
    this.invalid_error = false;
  }
}
