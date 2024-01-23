import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService) { 
    authService.userLogin.subscribe(data => this.checkUser(data))
  }
  isUserLogin = false;
  ngOnInit(): void {
    this.isUserLogin = this.authService.isUserLogin();
  }

  checkUser(data:boolean){
    this.isUserLogin = data;
  }
}
