import { Product, default_product } from './../models/product';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product = default_product;
  /**
   * bg color scheme: choose 'bg-1', 'bg-2', 'bg-3'
   */

  color: string = '';
  default_color = 'var(--color-product-bg-2)';

  @Input() highlight: boolean = false;
  @Input() featured: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.randomProductColor();
  }

  /**
   *
   * @returns random integer between 0 and 3
   */
  randomProductColor() {
    let num = Math.floor(Math.random() * 3);
    switch (num) {
      case 0:
        this.color = 'var(--color-product-bg-1)';
        break;
      case 1:
        this.color = 'var(--color-product-bg-2)';
        break;
      case 2:
        this.color = 'var(--color-product-bg-3)';
        break;
      default:
        this.color = 'var(--color-product-bg-2)';
    }
  }

  mouseOver() {
    let image = document.getElementById(
      this.product.id + '_image'
    ) as HTMLElement;
    let image_div = document.getElementById(
      this.product.id.toString()
    ) as HTMLElement;

    if (this.product.images.length > 0) {
      image.style.opacity = '0';
      image_div.style.backgroundColor = 'var(--color-font-primary)';
      image_div.style.backgroundImage =
        'url(' + this.product.images[0].image + ')';
    } else {
      image_div.style.backgroundColor = 'var(--color-font-primary)';
    }
  }

  mouseOut() {
    let image = document.getElementById(
      this.product.id + '_image'
    ) as HTMLElement;
    let image_div = document.getElementById(
      this.product.id.toString()
    ) as HTMLElement;

    if (this.product.images.length > 0) {
      image.style.opacity = '1';
      image_div.style.backgroundImage = '';
      image_div.style.backgroundColor = this.color;
    } else {
      image_div.style.backgroundColor = this.color;
    }
  }
}
