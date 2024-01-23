import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-change-user-password',
  templateUrl: './change-user-password.component.html',
  styleUrls: ['./change-user-password.component.css']
})
export class ChangeUserPasswordComponent {
  constructor(private authService:AuthService,private route: ActivatedRoute,private userService:UserService){}
  resultStatus= {success: false, message: ''};
  api_res:any;
  getUser:any;
  userId:any;
  cPassword = '';
  user = {
    id:'',
    new_password: ''
  }
  validatePasswordMessage= {validation: false, message: ''}
  validateCPasswordMessage= {validation: false, message: ''}
  ngOnInit(): void{
    this.userId = this.route.snapshot.paramMap.get('id');
    this.user.id = this.userId;
    this.userService.getUserById(this.userId).subscribe((response) => {
      this.getUser = response;
    },error=>{
      console.log(error)
    });
  }
  validatePassword(){
    return this.validatePasswordMessage =  this.user.new_password?.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) ? {validation: true, message: ''} : {validation: false, message: "Enter valid password"};
  }
  validateCPassword(){
    return this.validateCPasswordMessage =  this.cPassword == this.user.new_password ? {validation: true, message: ''} : {validation: false, message: "Confirm password did not match"};
  }
  runValidation(){
    return this.validatePassword().validation && this.validateCPassword().validation
  }
  changePassword(){
    this.resultStatus= {success: false, message: ''};
    if(this.runValidation()){
      // console.log(this.user);
      this.authService.cahngePassword(this.user).subscribe((response) => {
      this.api_res = response;
      if(this.api_res.success){
        this.resultStatus = {success:true, message:'Password changed successfully'};
        this.user.new_password='';
        this.cPassword = '';
      }else{
        this.resultStatus = {success:false, message:'Invalid current password'};
        this.user.new_password='';
        this.cPassword = '';
      }
    },error=>{
        this.resultStatus = {success:false, message:'Something went wrong'};
    });
    }else{
        this.resultStatus = {success:false, message:'Invalid form input'};
    }
  }
}
