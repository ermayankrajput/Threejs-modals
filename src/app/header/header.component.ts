import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { QuoteService } from '../services/quote.service';
import { Router,ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService,private quoteService:QuoteService,private router:Router,private route:ActivatedRoute) { 
    authService.userLogin.subscribe(data => this.checkUser(data))
  }
  isNewQuoteVisible=true;
  apiResponse:any;
  isUserLogin = false;
  ngOnInit(): void {
    this.isUserLogin = this.authService.isUserLogin();
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.isNewQuoteVisible = !this.router.url.includes('new-quote');
        }
      }
    );
  }
  createUniqueQuote(){
    if(confirm("Do you want to create new quote?")){
      this.quoteService.createUniqueQuote().subscribe((response) => {
        this.apiResponse = response;
        console.log(response);
        this.router.navigate(['/quote/'+this.apiResponse.quote.id+'?new-quote']);
      });
    }
   

  }

  checkUser(data:boolean){
    this.isUserLogin = data;
  }
}
