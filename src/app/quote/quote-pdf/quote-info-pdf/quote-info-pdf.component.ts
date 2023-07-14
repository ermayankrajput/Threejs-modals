import { Component, Input, OnInit } from '@angular/core';
import { QuoteInfo } from 'src/app/interface/quote-info';
import { RootService } from 'src/app/services/root.service';
import * as _ from "lodash"

@Component({
  selector: 'app-quote-info-pdf',
  templateUrl: './quote-info-pdf.component.html',
  styleUrls: ['./quote-info-pdf.component.css']
})
export class QuoteInfoPdfComponent implements OnInit {
  constructor(public rootService:RootService){}
  @Input() quoteInfo!:QuoteInfo;
  @Input() index!:number;
  imageDataUri:any = "";
  spacebelow = ''

  ngOnInit(): void {
    
  }

  drawCanvas(){
    console.log('loaded');
    var imageUrl:string = this.rootService.getBucketUrl()+'/uploads/'+this.quoteInfo.image_file;
    getBase64ImageFromUrl(imageUrl)
    .then(result => {
      this.imageDataUri = result
      this.imageDataUri = this.imageDataUri.replace("data:binary/octet-stream;base64", "data:image/png;base64");
      
    })
    .catch(err => console.error(err));
  }
  
}
async function getBase64ImageFromUrl(imageUrl:string) {
  var res = await fetch(imageUrl, { method: 'GET', mode: "cors" });
  var blob = await res.blob();

  return new Promise((resolve, reject) => {
    var reader  = new FileReader();
    reader.addEventListener("load", function () {
        resolve(reader.result);
    }, false);

    reader.onerror = () => {
      return reject();
    };
    reader.readAsDataURL(blob);
  })
}
