import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { ProfilePage } from '../profile/profile';
import { InAppBrowser} from '@ionic-native/in-app-browser';
import * as api from '../../app/config/environment';
@IonicPage()
@Component({
  selector: 'page-thankyou',
  templateUrl: 'thankyou.html',
})
export class ThankyouPage {
	public baseurl: string = api.baseUrl;
    public fileurl: string;
    public userdetail: any;
	constructor(public iab: InAppBrowser, public navctrl: NavController, public navCtrl: NavController, public navParams: NavParams) {
        console.log(this.navParams.data);
        this.userdetail = this.navParams.data;
        this.fileurl = this.navParams.data.document
    }
	ionViewDidLoad() {
    	console.log('ionViewDidLoad ThankyouPage');
  	}
  	viewProfile(){
  		this.navctrl.push('ProfilePage', this.userdetail);
  	}
    download(){
        let url = api.baseUrl + this.fileurl;
        this.iab.create(url,'_system','location=yes');
    }
}
