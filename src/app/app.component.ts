import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  file3d:any;
  ngOnInit() {
  }
  renderFile(event:any){
      const file = event;
      const reader = new FileReader();
      reader.onload = e => {
        this.file3d = reader.result;
        console.log(this.file3d);
      } 
      reader.readAsDataURL(file);
  }
}
