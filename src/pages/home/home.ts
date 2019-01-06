import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { IonicPage, NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading, NavParams } from 'ionic-angular';

// import { LoginPage } from '../login/login';
// import { RegisterPage } from '../register/register';
import { DashboardPage } from '../dashboard/dashboard';
//import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import * as api from '../../app/config/environment';
 
declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   lastImage: string = null;
   loading: Loading;
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController) {
 }
  
  
  ionViewDidLoad() {
    
    console.log('ionViewDidLoad HomePage');
  }
  
  doLogin() {
    this.navCtrl.push('LoginPage', {}, {animate:true,animation:'transition',duration:500,direction:'forward'});
  }
  
  createAccount() {
    this.navCtrl.push('RegisterPage', {}, {animate:true,animation:'transition',duration:500,direction:'forward'});
  }

  doSkip() {
    var data = "";
    this.navCtrl.push(DashboardPage,{data},{animate:true,animation:'transition',duration:500,direction:'forward'});
  }  
}