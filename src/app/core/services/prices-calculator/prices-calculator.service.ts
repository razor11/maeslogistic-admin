import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PriceCalculator } from 'src/app/models/packagePriceCalculators';

@Injectable({
  providedIn: 'root',
})
export class PricesCalculatorService {
  private readonly API_URL = environment.APIURL;
  private readonly API_RESOURCE = '/api/v1/branch-offices';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PriceCalculator[]> {
    return this.http.get<PriceCalculator[]>(
      `${this.API_URL}/${this.API_RESOURCE}`
    );
  }

  createPriceRange(params: any){
    return this.http.post<PriceCalculator>(
      `${this.API_URL}/${this.API_RESOURCE}`, params
    );
  }
}
