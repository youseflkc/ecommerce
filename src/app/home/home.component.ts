import { OrderService } from './../services/order.service';
import { Cart } from './../models/cart';
import { CartService } from './../services/cart.service';
import { Collection } from './../models/collection';
import { CollectionService } from './../services/collection.service';
import { Product } from './../models/product';
import { ProductService } from './../services/product.service';
import { Component, HostListener, OnInit } from '@angular/core';
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

  scrollPage(element: HTMLElement) {
    if (window.matchMedia('(max-width: 768px)').matches) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
