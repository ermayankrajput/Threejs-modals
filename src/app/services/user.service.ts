import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnitQuote } from '../interface/unit-quote';
import { Quote } from '../interface/quote';
import { RootService } from './root.service';
import { User } from '../interface/user';
import { RolesEnum } from '../enums/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService extends RootService {
  apiBase = this.getApiBase();
  constructor(private http: HttpClient) { 
    super();

  }
  @Output() userLogin: EventEmitter<any> = new EventEmitter();
  user !: User;

  getCurrentUser(): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.apiBase + "get/user/",{headers : this.getHeaders()});
  }
  getAllUsers(): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.apiBase + "get/users/",{headers : this.getHeaders()});
  }
  deleteUser(id:any): Observable<HttpEvent<any>> {
    return this.http.delete<any>(this.apiBase + "user/"+id+"/",{headers : this.getHeaders()});
  }
  getUserById(userId:any): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.apiBase + "user/" + userId + "/",{headers : this.getHeaders()});
  }
  updateUserProfile(user:any): Observable<HttpEvent<any>> {
    return this.http.patch<any>(this.apiBase + "user/",user,{headers : this.getHeaders()});
  }
}
