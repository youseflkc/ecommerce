import {
  trigger,
  animate,
  transition,
  style,
  keyframes,
} from '@angular/animations';
import { OrderService } from './../services/order.service';
import { Cart } from './../models/cart';
import { CartService } from './../services/cart.service';
import { Collection } from './../models/collection';
import { CollectionService } from './../services/collection.service';
import { Product } from './../models/product';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { faArrowAltCircleDown as fasArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [],
})
export class HomeComponent implements OnInit {
  UNIT_PRICE_ASC = 'unit_price';
  UNIT_PRICE_DES = '-unit_price';

  products: Product[] = [];
  next_url: string = '';
  collections: Collection[] = [];
  products_count = 0;

  faArrowSolid = fasArrowAltCircleDown;
  faArrow = faArrowAltCircleDown;

  constructor(
    private productService: ProductService,
    private collectionService: CollectionService,
    private cartService: CartService,
    private authService: AuthenticationService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    let cart = await this.cartService.getCart();

    try {
      let res: any = await this.productService.getAll();
      this.products = res.results;
      this.products_count = res.count;
      this.next_url = res.next;
    } catch (error: any) {
      console.log(error.statusText);
    }

    try {
      let res: any = await this.collectionService.getAll();
      this.collections = res;
    } catch (error: any) {
      console.log(error.statusText);
    }
  }

  async getMoreProducts() {
    // try {
    //   let product = await this.cartService.addItem(14, 2);
    //   console.log(product);
    // } catch (error: any) {
    //   console.log(error.statusText);
    // }

    // try {
    //   let product = await this.cartService.getItem(134);
    //   console.log(product);
    // } catch (error: any) {
    //   console.log(error.statusText);
    // }

    // try {
    //   let product = await this.cartService.removeItem(134);
    // } catch (error: any) {
    //   console.log(error.statusText);
    // }

    // try {
    //   let product = await this.cartService.updateItem(164, 1);
    //   console.log(product);
    // } catch (error: any) {
    //   console.log(error.statusText);
    // }

    // try {
    //   let res = await this.cartService.deleteCart();
    // } catch (error: any) {
    //   console.log(error.statusText);
    // }

    let user = {
      username: 'test1',
      first_name: 'test',
      last_name: 'user',
      email: 'test1@domain.com',
    };

    // try {
    //   let res = await this.authService.registerUser(user, 'password');
    //   console.log(res);
    // } catch (error: any) {
    //   console.log(error.error);
    // }

    // try {
    //   let res = await this.authService.login('test1', 'password');
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }

    // try {
    //   let res = await this.authService.getCurrentUser();
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      let res = await this.orderService.getOrders();
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    // try {
    //   let res = await this.orderService.createOrder();
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      let res = await this.orderService.getOrder(24);
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    try {
      if (this.next_url != '') {
        let res = await this.productService.getNext(this.next_url);
        this.products = this.products.concat(res.results);
        this.next_url = res.next;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getFilteredProducts({
    collection_id,
    unit_price__gt,
    unit_price__lt,
    ordering,
  }: {
    collection_id?: number;
    unit_price__lt?: number;
    unit_price__gt?: number;
    ordering?: string;
  }) {
    try {
      let res: any = await this.productService.getFilteredProducts(
        collection_id,
        unit_price__gt,
        unit_price__lt,
        ordering
      );
      this.products = res.results;
    } catch (error) {
      console.log('error');
    }
  }
}
