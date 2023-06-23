import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
// import {jspdf} from 'jspdf';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-sample-pdf',
  templateUrl: './sample-pdf.component.html',
  styleUrls: ['./sample-pdf.component.css']
})
export class SamplePdfComponent implements OnInit {
  @ViewChild('MyDIv') MyDIv!: ElementRef;
  
  constructor() { }

  ngOnInit(): void {
  }
  public downloadAsPDF(): void {
    // this.MyDIv = document.getElementById('divId');  
        let domElement = this.MyDIv.nativeElement as HTMLElement;
        html2canvas(domElement).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
        // let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
        let pdf = new jsPDF('p', 'cm', 'a4'); //Generates PDF in portrait mode
        pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
        pdf.save('Filename.pdf');   
      }); 
    }


}
