import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Parameters } from 'src/app/models/parameters';

@Injectable({
  providedIn: 'root',
})
export class OrderStatusService {
  private readonly API_URL = environment.APIURL;
  private readonly API_METHOD = '/api/v1/order-status';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Parameters[]> {
    return this.http.get<Parameters[]>(`${this.API_URL}${this.API_METHOD}`);
  }

  getById(id: number): Observable<Parameters> {
    return this.http.get<Parameters>(`${this.API_URL}${this.API_METHOD}/${id}`);
  }

  createNewStatus(params: any): Observable<Parameters> {
    return this.http.post<Parameters>(
      `${this.API_URL}${this.API_METHOD}`,
      params
    );
  }

  updateStatus(id: number, params: any): Observable<Parameters> {
    return this.http.patch<Parameters>(
      `${this.API_URL}${this.API_METHOD}/${id}`,
      params
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}${this.API_METHOD}/${id}`);
  }
}
