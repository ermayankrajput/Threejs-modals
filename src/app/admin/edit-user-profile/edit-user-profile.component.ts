import { Component,Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolesEnum } from 'src/app/enums/roles.enum';
import { User, editProfile } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';
import { countries } from 'src/app/utils/countries';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnChanges {
  constructor(private route: ActivatedRoute,private userService:UserService, public authService:AuthService) {}
  // public Roles2LabelMapping = Roles2LabelMapping;
  @Input() editUser!:User;
  roles = RolesEnum;
  keys = Object.keys;
  isNaN: Function = Number.isNaN;
  cPassword = '';
  ageList = Array.from({length:73},(v,k)=>k+18); 
  registerStatus:any;
  registerResponse:any;
  getUser:any;
  resultStatus= {success: false, message: ''};

  user!: User
  
  validateFirstNameMessage = {validation: false, message: ''}
  validateLastNameMessage = {validation: false, message: ''}
  validateEmailMessage = {validation: false, message: ''}
  userId:any; 

  ngOnChanges(changes: SimpleChanges): void {
    this.user = {...this.editUser}
    // console.log("🚀 ~ EditUserProfileComponent ~ ngOnChanges ~ this.editUser:", this.editUser)
    
  }

  ngOnInit(): void{
    if(!this.editUser){
      // console.log(countries)
      this.userId = this.route.snapshot.paramMap.get('id');
      this.userService.getUserById(this.userId).subscribe((response) => {
        this.getUser = response;
        this.user = this.getUser;
        // this.user.id = this.getUser.id;
        // this.user.first_name = this.getUser.first_name;
        // this.user.last_name = this.getUser.last_name;
        // this.user.email = this.getUser.email;
        // this.user.age = this.getUser.age;
        // this.user.role_id = this.getUser.role.id;
      },error=>{
        console.log(error)
      });
    }else{
      this.user = this.editUser;
    }
    
  }
  
  validateFirstName(){
    return this.validateFirstNameMessage = this.user.first_name?.match(/^[a-zA-Z ]{2,30}$/) ? {validation: true, message: ''} : {validation: false, message: "Enter valid name"};
  }
  validateLastName(){
    return this.validateLastNameMessage = this.user.last_name?.match(/^[a-zA-Z ]{2,30}$/) || !this.user.last_name ? {validation: true, message: ''} : {validation: false, message: "Enter valid name"};
  }
  validateEmail(){
    return this.validateEmailMessage = this.user.email?.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? {validation: true, message: ''} : {validation: false, message: "Enter valid email"};
  }

  runValidation(){
    return this.validateFirstName().validation && this.validateLastName().validation && this.validateEmail().validation
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
        this.editUser = this.registerResponse;
        this.user = this.registerResponse;

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
