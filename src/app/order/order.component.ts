import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  cart: Cart = {
    id: '',
    items: [],
    total_price: 0,
    total_price_with_tax: 0,
    total_quantity: 0,
  };

  tax = 0;

  constructor(private cart_service: CartService) {}

  async ngOnInit() {
    await this.initCart();
    this.cart_service.cart_updated_event.subscribe(async () => {
      await this.initCart();
    });
  }

  async initCart() {
    this.cart = await this.cart_service.getCart();
    this.tax =
      Math.round(
        (this.cart.total_price_with_tax - this.cart.total_price) * 100
      ) / 100;
  }

  placeOrder() {
    this.validateOrderFields();
  }

  validateOrderFields() {
    // let first_name = document.getElementById(
    //   'order-first-name'
    // ) as HTMLInputElement;
    // let last_name = document.getElementById(
    //   'order-last-name'
    // ) as HTMLInputElement;
    // let address = document.getElementById('order-phone') as HTMLInputElement;
    // let phone = document.getElementById('order-address') as HTMLInputElement;
    // let country = document.getElementById('order-country') as HTMLInputElement;
    // let city = document.getElementById('order-city') as HTMLInputElement;
    // let province = document.getElementById(
    //   'order-province'
    // ) as HTMLInputElement;
    // let postal_code = document.getElementById(
    //   'order-postal-code'
    // ) as HTMLInputElement;

    let input_fields = document.getElementsByClassName('order__form__input');

    for (let i = 0; i < input_fields.length; i++) {
      console.log(input_fields.item(i));
    }
  }
}
