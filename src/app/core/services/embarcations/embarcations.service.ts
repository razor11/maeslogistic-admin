import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { embarcation } from 'src/app/models/embarcation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmbarcationsService {
  private readonly API_URL = environment.APIURL;
  private readonly API_METHOD = '/api/v1/embarcations';

  constructor(private http: HttpClient) { }

  getAll(limit:number, page:number){
    return this.http.get<embarcation[]>(
      `${this.API_URL}${this.API_METHOD}/${limit}/${page}`
    );
  }

  getById(id:number){
    return this.http.get<embarcation>(
      `${this.API_URL}${this.API_METHOD}/${id}`
    );
  }
  addEmbarcation(params:any){
    return this.http.post<any>(`${this.API_URL}${this.API_METHOD}`,params);
  }
  upEmbarcation(id:number,params:any){
    return this.http.put<any>(`${this.API_URL}${this.API_METHOD}/${ id }`,
    params);
  }
  deleteEmbarcation(id:number){
    return this.http.delete(`${this.API_URL}${this.API_METHOD}/${ id }`);
  }
}
