import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteService extends RootService {
  apiBase = this.getApiBase();
  constructor(private http: HttpClient) { super() }

  geQuotes(): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.apiBase + "quotes/",{headers : this.getHeaders()});
  }
  createQuote(returnData:any): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.apiBase + "/quote",returnData,{headers : this.getHeaders()});
  }
  updateQuote(quote:any): Observable<HttpEvent<any>> {
    return this.http.patch<any>(this.apiBase + "quote/", quote, {headers : this.getHeaders()});
  }
  getSingleQuote(quoteId:any): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.apiBase + "/quote/" + quoteId,{headers : this.getHeaders()});
  }
  deleteQuote(quote:any):Observable<HttpEvent<any>> {
    return this.http.delete<any>(this.apiBase + "/quote/",{ headers: this.getHeaders(), body: quote });
  }

  createQuoteInfo(quoteInfoObject:any,quoteId:number): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.apiBase + "/quote/"+quoteId+"/create-quote-info/", quoteInfoObject,{headers : this.getHeaders()});
  }
  updateQuoteInfo(quoteInfoObject:any): Observable<HttpEvent<any>> {
    return this.http.patch<any>(this.apiBase + "/quote-info/", quoteInfoObject,{headers : this.getHeaders()});
  }
  deleteQuoteInfo(quoteInfo:any): Observable<HttpEvent<any>> {
    return this.http.delete<any>(this.apiBase + "/quote-info/",{ headers: this.getHeaders(), body: quoteInfo });
  }

  createUniteQuote(quoteInfoId:number): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.apiBase + "/quote-info/"+quoteInfoId+"/create-unit-quote", "",{headers : this.getHeaders()});
  }
  updateUniteQuote(unitQuote:any): Observable<HttpEvent<any>> {
    return this.http.patch<any>(this.apiBase + "/unit-quote/", unitQuote,{headers : this.getHeaders()});
  }
  deleteUniteQuote(unitQuoteObject:any): Observable<HttpEvent<any>> {
    return this.http.delete<any>(this.apiBase + "/unit-quote/",{ headers: this.getHeaders(), body: unitQuoteObject });
  }

  createUniqueQuote(): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.apiBase + "/create-quote",{headers : this.getHeaders()});
  }
  
}
