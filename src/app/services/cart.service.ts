import { firstValueFrom, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  @Output() cart_updated_event = new EventEmitter();

  private base_url = environment.base_url + '/carts/';

  constructor(private http: HttpClient) {}

  /**
   * creates a new cart
   * @returns the new cart created
   */
  private async create() {
    return await firstValueFrom(this.http.post(this.base_url, {})).catch(
      (error) => throwError(() => error)
    );
  }

  /**
   * calls helper method to get cart
   * @returns cart object
   */
  async getCart() {
    return await this.getOrCreateCart();
  }

  /**
   * checks to see if cart exists in localstorage, otherwise calls create method to create new cart
   * @returns current cart if it exists or new cart otherwise
   */
  private async getOrCreateCart() {
    let cart_id = localStorage.getItem('cart_id');
    if (cart_id) {
      return await firstValueFrom(
        this.http.get(this.base_url + cart_id + '/')
      ).catch((error) => throwError(() => error));
    }
    let cart: any = await this.create();
    if (cart) {
      localStorage.setItem('cart_id', cart.id);
    }
    return cart;
  }

  /**
   * gets a specific cart item from the shopping cart
   * @param id id of cart-item to retrieve
   * @returns cart item
   */
  async getItem(id: number) {
    let cart_id = localStorage.getItem('cart_id');
    return await firstValueFrom(
      this.http.get(this.base_url + cart_id + '/items/' + id)
    ).catch((error) => throwError(() => error));
  }

  /**
   * adds an item with the given product id and quantity to the cart
   * @param product_id id of product to be added
   * @param quantity quantity of product
   * @returns the item object added to the cart
   */
  async addItem(product_id: number, quantity: number) {
    let cart_id = localStorage.getItem('cart_id');
    let res = await firstValueFrom(
      this.http.post(this.base_url + cart_id + '/items/', {
        product_id: product_id,
        quantity: quantity,
      })
    ).catch((error) => throwError(() => error));
    this.cart_updated_event.emit(res);
    return res;
  }

  /**
   * removes cart item with the specified id
   * @param id id of cart item to remove from the cart
   * @returns item that was removed
   */
  async removeItem(id: number) {
    let cart_id = localStorage.getItem('cart_id');
    let res = await firstValueFrom(
      this.http.delete(this.base_url + cart_id + '/items/' + id)
    ).catch((error) => throwError(() => error));
    this.cart_updated_event.emit(res);
    return res;
  }

  /**
   * updates the cart item with the given id to the given quantity
   * @param id cart item id
   * @param quantity new quantity to be updated
   * @returns updated cart item
   */
  async updateItem(id: number, quantity: number) {
    let cart_id = localStorage.getItem('cart_id');
    let res = await firstValueFrom(
      this.http.patch(this.base_url + cart_id + '/items/' + id, {
        quantity: quantity,
      })
    ).catch((error) => throwError(() => error));
    this.cart_updated_event.emit(res);
    return res;
  }

  /**
   * deletes the current cart
   * @returns cart that was deleted
   */
  async deleteCart() {
    let cart_id = localStorage.getItem('cart_id');
    let res = await firstValueFrom(
      this.http.delete(this.base_url + cart_id + '/')
    ).catch((error) => throwError(() => error));
    localStorage.removeItem('cart_id');
    return res;
  }
}
