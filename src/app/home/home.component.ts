import { CollectionService } from './../services/collection.service';
import { Product } from './../models/product';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleDown as fasArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [],
})
export class HomeComponent implements OnInit {
  // array of collections
  collections: any = [];

  //array of products to be passed to featured products component
  featured_products: Product[] = [];

  faArrowSolid = fasArrowAltCircleDown;
  faArrow = faArrowAltCircleDown;

  constructor(
    private product_service: ProductService,
    private collection_service: CollectionService
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

  /**
   * scrolls page to featured products section when scroll down btn is clicked
   * @param element 
   */
  scrollPage(element: HTMLElement) {
    if (window.matchMedia('(max-width: 768px)').matches) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
