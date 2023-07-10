import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Quote } from './../interface/quote';
import { QuoteInfo } from './../interface/quote-info';
import { QuoteInfoFactory } from './quote-info/quote-info.factory';
import * as _ from 'lodash';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ConverterService } from '../services/converter.service';
import { QuoteService } from '../services/quote.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit  {
  @ViewChild('MyDIv') MyDIv!: ElementRef;
  api_res:any;
  fileObject:any;
  quote!:Quote;
  
  constructor(private quoteInfoFactory:QuoteInfoFactory,private converterService:ConverterService,private quoteService:QuoteService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quoteService.getSingleQuote(id).subscribe((response) => {
      this.api_res = response;
      console.log(response);
      this.quote = this.api_res;
      this.quote.grand_total = this.quote.grand_total?this.quote.grand_total:0;
    });
  }


  ngDoCheck(): void {
    if (this.quote) {
      if(this.calculateTotalCost() != this.quote.grand_total){
        this.quote.grand_total = this.calculateTotalCost();
        this.updateQuote();
      };
    }
  }
  

  renderFile(event:any){
      this.quote.quote_infos.push(this.quoteInfoFactory.buildQuoteInfo(event.file))
  }
  onClonedQuote(event:{quoteInfo: QuoteInfo, index: number}){
    this.quote.quote_infos.splice(event.index, 0, event.quoteInfo);
  }
  onRemoveQuote(event:number){
    this.quote.quote_infos.splice(event, 1)
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

  addQuoteInfo(event:QuoteInfo){
    this.quote.quote_infos.push(event);
  }

  removeQuoteInfo(quoteInfo:any,i:number){
    if (confirm("Want to delete?") == true) {
      this.quoteService.deleteQuoteInfo(quoteInfo).subscribe((response) => {
        this.quote.quote_infos.splice(i, 1)
      });
    }
  }

  createQuoteInfo(quoteInfo:QuoteInfo, index: number){
    const cloneobj = _.clone(quoteInfo);
    const newObj = _.omit(cloneobj, ['unit_quotes']);
    newObj.finishing = "";
    newObj.technique = "";
    newObj.material_search = "";
    this.quoteService.createQuoteInfo(newObj,this.quote.id).subscribe((response) => {
      const newRes:any = response;
      this.quote.quote_infos.splice(index+1, 0, newRes);
    });
  }

  updateQuote(){
    const cloneobj = _.clone(this.quote);
    const newObj = _.omit(cloneobj, ['quote_infos']);
    this.quoteService.updateQuote(newObj).subscribe((response) => {
    });
    
  }

  calculateTotalCost(){
    let totalCost = _.sumBy(this.quote.quote_infos, ({unit_quotes})=>_.sumBy(unit_quotes,function(o){
      return (o.unit_price||0)*(o.quantity||0);
    }));
    console.log(typeof totalCost, typeof this.quote.shipping_cost)
    console.log( totalCost,parseFloat(this.quote.shipping_cost))
    return Math.round((totalCost + parseFloat(this.quote.shipping_cost))*100)/100;
  }

}
