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
  private next_url = environment.base_url + '/products/';

  constructor(private http: HttpClient) {}

  /**
   *
   * @returns promise array of first 10 products - call getNext() to return next 10 products
   */
  async getAll(): Promise<any> {
    try {
      let res: any = await firstValueFrom(this.http.get(this.base_url));
      this.next_url = res.next;
      return res;
    } catch (error) {
      throw error;
    }
  }

  /**
   * gets array of filtered and/or sorted products based on paramaters
   *
   * @param collection_id id of collection to filter
   * @param unit_price__gt minimum unit_price to filter
   * @param unit_price__lt max unit_price to filter
   * @param ordering set whether to order by unit_price asc or dsc
   * @returns promise of array containting filtered products
   */
  async getFilteredProducts(
    collection_id?,
    unit_price__gt?,
    unit_price__lt?,
    ordering?
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

  /**
   *
   * @returns promise of array with next 10 products after calling getAll() first.
   */
  async getNext(): Promise<any> {
    try {
      return await firstValueFrom(this.http.get(this.next_url));
    } catch (error) {
      throw error;
    }
  }

  /**
   * 
   * @param id id of product to retrieve
   * @returns promise of the product with specified id
   */
  async getProduct(id: number) {
    try {
      return await firstValueFrom(this.http.get(this.base_url + id));
    } catch (error) {
      throw error;
    }
  }
}
