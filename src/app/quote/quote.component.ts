import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { Quote } from './../interface/quote';
import { QuoteInfo } from './../interface/quote-info';
import { QuoteInfoFactory } from './quote-info/quote-info.factory';
import * as _ from 'lodash';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ConverterService } from '../services/converter.service';
import { QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  @ViewChild('MyDIv') MyDIv!: ElementRef;
  // file3d:any;
  fileObject:any;
  quote: Quote = {
    id: 1,
    quoteInfo: []
  }
  constructor(private quoteInfoFactory:QuoteInfoFactory,private converterService:ConverterService,private quoteService:QuoteService) { }

  ngOnInit(): void {
  }

  renderFile(event:any){
      this.quote.quoteInfo.push(this.quoteInfoFactory.buildQuoteInfo(event.file))
      // new function to call create quote service
      console.log('in render file', event)
      // if (event) {
      //   this.quoteService.createQuote({files: event.file}).subscribe((response) => {
      //     console.log(response, 'in quote component ts')
      //   });
      // }

  }
  onClonedQuote(event:{quoteInfo: QuoteInfo, index: number}){
    this.quote.quoteInfo.splice(event.index, 0, event.quoteInfo);
  }
  onRemoveQuote(event:number){
    this.quote.quoteInfo.splice(event, 1)
  }
  public downloadAsPDF(): void {
      let domElement = this.MyDIv.nativeElement as HTMLElement;
      html2canvas(domElement).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        heightLeft -= pageHeight;
        const doc = new jsPDF('p', 'mm');
        doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
          heightLeft -= pageHeight;
        }
        doc.save('Filename.pdf');   
    }); 
  }

}
