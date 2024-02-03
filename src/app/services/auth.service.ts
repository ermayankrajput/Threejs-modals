import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnitQuote } from '../interface/unit-quote';
import { Quote } from '../interface/quote';
import { RootService } from './root.service';
import { User } from '../interface/user';
import { RolesEnum, SuperAdminEnum } from '../enums/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RootService {
  apiBase = this.getApiBase();
  constructor(private http: HttpClient) { 
    super();

  }
  @Output() userLogin: EventEmitter<any> = new EventEmitter();
  user !: User;

  login(user:any): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.apiBase + "/login/",user,{headers : this.getHeaders()});
  }

  isUserLogin(){
    return this.currentUser() ? true : false;
  }

  isAdmin(){
    return this.currentUser().role.id == RolesEnum.ADMIN
  }

  isSuperAdmin(){
    return this.currentUser().role.id == SuperAdminEnum.SUPERADMIN
  }

  currentUser(){
    return this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')||'') : false;
  }

  cahngePassword(user:any): Observable<HttpEvent<any>> {
    return this.http.post<any>(this.apiBase + "change-password/",user,{headers : this.getHeaders()});
  }

  setToken(data:any){
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    // console.log(data)
    this.userLogin.emit(this.isUserLogin())
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userLogin.emit(this.isUserLogin())
  }
}
