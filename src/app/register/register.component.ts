import { Component } from '@angular/core';
import { UserRegister } from '../interface/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  user: UserRegister = {
    name: '',
    email: '',
    password: ''
  }
  
  validatePasswordMessage= {validation: true, message: ''}
  validateEmailMessage = {validation: true, message: ''}
  validateNameMessage = {validation: true, message: ''}
  
  validateName(){
    return this.validateNameMessage = this.user.name?.match(/^[a-zA-Z ]{2,30}$/) ? {validation: true, message: ''} : {validation: false, message: "Enter valid name"};
  }
  validateEmail(){
    return this.validateEmailMessage = this.user.email?.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? {validation: true, message: ''} : {validation: false, message: "Enter valid email"};
  }
  validatePassword(){
    return this.validatePasswordMessage =  this.user.password?.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) ? {validation: true, message: ''} : {validation: false, message: "Enter valid password"};
  }

  constructor() {
  }

  submitForm(){
    console.log(this.user);
  }
}
