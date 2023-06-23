import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-quote-pdf',
  templateUrl: './quote-pdf.component.html',
  styleUrls: ['./quote-pdf.component.css']
})
export class QuotePdfComponent implements OnInit {
  @ViewChild('pdfContainer') pdfContainer!: ElementRef;
  constructor() { }

  ngOnInit(): void {
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
        doc.save('Filename.pdf');   
    }); 
  }

}
