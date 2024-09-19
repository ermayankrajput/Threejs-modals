import { Component,ViewChild } from '@angular/core';
import { ExchangeService } from '../services/exchange.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Exchange } from '../interface/user';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent {
  constructor(private exchangeService:ExchangeService,private router: Router){}
  allExchangeRates:any;
  displayedColumns: string[] = [ 'id','rate','created_at'];
  dataSource!: MatTableDataSource<Exchange>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayStyle = "none";
  exchangeRate = {
    rate: ''
  }
  api_res:any;
  resultStatus= {success: false, message: ''};
  validateRateMessage= {validation: false, message: ''}


  ngOnInit(): void {
    this.exchangeService.getAllExchangeRate().subscribe((response) => {
      this.allExchangeRates = response;
      console.log(this.allExchangeRates)
      this.allExchangeRates = _.reverse(_.sortBy(this.allExchangeRates, function(o){return o.id}))
      this.dataSource = new MatTableDataSource(this.allExchangeRates);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    },error=>{
      console.log(error)
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openPopup() { 
    this.displayStyle = "block"; 
  } 
  closePopup() { 
    this.displayStyle= "none"; 
  } 

  validatePassword(){
    return this.validateRateMessage =  this.exchangeRate.rate?.match(/(\d+(?:\.\d+)?)/) ? {validation: true, message: ''} : {validation: false, message: "Enter valid exchange rate"};
  }
  saveExchangerate(){
    if(this.validatePassword().validation){
      this.exchangeService.saveExchangeRate(this.exchangeRate).subscribe((response) => {
        this.api_res = response;
        // console.log(this.api_res.success);
        if(this.api_res.success){
          this.displayStyle= "none"; 
          this.ngOnInit();
          // this.router.navigate(['/exchange-rate']);
        }else{
          this.resultStatus = {success:false, message:'Something went wrong'};
        }
      },error=>{
          this.resultStatus = {success:false, message:'Something went wrong'};
      });
    }
  }
  
}
