import { Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interface/user';
import { UserHelper } from '../user.helper';

@Component({
  selector: 'app-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.css'],
  host: { '(document:click)': 'handleClick($event)' },
})
export class UserIconComponent {
  constructor(private router: Router,public authService:AuthService, public userHelper:UserHelper){}
  @ViewChild('toggleButton') private toggleButton !: ElementRef;
  @ViewChild('menu') private menu !: ElementRef;
  showOption = false;
  currentUser !: User;

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser();
  }

  handleClick(e: { target: any; }) {
    if(this.showOption){
      if (e.target !== this.toggleButton.nativeElement && e.target !== this.menu.nativeElement ) {
        this.showOption = false;
      }
    }
   }

  toggleOption(){
    this.showOption = this.showOption === true ? false : true;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
