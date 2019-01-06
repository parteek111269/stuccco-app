import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the HomeownerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'homeowner',
  templateUrl: 'homeowner.html'
})
export class HomeownerComponent {

  text: string;
  slideThreeForm: FormGroup;
  submitAttempt: boolean = false;
  formValidState:boolean = true;
  constructor(public formBuilder: FormBuilder) {
  	this.slideThreeForm = formBuilder.group({
        first_name: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        last_name: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        nonhp_type: ['',Validators.required]
    });
    console.log('Hello HomeownerComponent Component');
    this.text = 'Hello World';
  }

}
