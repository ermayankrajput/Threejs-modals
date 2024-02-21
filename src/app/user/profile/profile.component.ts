import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolesEnum } from 'src/app/enums/roles.enum';
import { editSelfProfile } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private route: ActivatedRoute,private userService:UserService,private authService:AuthService) {}
  // public Roles2LabelMapping = Roles2LabelMapping;
  roles = RolesEnum;
  keys = Object.keys;
  isNaN: Function = Number.isNaN;
  cPassword = '';
  ageList = Array.from({length:73},(v,k)=>k+18); 
  registerStatus:any;
  registerResponse:any;
  getUser:any;
  resultStatus= {success: false, message: ''};

  user: editSelfProfile = {
    first_name: '',
    last_name: '',
    email:'',
    age:null,
  }
  
  validateFirstNameMessage = {validation: false, message: ''}
  validateLastNameMessage = {validation: false, message: ''}
  currentUser= this.authService.currentUser();

  ngOnInit(): void{
    // console.log(this.currentUser.id);
    this.userService.getUserById(this.currentUser.id).subscribe((response) => {
      this.getUser = response;
      this.user.first_name = this.getUser.first_name;
      this.user.last_name = this.getUser.last_name;
      this.user.email = this.getUser.email;
      this.user.age = this.getUser.age;
    },error=>{
      console.log(error)
    });
  }
  
  validateFirstName(){
    return this.validateFirstNameMessage = this.user.first_name?.match(/^[a-zA-Z ]{2,30}$/) ? {validation: true, message: ''} : {validation: false, message: "Enter valid name"};
  }
  validateLastName(){
    return this.validateLastNameMessage = this.user.last_name?.match(/^[a-zA-Z ]{2,30}$/) || !this.user.last_name ? {validation: true, message: ''} : {validation: false, message: "Enter valid name"};
  }

  runValidation(){
    return this.validateFirstName().validation && this.validateLastName().validation
  }

  isNumber(data:any){
    return Number.isInteger(parseInt(data));
  }

  submitForm(){
    this.resultStatus= {success: false, message: ''};
    if(this.runValidation()){
      // console.log(this.user);
      this.userService.updateUserProfile(this.user).subscribe((response) => {
        this.registerResponse = response;
        // console.log(this.registerResponse);
        if(this.registerResponse.status == 1){
          this.resultStatus = {success:true, message:'Profile updated successfully'};
        }else{
          this.resultStatus = {success:false, message:'Something went wrong'};
        }
      },error=>{
        this.resultStatus = {success:false, message:'Something went wrong'};
      });
    }else{
      this.resultStatus = {success:false, message:'Invalid form value'};
    }
  }
}
