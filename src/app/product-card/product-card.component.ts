import { Product } from './../models/product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product = {
    id: 1,
    title: 'title',
    unit_price: 'unit_price',
    category: 'category',
    images: [],
    description: 'description',
    inventory: 0,
    price_with_tax: 0,
    slug: 'slug',
  };

  constructor() {}

  ngOnInit(): void {}
}
