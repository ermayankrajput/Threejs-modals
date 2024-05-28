import { Component,EventEmitter,Input,Output,ViewChild} from '@angular/core';
import { QuoteAttachment } from 'src/app/interface/quote';
import { RootService } from 'src/app/services/root.service';
@Component({
  selector: 'app-quote-attachment',
  templateUrl: './quote-attachment.component.html',
  styleUrls: ['./quote-attachment.component.css']
})
export class QuoteAttachmentComponent {
  @Input() attachment!: QuoteAttachment; 
  @Input() quoteId!:number;
  @Input() disableRemove = false;
  @Input() index!:number;
  @Output() removeAttachment = new EventEmitter() 
  isMenuOpen = false;
  imgSrc!:string;
  displayStyle = "none";
  constructor(public rootService:RootService) { }
  // ngOnInit() {}
  openMenu(){
    this.isMenuOpen = !this.isMenuOpen;
  }

  getExtention(){
    if (this.attachment.filename.match(/\.(jpg|jpeg|png|gif)$/i)){
      return 'IMAGE';
    }else{
      var ext = this.attachment.filename.substr(this.attachment.filename.lastIndexOf('.') + 1);
      return ext;
    }
  }

  remove(){
    this.removeAttachment.emit(this.index);
  }

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }
  
}
