import { CartService } from './../services/cart.service';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DEFAULT_SIMPLE_PRODUCT } from './../models/simple-product';
import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../models/cart-item';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() item: CartItem = {
    id: 0,
    product: DEFAULT_SIMPLE_PRODUCT,
    quantity: 0,
  };

  @Input() light: boolean = true;

  //allows the item to be removed optimistically
  remove_item = false;

  faPlus = faPlus;
  faMinus = faMinus;

  constructor(private cart_service: CartService) {}

  ngOnInit(): void {}

  async removeItem() {
    this.remove_item = true;
    await this.cart_service.removeItem(this.item.id);
  }

  /**
   * increments quantity value when plus btn is clicked
   */
  async addQuantity() {
    this.item.quantity += 1;
    await this.cart_service.updateItem(this.item.id, this.item.quantity);
  }

  /**
   * decrements quantity value when minus btn is clicked
   */
  async subtractQuantity() {
    if (this.item.quantity - 1 >= 1) {
      this.item.quantity -= 1;
      await this.cart_service.updateItem(this.item.id, this.item.quantity);
    }
  }

  /**
   * resets quantity to 1 if value less than 1 is entered by user.
   * updates the quantity to the server with the new amount entered
   */
  async updateQuantity() {
    if (this.item.quantity < 1) {
      this.item.quantity = 1;
    }
    await this.cart_service.updateItem(this.item.id, this.item.quantity);
  }
}
