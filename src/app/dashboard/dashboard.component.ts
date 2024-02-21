import { Component } from '@angular/core';
import { QuoteService } from '../services/quote.service';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import { EnquiryService } from '../services/enquiry.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private quoteService:QuoteService,private userService:UserService,private datePipe: DatePipe, private enquiryService: EnquiryService){}
  quotes:any[] = [];
  users:any[] = [];
  enquiries: any[] = [];
  todayQuotes:any[] = [];

  ngOnInit(): void {
    this.quoteService.geQuotes().subscribe((response:any) => {
      this.quotes = response;
      this.findTodayQuote()
    });

    this.userService.getAllUsers().subscribe((response:any)=>{
      this.users = response;
    });

    this.enquiryService.getAllEnquiries().subscribe((response:any)=>{
      this.enquiries = response
    })

  }

  findTodayQuote(){
    this.todayQuotes = this.quotes.filter((quote) => {
      return this.datePipe.transform(quote.quote_date, 'M/d/yy') == this.datePipe.transform(Date.now(), 'M/d/yy');
    })
  }

}