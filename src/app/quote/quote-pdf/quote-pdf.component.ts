import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Quote } from 'src/app/interface/quote';
import { QuoteService } from 'src/app/services/quote.service';
import { ActivatedRoute } from '@angular/router';
import { RootService } from 'src/app/services/root.service';
import * as _ from "lodash"

@Component({
  selector: 'app-quote-pdf',
  templateUrl: './quote-pdf.component.html',
  styleUrls: ['./quote-pdf.component.css']
})
export class QuotePdfComponent implements OnInit {
  @ViewChild('pdfContainer') pdfContainer!: ElementRef;
  quote!:Quote;
  api_res:any;
  pdfDoc: any = '';
  livePdf = false;
  enlarge = false;
  spacebelow = 64;
  attachments!:any;
  constructor(private quoteService:QuoteService,private route: ActivatedRoute,public rootService:RootService) { }

  ngOnInit(): void {
    // console.log(this.quote);
    const id = this.route.snapshot.paramMap.get('id');
    this.quoteService.getSingleQuote(id).subscribe((response) => {
      this.api_res = response;
      this.quote = this.api_res.quote;
      this.quote.quote_infos = _.sortBy(this.quote.quote_infos, function(o){
        o.unit_quotes = _.sortBy(o.unit_quotes, function(o){return o.id});
        return o.id;
      })
      this.attachments = JSON.parse(this.quote.attachments || null)
    });
  }

  public downloadAsPDF(): void {
      let domElement = this.pdfContainer.nativeElement as HTMLElement;
      html2canvas(domElement).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        heightLeft -= pageHeight;
        const doc = new jsPDF('p', 'mm');
        doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'SLOW');
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'SLOW');
          heightLeft -= pageHeight;
        }
        doc.save('3ERP-quote-'+this.quote.id+'.pdf');   
    }); 
  }

  realTimePdfViewer(){
    this.pdfDoc = '';
    this.livePdf = true;
    let domElement = this.pdfContainer.nativeElement as HTMLElement;
    html2canvas(domElement).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      heightLeft -= pageHeight;
      const doc = new jsPDF('p', 'mm');
      doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'SLOW');
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'SLOW');
        heightLeft -= pageHeight;
      }
      // this.pdfDoc.save('Filename.pdf');  
      console.log(doc.output('datauristring'))
      this.pdfDoc = doc.output('datauristring');
    });
  }

  public downloadSinglePageAsPDF(): void {
    let domElement = this.pdfContainer.nativeElement as HTMLElement;
    html2canvas(domElement).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let width = 208;
      let height = 295;
      switch(true) {
        case canvas.width > 600 && canvas.width < 1000:
          width = canvas.width/2
          height = canvas.height/2
          break;
        case canvas.width >= 1000 && canvas.width < 1500:
          width = canvas.width/3
          height = canvas.height/3
          break;
        case canvas.width >= 1500 && canvas.width < 2000:
          width = canvas.width/4
          height = canvas.height/4
          break;
        case canvas.width >= 2000 && canvas.width < 2500:
          width = canvas.width/5
          height = canvas.height/5
          break;
        case canvas.width >= 2500:
            width = canvas.width/6
            height = canvas.height/6
            break;
        default:
          width = canvas.width
          height = canvas.height
      }
      const imgWidth = width;
      const imgHeight = height;
      let position = 0;
      const doc = new jsPDF('p', 'mm', [height, width]);
      doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'SLOW');
      doc.save('3ERP-quote-'+this.quote.id+'.pdf');   
  }); 
}

  realTimeSinglePagePdfViewer(){
    this.pdfDoc = '';
    this.livePdf = true;
    let domElement = this.pdfContainer.nativeElement as HTMLElement;
    html2canvas(domElement).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let width = 208;
      let height = 295;
      switch(true) {
        case canvas.width > 600 && canvas.width < 1000:
          width = canvas.width/2
          height = canvas.height/2
          break;
        case canvas.width >= 1000 && canvas.width < 1500:
          width = canvas.width/3
          height = canvas.height/3
          break;
        case canvas.width >= 1500 && canvas.width < 2000:
          width = canvas.width/4
          height = canvas.height/4
          break;
        case canvas.width >= 2000 && canvas.width < 2500:
          width = canvas.width/5
          height = canvas.height/5
          break;
        case canvas.width >= 2500:
            width = canvas.width/6
            height = canvas.height/6
            break;
        default:
          width = canvas.width
          height = canvas.height
      }
      const imgWidth = width;
      const imgHeight = height;
      let position = 0;
      const doc = new jsPDF('p', 'mm', [height, width]);
      doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight, '', 'SLOW');
      this.pdfDoc = doc.output('datauristring');
    });
  }
}
