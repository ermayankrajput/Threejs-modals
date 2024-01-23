import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor(private authService:AuthService,private router: Router){}
  resultStatus= {success: false, message: ''};
  api_res:any;
  cNPassword = '';
   user = {
    password: '',
    new_password:'',
  }
  validatePasswordMessage= {validation: false, message: ''}
  validateNPasswordMessage= {validation: false, message: ''}
  validateCNPasswordMessage= {validation: false, message: ''}
  validatePassword(){
    return this.validatePasswordMessage =  this.user.password != '' ? {validation: true, message: ''} : {validation: false, message: "Enter valid password"};
  }
  validateNPassword(){
    return this.validateNPasswordMessage =  this.user.new_password?.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) ? {validation: true, message: ''} : {validation: false, message: "Enter valid password"};
  }
  validateCNPassword(){
    return this.validateCNPasswordMessage =  this.cNPassword == this.user.new_password ? {validation: true, message: ''} : {validation: false, message: "Confirm password did not match"};
  }
  runValidation(){
    return  this.validatePassword().validation && this.validateNPassword().validation && this.validateCNPassword().validation
  }
  changePassword(){
    this.resultStatus= {success: false, message: ''};
    if(this.runValidation()){
      this.authService.cahngePassword(this.user).subscribe((response) => {
      this.api_res = response;
      if(this.api_res.success){
        this.resultStatus = {success:true, message:'Password changed successfully'};
        this.user={password:'',new_password:''};
        this.cNPassword = '';
      }else{
        this.resultStatus = {success:false, message:'Invalid current password'};
        this.user={password:'',new_password:''};
        this.cNPassword = '';
      }
    },error=>{
        this.resultStatus = {success:false, message:'Something went wrong'};
    });
    }else{
        this.resultStatus = {success:false, message:'Invalid form input'};
    }
  }
}
