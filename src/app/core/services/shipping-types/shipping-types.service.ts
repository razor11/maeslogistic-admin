import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parameters } from 'src/app/models/parameters';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShippingTypesService {
  private readonly API_URL = environment.APIURL;
  private readonly API_METHOD = '/api/v1/shipping-types';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Parameters[]>(`${this.API_URL}${this.API_METHOD}`);
  }

  getById(id: number) {
    return this.http.get<Parameters>(`${this.API_URL}${this.API_METHOD}/${id}`);
  }

  addNew(params: any) {
    return this.http.post<Parameters>(
      `${this.API_URL}${this.API_METHOD}`,
      params
    );
  }

  update(id: number, params: any) {
    return this.http.patch<Parameters>(
      `${this.API_URL}${this.API_METHOD}/${id}`,
      params
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}${this.API_METHOD}/${id}`);
  }
}
