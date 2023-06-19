import { Component, OnInit, Input } from '@angular/core';
import { UnitQuote } from '../../interface/quoteinfo/unitquote/unit-quote';

@Component({
  selector: 'app-unit-quote',
  templateUrl: './unit-quote.component.html',
  styleUrls: ['./unit-quote.component.css']
})
export class UnitQuoteComponent implements OnInit {
  @Input()
    unitQuote!: UnitQuote;

  constructor() { }

  ngOnInit(): void {
  }

}
