import { Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { UserAuthenticationProvider } from '../user-authentication/user-authentication';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import * as api from '../../app/config/environment';
declare var cordova: any;
@Injectable()
export class ProfileSettingsProvider {

    constructor(
        public http: Http,
        private transfer: Transfer,
        public checktoken:UserAuthenticationProvider) {
        }
    
     /**
    *@description: get cordova path
    *@return: true/false
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    pathForImage(img) {
        if (img === null) {
          return '';
        } else {
          return cordova.file.dataDirectory + img;
        }
    }
    
     /**
    *@description: Set function to post profile data with profile image 
    *@return: true/false
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    
    profileSettingDataService(formData){
        let data = "data=" +formData;
        this.checktoken.loadUserCredentials();
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var url = api.baseUrl +api.apiUrl +api.updateUserProfile;
        return new Promise(resolve => {
           this.http.post(url,data,{headers:headers}).subscribe(data => {
            let updatProfileData = data.json();
            if(data.status===200){
                resolve(updatProfileData.status);
            }else{
                resolve(false); 
            }
            },function (error) {
                resolve(false);
            });
        });
    }
    
    /**
    *@description: Upload all images 
    *@return: true/false
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    uploadImages(imageStore,index){
        this.checktoken.loadUserCredentials();
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            let el = this;
            const fileTransfer: TransferObject = el.transfer.create();
//            var url = "http://uat.uimatic.com/ionictestapp/test.php";
            var url = api.baseUrl +api.apiUrl + api.uploadTeamMemberImageUrl;
            var target = el.pathForImage(imageStore);
            var filename = imageStore;
            var options = {
                fileKey: "image",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                headers: headers,
                params : {'filename': filename}
            };
            fileTransfer.upload(target, url, options).then(data => {
                let uploadImageResponse = JSON.parse(data['response']);
                if(uploadImageResponse.status === true){
                    let obj = {'imagePath': uploadImageResponse.image_path, 'Index': index  }
                    resolve(obj);
                }else{
                    resolve(false); 
                }
            },function (error) {
               resolve(false); 
            })
        });
    }
    /**
    *@description: function to get user Profile setting Data for update
    *@return: ProfileSettingData/false
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    getProfileSettingDataApi(userId){
        this.checktoken.loadUserCredentials();
        let el = this; 
        let url = api.baseUrl +api.apiUrl +api.profileSetting +userId
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
            let userProfileSettingData = data.json();
                if(data.status===200){
                    resolve(userProfileSettingData);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("User Profile API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    /**
    *@description: function to get subscription data
    *@return: ProfileSettingData/false
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    getProfileSubscriptionData(userId){
        this.checktoken.loadUserCredentials();
        let url = api.baseUrl +api.apiUrl +api.profileSubscription +userId
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
            let subscriptionData = data.json();
                if(data.status===200){
                    resolve(subscriptionData);
                }else{
                    resolve(false);
                }
            },function (error) {
                resolve(false);
            });
        });
    }
    
    /**
    *@description: function to post Subscription data
    *@return: ProfileSettingData/false
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    postSubscriptionData(formData){
        let data = "data=" +formData;
        this.checktoken.loadUserCredentials();
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var url = api.baseUrl +api.apiUrl +api.subscription;
//        var url = "http://uat.uimatic.com/ionictestapp/test.php";
        return new Promise(resolve => {
           this.http.post(url,data,{headers:headers}).subscribe(data => {
            let updatedSubscriptionData = data.json();
                if(data.status===200){
                    resolve(updatedSubscriptionData);
                }else{
                    resolve(false);
                }
            },function (error) {
                
                console.log(error);
                resolve(false);
            });
        });
    }
}
