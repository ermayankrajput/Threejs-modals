import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService:AuthService,private router: Router){}
  api_res:any;
  invalidUser = false;
  user = {
    email: '',
    password: ''
  }
  loginSubmit(){
    this.invalidUser = false;
    this.authService.login(this.user).subscribe((response) => {
      this.api_res = response;
      // console.log(this.api_res);
      if(this.api_res.success){
        this.authService.setToken(this.api_res)
        this.router.navigate(['/']);
      }
    },error=>{
      console.log(error)
      this.invalidUser = true;
      // console.log('invalid username or password')
    });
  }
}
