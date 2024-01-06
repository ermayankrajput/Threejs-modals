import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RootService } from './root.service';

@Injectable({
  providedIn: 'root'
})
export class ConverterService extends RootService {
  apiBase = this.getApiBase();
  
  constructor(private http: HttpClient) { super() }

  upload(file:any): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append("files[]", file);
    // return this.http.post<any>(this.apiBase + "/file-upload", formData);
    console.log(this.getHeaders());
    //return false;
    return this.http.post<any>(this.apiBase + "quote-upload", formData,{headers : this.getHeaders()});
  }

  uploadCadExchanger(files:any): Observable<HttpEvent<any>> {
    console.log(files, files.length, 'converter service')
    const formData = new FormData();
    let fileToSend: any = []
    for (let x = 0; x < files.length; x++) {
        fileToSend.push(files[x]) 
    }
    formData.append('files', fileToSend)
    // console.log(formData)

    
    // formData.append("files", files[0]);
    // files.forEach((file:any) => { formData.append('files', file); });
    console.log(formData.getAll('files'), 'converter service form')
    // return false;
    // return this.http.post<any>(this.apiBase + "/file-upload", formData);
    return this.http.post<any>(this.apiBase + "quote-upload", formData,{headers : this.getHeaders()});
  }
  

  // createUnitQuote(file:any): Observable<HttpEvent<any>> {
  //   return this.http.post<any>(this.apiBase + "/unit-quote/17/create-unit-quote", null);
  // }

  // mockUpload(file:any){
  //   return {'file':'http://localhost:4200/assets/img/key.jpg', 'image':"http://localhost:4200/assets/img/key.jpg", 'success':true};
  // }

}