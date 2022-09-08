import { Cart } from './../models/cart';
import { CartService } from './../services/cart.service';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cart: Cart = { id: '', items: [], total_price: 0, total_quantity: 0 };
  quantity_input = new Object() as HTMLInputElement;

  constructor(private cart_service: CartService) {}

  async ngOnInit() {
    this.cart = await this.cart_service.getCart();
    this.cart_service.cart_updated_event.subscribe(async (res) => {
      this.cart = await this.cart_service.getCart();
    });
  }
}
