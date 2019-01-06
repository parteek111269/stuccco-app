import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingProfilePage } from '../setting-profile/setting-profile';
// import { SettingProjectBillingPage } from '../setting-project-billing/setting-project-billing';
// import { SettingAffiliatePage } from '../setting-affiliate/setting-affiliate';
// import { SettingSubscriptionPage } from '../setting-subscription/setting-subscription';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import { ProfileSettingsProvider } from '../../providers/profile-settings/profile-settings';
import { LoadingController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
    public userAuthData;
    public userProfileSettingAllData:any;
    public showListContent:boolean = false; 
  constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loading: LoadingController,
        public profileSetting : ProfileSettingsProvider,
        public checktoken:UserAuthenticationProvider
        ) {
        let userAuthToken = checktoken.authToken;
        this.userAuthData = (userAuthToken) ? JSON.parse(checktoken.userAuthData) : "null";
    }

   /**
    *@description: set Function to push you on profile setting page.
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    profileSettingPage(){
        let param = this.userProfileSettingAllData
        this.navCtrl.push(SettingProfilePage, param);
    }
    
    /**
    *@description: set Function to push you on project and billing page.
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    projectBillingPage(){
        this.navCtrl.push('SettingProjectBillingPage');
    }
    
    /**
    *@description: set Function to push you on affliate page
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    affiliate(){
        this.navCtrl.push('SettingAffiliatePage');
    }
    
    subscription(){
        this.navCtrl.push('SettingSubscriptionPage');
    }
    /**
    *@description: set Function to Get user profile Setting data for update.
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    getProfileSettingDataToUpdate(){
        let loader = this.loading.create({content: 'Please Wait...'});
        return loader.present().then(() => {
            this.profileSetting.getProfileSettingDataApi(this.userAuthData.id).then(dataSet=>{
                this.userProfileSettingAllData = dataSet['user'];
                this.showListContent = true;
                loader.dismiss();
            })
        })
    }
    ionViewDidLoad() {
      this.getProfileSettingDataToUpdate();
      console.log('ionViewDidLoad SettingsPage');
    }
}
