import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Quote, QuoteAttachment } from './../interface/quote';
import { QuoteInfo } from './../interface/quote-info';
import { QuoteInfoFactory } from './quote-info/quote-info.factory';
import * as _ from 'lodash';
import { ConverterService } from '../services/converter.service';
import { QuoteService } from '../services/quote.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RootService } from 'src/app/services/root.service';
import { UserService } from '../services/user.service';
import { User } from '../interface/user';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit  {
  @ViewChild('MyDIv') MyDIv!: ElementRef;
  api_res:any;
  fileObject:any;
  quote!:Quote;
  attachments!:QuoteAttachment[];
  displayStyle = "none";
  displayStyleNewUser = "none";
  filterUsers:any;
  allUsers:any;
  clientData:any;
  isAddingClient = false;
  isClientAdded = false;
  
  
  constructor(private quoteInfoFactory:QuoteInfoFactory,private converterService:ConverterService,private quoteService:QuoteService,private route: ActivatedRoute, private router:Router, public rootService:RootService, private userService: UserService, public authService:AuthService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.quoteService.getSingleQuote(id).subscribe((response) => {
      this.api_res = response;
      this.quote = this.api_res.quote;
      console.log(this.quote)
      this.quote.quote_infos = _.sortBy(this.quote.quote_infos, function(o){
        o.unit_quotes = _.sortBy(o.unit_quotes, function(o){return o.id});
        return o.id;
      })
      this.quote.grand_total = this.quote.grand_total?this.quote.grand_total:0;
      this.getAttchments();
    });
  }


  ngDoCheck(): void {
    if (this.quote) {
      if(this.calculateTotalCost() != this.quote.grand_total){
        this.quote.grand_total = this.calculateTotalCost();
        if(this.quote.grand_total)
        {
          this.updateQuote();
        }
      };
    }
  }
  
  getAttchments(){
    this.attachments = JSON.parse(this.quote.attachments || null)
  }

  renderFile(event:any){
      // this.quote.quote_infos.push(this.quoteInfoFactory.buildQuoteInfo(event.file))
  }

  onClonedQuote(event:{quoteInfo: QuoteInfo, index: number}){
    this.quote.quote_infos.splice(event.index, 0, event.quoteInfo);
  }

  onRemoveQuote(event:number){
    this.quote.quote_infos.splice(event, 1)
  }

  public view(): void {
    this.router.navigate(["/quote/pdf/",this.quote.id])
  }

  addQuoteInfo(event:QuoteInfo){
    this.quote.quote_infos.push(event);
  }

  removeQuoteInfo(quoteInfo:any,i:number){
    if (confirm("Want to delete?") == true) {
      this.quoteService.deleteQuoteInfo(quoteInfo).subscribe((response) => {
        this.quote.quote_infos.splice(i, 1)
      });
    }
  }

  removeAttachment(event:number){
    this.attachments.splice(event, 1);
    this.quote.attachments = JSON.stringify(this.attachments);
    this.updateQuote()
  }

  createQuoteInfo(quoteInfo:QuoteInfo, index: number){
    const cloneobj = _.clone(quoteInfo);
    const newObj = _.omit(cloneobj, ['unit_quotes']);
    newObj.finishing = "";
    newObj.technique = "";
    newObj.material_search = "";
    this.quoteService.createQuoteInfo(newObj,this.quote.id).subscribe((response) => {
      const newRes:any = response;
      this.quote.quote_infos.splice(index+1, 0, newRes);
    });
  }

  updateQuote(){
    const cloneobj = _.clone(this.quote);
    const newObj = _.omit(cloneobj, ['quote_infos', 'parent_id', 'versions','client','is_version_finalized']);
    console.log("🚀 ~ QuoteComponent ~ updateQuote ~ this.quote:", this.quote)
    
    this.quoteService.updateQuote(newObj).subscribe((response) => {
    });
  }

  updateQuoteObject(event:any){
    this.quote = event;
    this.getAttchments();
  }

  calculateTotalCost(){
    let totalCost = _.sumBy(this.quote.quote_infos, ({unit_quotes})=>_.sumBy(unit_quotes,function(o){
      return (o.unit_price||0)*(o.quantity||0);
    }));
    return Math.round((totalCost || 0 + parseFloat(this.quote.shipping_cost || '0'))*100)/100;
  }
  openPopup() { 
    this.isAddingClient = false;
    this.displayStyle = "block"; 
    this.userService.getAllUsers(2).subscribe((response) => {
      this.allUsers = response;
      this.filterUsers = [...this.allUsers];
    });

  } 
  closePopup() { 
    this.displayStyle = "none"; 
  } 
  applyFilter(event:any){
    this.filterUsers = this.allUsers.filter((user:any)=>{
      // return user.email.toLowerCase().includes(event.target.value.toLowerCase()) || user.first_name?user.first_name.toLowerCase().includes(event.target.value.toLowerCase()) : false || user.last_name?user.last_name.toLowerCase().includes(event.target.value.toLowerCase()) : false || user.id == event.target.value || user.country?user.country.toLowerCase().includes(event.target.value.toLowerCase()) : false;
      // console.log(user.email.toLowerCase().includes(event.target.value.toLowerCase()));
      // return user.email.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 || user.first_name?user.first_name.toLowerCase().includes(event.target.value.toLowerCase()) : false || user.last_name?user.last_name.toLowerCase().includes(event.target.value.toLowerCase()) : false || parseInt(user.id) == parseInt(event.target.value);
      return user.email.toLowerCase().includes(event.target.value.toLowerCase()) || parseInt(user.id) == parseInt(event.target.value);
    })
  }
  addClient(userId:number){
    this.isAddingClient = true;
    this.userService.addClientToQuote(userId, this.quote.id).subscribe((response) => {
      console.log(response);
      this.clientData = response;
      this.quote.client = {...this.clientData.client};
      this.isClientAdded = true;
      // this.isAddingClient = false;
    });
  }

  addNewClient(){
    this.displayStyle = "none"; 
    this.displayStyleNewUser = "block"; 
  }
  closePopupNewUser() { 
    this.displayStyleNewUser = "none"; 
  } 

  updateIsFinal(){
    this.quote.is_final = this.quote.is_final?0:1;
    this.updateQuote()
  }

}
