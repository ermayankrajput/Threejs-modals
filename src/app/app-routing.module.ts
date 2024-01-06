import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteComponent } from './quote/quote.component';
import { QuoteIndexComponent } from './quote-index/quote-index.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { QuotePdfComponent } from './quote/quote-pdf/quote-pdf.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  {
    path:'profile',
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
    component:FileUploadComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
