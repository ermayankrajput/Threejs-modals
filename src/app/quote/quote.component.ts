import { Component, OnInit } from '@angular/core';
import { Quote } from './../interface/quote';
import { QuoteInfo } from './../interface/quote-info';
import { QuoteInfoFactory } from './quote-info/quote-info.factory';
import * as _ from 'lodash';
@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  file3d:any;
  quote: Quote = {
    id: 1,
    quoteInfo: []
  }
  constructor(private quoteInfoFactory:QuoteInfoFactory) { }

  ngOnInit(): void {
  }

  renderFile(event:any){
      this.file3d = event.file
      this.quote.quoteInfo.push(this.quoteInfoFactory.buildQuoteInfo(event.file))
  }
  onClonedQuote(event:{quoteInfo: QuoteInfo, index: number}){
    this.quote.quoteInfo.splice(event.index, 0, event.quoteInfo);
  }

}
