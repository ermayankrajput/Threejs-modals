import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  apiBase = 'https://0721-223-233-74-152.in.ngrok.io';
  
  constructor(private http: HttpClient) { }

  upload(file:any): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<any>(this.apiBase + "/convert", formData);
  }

  mockUpload(file:any){
    return {'file':'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg', 'image':"https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg", 'success':true};
  }

}
