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
import { SamplePdfComponent } from './sample-pdf/sample-pdf.component';
import { QuotePdfComponent } from './quote/quote-pdf/quote-pdf.component';

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
    SamplePdfComponent,
    QuotePdfComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
