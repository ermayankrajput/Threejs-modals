import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  api_res:any;
  constructor(private AuthService:AuthService){}
  ngOnInit(): void {
    this.AuthService.getCurrentUser().subscribe((response) => {
      console.log(response)
      this.api_res = response;
    });
  }
}
