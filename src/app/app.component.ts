import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit() {
    
  }
  // @HostListener('window:beforeunload', ['$event'])
  // showAlertMessageWhenClosingTab($event:any) {
  //     $event.returnValue = 'Your data will be lost!';
  // }
}
