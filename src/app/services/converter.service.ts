import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RootService } from './root.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConverterService extends RootService {
  apiBase = this.getApiBase();
  
  constructor(private http: HttpClient) { super() }

  uploadCadExchanger(file:File, quoteId = 0): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file, file.name)
    formData.append('quote-id', quoteId.toString())
    return this.http.post<any>(this.apiBase + "quote-upload", formData, {headers : new HttpHeaders({'x-access-token': localStorage.getItem('token') || "",})});
  }

}