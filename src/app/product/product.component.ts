import { Product } from './../models/product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input('product') product: Product;
  
  constructor() { }

  ngOnInit(): void {
  }

}
