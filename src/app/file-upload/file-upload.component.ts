import { Component, OnInit, Output, EventEmitter, Input,ViewChild, ElementRef, HostListener} from '@angular/core';
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
  @ViewChild('fileUpload') fileUploadVar!:ElementRef;
  constructor(private converterService:ConverterService, private quoteService:QuoteService, private router:Router) { }
  fileName = '';
  quoteResponse:any;
  uploadingFile = false
  uploadStatus = "Uploading & Converting File"
  selectedValue='cadex';
  apiPath!: string;
  allowFiles = '.stp, .stl, .STL, .step, .catpart, .igs, .iges, .prt, .sat, .sldprt, .x_t, .STP, .STEP, .CATPART, .IGS, .IGES, .PRT, .SAT, .SLDPRT, .X_T';
  ngOnInit(): void {
    // console.log(localStorage.getItem('user'));
  }


  allowDrop(ev:any) {
    ev.preventDefault();
  }

  drop(ev:any) {
    // console.log(ev.dataTransfer);
    ev.preventDefault();
    [...ev.dataTransfer.items].forEach((item, i) => {
      // If dropped items aren't files, reject them
      if (item.kind === "file") {
        const file = item.getAsFile();
        console.log(`… file[${i}].name = ${file.name}`);
        console.log(file);
        this.upload3dfile(file)
      }
    });
    // this.upload3dfile(ev)
    // var data = ev.dataTransfer.getData("text");
    // ev.target.appendChild(document.getElementById(data));
  }

  upload3dfile(event:any){
    // console.log('event',event);
    const file:File = event?.target?.files||event;
    console.log('file',file);
    
    return false;
    if (file) {
      this.uploadingFile = true
      if(this.selectedValue === 'cadex'){
        this.converterService.uploadCadExchanger(file).subscribe((response) => {
          this.uploadStatus = "Computing";
          console.log(response,'thihth');
          this.quoteId === 0? this.createQuote(response): this.createQuoteInfo(response);
        },error => {
          // console.log(error.status);
          if(confirm("Error in handling file: "+error.status)){
            this.router.navigate(['/quotes']);
          }
        });
      }else{
        this.converterService.upload(file).subscribe((response) => {
          this.uploadStatus = "Computing"
          this.quoteId === 0? this.createQuote(response): this.createQuoteInfo(response);
        },error => {
          // console.log(error.status);
          if(confirm("Error in handling file: "+error.status)){
            this.router.navigate(['/quotes']);
          }
        });
      }
    }
  }

  createQuote(fileResponse:any){
    this.quoteService.createQuote(fileResponse).subscribe((response) => {
      this.quoteResponse = response;
      console.log(response);
      this.resetUploadingStats();
      // this.selectedValue === 'method1'? this.apiPath = '/': this
      this.router.navigate(["/quote",this.quoteResponse.id])
    });
  }

  createQuoteInfo(fileResponse:any){
    this.quoteService.createQuoteInfo(fileResponse,this.quoteId).subscribe((response) => {
      this.onCreateQuoteInfo.emit(response);
      this.resetUploadingStats();
    });
  }

  resetUploadingStats(){
    this.uploadingFile = false;
    this.uploadStatus = "Uploading & Converting File";
    this.fileUploadVar.nativeElement.value = '';
  }

  changeMethod(){
    
    if(this.selectedValue === 'cadex'){
      this.allowFiles = '.stp, .stl, .STL, .step, .catpart, .igs, .iges, .prt, .sat, .sldprt, .x_t, .STP, .STEP, .CATPART, .IGS, .IGES, .PRT, .SAT, .SLDPRT, .X_T';
    }else{
      this.allowFiles = '.stp, .STP, .step, .STEP, .igs, .IGS, .iges, .IGES, .stl, .STL';
    }
    console.log(this.allowFiles);
    this.fileUploadVar.nativeElement.accept= [this.allowFiles];
  }

}
