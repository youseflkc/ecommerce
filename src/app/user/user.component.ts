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
  logged_in: boolean = false;
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

    this.auth_service.user_logged_in_event.subscribe(async (logged_in) => {
      this.logged_in = logged_in;
      if (logged_in) {
        let res: any = await this.auth_service.getCurrentUser();
        this.user = res;
      }
    });
  }

  logout() {
    this.auth_service.logout();
    this.router.navigate(['logout']);
  }
}
