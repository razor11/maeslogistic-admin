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


  addNewAddr(id:number, params: any){
       return this.http.post(`${this.API_URL}/api/v1/addresses/${id}`, params);

  }

  updateAddr(id:number, params:any){
    return this.http.patch<Addresses>(`${this.API_URL}/api/v1/addresses/${id}`, params);

  }

  delete(id: string){
   return this.http.delete(`${this.API_URL}/api/v1/addresses/${id}`);

  }



}
