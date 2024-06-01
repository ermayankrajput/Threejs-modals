import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { UnitQuote } from '../../../interface/unit-quote';
import { QuoteService } from 'src/app/services/quote.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-unit-quote',
  templateUrl: './unit-quote.component.html',
  styleUrls: ['./unit-quote.component.css']
})
export class UnitQuoteComponent implements OnInit {
  @Input() unitQuote!: UnitQuote;
  @Input() commission:number = 0;
  constructor(private quoteService:QuoteService,public authService:AuthService) { }

  ngOnInit(): void {
  }
  addCommission(price:any = 0){
    return parseFloat(price) + (price*this.commission)/100;
  }

  update(){
    this.quoteService.updateUniteQuote(this.unitQuote).subscribe((response) => {
      
    });
  }

}
