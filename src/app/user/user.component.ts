import { User } from './../models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  //if user is logged in, it will display the users account page, otherwise will display login btn
  logged_in: boolean = false;

  //user to be displayed
  user: User = { email: '', first_name: '', last_name: '', username: '' };

  constructor(
    private auth_service: AuthenticationService,
    private router: Router
  ) {}

  async ngOnInit() {
    let res: any = await this.auth_service.getCurrentUser();
    if (res) {
      this.logged_in = true;
      this.user = res;
    } else {
      this.logged_in = false;
    }

    //checks if user was logged out or logged in to update the view
    this.auth_service.user_logged_in_event.subscribe(async (logged_in) => {
      this.logged_in = logged_in;
      if (logged_in) {
        let res: any = await this.auth_service.getCurrentUser();
        this.user = res;
      }
    });
  }

  /**
   * logs the user out
   */
  logout() {
    this.auth_service.logout();
    this.router.navigate(['logout']);
  }
}
