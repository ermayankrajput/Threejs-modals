import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteComponent } from './quote/quote.component';
import { QuoteIndexComponent } from './quote-index/quote-index.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { QuotePdfComponent } from './quote/quote-pdf/quote-pdf.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AuthGuard } from './gaurds/auth.guard';
import { AdminGuard } from './gaurds/admin.guard';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { ChangeUserPasswordComponent } from './admin/change-user-password/change-user-password.component';
import { EditUserProfileComponent } from './admin/edit-user-profile/edit-user-profile.component';

const routes: Routes = [
  {
    path:'edit-user-profile/:id',
    canActivate:[AdminGuard],
    component:EditUserProfileComponent
  },
  {
    path:'change-user-password/:id/:email/:first_name/:last_name',
    canActivate:[AdminGuard],
    component:ChangeUserPasswordComponent
  },
  {
    path:'user-list',
    canActivate:[AdminGuard],
    component:UserListComponent
  },
  {
    path:'change-password',
    canActivate:[AuthGuard],
    component:ChangePasswordComponent
  },
  {
    path:'profile',
    canActivate:[AuthGuard],
    component:ProfileComponent
  },
  {
    path:'quotes',
    component:QuoteIndexComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    canActivate:[AdminGuard],
    component:RegisterComponent
  },
  {
    path:'quote/:id',
    component:QuoteComponent
  },
  {
    path:'quote/pdf/:id',
    component:QuotePdfComponent
  },
  {
    path:'',
    canActivate:[AuthGuard],
    component:QuoteIndexComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
