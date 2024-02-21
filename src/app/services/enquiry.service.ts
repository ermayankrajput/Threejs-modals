import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService extends RootService {
  apiBase = this.getApiBase();
  constructor(private http: HttpClient) { 
    super();

  }
  getAllEnquiries(): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.apiBase + "enquiries",{headers : this.getHeaders()});
  }
  getEnquiryById(id:any): Observable<HttpEvent<any>> {
    return this.http.get<any>(this.apiBase + "enquiry/" + id ,{headers : this.getHeaders()});
  }
}
