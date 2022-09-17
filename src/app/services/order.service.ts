import { CartService } from './cart.service';
import { first, firstValueFrom, timeout } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private base_url = environment.base_url + '/orders/';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private cart_service: CartService
  ) {}

  /**
   * getOrders helper method
   * @returns reponse from server containing list of orders
   */
  private async _getOrders() {
    let access_token = localStorage.getItem('access');
    let res = await firstValueFrom(
      this.http.get(this.base_url, {
        headers: {
          Authorization: 'JWT ' + access_token,
        },
      })
    );
    return res;
  }

  /**
   * calls helper method to get list of orders,
   * catches errors incase user is not logged in or token is expired
   * @returns list of orders
   */
  async getOrders() {
    try {
      return await this._getOrders();
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        // invalid or expired access token, must retrieve new access token
        if (error.status == HttpStatusCode.Unauthorized) {
          if (await this.authService.tokenRefresh()) {
            return await this._getOrders();
          }
        }
      }
      //invalid refresh token, user must login again
      throw error;
    }
  }

  /**
   * helper method retrieves an order by id number from server
   * @param id id of order to retrieve
   * @returns returns specified order
   */
  private async _getOrder(id: number) {
    let access_token = localStorage.getItem('access');
    let res = await firstValueFrom(
      this.http.get(this.base_url + id + '/', {
        headers: {
          Authorization: 'JWT ' + access_token,
        },
      })
    );
    return res;
  }

  /**
   * calls helper method to retrieve specified order,
   * catches errors if user is not logged in or token is expired
   * @param id id of order to be retrieved
   * @returns specified order
   */
  async getOrder(id: number) {
    try {
      return await this._getOrder(id);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status == HttpStatusCode.Unauthorized) {
          if (await this.authService.tokenRefresh()) {
            return await this._getOrder(id);
          }
        } else if (error.status == HttpStatusCode.NotFound) {
          //invalid order id
          throw error;
        }
      }
      //invalid token, user must login again
      throw error;
    }
  }

  /**
   * helper method creates an order using the cart saved in local storage.
   * if there is not cart or the cart is empty, then it will throw an error
   * @returns order object that was created
   */
  private async _createOrder() {
    let cart_id = localStorage.getItem('cart_id');
    let access_token = localStorage.getItem('access');

    if (cart_id) {
      let res = await firstValueFrom(
        this.http.post(
          this.base_url,
          {
            cart_id: cart_id,
          },
          {
            headers: {
              Authorization: 'JWT ' + access_token,
            },
          }
        )
      );
      //cart gets deleted after order is created
      localStorage.removeItem('cart_id');
      this.cart_service.cart_updated_event.emit();
      return res;
    }
    // no cart found, must create cart first
    throw new Error('No cart found.');
  }

  /**
   *  calls helper method to create an order
   * @returns order created
   */
  async createOrder() {
    try {
      return await this._createOrder();
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        // cart does not exist or cart is empty
        if (error.status == HttpStatusCode.BadRequest) {
          throw error;
        } else if (error.status == HttpStatusCode.Unauthorized) {
          // invalid or expired access token, must retrieve new access token
          if (await this.authService.tokenRefresh()) {
            return await this._createOrder();
          }
        }
      }
      //invalid refresh token, user must login again
      throw error;
    }
  }
}
