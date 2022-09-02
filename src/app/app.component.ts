import { NavbarComponent } from './navbar/navbar.component';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { slideInAnimation } from './animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent {
  @ViewChild(NavbarComponent) navbar;

  nav_open: boolean = false;
  faBars = faBars;
  faX = faX;

  title = 'online-shop';

  constructor() {}

  openNav() {
    this.nav_open = true;
  }

  closeNav() {
    this.nav_open = false;
  }

  ngOnDestroy() {
    this.nav_open = false;
  }
}
