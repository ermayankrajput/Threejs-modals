import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnquiryService } from 'src/app/services/enquiry.service';


@Component({
  selector: 'app-enquiry-detail',
  templateUrl: './enquiry-detail.component.html',
  styleUrls: ['./enquiry-detail.component.css']
})
export class EnquiryDetailComponent {
  constructor(private route: ActivatedRoute,private enquiryService:EnquiryService){}
  enquiry:any;
  enquiryId:any;
  userData:any;
  quoteData:any;
  files:any;

  ngOnInit(): void {
    this.enquiryId = this.route.snapshot.paramMap.get('id');
    this.enquiryService.getEnquiryById(this.enquiryId).subscribe((response) => {
      this.enquiry = response;
      this.userData = JSON.parse(this.enquiry.enquiries.user_data)
      this.quoteData = JSON.parse(this.enquiry.enquiries.quote_data)
      this.files = JSON.parse(this.enquiry.enquiries.images)
    });
  }

}
