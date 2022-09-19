import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { firstValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  @Output() user_logged_in_event = new EventEmitter();
  private base_url = environment.auth_url;

  constructor(private http: HttpClient) {}

  /**
   * creates new user in database
   * @param user user object to be submitted
   * @param password password for user
   * @returns user object if successfully registerd
   */
  async registerUser(user: User, password: string) {
    return await firstValueFrom(
      this.http.post(this.base_url + '/users/', {
        ...user,
        password: password,
      })
    );
  }

  /**
   * retrieves authentication tokens using the given username and password
   * @param username username of user being authenticated
   * @param password users password
   * @returns authentication token object
   */
  async login(username: string, password: string) {
    let token: any = localStorage.getItem('access');
    if (!token) {
      token = await firstValueFrom(
        this.http.post(this.base_url + '/jwt/create/', {
          username: username,
          password: password,
        })
      );
      localStorage.setItem('access', token.access);
      localStorage.setItem('refresh', token.refresh);
    }
    this.user_logged_in_event.emit(true);
    return token;
  }

  /**
   * logs the user out by removing access tokens
   */
  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.user_logged_in_event.emit(false);
  }

  /**
   * uses refresh token to retrieve new access token after it expires
   * @returns true if token is successfully retrieved, false otherwise
   */
  async tokenRefresh() {
    let refresh_token = localStorage.getItem('refresh');
    if (!refresh_token) {
      return false;
    }
    let token: any = await firstValueFrom(
      this.http.post(this.base_url + '/jwt/refresh/', {
        refresh: refresh_token,
      })
    ).catch((error) => {
      throwError(() => error);
    });
    if (token) {
      localStorage.setItem('access', token.access);
      return true;
    }
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
    return false;
  }

  /**
   * checks server to see if access token is valid and returns the user object
   * @returns user object if token is valid, false otherwise
   */
  async getCurrentUser() {
    let access_token = localStorage.getItem('access');
    if (!access_token) {
      return false;
    }
    let user = await firstValueFrom(
      this.http.get(this.base_url + '/users/me/', {
        headers: {
          Authorization: 'JWT ' + access_token,
        },
      })
    ).catch(async () => {
      return await this.tokenRefresh();
    });

    if (user) {
      return user;
    }
    return false;
  }


  /**
   * requests password reset email for given account
   * @param email email of account to reset the password
   * @returns email of account if successful
   */
  async resetPassword(email: string) {
    return await firstValueFrom(
      this.http.post(this.base_url + '/users/reset_password/', {
        email,
      })
    );
  }
}
