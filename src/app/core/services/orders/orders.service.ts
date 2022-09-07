import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/orders';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly API_URL = environment.APIURL;
  private readonly API_METHOD = '/api/v1/orders';

  constructor(private http: HttpClient) {}

  getAllOrders(page: number, limit: number): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.API_URL}${this.API_METHOD}/${page}/${limit}`
    );
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.API_URL}${this.API_METHOD}/${id}`);
  }

  deleteOrder(id: number) {
    return this.http.delete(`${this.API_URL}${this.API_METHOD}/${id}`);
  }

  // resumes
  getOrderResumeByCustomerId(id: number): Observable<Order> {
    return this.http.get<Order>(
      `${this.API_URL}${this.API_METHOD}/resume/customer/${id}`
    );
  }

  getOrderResumeByEmbarcation(id: number): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.API_URL}${this.API_METHOD}/resume/embarcation/${id}`
    );
  }

  getOrderResumeByDate(
    firstOrderDate: string,
    lastOrderDate: string
  ): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.API_URL}${this.API_METHOD}/resume/${firstOrderDate}/${lastOrderDate}`
    );
  }

  //details

  getOrderDetailByCustomerId(
    id: number,
    page: number,
    limit: number
  ): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.API_URL}${this.API_METHOD}/detail/customer/${id}/${page}/${limit}`
    );
  }

  getOrderDetailByEmbarcation(
    id: number,
    page: number,
    limit: number
  ): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.API_URL}${this.API_METHOD}/detail/embarcation/${id}/${page}/${limit}`
    );
  }

  getOrderDetailByDate(
    firstOrderDate: string,
    lastOrderDate: string
  ): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.API_URL}${this.API_METHOD}/detail/${firstOrderDate}/${lastOrderDate}`
    );
  }
}
