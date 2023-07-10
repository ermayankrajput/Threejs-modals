import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { QuoteInfo } from '../../interface/quote-info';
import { QuoteInfoFactory } from './quote-info.factory';
import * as _ from 'lodash';
import { QuoteService } from 'src/app/services/quote.service';
import { UnitQuote } from 'src/app/interface/unit-quote';
import { RootService } from 'src/app/services/root.service';

@Component({
  selector: 'app-quote-info',
  templateUrl: './quote-info.component.html',
  styleUrls: ['./quote-info.component.css']
})
export class QuoteInfoComponent implements OnInit {
  @Input() quoteInfo!: QuoteInfo; 
  @Input() index!:number;
  resUnitQuote:any;
  
  constructor(private quoteInfoFactory: QuoteInfoFactory, private quoteService:QuoteService, public rootService:RootService) { }

  ngOnInit(): void {
  }

  addUnitQuote(){
    this.quoteService.createUniteQuote(this.quoteInfo.id).subscribe((response) => {
      this.resUnitQuote = response;
      this.quoteInfo.unit_quotes.push(this.resUnitQuote)
    });
  }
  
  removeUnitQuote(unitQuote:UnitQuote,index:number){
    this.quoteService.deleteUniteQuote(unitQuote).subscribe((response) => {
      this.quoteInfo.unit_quotes.splice(index, 1)
    });
  }

  updateQuoteInfo(quoteInfo:QuoteInfo){
    const cloneobj = _.clone(quoteInfo);
    const newObj = _.omit(cloneobj, ['unit_quotes']);
    this.quoteService.updateQuoteInfo(newObj).subscribe((response) => {
  
    });
  }

}
