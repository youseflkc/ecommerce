import { Product } from './../models/product';
import { ProductService, ProductResponse } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit {
  products: Product[] = [];

  constructor(private product_service: ProductService) {}

  async ngOnInit() {
    try {
      //gets the first 3 products from the database to be displayed in the slideshow
      let res: ProductResponse = await this.product_service.getAll();
      this.products = res.results.slice(0, 3);
      //total products in database.
    } catch (error) {
      this.products = [];
    }
  }
}
