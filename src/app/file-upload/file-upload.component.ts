import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { ConverterService } from '../services/converter.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Output() onFileUpload = new EventEmitter() 
  constructor(private converterService:ConverterService) { }
  fileName = '';

  ngOnInit(): void {
  }

  upload3dfile(event:any){
    console.log(event.target.files[0].name)
    const file:File = event.target.files[0];
    this.onFileUpload.emit(event.target.files[0])
    if (file) {
      this.converterService.upload(file).subscribe((response) => {
        console.log(response)
      });
    }

  }


}
