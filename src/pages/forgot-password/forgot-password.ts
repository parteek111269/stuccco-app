import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

//Pages
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register'

//Providers and services

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  forgotForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder) {
      this.forgotForm = formBuilder.group({
        email: ['',[Validators.required]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }
  
  forgotPassword(){
      alert("ok");
 }

  doLogin() {
    this.navCtrl.push(LoginPage,{},{animate:true,animation:'transition',duration:500,direction:'forward'});
  }
  
  createAccount() {
    this.navCtrl.push(RegisterPage,{},{animate:true,animation:'transition',duration:500,direction:'forward'});
  }

}
