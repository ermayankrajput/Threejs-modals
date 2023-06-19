import { Component, Input, OnInit } from '@angular/core';
import { QuoteInfo } from '../interface/quoteinfo/quote-info';
import { UnitQuote } from '../interface/quoteinfo/unitquote/unit-quote';

@Component({
  selector: 'app-quote-info',
  templateUrl: './quote-info.component.html',
  styleUrls: ['./quote-info.component.css']
})
export class QuoteInfoComponent implements OnInit {
  @Input()
  quoteInfo!: QuoteInfo;

  
  constructor() { }

  ngOnInit(): void {
    console.log(this.quoteInfo.unitQuote)
  }
  addUnitQuote(){
    console.log(this.quoteInfo.unitQuote)
    let unitQuote: UnitQuote = {
      id:null,
      unitPrice: null,
      quantity: null,
      amount: null,
      leadTime: null
    }
    this.quoteInfo.unitQuote.push(unitQuote)
  }
  printCurrentData(){
    console.log(this.quoteInfo.unitQuote)
  }

}
