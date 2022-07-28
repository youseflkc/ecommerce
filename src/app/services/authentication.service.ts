import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private base_url = environment.auth_url;

  constructor(private http: HttpClient) {}

  async registerUser(user: User, password: string) {
    try {
      return await firstValueFrom(
        this.http.post(this.base_url + '/users/', {
          ...user,
          password: password,
        })
      );
    } catch (error) {
      throw error;
    }
  }

  async login(username: string, password: string) {
    try {
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
      return token;
    } catch (error) {
      throw error;
    }
  }

  async tokenRefresh() {
    try {
      let refresh_token = localStorage.getItem('refresh');
      if (!refresh_token) {
        return false;
      }
      let token: any = await firstValueFrom(
        this.http.post(this.base_url + '/jwt/refresh/', {
          refresh: refresh_token,
        })
      );
      localStorage.setItem('access', token.access);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getCurrentUser() {
    try {
      let access_token = localStorage.getItem('access');
      return await firstValueFrom(
        this.http.get(this.base_url + '/users/me/', {
          headers: {
            Authorization: 'JWT ' + access_token,
          },
        })
      );
    } catch (error) {
      throw error;
    }
  }
}
