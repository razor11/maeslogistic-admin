import { PageEvent } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { embarcation } from 'src/app/models/embarcation';
@Injectable({
  providedIn: 'root',
})
export class EmbarcationsService {
  private readonly API_URL = environment.APIURL;
  private readonly API_METHOD = '/api/v1/embarcations';

  constructor(private http: HttpClient) {}

  getAll(page: number, limit: number) {
    return this.http.get<any>(
      `${this.API_URL}${this.API_METHOD}/${page}/${limit}`
    );
  }

  getById(id: number) {
    return this.http.get<embarcation>(
      `${this.API_URL}${this.API_METHOD}/${id}`
    );
  }

  getByDepartureDate(
    firstDate: any,
    lastDate: any,
    page: number,
    limit: number
  ) {
    return this.http.get<any>(
      `${this.API_URL}${this.API_METHOD}/DepartureDates/${firstDate}/${lastDate}/${page}/${limit}`
    );
  }

  getByArrivingDate(
    firstDate: any,
    lastDate: any,
    page: number,
    limit: number
  ) {
    return this.http.get<any>(
      `${this.API_URL}${this.API_METHOD}/ArrivingDates/${firstDate}/${lastDate}/${page}/${limit}`
    );
  }

  getEmbarcationByStatus(id: any, page: number, limit: number){
    return this.http.get<any>(
      `${this.API_URL}${this.API_METHOD}/${id}/${page}/${limit}`
    );
  }

  addEmbarcation(params: any) {
    return this.http.post<any>(`${this.API_URL}${this.API_METHOD}`, params);
  }
  upEmbarcation(id: number, params: any) {
    return this.http.patch<any>(
      `${this.API_URL}${this.API_METHOD}/${id}`,
      params
    );
  }
  deleteEmbarcation(id: number) {
    return this.http.delete(`${this.API_URL}${this.API_METHOD}/${id}`);
  }
}
