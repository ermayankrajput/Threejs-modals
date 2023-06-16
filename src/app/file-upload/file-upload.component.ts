import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Output() onFileUpload = new EventEmitter() 
  constructor() { }

  ngOnInit(): void {
  }

  upload3dfile(event:any){
    console.log(event.target.files[0].name)
    this.onFileUpload.emit(event.target.files[0])
  }


}
