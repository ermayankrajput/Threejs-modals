import { Component,OnInit } from '@angular/core';
import { UserRegister } from '../../interface/user';
import {RolesEnum} from "../../enums/roles.enum";
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private registerService:RegisterService) {}
  // public Roles2LabelMapping = Roles2LabelMapping;
  roles = RolesEnum;
  keys = Object.keys;
  isNaN: Function = Number.isNaN;
  cPassword = '';
  ageList = Array.from({length:73},(v,k)=>k+18); 
  registerStatus:any;
  registerResponse:any;

  user: UserRegister = {
    first_name: '',
    last_name: '',
    email: '',
    age:18,
    role_id:2,
    password: '',
  }
  
  validateFirstNameMessage = {validation: false, message: ''}
  validateLastNameMessage = {validation: false, message: ''}
  validateEmailMessage = {validation: false, message: ''}
  validatePasswordMessage= {validation: false, message: ''}
  validateCPasswordMessage= {validation: false, message: ''}
  
  validateFirstName(){
    return this.validateFirstNameMessage = this.user.first_name?.match(/^[a-zA-Z ]{2,30}$/) ? {validation: true, message: ''} : {validation: false, message: "Enter valid name"};
  }
  validateLastName(){
    return this.validateLastNameMessage = this.user.last_name?.match(/^[a-zA-Z ]{2,30}$/) || !this.user.last_name ? {validation: true, message: ''} : {validation: false, message: "Enter valid name"};
  }
  validateEmail(){
    return this.validateEmailMessage = this.user.email?.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? {validation: true, message: ''} : {validation: false, message: "Enter valid email"};
  }
  // validateRole(){
  //   return this.validateRoleMessage = this.user.role?.match(/^[a-zA-Z ]{2,30}$/) ? {validation: true, message: ''} : {validation: false, message: "Enter valid role"};
  // }
  validatePassword(){
    return this.validatePasswordMessage =  this.user.password?.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) ? {validation: true, message: ''} : {validation: false, message: "Enter valid password"};
  }
  validateCPassword(){
    return this.validateCPasswordMessage =  this.cPassword == this.user.password ? {validation: true, message: ''} : {validation: false, message: "Confirm password did not match"};
  }

  runValidation(){
    return this.validateFirstName().validation && this.validateLastName().validation && this.validateEmail().validation && this.validatePassword().validation && this.validateCPassword().validation
  }

  isNumber(data:any){
    return Number.isInteger(parseInt(data));
  }

  submitForm(){
    if(this.runValidation()){
      this.registerService.register(this.user).subscribe((response) => {
        this.registerResponse = response;
        console.log(this.registerResponse);
        if(this.registerResponse.status == 1){
          this.registerStatus = true;
        }
      },error=>{
        this.registerStatus = false;
      });
    }else{
      console.log('Invalid form');
    }
  }
}
