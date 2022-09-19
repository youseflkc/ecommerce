import { NavbarComponent } from './navbar/navbar.component';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(NavbarComponent) navbar;

  nav_open: boolean = false;
  faBars = faBars;
  faX = faX;

  title = 'online-shop';

  constructor() {}

  ngOnInit() {}

  /**
   * opens mat-nav bar
   */
  openNav() {
    this.nav_open = true;
  }

  /**
   * closes mat-nav bar
   */
  closeNav() {
    this.nav_open = false;
  }

  /**
   * automatically closes nav bar on page navigation
   */
  ngOnDestroy() {
    this.nav_open = false;
  }
}
