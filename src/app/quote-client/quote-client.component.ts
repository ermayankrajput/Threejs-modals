import { Component,Input, OnChanges } from '@angular/core';
import { User } from '../interface/user';

@Component({
  selector: 'app-quote-client',
  templateUrl: './quote-client.component.html',
  styleUrls: ['./quote-client.component.css']
})
export class QuoteClientComponent {
  @Input() client!:User;
  displayStyle = "none";

  openPopup() { 
    this.displayStyle = "block"; 

  } 
  closePopup() { 
    this.displayStyle = "none"; 
  } 
}
