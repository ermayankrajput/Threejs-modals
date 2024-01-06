import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnitQuote } from '../interface/unit-quote';
import { Quote } from '../interface/quote';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RootService {
  apiBase = this.getApiBase();
  constructor(private http: HttpClient) { super() }

  login(user:any): Observable<HttpEvent<any>> {
    console.log(user);
    return this.http.post<any>(this.apiBase + "login/",user,{headers : this.getHeaders()});
  }
  getCurrentUser(): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.apiBase + "get/user",{headers : this.getHeaders()});
  }

}
