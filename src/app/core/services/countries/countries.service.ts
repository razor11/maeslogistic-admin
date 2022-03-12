import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Parameters } from 'src/app/models/parameters';
@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly API_URL = environment.APIURL;
  private readonly API_METHOD = '/api/v1/countries';

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
    this.http.delete(`${this.API_URL}${this.API_METHOD}/${id}`);
  }
}
