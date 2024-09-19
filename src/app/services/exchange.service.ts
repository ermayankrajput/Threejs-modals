import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { RootService } from './root.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService extends RootService {
  apiBase = this.getApiBase();
  constructor(private http: HttpClient) { super();}

  getCurrentExchangeRate(): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.apiBase + "exchange-rate",{headers : this.getHeaders()});
  }

  getAllExchangeRate(): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.apiBase + "exchange-rates",{headers : this.getHeaders()});
  }

  saveExchangeRate(exchange:any): Observable<HttpEvent<any>> {
    // console.log(exchange);
    return this.http.post<any>(this.apiBase + "exchange-rate",exchange,{headers : this.getHeaders()});
  }

}