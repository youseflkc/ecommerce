import { Collection } from './../models/collection';
import { firstValueFrom, throwError } from 'rxjs';
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
    return await firstValueFrom(this.http.get(this.base_url)).catch((error) => {
      throwError(() => error);
    });
  }

  async getCollection(id: number) {
    return await firstValueFrom(this.http.get(this.base_url + id)).catch(
      (error) => {
        throwError(() => error);
      }
    );
  }
}
