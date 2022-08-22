import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import { Collection } from './../models/collection';
import { ProductService, ProductResponse } from './../services/product.service';
import { CollectionService } from './../services/collection.service';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  faAngleDown,
  faArrowAltCircleUp,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { Product } from '../models/product';
import { Ordering } from '../models/ordering';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  @ViewChild('focus', { static: false }) input: ElementRef = new ElementRef('');
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.page-down-container') as HTMLElement;
    if (window.scrollY > 300) {
      element.style.display = 'flex';
    } else {
      element.style.display = 'none';
    }
  }

  //sets ordering enum so it can be used in the template
  Ordering = Ordering;

  //when a sort option is selected, it will be set to true so that it can be highlighted
  sort_items_selected = {
    unit_price: false,
    '-unit_price': false,
    title: false,
    '-title': false,
    last_update: false,
    '-last_update': false,
  };

  //sets the ordering and filtering so that they can both be used at the same time
  product_ordering: string = '';
  product_filtering = {
    unit_price_min: '',
    unit_price_max: '',
  };
  products_are_filtered = false;

  max_price_input = document.getElementById('max-price') as HTMLInputElement;
  min_price_input = document.getElementById('min-price') as HTMLInputElement;

  // icon used in the toolbar
  faAngleDown = faAngleDown;
  faX = faX;
  faArrowSolid = faArrowAltCircleUp;

  //sets whether the filter bar or sort bar are to be displayed
  sort_expanded: boolean = false;
  filter_expanded: boolean = false;

  //all the collections retrieved from server
  collections: any = [];

  //when a collection is selected, it sets the selected value to true so it can be highlighted
  collections_selected = {};

  //products retrieved from the server
  products: Product[] = [];

  products_count = 0;

  constructor(
    private collection_service: CollectionService,
    private product_service: ProductService
  ) {}

  async ngOnInit() {
    this.collections = await this.collection_service.getAll();

    //sets all the collection selected values to false initially
    this.collections.forEach((collection: Collection) => {
      this.collections_selected[collection.id] = false;
    });

    //the selected collection for 'all products' set to true initially
    this.collections_selected[0] = true;
    this.getProducts();
  }

  /**
   * retrieves the products from the server
   */
  async getProducts() {
    // this.http.get('url').subscribe();
    let res: ProductResponse = await this.product_service.getAll();

    //store first 12 products from database
    this.products = res.results;

    //total products in database.
    this.products_count = res.count;
  }

  /**
   * retrieves next 12 products from the server and adds them to the product list
   */
  async loadMoreProducts() {
    let res: ProductResponse = await this.product_service.getNext();
    this.products = [...this.products, ...res.results];
  }

  /**
   * filters the products based on the collection selected.
   * @param collection_id id for the collection to filter by
   */
  async filterByCollection(collection_id: number) {
    //sets the selected value for the new collection and resets the rest
    Object.keys(this.collections_selected).forEach((id) => {
      if (id !== collection_id.toString()) {
        this.collections_selected[id] = false;
      } else {
        this.collections_selected[id] = true;
      }
    });

    //fetches the filtered products from the server
    let res = await this.product_service.getFilteredOrSortedProducts({
      collection_id: collection_id === 0 ? '' : collection_id.toString(),
      ordering: this.product_ordering,
      unit_price__gt: this.products_are_filtered
        ? this.product_filtering.unit_price_min
        : '',
      unit_price__lt: this.products_are_filtered
        ? this.product_filtering.unit_price_max
        : '',
    });

    this.products = res.results;
    this.products_count = res.count;
  }

  /**
   * gets the products based on price filters
   * @param unit_price_min minimum product price to filter
   * @param unit_price_max maximum product price to filter
   */
  async filterProducts(unit_price_min: string, unit_price_max: string) {
    //if min and max fields are empty, do not run filter query
    if (unit_price_min === '' && unit_price_max === '') {
      this.products_are_filtered = false;
      return;
    }

    if (Number(unit_price_min) >= Number(unit_price_max)) {
      this.products_are_filtered = false;
      document.getElementById('max-price')?.classList.toggle('animate__shakeX');
      document.getElementById('min-price')?.classList.toggle('animate__shakeX');
      let element = document.querySelector('.filter__error') as HTMLElement;
      element.style.opacity = '1';
      setTimeout(() => {
        document
          .getElementById('max-price')
          ?.classList.toggle('animate__shakeX');
        document
          .getElementById('min-price')
          ?.classList.toggle('animate__shakeX');
      }, 1000);

      setTimeout(() => {
        element.style.opacity = '0';
      }, 5000);
      return;
    }

    let res: ProductResponse =
      await this.product_service.getFilteredOrSortedProducts({
        unit_price__gt: unit_price_min,
        unit_price__lt: unit_price_max,
        ordering: this.product_ordering,
      });

    this.products_are_filtered = true;
    this.products = res.results;
    this.products_count = res.count;
  }

  /**
   * retrieves the list of sorted products from the server based on the selected sorting field
   * @param ordering the field to sort the products by
   */
  async sortProducts(ordering: string) {
    let res: ProductResponse =
      await this.product_service.getFilteredOrSortedProducts({
        ordering: ordering,
        unit_price__gt: this.products_are_filtered
          ? this.product_filtering.unit_price_min
          : '',
        unit_price__lt: this.products_are_filtered
          ? this.product_filtering.unit_price_max
          : '',
      });

    //sets the selected field to be highlighted
    Object.keys(this.sort_items_selected).forEach((key) => {
      if (key === ordering) {
        this.sort_items_selected[key] = true;
      } else {
        this.sort_items_selected[key] = false;
      }
    });

    this.product_ordering = ordering;
    this.products = res.results;
  }

  /**
   * expands the sort bar
   */
  toggleSort() {
    this.sort_expanded = !this.sort_expanded;

    //prevents opening both toolbars at the same time.
    if (this.filter_expanded) this.filter_expanded = false;
  }

  /**
   * expands the filter bar and focuses the textbox
   */
  toggleFilter() {
    this.filter_expanded = !this.filter_expanded;

    //prevents opening both toolbars at the same time.
    if (this.sort_expanded) this.sort_expanded = false;

    //focuses the min-price text box when the filter bar is expanded
    if (this.filter_expanded) {
      this.input.nativeElement.focus();
    } else {
      this.input.nativeElement.blur();
    }
  }

  /**
   * clears the filters currently applied and refetches all the products.
   */
  clearFilter() {
    // this.product_filtering = { unit_price_max: '', unit_price_min: '' };
    this.max_price_input.value = '';
    this.min_price_input.value = '';

    //if there is not already a filter applied, then only the text box will be cleared.
    if (!this.products_are_filtered) {
      return;
    }
    this.products_are_filtered = false;
    this.sortProducts(this.product_ordering);

    //refocuses on the filter textbox
    this.input.nativeElement.focus();
  }

  scrollPage(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
