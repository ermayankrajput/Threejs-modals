import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RootService } from './root.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShareService extends RootService {
  apiBase = this.getApiBase();
  
  constructor(private http: HttpClient) { super() }

  shareQuote(uuid:string,email:string): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.apiBase + "share/"+uuid+"/"+email, "", {headers : this.getHeaders()});
  }

}