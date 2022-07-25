import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Packages } from 'src/app/models/packages';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PackageCatalogService {
  private readonly API_URL = environment.APIURL;
  private readonly API_METHOD = '/api/v1/packages';

  constructor(private http: HttpClient) {}

  getAll(page: number, limit: number) {
    return this.http.get<any>(
      `${this.API_URL}${this.API_METHOD}/${page}/${limit}`
    );
  }

  getById(id: number) {
    return this.http.get<Packages>(`${this.API_URL}${this.API_METHOD}/${id}`);
  }

  addNew(params: any) {
    return this.http.post<Packages>(
      `${this.API_URL}${this.API_METHOD}`,
      params
    );
  }

  update(id: number, params: any) {
    return this.http.patch<Packages>(
      `${this.API_URL}${this.API_METHOD}/${id}`,
      params
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}${this.API_METHOD}/${id}`);
  }
}
