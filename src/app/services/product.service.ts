import { Product } from './../models/product';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private base_url = environment.base_url + '/products/';

  constructor(private http: HttpClient) {}

  async getAll(): Promise<any> {
    try {
      return await firstValueFrom(this.http.get(this.base_url));
    } catch (error) {
      throw error;
    }
  }

  async getFilteredProducts(
    collection_id,
    unit_price__gt,
    unit_price__lt,
    ordering
  ) {
    try {
      return await firstValueFrom(
        this.http.get(
          this.base_url +
            ('?collection_id=' + (collection_id || '')) +
            ('&unit_price__gt=' + (unit_price__gt || '')) +
            ('&unit_price__lt=' + (unit_price__lt || '')) +
            ('&ordering=' + (ordering || ''))
        )
      );
    } catch (error) {
      throw error;
    }
  }

  async getNext(url: string): Promise<any> {
    try {
      return await firstValueFrom(this.http.get(url));
    } catch (error) {
      throw error;
    }
  }

  async getProduct(id: number) {
    try {
      return await firstValueFrom(this.http.get(this.base_url + id));
    } catch (error) {
      throw error;
    }
  }
}
