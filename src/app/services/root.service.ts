import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnitQuote } from '../interface/unit-quote';
import { Quote } from '../interface/quote';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RootService {
    devApiBase = 'http://54.172.19.133:5000';
    prodApiBase = "http://54.172.19.133:5000";
    getHeaders(){
        return new HttpHeaders({
            'Content-Type': 'application/json',
        });
    }
  
    getApiBase(){
        return environment.production? this.prodApiBase:this.devApiBase;
    }

  
}
