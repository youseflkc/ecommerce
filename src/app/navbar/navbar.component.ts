import { NavigationStart, Router } from '@angular/router';
import { Cart } from './../models/cart';
import { CartService } from './../services/cart.service';
import { ShoppingCartComponent } from './../shopping-cart/shopping-cart.component';
import { Product } from './../models/product';
import { ProductService } from './../services/product.service';
import { open_close_icon, open_close_input } from './../animations';
import {
  asNativeElements,
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
  @ViewChild('focus', { static: false }) input_element: ElementRef =
    new ElementRef(asNativeElements);
  @Output() openNavEvent = new EventEmitter();

  clicked: boolean = false;

  /**
   * if the user clicks outside the cart while it is open, then the cart will close.
   * @param event element that was clicked
   */
  @HostListener('document:click', ['$event'])
  onClick(event) {
    //ignores clicks in the cart or in the navbar
    let cart_element = document.querySelector('.cart') as HTMLElement;
    let nav_element = document.querySelector('.navbar') as HTMLElement;
    if (
      !event.target.classList.contains('cart__item__remove') &&
      this.show_cart &&
      !cart_element.contains(event.target) &&
      !nav_element.contains(event.target)
    ) {
      this.toggleCart();
    }
  }

  cart_top = window.matchMedia('(max-width: 768px)').matches ? '5rem' : '6rem';

  /**
   * reduces navbar size when you scroll down and makes navbar clear
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let nav_element = document.querySelector('.navbar') as HTMLElement;
    if (window.scrollY > 36) {
      nav_element.classList.add('navbar--clear');
      nav_element.classList.remove('navbar--normal');
      if (window.matchMedia('(max-width:768px)').matches) {
        this.cart_top = '4rem';
      } else {
        this.cart_top = '3rem';
      }
    } else {
      nav_element.classList.remove('navbar--clear');
      nav_element.classList.add('navbar--normal');
      if (window.matchMedia('(max-width:768px)').matches) {
        this.cart_top = '5rem';
      } else {
        this.cart_top = '6rem';
      }
    }
  }

  faCart = faCartShopping;
  faSearch = faSearch;
  faX = faX;
  faBars = faBars;
  img_logo_url = '';

  search_open = false;
  show_cart: boolean = false;

  cart_quantity: number = 0;

  search_input: string = '';
  searched_products: Product[] = [];

  constructor(
    private product_service: ProductService,
    private cart_service: CartService,
    private router: Router
  ) {}

  async ngOnInit() {
    let cart: Cart = await this.cart_service.getCart();
    this.cart_quantity = cart.total_quantity;

    //when cart detects a change, it refreshes
    this.cart_service.cart_updated_event.subscribe(async () => {
      cart = await this.cart_service.getCart();
      this.cart_quantity = cart.total_quantity;
      if (!this.show_cart && this.router.url !== '/checkout') {
        this.toggleCart();
      }

      // animate cart quantity on change
      let cart_quantity_element = document.querySelector(
        '.cart__quantity'
      ) as HTMLElement;
      cart_quantity_element.style.transform =
        'scale(1.1) translate(20px, -33px)';
      setTimeout(() => {
        cart_quantity_element.style.transform =
          'scale(1)translate(20px, -33px)';
      }, 200);
    });

    // closes the cart on route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.show_cart) {
          this.toggleCart();
        }
        if (this.search_open) {
          this.toggleSearchBar();
          console.log('closed');
        }
      }
    });
  }

  /**
   * angular material search function for seaching products in the database.
   * uses debounce and distinctUntilChanged to reduce server calls
   * @param text$ keyword to be searched
   * @returns
   */
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

  // returns search results as the product title only
  formatter = (result: Product) => result.title;

  /**
   * expands search bar
   */
  toggleSearchBar() {
    let sidenav_icon_element = document.getElementById(
      'sidenav-icon'
    ) as HTMLElement;
    let navbar_middle_element = document.getElementById(
      'navbar-middle'
    ) as HTMLElement;
    let navbar_element = document.getElementById('navbar') as HTMLElement;
    let cart_icon_element = document.getElementById('cart-icon') as HTMLElement;
    if (!this.search_open && window.matchMedia('(max-width: 768px)').matches) {
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
    this.search_open = !this.search_open;

    //focuses the search textbox when the search bar is expanded
    setTimeout(
      () =>
        this.search_open
          ? this.input_element.nativeElement.focus()
          : this.input_element.nativeElement.blur(),
      300
    );
  }

  /**
   * clears the search bar if there is text.
   * if search bar is empty then it collapeses instead
   */
  clearSearchBar() {
    if (this.input_element.nativeElement.value) {
      this.input_element.nativeElement.value = '';
      this.input_element.nativeElement.focus();
    } else {
      this.toggleSearchBar();
    }
    this.search_input = '';
    this.searched_products = [];
  }

  /**
   * opens nav side menu for mobile
   */
  openNav() {
    this.openNavEvent.emit();
  }

  /**
   * expands shopping cart
   */
  toggleCart() {
    let cart_element = document.querySelector('.cart') as HTMLElement;
    if (this.show_cart) {
      cart_element.style.transform = 'translateY(-150%)';
      cart_element.style.opacity = '0';
    } else {
      cart_element.style.transform = 'translateY(0px)';
      cart_element.style.opacity = '1';
    }
    this.show_cart = !this.show_cart;
  }
}
