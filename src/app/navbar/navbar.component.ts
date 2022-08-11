import { open_close_icon, open_close_input } from './../animations';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  faCartShopping,
  faSearch,
  faX,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [open_close_input, open_close_icon],
})
export class NavbarComponent implements OnInit {
  @ViewChild('focus', { static: false }) input: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.navbar') as HTMLElement;
    if (window.scrollY > 36) {
      element.classList.add('navbar--clear');
      element.classList.remove('navbar--normal');
    } else {
      element.classList.remove('navbar--clear');
      element.classList.add('navbar--normal');
    }
  }

  faCart = faCartShopping;
  faSearch = faSearch;
  faX = faX;
  imgLogoUrl =
    'https://cdn-icons.flaticon.com/png/512/3362/premium/3362720.png?token=exp=1656601954~hmac=a77a913302ca02d992d002bd580ac15c';

  isOpen = false;
  constructor() {}

  ngOnInit(): void {}

  search() {}

  toggleSearchBar() {
    if (this.input.nativeElement.value) {
      this.search();
    } else {
      this.isOpen = !this.isOpen;

      //focuses the search textbox when the search bar is expanded
      setTimeout(
        () =>
          this.isOpen
            ? this.input.nativeElement.focus()
            : this.input.nativeElement.blur(),
        300
      );
    }
  }

  clearSearchBar() {
    if (this.input.nativeElement.value) {
      this.input.nativeElement.value = '';
    } else {
      this.toggleSearchBar();
    }
  }
}
