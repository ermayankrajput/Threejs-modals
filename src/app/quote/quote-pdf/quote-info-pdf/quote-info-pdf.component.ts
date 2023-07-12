import { Component, Input } from '@angular/core';
import { QuoteInfo } from 'src/app/interface/quote-info';
import { RootService } from 'src/app/services/root.service';

@Component({
  selector: 'app-quote-info-pdf',
  templateUrl: './quote-info-pdf.component.html',
  styleUrls: ['./quote-info-pdf.component.css']
})
export class QuoteInfoPdfComponent {
  constructor(public rootService:RootService){}
  @Input() quoteInfo!:QuoteInfo;
  @Input() index!:number;
  imageDataUri:any = "";

  drawCanvas(){
    console.log('loaded');
    // const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    // this.cx = canvasEl.getContext('2d')!;
    // let image = new Image();


    // canvasEl.width = 171;
    // canvasEl.height = 128;

    // this.cx.lineWidth = 3;
    // this.cx.lineCap = 'round';
    // this.cx.strokeStyle = '#000';
    // image.onload = ()=> {
    //     this.cx.drawImage(image, 0, 0, 171, 128);
    // }
    var imageUrl:any = this.rootService.getApiBase()+'/'+this.quoteInfo.image_file;
    
    getBase64ImageFromUrl(imageUrl)
    .then(result => this.imageDataUri = result)
    .catch(err => console.error(err));
  }
  
}
async function getBase64ImageFromUrl(imageUrl:any) {
  var res = await fetch(imageUrl);
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
