import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component,ViewChild } from '@angular/core';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import * as _ from 'lodash';
import { Router } from '@angular/router';


@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.css']
})
export class EnquiriesComponent {
  constructor(private enquiryService:EnquiryService, private datePipe: DatePipe,private router:Router,private changeDetector: ChangeDetectorRef){}
  enquiries:any = [];
  displayedColumns: string[] = [ 'sn','id','images','name','email','quote_data','created_at','action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.enquiryService.getAllEnquiries().subscribe((response) => {
      this.enquiries = response;
      // console.log("enquiries:", this.enquiries)
      this.restructurePagination();
    });
  }
  pageSizes = [20, 50, 100];

  restructurePagination() {
      this.enquiries = _.reverse(_.sortBy(this.enquiries, function(o){return o.id}))
      this.enquiries.map((enquiry:any, index:number) => {
        enquiry.sn = index+1
        enquiry.created_at = this.datePipe.transform(enquiry.created_at, 'EEEE, d MMM y');
        enquiry.images = JSON.parse(enquiry.images).length;
        enquiry.name = JSON.parse(enquiry.user_data).fname + ' ' + JSON.parse(enquiry.user_data).lname;
        enquiry.email = JSON.parse(enquiry.user_data).email;
        enquiry.quote_data = JSON.parse(enquiry.quote_data).map((enq:any)=>{
          return ' ' + enq.service.name
        });
        // console.log("quote:", JSON.parse(enquiry.quote_data))
      })
      this.dataSource = new MatTableDataSource(this.enquiries);
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
  viewPdf(id:any){
    this.router.navigate(['/enquiry/',id])
  }
  // deleteQuote(row:any, i:number){

  // }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}
