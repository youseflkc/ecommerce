import { SimpleProduct } from './../models/simple-product';
import { ProductService } from './../services/product.service';
import { Cart } from './../models/cart';
import { CartService } from './../services/cart.service';
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

  cart: Cart = { id: '', items: [], total_price: 0 };
  products: SimpleProduct[] = [];
  quantity_input = new Object() as HTMLInputElement;

  constructor(
    private cart_service: CartService,
    private product_service: ProductService
  ) {}

  async ngOnInit() {
    this.cart = await this.cart_service.getCart();

    for (let item of this.cart.items) {
      console.log(item);
      this.products.push(item.product);
    }

    this.quantity_input = document.getElementById(
      'quantity'
    ) as HTMLInputElement;
  }

  /**
   * increments quantity value when plus btn is clicked
   */
  addQuantity() {
    this.quantity_input.value = (
      Number(this.quantity_input.value) + 1
    ).toString();
  }

  /**
   * decrements quantity value when minus btn is clicked
   */
  subtractQuantity() {
    let new_quantity = Number(this.quantity_input.value) - 1;
    if (new_quantity >= 1) {
      this.quantity_input.value = new_quantity.toString();
    }
  }

  /**
   * resets quantity to 1 if value less than 1 is entered by user
   */
  resetQuantity() {
    if (Number(this.quantity_input.value) < 1) {
      this.quantity_input.value = '1';
    }
  }
}
