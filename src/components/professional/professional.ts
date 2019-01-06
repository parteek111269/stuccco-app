import { Component } from '@angular/core';
import { WebsiteValidator } from '../../validator/emailvalidate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';

/**
 * Generated class for the ProfessionalComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'professional',
  templateUrl: 'professional.html'
})
export class ProfessionalComponent {

  text: string;
  slideFourthForm: FormGroup;
  submitAttempt: boolean = false;
  formValidState:boolean = true;
  stateCollection = [];
  profType = [];
  constructor(public formBuilder: FormBuilder,public authservice: UserAuthenticationProvider) {
  	this.slideFourthForm = formBuilder.group({
            first_name: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            last_name: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            dob: ['',Validators.required],
            gender: ['Male',Validators.required],
            hp_phone_number: ['',Validators.compose([Validators.maxLength(10),Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
            hp_type: ['',Validators.required],
            hp_name: ['',Validators.required],
            hp_website: ['',Validators.compose([Validators.required, WebsiteValidator.urlFormat])],
            hp_address: ['',Validators.required],
            city: ['',Validators.required],
            hp_state: ['',Validators.required],
            zip_code:  ['',Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
            hp_about: ['',Validators.required]
        }); 
    
  }
  ngAfterViewInit() {
    console.log('Hello ProfessionalComponent Component');
    this.text = 'Hello World';
    this.authservice.selectState().then(data=>{
	     this.stateCollection = (data["states"]);
	  })
	    this.authservice.designerType().then(data=>{
	        this.profType =(data["user_types"]);
	  })
  }

}
