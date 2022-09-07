import { cart_animation } from './../animations';
import { ProductService } from './../services/product.service';
import { Cart } from './../models/cart';
import { CartService } from './../services/cart.service';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  HostListener,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [cart_animation],
})
export class ShoppingCartComponent implements OnInit {
  faPlus = faPlus;
  faMinus = faMinus;

  cart: Cart = { id: '', items: [], total_price: 0, total_quantity: 0 };
  quantity_input = new Object() as HTMLInputElement;

  constructor(private cart_service: CartService) {}

  async ngOnInit() {
    this.cart = await this.cart_service.getCart();
    this.cart_service.cart_updated_event.subscribe(async (res) => {
      this.cart = await this.cart_service.getCart();
    });
  }

  async removeItem(item_id) {
    this.cart.items = this.cart.items.filter((item) => item.id != item_id);
    await this.cart_service.removeItem(item_id);
  }

  /**
   * increments quantity value when plus btn is clicked
   */
  async addQuantity(item_id: number) {
    this.quantity_input = document.getElementById(
      'quantity_input_' + item_id
    ) as HTMLInputElement;

    let new_quantity = Number(this.quantity_input.value) + 1;

    this.quantity_input.value = new_quantity.toString();

    await this.cart_service.updateItem(item_id, new_quantity);
    this.cart = await this.cart_service.getCart();
  }

  /**
   * decrements quantity value when minus btn is clicked
   */
  async subtractQuantity(item_id: number) {
    this.quantity_input = document.getElementById(
      'quantity_input_' + item_id
    ) as HTMLInputElement;

    let new_quantity = Number(this.quantity_input.value) - 1;
    if (new_quantity >= 1) {
      this.quantity_input.value = new_quantity.toString();
      await this.cart_service.updateItem(item_id, new_quantity);
      this.cart = await this.cart_service.getCart();
    }
  }

  /**
   * resets quantity to 1 if value less than 1 is entered by user.
   * updates the quantity to the server with the new amount entered
   */
  async resetQuantity(item_id) {
    this.quantity_input = document.getElementById(
      'quantity_input_' + item_id
    ) as HTMLInputElement;

    let quantity = Number(this.quantity_input.value);

    if (quantity < 1) {
      this.quantity_input.value = '1';
    }

    await this.cart_service.updateItem(item_id, quantity);
    this.cart = await this.cart_service.getCart();
  }
}
