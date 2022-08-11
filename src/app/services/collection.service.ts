import { Collection } from './../models/collection';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private base_url = environment.base_url + '/collections/';
  constructor(private http: HttpClient) {}

  async getAll() {
    try {
      return await firstValueFrom(this.http.get(this.base_url));
    } catch (error) {
      throw error;
    }
  }

  async getCollection(id: number) {
    try {
      return await firstValueFrom(this.http.get(this.base_url + id));
    } catch (error) {
      throw error;
    }
  }
}
