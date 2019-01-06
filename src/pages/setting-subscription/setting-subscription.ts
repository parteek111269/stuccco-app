import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import { ProfileSettingsProvider } from '../../providers/profile-settings/profile-settings';
import { LoadingController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-setting-subscription',
  templateUrl: 'setting-subscription.html',
})
export class SettingSubscriptionPage {
    public userAuthData:any;
    public subscriptionData:any;
    public notification_prefrences = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public loading: LoadingController,
        public profileSetting : ProfileSettingsProvider,
        public checktoken:UserAuthenticationProvider) {
        let userAuthToken = checktoken.authToken;
        this.userAuthData = (userAuthToken) ? JSON.parse(checktoken.userAuthData) : "null";
    }
    
     /**
    *@description: set Function to load subscription data for update;
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    loadSubscriptionData(){
        let loader = this.loading.create({content: 'Please Wait...'});
        return loader.present().then(() => {
            this.profileSetting.getProfileSubscriptionData(this.userAuthData.id).then(dataSet=>{
                this.subscriptionData = dataSet['notifications'];
                loader.dismiss();
            })
        })
    }
    
    /**
    *@description: set Function to Remove duplicate subscription value
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject  = {};

        for(var i in originalArray) {
           lookupObject[originalArray[i][prop]] = originalArray[i];
        }

        for(i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
         return newArray;
    }
    
    /**
    *@description: set Function to save/post subscription value to API
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    
    save(){
        var uniqueArray = this.removeDuplicates(this.notification_prefrences, "id");
        var obj = {'user_id':this.userAuthData.id,'notification_prefrences': uniqueArray};
        var formData = JSON.stringify(obj)
        let loader = this.loading.create({content: 'Please Wait...'});
        return loader.present().then(() => {
            this.profileSetting.postSubscriptionData(formData).then(dataSet=>{
                if(dataSet['status']){
                    loader.dismiss();
                }else{
                    loader.dismiss();
                    return false;
                }
            })
        })
    }
    
     /**
    *@description: set Function to change value status of subscription;
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    updateCheckedOptions(id,event){
        let subscriptionData = {'id':id , 'status':event.target.checked }
        this.notification_prefrences.push(subscriptionData);
    }
    
    backbutton(){
        this.navCtrl.pop();
    }
    
    ionViewDidLoad() {
        this.loadSubscriptionData();
        console.log('ionViewDidLoad SettingSubscriptionPage');
    }

}
