import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  cart: Cart = { id: '', items: [], total_price: 0, total_quantity: 0 };
  constructor(private cart_service: CartService) {}

  async ngOnInit() {
    this.cart = await this.cart_service.getCart();
  }
}
