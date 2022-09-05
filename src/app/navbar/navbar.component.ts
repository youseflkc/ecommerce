import { ShoppingCartComponent } from './../shopping-cart/shopping-cart.component';
import { Product } from './../models/product';
import { ProductService } from './../services/product.service';
import { open_close_icon, open_close_input } from './../animations';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  faBars,
  faCartShopping,
  faSearch,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  OperatorFunction,
  of,
  Observable,
} from 'rxjs';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [open_close_input, open_close_icon],
})
export class NavbarComponent implements OnInit {
  @ViewChild(ShoppingCartComponent) cart;
  @ViewChild('focus', { static: false }) input: ElementRef;
  @Output() openNavEvent = new EventEmitter();

  cart_top = '6rem';

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let nav_element = document.querySelector('.navbar') as HTMLElement;
    let cart_element = document.querySelector('.cart') as HTMLElement;
    if (window.scrollY > 36) {
      nav_element.classList.add('navbar--clear');
      nav_element.classList.remove('navbar--normal');
      this.cart_top = '3rem';
    } else {
      nav_element.classList.remove('navbar--clear');
      nav_element.classList.add('navbar--normal');
      this.cart_top = '6rem';
    }
  }

  faCart = faCartShopping;
  faSearch = faSearch;
  faX = faX;
  faBars = faBars;
  img_logo_url = '';

  is_open = false;
  show_cart: boolean = false;

  search_input: string = '';
  searched_products: Product[] = [];

  constructor(private product_service: ProductService) {}

  ngOnInit(): void {}

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (term.length > 1) {
          this.product_service.searchProduct(term).then((res) => {
            this.searched_products = res.results;
          });
        }
        return [];
      })
    );

  formatter = (result: Product) => result.title;

  toggleSearchBar() {
    if (this.input.nativeElement.value) {
      // this.search();
    } else {
      let sidenav_icon_element = document.getElementById(
        'sidenav-icon'
      ) as HTMLElement;
      let navbar_middle_element = document.getElementById(
        'navbar-middle'
      ) as HTMLElement;
      let navbar_element = document.getElementById('navbar') as HTMLElement;
      let cart_icon_element = document.getElementById(
        'cart-icon'
      ) as HTMLElement;
      if (!this.is_open && window.matchMedia('(max-width: 768px)').matches) {
        sidenav_icon_element.classList.add('sidenav-icon--hidden');
        navbar_middle_element.classList.add('navbar__list--hidden');
        cart_icon_element.classList.add('navbar__item--hidden');
        navbar_element.style.gridTemplateColumns = '1fr';
      } else {
        sidenav_icon_element.classList.remove('sidenav-icon--hidden');
        navbar_middle_element.classList.remove('navbar__list--hidden');
        cart_icon_element.classList.remove('navbar__item--hidden');
        navbar_element.style.gridTemplateColumns = '1fr 1fr 1fr';
      }
      this.is_open = !this.is_open;

      //focuses the search textbox when the search bar is expanded
      setTimeout(
        () =>
          this.is_open
            ? this.input.nativeElement.focus()
            : this.input.nativeElement.blur(),
        300
      );
    }
  }

  clearSearchBar() {
    if (this.input.nativeElement.value) {
      this.input.nativeElement.value = '';
      this.input.nativeElement.focus();
    } else {
      this.toggleSearchBar();
    }
    this.search_input = '';
    this.searched_products = [];
  }

  openNav() {
    this.openNavEvent.emit();
  }

  toggleCart() {
    if (this.show_cart) {
      let cart_element = document.querySelector('.cart') as HTMLElement;
      cart_element.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        this.show_cart = !this.show_cart;
      }, 400);
      return;
    }
    this.show_cart = !this.show_cart;
  }

  closeCart() {
    let cart_element = document.querySelector('.cart') as HTMLElement;
    cart_element.style.transform = 'translateY(-100%)';
    setTimeout(() => {
      this.show_cart = this.show_cart = false;
    }, 400);
  }
}
