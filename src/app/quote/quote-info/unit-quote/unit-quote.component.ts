import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { UnitQuote } from '../../../interface/unit-quote';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'app-unit-quote',
  templateUrl: './unit-quote.component.html',
  styleUrls: ['./unit-quote.component.css']
})
export class UnitQuoteComponent implements OnInit {
  @Input() unitQuote!: UnitQuote;
  constructor(private quoteService:QuoteService) { }

  ngOnInit(): void {
  }

  update(){
    this.quoteService.updateUniteQuote(this.unitQuote).subscribe((response) => {
      
    });
  }

}
