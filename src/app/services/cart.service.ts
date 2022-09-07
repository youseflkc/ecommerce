import { firstValueFrom } from 'rxjs';
import { Cart } from './../models/cart';
import { Product } from './../models/product';
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

  private create() {
    return this.http.post(this.base_url, {});
  }

  async getCart() {
    return await this.getOrCreateCart();
  }

  private async getOrCreateCart() {
    try {
      let cart_id = localStorage.getItem('cart_id');
      if (cart_id) {
        return await firstValueFrom(this.http.get(this.base_url + cart_id));
      }
      let cart: any = await firstValueFrom(this.create());
      localStorage.setItem('cart_id', cart.id);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getItem(id: number) {
    try {
      let cart_id = localStorage.getItem('cart_id');
      return await firstValueFrom(
        this.http.get(this.base_url + cart_id + '/items/' + id)
      );
    } catch (error) {
      throw error;
    }
  }

  async addItem(product_id: number, quantity: number) {
    try {
      let cart_id = localStorage.getItem('cart_id');
      let res = await firstValueFrom(
        this.http.post(this.base_url + cart_id + '/items/', {
          product_id: product_id,
          quantity: quantity,
        })
      );
      this.cart_updated_event.emit(res);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async removeItem(id: number) {
    try {
      let cart_id = localStorage.getItem('cart_id');
      let res = await firstValueFrom(
        this.http.delete(this.base_url + cart_id + '/items/' + id)
      );
      this.cart_updated_event.emit(res);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async updateItem(id: number, quantity: number) {
    try {
      let cart_id = localStorage.getItem('cart_id');
      let res = await firstValueFrom(
        this.http.patch(this.base_url + cart_id + '/items/' + id, {
          quantity: quantity,
        })
      );
      this.cart_updated_event.emit(res);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async deleteCart() {
    try {
      let cart_id = localStorage.getItem('cart_id');
      let res = await firstValueFrom(this.http.delete(this.base_url + cart_id));
      localStorage.removeItem('cart_id');
      return res;
    } catch (error) {
      throw error;
    }
  }
}
