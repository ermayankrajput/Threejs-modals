import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { QuoteInfo } from '../../interface/quote-info';
import { QuoteInfoFactory } from './quote-info.factory';
import * as _ from 'lodash';
import { QuoteService } from 'src/app/services/quote.service';
import { UnitQuote } from 'src/app/interface/unit-quote';

@Component({
  selector: 'app-quote-info',
  templateUrl: './quote-info.component.html',
  styleUrls: ['./quote-info.component.css']
})
export class QuoteInfoComponent implements OnInit {
  @Input() quoteInfo!: QuoteInfo; 
  @Input() index!:number;
  resUnitQuote:any;
  
  constructor(private quoteInfoFactory: QuoteInfoFactory, private quoteService:QuoteService) { }

  ngOnInit(): void {
  }

  addUnitQuote(){
    this.quoteService.createUniteQuote(this.quoteInfo.id).subscribe((response) => {
      console.log(response, 'in quote component ts')
      this.resUnitQuote = response;
      this.quoteInfo.unit_quotes.push(this.resUnitQuote)
    });
  }
  
  removeUnitQuote(unitQuote:UnitQuote){
    this.quoteService.deleteUniteQuote(unitQuote).subscribe((response) => {
      console.log(response, 'in quote component ts')
      // this.quoteInfo.unit_quotes.splice(event, 1)
    });
  }

  

}
