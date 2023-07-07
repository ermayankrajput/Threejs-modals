import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnitQuote } from '../interface/unit-quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  apiBase = 'http://54.172.19.133:5000';
  constructor(private http: HttpClient) { }

  geQuotes(): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.apiBase + "/quotes");
  }

  createQuoteInfo(quoteInfoObject:any,quoteId:number): Observable<HttpEvent<any>> {
    console.log(quoteInfoObject);
    return this.http.post<any>(this.apiBase + "/quote/"+quoteId+"/create-quote-info", quoteInfoObject);
  }
  createUniteQuote(quoteInfoId:number): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.apiBase + "/unit-quote/"+quoteInfoId+"/create-unit-quote", "");
  }
  deleteUniteQuote(unitQuoteObject:any): Observable<HttpEvent<any>> {
    console.log(unitQuoteObject);
    return this.http.delete<any>(this.apiBase + "/unit-quote",unitQuoteObject);
  }
  getQuote(): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.apiBase + "/quote");
  }
  getSingleQuote(quoteId:any): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.apiBase + "/quote/" + quoteId);
  }
}
