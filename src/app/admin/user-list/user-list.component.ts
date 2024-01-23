import { Component, ViewChild, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as _ from 'lodash'
import { RolesEnum, SuperAdminEnum } from 'src/app/enums/roles.enum';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  constructor(private userService:UserService, public authService:AuthService){}

  roles = RolesEnum;
  superAdmin = SuperAdminEnum;
  allUsers:any;
  displayedColumns: string[] = [ 'id','first_name','role','email','action'];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  currentUser = this.authService.currentUser();

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((response) => {
      // console.log(response)
      this.allUsers = response;
      this.allUsers = _.reverse(_.sortBy(this.allUsers, function(o){return o.id}))
      this.dataSource = new MatTableDataSource(this.allUsers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },error=>{
      console.log(error)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showOptions(roleId:number){
    if(this.authService.isSuperAdmin()){
      return true
    }
    if(roleId == RolesEnum.ADMIN && this.authService.isAdmin()){
      return false;
    }
    return true
  }

  deleteUser(row:User, i:number){
    let deleteQuote = prompt("Please type DELETE to delete user ID: "+ row.id, "");
    if (deleteQuote === "DELETE") {
      this.userService.deleteUser(row.id).subscribe((response) => {
        this.allUsers.splice(i, 1)
        this.dataSource = new MatTableDataSource(this.allUsers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }else{
      
    }
  }

}
