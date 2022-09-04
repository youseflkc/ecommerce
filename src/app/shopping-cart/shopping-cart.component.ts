import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  faPlus = faPlus;
  faMinus = faMinus;

  products: Product[] = [];
  quantity_input = new Object() as HTMLInputElement;

  constructor() {}

  ngOnInit(): void {
    this.quantity_input = document.getElementById(
      'quantity'
    ) as HTMLInputElement;
  }

  addQuantity() {
    this.quantity_input.value = (
      Number(this.quantity_input.value) + 1
    ).toString();
  }

  subtractQuantity() {
    let new_quantity = Number(this.quantity_input.value) - 1;
    if (new_quantity >= 1) {
      this.quantity_input.value = new_quantity.toString();
    }
  }

  resetQuantity() {
    if (Number(this.quantity_input.value) < 1) {
      this.quantity_input.value = '1';
    }
  }
}
