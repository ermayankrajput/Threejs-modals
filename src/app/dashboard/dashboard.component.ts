import { Component } from '@angular/core';
import { QuoteService } from '../services/quote.service';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private quoteService:QuoteService,private userService:UserService,private datePipe: DatePipe){}
  quotes:any[] = [];
  users:any[] = [];
  todayQuotes:any[] = [];

  ngOnInit(): void {
    this.quoteService.geQuotes().subscribe((response:any) => {
      this.quotes = response;
      console.log(this.quotes)
      this.findTodayQuote()
    });
    this.userService.getAllUsers().subscribe((response:any)=>{
      this.users = response;
      console.log(this.users)
      });
      this.userService.getAllUsers().subscribe((response:any)=>{
        this.users = response;
        console.log(this.users)
        })
  }

  findTodayQuote(){
    this.todayQuotes = this.quotes.filter((quote) => {
      return this.datePipe.transform(quote.quote_date, 'M/d/yy') == this.datePipe.transform(Date.now(), 'M/d/yy');
    })
  }

}