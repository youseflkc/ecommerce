import { Product } from './../models/product';
import { async } from '@angular/core/testing';
import { ProductService } from './../services/product.service';
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
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  fromEvent,
  OperatorFunction,
  of,
  Observable,
} from 'rxjs';

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
  imgLogoUrl = '';
  isOpen = false;

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
      this.input.nativeElement.focus();
    } else {
      this.toggleSearchBar();
    }
    this.searched_products = [];
  }
}
