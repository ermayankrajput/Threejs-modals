import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Quote, QuoteAttachment } from './../interface/quote';
import { QuoteInfo } from './../interface/quote-info';
import { QuoteInfoFactory } from './quote-info/quote-info.factory';
import * as _ from 'lodash';
import { ConverterService } from '../services/converter.service';
import { QuoteService } from '../services/quote.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RootService } from 'src/app/services/root.service';



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
  attachments!:QuoteAttachment[];
  
  constructor(private quoteInfoFactory:QuoteInfoFactory,private converterService:ConverterService,private quoteService:QuoteService,private route: ActivatedRoute, private router:Router, public rootService:RootService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quoteService.getSingleQuote(id).subscribe((response) => {
      this.api_res = response;
      this.quote = this.api_res.quote;
      console.log(this.quote)
      this.quote.quote_infos = _.sortBy(this.quote.quote_infos, function(o){
        o.unit_quotes = _.sortBy(o.unit_quotes, function(o){return o.id});
        return o.id;
      })
      this.quote.grand_total = this.quote.grand_total?this.quote.grand_total:0;
      this.attachments = JSON.parse(this.quote.attachments || null)
    });
  }


  ngDoCheck(): void {
    if (this.quote) {
      if(this.calculateTotalCost() != this.quote.grand_total){
        this.quote.grand_total = this.calculateTotalCost();
        if(this.quote.grand_total)
        {
          this.updateQuote();
        }
      };
    }
  }
  

  renderFile(event:any){
      // this.quote.quote_infos.push(this.quoteInfoFactory.buildQuoteInfo(event.file))
  }
  onClonedQuote(event:{quoteInfo: QuoteInfo, index: number}){
    this.quote.quote_infos.splice(event.index, 0, event.quoteInfo);
  }
  onRemoveQuote(event:number){
    this.quote.quote_infos.splice(event, 1)
  }
  public view(): void {
    this.router.navigate(["/quote/pdf/",this.quote.id])
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
    const newObj = _.omit(cloneobj, ['quote_infos', 'parent_id', 'versions']);
    console.log(newObj)
    this.quoteService.updateQuote(newObj).subscribe((response) => {
    });
    
  }

  updateQuoteObject(event:any){
    console.log(event)
    this.quote = event;
  }

  calculateTotalCost(){
    let totalCost = _.sumBy(this.quote.quote_infos, ({unit_quotes})=>_.sumBy(unit_quotes,function(o){
      return (o.unit_price||0)*(o.quantity||0);
    }));
    return Math.round((totalCost || 0 + parseFloat(this.quote.shipping_cost || '0'))*100)/100;
  }

}
