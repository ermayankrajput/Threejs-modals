import { Component } from '@angular/core';
import { QuoteInfo } from './interface/quoteinfo/quote-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  file3d:any;
  quoteInfo: QuoteInfo = {
    id: 1,
    material: 'Aluminium',
    technique: 'Metal Casting',
    finishing: 'Smooth',
    unitQuote: [
      {
        id: 2,
        unitPrice: 20,
        quantity: 2,
        amount: 40,
        leadTime: 15
      },
      {
        id: 2,
        unitPrice: 30,
        quantity: 2,
        amount: 60,
        leadTime: 15
      },
      {
        id: 2,
        unitPrice: 50,
        quantity: 2,
        amount: 100,
        leadTime: 15
      },
    ]
  };
  ngOnInit() {
  }
  renderFile(event:any){
      const file = event;
      const reader = new FileReader();
      reader.onload = e => {
        this.file3d = reader.result;
        console.log(this.file3d);
      } 
      reader.readAsDataURL(file);
  }
}
