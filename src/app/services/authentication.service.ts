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

  async registerUser(user: User, password: string) {
    return await firstValueFrom(
      this.http.post(this.base_url + '/users/', {
        ...user,
        password: password,
      })
    );
  }

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

  async resetPassword(email: string) {
    return await firstValueFrom(
      this.http.post(this.base_url + '/users/reset_password/', {
        email,
      })
    );
  }
}
