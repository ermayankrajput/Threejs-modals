import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Quote } from 'src/app/interface/quote';
import { QuoteService } from 'src/app/services/quote.service';
import { ActivatedRoute } from '@angular/router';
import { RootService } from 'src/app/services/root.service';

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
  constructor(private quoteService:QuoteService,private route: ActivatedRoute,public rootService:RootService) { }

  ngOnInit(): void {
    // console.log(this.quote);
    const id = this.route.snapshot.paramMap.get('id');
    this.quoteService.getSingleQuote(id).subscribe((response) => {
      this.api_res = response;
      this.quote = this.api_res;
      console.log(this.quote);
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
}
