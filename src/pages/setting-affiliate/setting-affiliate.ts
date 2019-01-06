import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import * as api from '../../app/config/environment';

@IonicPage()
@Component({
  selector: 'page-setting-affiliate',
  templateUrl: 'setting-affiliate.html',
})
export class SettingAffiliatePage {
    public userAuthData:any;
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private iab: InAppBrowser,
        public checktoken:UserAuthenticationProvider) {
        let userAuthToken = checktoken.authToken;
        this.userAuthData = (userAuthToken) ? JSON.parse(checktoken.userAuthData) : "null";
    }
    
    goToAffiliateSection(){
        var opt = "location=yes,hidden=yes,hardwareback=no,zoom=no,toolbar=yes,transitionstyle=fliphorizontal";
        const browser = this.iab.create(api.baseUrl +api.profileSetting +this.userAuthData.id, '_blank', opt);
        browser.show();
    }
    
    backbutton(){
        this.navCtrl.pop();
    }
    ionViewDidLoad() {
      console.log('ionViewDidLoad SettingAffiliatePage');
    }

}
