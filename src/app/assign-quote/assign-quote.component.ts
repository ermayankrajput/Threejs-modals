import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ShareService } from '../services/share.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-assign-quote',
  templateUrl: './assign-quote.component.html',
  styleUrls: ['./assign-quote.component.css']
})
export class AssignQuoteComponent {
  constructor(private authService: AuthService,private shareService:ShareService,private route: ActivatedRoute,private router: Router,private userService:UserService) { }
  resp:any;
  uuid:any;

  validateFirstNameMessage = {validation: false, message: ''}
  validateLastNameMessage = {validation: false, message: ''}
  validateEmailMessage = {validation: false, message: ''}
  resultStatus= {success: false, message: ''};
  first_name='';
  last_name='';
  email='';
  findUser:any;

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    console.log('Login status: '+this.authService.isUserLogin());
    console.log("uuid: "+this.uuid);
    if(this.authService.isUserLogin() && this.authService.isVendor()){
      this.shareService.shareQuote(this.uuid,this.authService.currentUser().email).subscribe((response) => {
        this.resp = response;
        this.router.navigate(['/vendor-quote',this.resp.quote.id]);
      });
    }
  }

  validateFirstName(){
    return this.validateFirstNameMessage = this.first_name?.match(/^[a-zA-Z ]{2,30}$/) ? {validation: true, message: ''} : {validation: false, message: "Enter valid name"};
  }
  validateLastName(){
    return this.validateLastNameMessage = this.last_name?.match(/^[a-zA-Z ]{2,30}$/) || !this.last_name ? {validation: true, message: ''} : {validation: false, message: "Enter valid name"};
  }
  validateEmail(){
    return this.validateEmailMessage = this.email?.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? {validation: true, message: ''} : {validation: false, message: "Enter valid email"};
  }

  runValidation(){
    return this.validateFirstName().validation && this.validateLastName().validation && this.validateEmail().validation
  }

  submitForm(){
    this.resultStatus= {success: false, message: ''};
    if(this.runValidation()){
      this.userService.getUserByEmail(this.email).subscribe((response) => {
        this.findUser = response;
        // console.log(this.findUser);
        if(this.findUser.success == false || (this.findUser.success == true && this.findUser.user.role.name == 'vendor')){
          // console.log('this is vendor please redirect');
          this.shareService.shareQuote(this.uuid,this.email).subscribe((response) => {
            this.resp = response;
            console.log(this.resp);
            // console.log(this.resp.token);
            localStorage.setItem('user', JSON.stringify(this.resp.user));
            localStorage.setItem('token', this.resp.token);
            this.router.navigate(['/vendor-quote',this.resp.quote.id]);
          });
        }else{
          // console.log('this admin user please do not redirect');
          this.resultStatus= {success: false, message: 'This action is only available for vendors please login to continue.'};
        }
      },error=>{
        console.log(error)
      });
    }
  }
}
