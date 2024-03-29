import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offices } from 'src/app/models/offices';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BranchOfficesService {
  private readonly API_URL = environment.APIURL;
  private readonly API_METHOD = '/api/v1/branch-offices';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Offices[]> {
    return this.http.get<Offices[]>(`${this.API_URL}${this.API_METHOD}`);
  }

  getById(id: number): Observable<Offices> {
    return this.http.get<Offices>(`${this.API_URL}${this.API_METHOD}/${id}`);
  }

  addBranchOffice(params: any): Observable<Offices> {
    return this.http.post<Offices>(`${this.API_URL}${this.API_METHOD}`, params);
  }

  updateBranchOffice(id: number, params: any): Observable<any> {
    return this.http.patch<any>(
      `${this.API_URL}${this.API_METHOD}/${id}`,
      params
    );
  }
  deleteBranchOffice(id: number) {
    return this.http.delete(`${this.API_URL}${this.API_METHOD}/${id}`);
  }
}
