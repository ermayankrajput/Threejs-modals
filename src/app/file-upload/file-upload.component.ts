import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { ConverterService } from '../services/converter.service';
// import { EventEmitter } from 'stream';
import { QuoteService } from '../services/quote.service';
import { Router } from '@angular/router';
import { Quote } from '../interface/quote';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Output() onFileUpload = new EventEmitter() 
  @Output() onCreateQuoteInfo = new EventEmitter() 
  @Input() quoteId:number = 0;
  constructor(private converterService:ConverterService, private quoteService:QuoteService, private router:Router) { }
  fileName = '';
  quoteResponse:any;
  uploadingFile = false
  uploadStatus = "Uploading & Converting File"
  ngOnInit(): void {
  }

  upload3dfile(event:any){
    const file:File = event.target.files[0];
    if (file) {
      this.uploadingFile = true
      this.converterService.upload(file).subscribe((response) => {
        this.uploadStatus = "Computing"
        this.quoteId === 0? this.createQuote(response): this.createQuoteInfo(response);
      });
    }
  }

  createQuote(fileResponse:any){
    this.quoteService.createQuote(fileResponse).subscribe((response) => {
      this.quoteResponse = response;
      console.log(response);
      this.router.navigate(["/quote",this.quoteResponse.id])
    });
  }

  createQuoteInfo(fileResponse:any){
    this.quoteService.createQuoteInfo(fileResponse,this.quoteId).subscribe((response) => {
      this.onCreateQuoteInfo.emit(response);
    });
  }


}
