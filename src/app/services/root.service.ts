import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RootService {
    devApiBase = 'http://127.0.0.1:5000/';
    prodApiBase = "http://127.0.0.1:5000/";
    getHeaders(){
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token') || "",
        });
    }
  
    getHeadersFileUpload(){
        return new HttpHeaders({
            'x-access-token': localStorage.getItem('token') || ""
        })
    }

    getApiBase(){
        return environment.production? this.prodApiBase:this.devApiBase;
    }

    getBucketUrl(){
        return 'https://elasticbeanstalk-ap-northeast-1-364557162645.s3.ap-northeast-1.amazonaws.com/'
    }
  
}
