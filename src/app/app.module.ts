import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RenderObjectComponent } from './render-object/render-object.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HttpClientModule } from '@angular/common/http';
import { QuoteInfoComponent } from './quote/quote-info/quote-info.component';
import { UnitQuoteComponent } from './quote/quote-info/unit-quote/unit-quote.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule } from '@angular/forms';
import { QuoteComponent } from './quote/quote.component';
import { QuotePdfComponent } from './quote/quote-pdf/quote-pdf.component';
import { QuoteIndexComponent } from './quote-index/quote-index.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RenderObjectComponent,
    FileUploadComponent,
    QuoteInfoComponent,
    UnitQuoteComponent,
    ButtonComponent,
    QuoteComponent,
    QuotePdfComponent,
    QuoteIndexComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    BrowserModule
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
