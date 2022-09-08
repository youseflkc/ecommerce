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

  async removeItem(item_id) {
    this.remove_item = true;
    await this.cart_service.removeItem(item_id);
  }

  /**
   * increments quantity value when plus btn is clicked
   */
  async addQuantity(item_id: number) {
    let quantity_input = document.getElementById(
      'quantity_input_' + item_id
    ) as HTMLInputElement;

    let new_quantity = Number(quantity_input.value) + 1;

    quantity_input.value = new_quantity.toString();

    await this.cart_service.updateItem(item_id, new_quantity);
  }

  /**
   * decrements quantity value when minus btn is clicked
   */
  async subtractQuantity(item_id: number) {
    let quantity_input = document.getElementById(
      'quantity_input_' + item_id
    ) as HTMLInputElement;

    let new_quantity = Number(quantity_input.value) - 1;
    if (new_quantity >= 1) {
      quantity_input.value = new_quantity.toString();
      await this.cart_service.updateItem(item_id, new_quantity);
    }
  }

  /**
   * resets quantity to 1 if value less than 1 is entered by user.
   * updates the quantity to the server with the new amount entered
   */
  async resetQuantity(item_id) {
    let quantity_input = document.getElementById(
      'quantity_input_' + item_id
    ) as HTMLInputElement;

    let quantity = Number(quantity_input.value);

    if (quantity === this.item.quantity) {
      return;
    }

    if (quantity < 1) {
      quantity_input.value = '1';
    }

    await this.cart_service.updateItem(item_id, quantity);
  }
}
