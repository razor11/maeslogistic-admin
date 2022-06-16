import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { logisticOperator } from 'src/app/models/logistic-operator';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogisticOperatorsService {

  private readonly API_URL = environment.APIURL;
  private readonly API_METHOD = '/api/v1/logistic-operators';

  constructor(private http: HttpClient) { }

  getAll(page:number, limit:number){
    return this.http.get<logisticOperator[]>(
      `${this.API_URL}${this.API_METHOD}/${page}/${limit}`
    );
  }

  getById(id:number){
    return this.http.get<logisticOperator>(
      `${this.API_URL}${this.API_METHOD}/${id}`
    );
  }

  addLogisticOperator(params:any){
    return this.http.post<any>(`${this.API_URL}${this.API_METHOD}`,params);
  }
  updateLogisticOperator(id:number,params:any){
    return this.http.patch<any>(`${this.API_URL}${this.API_METHOD}/${ id }`,
    params);
  }
  deleteLogisticOperator(id:number){
    return this.http.delete(`${this.API_URL}${this.API_METHOD}/${ id }`);
  }
}
