import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ZonesService {
  private readonly API_URL = environment.APIURL;
  private readonly API_METHOD = '/api/v1/zones';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.API_URL}${this.API_METHOD}`);
  }

  getById(id: number) {
    return this.http.get(`${this.API_URL}${this.API_METHOD}/${id}`);
  }

  addZone(params: any) {
    return this.http.post(
      `${this.API_URL}${this.API_METHOD}`,
      params
    );
  }

  update(id: number, params: any) {
    return this.http.patch(
      `${this.API_URL}${this.API_METHOD}/${id}`,
      params
    );
  }

  deleteZone(id: number) {
    return this.http.delete(`${this.API_URL}${this.API_METHOD}/${id}`);
  }
}
