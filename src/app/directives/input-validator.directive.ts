import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appInputValidator]',
  providers: [{
    multi: true,
    provide: NG_VALIDATORS, 
    useExisting: forwardRef(() => InputValidatorDirective)      
  }]
})
export class InputValidatorDirective implements Validator{

  constructor() { }
  @Input() appInputValidator!:any; //same name as the selector

  validate(control: AbstractControl):{ [key: string]: any; } {
    // return this.appInputValidator(control)!;
    return ['dc'];
  }

}
