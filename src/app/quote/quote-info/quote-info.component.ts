import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { QuoteInfo } from '../../interface/quote-info';
import { QuoteInfoFactory } from './quote-info.factory';
import * as _ from 'lodash';

@Component({
  selector: 'app-quote-info',
  templateUrl: './quote-info.component.html',
  styleUrls: ['./quote-info.component.css']
})
export class QuoteInfoComponent implements OnInit {
  @Input() quoteInfo!: QuoteInfo; 
  @Input() index!:number;
  @Output() clonedQuote = new EventEmitter() 
  
  constructor(private quoteInfoFactory: QuoteInfoFactory) { }

  ngOnInit(): void {
  }

  addUnitQuote(){
    this.quoteInfo.unitQuote.push(this.quoteInfoFactory.buildUnitQuote())
  }

  makeCopy(){
    this.clonedQuote.emit({quoteInfo: _.cloneDeep(this.quoteInfo),index:this.index+1})
  }

  makeCopyWithNoData(){
    this.clonedQuote.emit({quoteInfo: this.quoteInfoFactory.buildQuoteInfo(this.quoteInfo.image || ""),index:this.index+1})
  }


}
