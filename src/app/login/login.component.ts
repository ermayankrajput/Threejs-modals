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
  user = {
    email: '',
    password: ''
  }
  loginSubmit(){
    this.authService.login(this.user).subscribe((response) => {
      console.log(response);
      this.api_res = response;
      if(this.api_res.success){
        localStorage.setItem('token', this.api_res.token);
        this.router.navigate(['/']);
      }
    });
    console.log(this.user);
  }
    // validateEmail(){

    // }
    validateEmail() {
      
      // console.log('hahaha')
      return 'true'
      // return <ValidatorFn>((control:FormControl) => {
      //   console.log(this, control); //this should be: MyWidgetComponent
        
      //   this.proof = control.value;
      //   return control.value && control.value.length > 2 ? undefined : { error: 'The title must be 3 character at least' };
      // });
    }
}
