import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteComponent } from './quote/quote.component';
import { QuoteIndexComponent } from './quote-index/quote-index.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  {
    path:'quotes',
    component:QuoteIndexComponent
  },
  {
    path:'quote/:id',
    component:QuoteComponent
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
