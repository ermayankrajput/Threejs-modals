import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends RootService {
  apiBase = this.getApiBase();
  constructor(private http: HttpClient) { super() }
  @Output() userLogin: EventEmitter<any> = new EventEmitter();

  register(user:any): Observable<HttpEvent<any>> {
    console.log(user);
    return this.http.post<any>(this.apiBase + "signup/",user,{headers : this.getHeaders()});
  }
}
