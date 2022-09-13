import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { OrderService } from './../services/order.service';
import { Order } from './../models/order';
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

  order: Order = {
    id: 0,
    customer: 0,
    placed_at: '',
    payment_status: '',
    items: [],
  };

  tax = 0;

  constructor(
    private cart_service: CartService,
    private order_service: OrderService,
    private router: Router
  ) {}

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
    if (this.validateOrderFields()) {
      this.order_service
        .createOrder()
        .then(() => this.router.navigate(['/checkout/order-success']))
        .catch((error) => throwError(() => error));
    }
  }

  validateOrderFields() {
    let input_fields = document.getElementsByClassName('order__form__input');
    let empty_error = false;
    for (let i = 0; i < input_fields.length; i++) {
      let element = input_fields.item(i) as HTMLInputElement;
      if (element.value === '') {
        empty_error = true;
        element.classList.add('animate__shakeX');
        element.classList.add('order__form__input--danger');
        setTimeout(() => {
          element.classList.remove('animate__shakeX');
        }, 1000);
      }
    }

    let subheader = document.querySelector(
      '.order__form__subheader'
    ) as HTMLElement;
    subheader.classList.add('order__form__subheader--danger');
    setTimeout(() => {
      subheader.classList.remove('order__form__subheader--danger');
    }, 1000);

    if (empty_error) {
      return false;
    }
    return true;
  }

  clearDanger(event: Event) {
    (event.target as HTMLInputElement).classList.remove(
      'order__form__input--danger'
    );
  }
}
