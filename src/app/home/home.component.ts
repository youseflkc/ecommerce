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
  products: Product[] = [];
  next_url: string = '';
  collections: any = [];
  featured_products: Product[] = [];
  products_count = 0;

  faArrowSolid = fasArrowAltCircleDown;
  faArrow = faArrowAltCircleDown;

  constructor(
    private product_service: ProductService,
    private collection_service: CollectionService,
    private cart_service: CartService,
    private authService: AuthenticationService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    this.collections = await this.collection_service.getAll();
    for (let collection of this.collections) {
      if (collection.featured_product) {
        try {
          let featured_product: any = await this.product_service.getProduct(
            collection.featured_product
          );
          this.featured_products.push(featured_product);
        } catch (error) {}
      }
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

    // try {
    //   if (this.next_url != '') {
    //     this.products = this.products.concat(res.results);
    //     this.next_url = res.next;
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  scrollPage(element: HTMLElement) {
    if (window.matchMedia('(max-width: 768px)').matches) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
