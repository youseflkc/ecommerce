import { Product } from './../models/product';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpStatusCode,
} from '@angular/common/http';
import { firstValueFrom, throwError } from 'rxjs';

export interface ProductResponse {
  count: number;
  next: string;
  previous: string;
  results: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private base_url = environment.base_url + '/products/';
  private next_url = environment.base_url + '/products/';

  constructor(private http: HttpClient) {}

  /**
   *
   * @returns promise of object containing:
   * 'count': number of total products in database,
   * 'next': url to retrieve the next 10 items,
   * 'previous': url to retrieve previous 10 items,
   * 'results': array of products
   */
  async getAll(): Promise<ProductResponse> {
    let res: any = await firstValueFrom(this.http.get(this.base_url)).catch(
      (error) => {
        throwError(() => error);
      }
    );
    this.next_url = res.next;
    return res;
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
  async getFilteredOrSortedProducts({
    collection_id = '',
    unit_price__gt = '',
    unit_price__lt = '',
    ordering = '',
  }: {
    collection_id?: string;
    unit_price__gt?: string;
    unit_price__lt?: string;
    ordering?: string;
  }): Promise<ProductResponse> {
    let res: any = await firstValueFrom(
      this.http.get(
        this.base_url +
          '?collection_id=' +
          (collection_id || '') +
          '&unit_price__gt=' +
          (unit_price__gt || '') +
          '&unit_price__lt=' +
          (unit_price__lt || '') +
          '&ordering=' +
          (ordering || '')
      )
    ).catch((error) => {
      throwError(() => error);
      return [];
    });
    this.next_url = res.next;
    return res;
  }

  async searchProduct(search_key: string) {
    let res: any = await firstValueFrom(
      this.http.get(this.base_url + '?search=' + search_key)
    ).catch((error) => throwError(() => error));
    this.next_url = res.next;
    return res;
  }

  /**
   *
   * @returns promise of array with next 12 products after calling getAll() first.
   */
  async getNext(): Promise<ProductResponse> {
    let res: any = await firstValueFrom(this.http.get(this.next_url)).catch(
      (error) => throwError(() => error)
    );
    this.next_url = res.next;
    return res;
  }

  /**
   *
   * @param id id of product to retrieve
   * @returns promise of the product with specified id
   */
  async getProduct(id: number) {
    return await firstValueFrom(this.http.get(this.base_url + id)).catch(
      (error) => throwError(() => error)
    );
  }
}
