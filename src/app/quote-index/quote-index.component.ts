import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Quote } from './../interface/quote';
import { QuoteService } from '../services/quote.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-quote-index',
  templateUrl: './quote-index.component.html',
  styleUrls: ['./quote-index.component.css'],
})

export class QuoteIndexComponent {
  constructor(private quoteService:QuoteService,private router:Router, private datePipe: DatePipe ) {}
  quotes:any;
  displayedColumns: string[] = [ 'id','date_new','shipping_cost','grand_total','action'];
  dataSource!: MatTableDataSource<Quote>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // pipe!: DatePipe;

  ngOnInit(): void {
    this.quoteService.geQuotes().subscribe((response) => {
      this.quotes = response;
      this.ngAfterViewInit();
    });
  }

  pageSizes = [20, 50, 100];

  ngAfterViewInit() {
      this.quotes = _.reverse(_.sortBy(this.quotes, function(o){return o.id}))
      this.quotes.map((quote:any) => {
        quote.date_new = this.datePipe.transform(quote.quote_date, 'EEEE, d MMM y')
      })
      this.dataSource = new MatTableDataSource(this.quotes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  deleteQuote(row:Quote, i:number){
    let deleteQuote = prompt("Please type DELETE to delete quote ID: "+ row.id, "");
    if (deleteQuote === "DELETE") {
      this.quoteService.deleteQuote(row).subscribe((response) => {

        this.quotes.splice(i, 1)

        this.dataSource = new MatTableDataSource(this.quotes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  viewPdf(quoteId:number){
    this.router.navigate(["/quote/pdf/",quoteId])
  }
  editQuote(quoteId:number){
    this.router.navigate(["/quote",quoteId])
  }

}