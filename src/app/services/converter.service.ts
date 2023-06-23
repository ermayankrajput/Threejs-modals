import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  apiBase = 'https://b0a5-223-233-74-152.in.ngrok.io';
  
  constructor(private http: HttpClient) { }

  upload(file:any): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<any>(this.apiBase + "/3d-file-upload", formData);
  }

  createUnitQuote(file:any): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.apiBase + "/unit-quote/17/create-unit-quote", null);
  }

  mockUpload(file:any){
    return {'file':'http://localhost:4200/assets/img/key.jpg', 'image':"http://localhost:4200/assets/img/key.jpg", 'success':true};
  }

}
