import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Addresses } from 'src/app/models/addresses';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataAddressesService {

  private readonly API_URL = environment.APIURL;

  constructor(private http: HttpClient) { }

  getAll(page:number, limit:number){
    return this.http.get<Addresses>(`${this.API_URL}/api/v1/addresses/${page}/${limit}`);
  }

  getByAccount(id:number){
    return this.http.get<Addresses[]>(`${this.API_URL}/api/v1/addresses/queries/account/${id}`);

  }


  addNewAddr(params: any){
       return this.http.post<Addresses>(`${this.API_URL}/api/v1/addresses`, params);

  }

  updateAddr(id:number, params:any){
    return this.http.patch<Addresses>(`${this.API_URL}/api/v1/addresses/${id}`, params);

  }

  deleteAddr(id: number){
    this.http.delete(`${this.API_URL}/api/v1/addresses/${id}`);

  }



}
