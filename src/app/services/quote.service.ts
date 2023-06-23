import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  apiBase = 'https://b0a5-223-233-74-152.in.ngrok.io';
  constructor(private http: HttpClient) { }

  createQuote(fileObject:any): Observable<HttpEvent<any>> {
    console.log(fileObject);
    return this.http.post<any>(this.apiBase + "/quote", fileObject);
  }
  getQuote(): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.apiBase + "/quote");
  }
  getSingleQuote(quoteId:any): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.apiBase + "/quote/" + quoteId);
  }
}
