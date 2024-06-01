import { Component,OnInit,Input } from '@angular/core';
import { User, UserRegister } from '../../interface/user';
import {RolesEnum} from "../../enums/roles.enum";
import { RegisterService } from 'src/app/services/register.service';
import { AuthService } from 'src/app/services/auth.service';
import { countries } from 'src/app/utils/countries';
import { UserService } from 'src/app/services/user.service';
import { Quote } from 'src/app/interface/quote';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private registerService:RegisterService, public authService:AuthService, private userService:UserService) {}
  // public Roles2LabelMapping = Roles2LabelMapping;
  @Input() quote!:Quote;
  roles = RolesEnum;
  keys = Object.keys;
  isNaN: Function = Number.isNaN;
  cPassword = '';
  ageList = Array.from({length:73},(v,k)=>k+18); 
  registerStatus:any;
  registerResponse:any;
  country = countries;
  clientData:any;
  isAddingClient=false;
  isClientAdded = false;

  user: User = <User>{
    role_id: this.roles.USER, 
    last_name: "", 
    secondary_email: "",
    phone: "",
    secondary_phone: "",
    designation: "",
    company: "",
    address: "",
    country: "",
    zip: "",
    age: 0,
  };
  
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
    return !this.authService.isSuperAdmin()? {validation: true, message: ''} : this.validatePasswordMessage =  this.user.password?.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) || !this.user.password ? {validation: true, message: ''} : {validation: false, message: "Enter valid password"};
  }
  validateCPassword(){
    return !this.authService.isSuperAdmin()? {validation: true, message: ''} : this.validateCPasswordMessage =  this.cPassword == this.user.password || !this.cPassword ? {validation: true, message: ''} : {validation: false, message: "Confirm password did not match"};
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
          
          if(this.quote){
            this.isAddingClient = true;
            this.userService.addClientToQuote(this.registerResponse.id, this.quote.id).subscribe((response) => {
              console.log(response);
              this.clientData = response;
              this.quote.client = {...this.clientData.client};
              this.isClientAdded = true;
              // this.isAddingClient = false;
            });
          }
          
        }
      },error=>{
        this.registerStatus = false;
      });
    }else{
      console.log("🚀 ~ RegisterComponent ~ submitForm ~ this.user.email:", this.user.email)
      console.log("🚀 ~ RegisterComponent ~ submitForm ~ this.validateCPassword().validation:", this.validateCPassword().validation)
      console.log("🚀 ~ RegisterComponent ~ submitForm ~ this.validatePassword().validation:", this.validatePassword().validation)
      console.log("🚀 ~ RegisterComponent ~ submitForm ~ this.validateEmail().validation:", this.validateEmail().validation)
      console.log("🚀 ~ RegisterComponent ~ submitForm ~ this.validateLastName().validation:", this.validateLastName().validation)
      console.log("🚀 ~ RegisterComponent ~ submitForm ~ this.validateFirstName().validation:", this.validateFirstName().validation)
      console.log('Invalid form');
    }
      
  }
}
