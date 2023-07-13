import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Quote } from './../interface/quote';
import { QuoteService } from '../services/quote.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import * as _ from 'lodash'

@Component({
  selector: 'app-quote-index',
  templateUrl: './quote-index.component.html',
  styleUrls: ['./quote-index.component.css'],
})

export class QuoteIndexComponent {
  quotes:any;
  displayedColumns: string[] = [ 'id','quote_date','shipping_cost','grand_total','action'];
  dataSource!: MatTableDataSource<Quote>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private quoteService:QuoteService,private router:Router) {}


  ngOnInit(): void {
    this.quoteService.geQuotes().subscribe((response) => {
      this.quotes = response;
      this.quotes = _.reverse(_.sortBy(this.quotes, function(o){return o.id}))
      this.dataSource = new MatTableDataSource(this.quotes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteQuote(row:Quote, i:number){
    console.log(i);
    // return false;
    if (confirm("Want to delete?") == true) {
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