import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customers } from '../../../models/customers'
import { environment } from '../../enviroment';


@Injectable({
  providedIn: 'root'
})
export class DataCustomersService {

  private readonly API_URL = environment.APIURL;

  dataChange : BehaviorSubject<Customers[]> = new BehaviorSubject<Customers[]>([]);

  constructor(private http: HttpClient) { }



 get data(): Customers[]{
   return this.dataChange.value;
 }

  /** CRUD METHODS */

  getAll(limit:number, page:number) {
      return this.http.get<any>(`${this.API_URL}/api/v1/customers/${limit}/${page}`);
  }

  getById(id: string){
    return this.http.get<Customers>(`${environment.APIURL}/api/v1/customers/${id}`);
  }

  addCLient(params: any){
     return this.http.post<any>(`${environment.APIURL}/api/v1/customers`, params);
  }

  updateClient(customerId:number, params: any){

    return this.http.put<any>(`${environment.APIURL}/api/v1/customers/${customerId}`, params);

  }

  deleteClient(customerId:number){
    return this.http.delete(`${environment.APIURL}/api/v1/customers/${customerId}`);

  }


}
