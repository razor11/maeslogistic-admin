import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Parameters } from 'src/app/models/parameters';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AddressTypesService {
  private readonly API_URL = environment.APIURL;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Parameters[]>(`${this.API_URL}/api/v1/address-types`);
  }

  getById(id: number) {
    return this.http.get<Parameters>(
      `${this.API_URL}/api/v1/address-types/${id}`
    );
  }

  addNew(params: any) {
    return this.http.post<Parameters>(
      `${this.API_URL}/api/v1/address-types`,
      params
    );
  }

  update(id: number, params: any) {
    return this.http.patch<Parameters>(
      `${this.API_URL}/api/v1/address-types/${id}`,
      params
    );
  }

  delete(id: number) {
    this.http.delete(`${this.API_URL}/api/v1/address-types/${id}`);
  }
}
