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

  private async create() {
    return await firstValueFrom(this.http.post(this.base_url, {})).catch(
      (error) => throwError(() => error)
    );
  }

  async getCart() {
    return await this.getOrCreateCart();
  }

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

  async getItem(id: number) {
    let cart_id = localStorage.getItem('cart_id');
    return await firstValueFrom(
      this.http.get(this.base_url + cart_id + '/items/' + id)
    ).catch((error) => throwError(() => error));
  }

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

  async removeItem(id: number) {
    let cart_id = localStorage.getItem('cart_id');
    let res = await firstValueFrom(
      this.http.delete(this.base_url + cart_id + '/items/' + id)
    ).catch((error) => throwError(() => error));
    this.cart_updated_event.emit(res);
    return res;
  }

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

  async deleteCart() {
    let cart_id = localStorage.getItem('cart_id');
    let res = await firstValueFrom(
      this.http.delete(this.base_url + cart_id + '/')
    ).catch((error) => throwError(() => error));
    localStorage.removeItem('cart_id');
    return res;
  }
}
