import { cart_animation } from './../animations';
import { SimpleProduct } from './../models/simple-product';
import { ProductService } from './../services/product.service';
import { Cart } from './../models/cart';
import { CartService } from './../services/cart.service';
import { faPlus, faMinus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Product } from './../models/product';
import {
  Component,
  HostListener,
  OnInit,
  Output,
  ViewChild,
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
  @Output() closeCartEvent = new EventEmitter();

  clicked: boolean = false;

  @HostListener('document:click', ['$event'])
  onClick(event) {
    if (this.clicked && !this.e_ref.nativeElement.contains(event.target)) {
      this.closeCartEvent.emit();
      console.log('click outside');
    }
    this.clicked = true;
  }

  faPlus = faPlus;
  faMinus = faMinus;

  cart: Cart = { id: '', items: [], total_price: 0 };
  quantity_input = new Object() as HTMLInputElement;

  constructor(
    private cart_service: CartService,
    private product_service: ProductService,
    private e_ref: ElementRef
  ) {}

  async ngOnInit() {
    this.cart = await this.cart_service.getCart();
  }

  async removeItem(item_id) {
    this.cart.items = this.cart.items.filter((item) => item.id != item_id);
    return await this.cart_service.removeItem(item_id);
  }

  /**
   * increments quantity value when plus btn is clicked
   */
  async addQuantity(item_id: number) {
    this.quantity_input = document.getElementById(
      'quantity_input'
    ) as HTMLInputElement;

    this.quantity_input.value = (
      Number(this.quantity_input.value) + 1
    ).toString();

    await this.cart_service.updateItem(
      item_id,
      Number(this.quantity_input.value)
    );
    this.cart = await this.cart_service.getCart();
  }

  /**
   * decrements quantity value when minus btn is clicked
   */
  async subtractQuantity(item_id: number) {
    this.quantity_input = document.getElementById(
      'quantity_input'
    ) as HTMLInputElement;

    let new_quantity = Number(this.quantity_input.value) - 1;
    if (new_quantity >= 1) {
      this.quantity_input.value = new_quantity.toString();
    }

    await this.cart_service.updateItem(
      item_id,
      Number(this.quantity_input.value)
    );
    this.cart = await this.cart_service.getCart();
  }

  /**
   * resets quantity to 1 if value less than 1 is entered by user
   */
  resetQuantity() {
    this.quantity_input = document.getElementById(
      'quantity_input'
    ) as HTMLInputElement;

    if (Number(this.quantity_input.value) < 1) {
      this.quantity_input.value = '1';
    }
  }
}
