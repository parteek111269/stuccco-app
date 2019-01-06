import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions} from '@angular/http';
import {ToastController} from 'ionic-angular';
//Get user information form the session
import { UserAuthenticationProvider } from '../user-authentication/user-authentication';
import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/timeout'
import { Transfer, TransferObject } from '@ionic-native/transfer';

import * as api from '../../app/config/environment';
declare var cordova: any;

@Injectable()
export class ProfileSectionProvider {
  public userAuthToken:any;
  public userAuthData:any;
  public username:any;
  public percentageComplete: number;
  constructor(public http: Http,
                private transfer: Transfer,
                public checktoken:UserAuthenticationProvider,
                public toastCtrl: ToastController,
            ) {
    console.log('Hello ProfileSectionProvider Provider');
    }
    
    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }
    
    toParam(obj){
        var p = [];            
        for (var key in obj) {               
            p.push(key + '=' + encodeURIComponent(obj[key]));            
        }
        return p.join('&');  
    }
    
    /**
    *@description: function to get user information for profile page from api url
    *@return: userProfileData/false
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    profilePageData(user_name){
        this.checktoken.loadUserCredentials();
        let el = this; 
        let url = api.baseUrl +api.apiUrl  +user_name +api.userInfo;
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
            let userProfileData = data.json();
                if(data.status===200){
                    resolve(userProfileData);
                }else{
                    alert("profile section request failed try again later!")
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("User Profile API Endpoint Error: ", error);
                resolve(false);
            });
        }); 
    }
    
    
    /**
    *@description: function provier to get user collections/creation based on titlename from api url
    *@return: userProfileData/false
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    collectionDataApi(user_name,pagenumber,titleName){
        this.checktoken.loadUserCredentials();
        let el = this;
        let url = '';
        switch(titleName){
            case "collection":
                url = api.baseUrl +api.apiUrl  + user_name +api.userCollections  +"?page=" + pagenumber;
                break; 
            case 'creation':
                url = api.baseUrl +api.apiUrl  + user_name +api.userCreations +"?page=" + pagenumber;
                break;
            default:
                  console.log("no case in list");
                  break;
        }
       var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
            let userCollectionData = data.json();
                if(data.status===200){
                    resolve(userCollectionData);
                }else{
                    alert("Request failed try again later!")
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("User Profile collection/creative API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
 
    /**
    *@description: function to get user likes from api url
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    
    userLikesDataApi(user_name,pagenumber,titleName){
        this.checktoken.loadUserCredentials();
        let el = this;
        let url = '';
        switch(titleName){
            case "likes":
                url = api.baseUrl +api.apiUrl  + user_name +api.userLikes +"?page=" + pagenumber;
                break; 
            case 'activity':
                url = api.baseUrl +api.apiUrl  + user_name  +"?page=" + pagenumber;
                break;
            default:
                  console.log("no case in list");
                  break;
        }
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
            let userLikes = data.json();
                if(data.status===200){
                    resolve(userLikes);
                }else{
                    alert("Request failed try again later!")
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("User Profile Likes/Activity API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    
    /**
    *@description: function to give rating to hp_user profile.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    
    reviewThisPost(dataObj){
        this.checktoken.loadUserCredentials();
        let el = this;
        let dataSet = this.toParam(dataObj);
        let endPoint  = (dataObj.id) ?  api.updateProfileRating : api.addProfileRating
        let url = api.baseUrl +api.apiUrl + endPoint;
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(resolve => {
            this.http.post(url,dataSet,{headers:headers}).subscribe(data => {
                let profileRating = data.json();
                if(data.status===200){
                    resolve(profileRating.status);
                }else{
                    resolve(true);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("Review API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
        
    /**
    *@description: function provider to get following/follwers data based on title name.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    followingApiData(user_name,titleName, page){
        console.log(page);
        this.checktoken.loadUserCredentials();
        let el = this;
        let url = '';
        switch(titleName){
            case "following":
                url = api.baseUrl +api.apiUrl  + user_name +api.userFollowing + '?page=' + page;
                break; 
            case 'followers':
                url = api.baseUrl +api.apiUrl  + user_name +api.userFollowers + '?page=' + page;
                break;
            default:
                console.log("no case in list");
                break;
        }
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
            let following = data.json();
                if(data.status===200){
                    resolve(following);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("User Profile Following/Followers API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    /**
    *@description: function provider to get following/follwers data based on title name.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    getListReviews(username){
        this.checktoken.loadUserCredentials();
        let el = this;
        let url = api.baseUrl +api.apiUrl  + username +'/about_reviews';
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
                let dataSet = data.json();
                if(data.status===200){
                    resolve(dataSet);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("User Profile Review list API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }

    /**
    *@description: function to delete rating 
    *@return: true/false
    *@param: id
    *@createdBy: Raj M
    *@modified:  
    */
    deleteRating(id){
        this.checktoken.loadUserCredentials();
        let el = this;
        let url = api.baseUrl +api.apiUrl+ '/delete_review/'+id;
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
                resolve(data.status);
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("User Profile Delete rating API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }

    /**
    *@description: get Bussiness details listing
    *@return: dataset object
    *@param:  username
    *@createdBy: Raj M
    *@modified:  
    */
    getBusinessDetails(username){
        this.checktoken.loadUserCredentials();
        let el = this;
        let url = api.baseUrl +api.apiUrl  + username +'/about';
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
                let dataSet = data.json();
                if(dataSet.status){
                    resolve(dataSet);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("User Profile Business detail API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    /**
    *@description: get Why choose US details.
    *@return: dataset object
    *@param:  username
    *@createdBy: Raj M
    *@modified:  
    */
    getChooseUsDetails(username){
        this.checktoken.loadUserCredentials();
        let el = this;
        let url = api.baseUrl +api.apiUrl  + username +'/about_why_us';
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
                let dataSet = data.json();
                if(dataSet.status){
                    resolve(dataSet);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("User Profile Why choose us? API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    userProfileFollowService(id,followStatus){
        this.checktoken.loadUserCredentials();
        let el = this;
        let url = " ";
        let dataObj = {'id':id};
        let dataSet = this.toParam(dataObj);
        switch(followStatus){
            case 'Follow':
                url = api.baseUrl +api.apiUrl  +api.followUserProfile;
                break;
            case 'Following':
                url = api.baseUrl +api.apiUrl  +api.unfollowUserProfile;
                break;
            default:
                console.log("no case Found");
                break;
        }
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(resolve => {
            this.http.post(url,dataSet,{headers:headers}).subscribe(data => {
                let dataSet = data.json();                
                if(dataSet.status){
                    resolve(dataSet.status);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("User Profile Follow API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    /**
    *@description: function to get edit collection detail 
    *@return: 
    *@param: id
    *@createdBy: Raj M
    *@modified:  
    */
    collectionEditData(collection_id,title){
        this.checktoken.loadUserCredentials();
        let el = this;
        let url = "";  
        switch(title){
            case 'collection':
                url = api.baseUrl +api.apiUrl+ api.EditCollection+collection_id;
                break;
            case 'creation':
                url = api.baseUrl +api.apiUrl+ api.editCreation+collection_id;
                break;
            default:
                console.log("no case Found");
                break;
        }     
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
                let dataSet = data.json();
                if(dataSet.status){
                    resolve(dataSet)
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("User Profile get Edit data API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    
    /**
    *@description: function to set update collection/creation detail 
    *@return: 
    *@param: id
    *@createdBy: Raj M
    *@modified:  
    */
    collectionUpdate(updateData,view){
        this.checktoken.loadUserCredentials();
        let el = this;
        let dataSet = this.toParam(updateData);
        let url = "";
        switch(view){
            case 'collection':
                url = api.baseUrl +api.apiUrl + api.updateCollection;
                break;
            case 'creation':
                url = api.baseUrl +api.apiUrl + api.updateCreation;
                break;
            default:
                console.log("no case Found");
                break;
        } 
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(resolve => {
            this.http.post(url,dataSet,{headers:headers}).subscribe(data => {
                let collectionUpdatedData = data.json();
                if(data.status===200){
                    resolve(collectionUpdatedData);
                }else{
                    resolve(true);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("User Profile update collection API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    
    /**
    *@description: function to set delete collection/creation detail 
    *@return: 
    *@param: id
    *@createdBy: Raj M
    *@modified:  
    */
    collectionDeleteApi(collection_id,view){
        this.checktoken.loadUserCredentials();
        let el = this;
        let url =  "";
        switch(view){
            case 'collection':
                url = api.baseUrl +api.apiUrl+ api.deleteCollection+collection_id;
                break;
            case 'creation':
                url = api.baseUrl +api.apiUrl+ api.deleteCreation+collection_id;
                break;
            default:
                console.log("no case Found");
                break;
        }       
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
                let dataSet = data.json();             
                if(dataSet.status){
                    resolve(dataSet.status)
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("User Profile collection delete data API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    /**
    *@description: function to get creations/location and category 
    *@return: 
    *@param: id
    *@createdBy: Raj M
    *@modified:  
    */
    
    newCreationsData(){
        this.checktoken.loadUserCredentials();
        let el = this;
        let url = api.baseUrl +api.apiUrl+ api.newCreations;
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
                let dataSet = data.json(); 
                if(data.status){
                    resolve(dataSet)
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("get new creation data API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    
    /**
    *@description: function to post new creation form data 
    *@return: status true/false
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    postNewCreationDataService(creationFormDataSet){
        this.checktoken.loadUserCredentials();
        let el = this;
        let data = 'data='+creationFormDataSet
//      let url = 'http://uat.uimatic.com/ionictestapp/formpost.php';
        let url = api.baseUrl +api.apiUrl+ api.postNewCreation;
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({headers: headers});
        return new Promise(resolve => {
            this.http.post(url,data,options).subscribe(data => {
                let dataSet = data.json(); 
                if(data.status){
                    resolve(dataSet)
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("get new creation data API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
   
    uploadImages(imageStore, user_id){
        console.log(imageStore);
        this.checktoken.loadUserCredentials();
        var headers = new Headers();
        let obj = {};
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            let el = this;
            const fileTransfer: TransferObject = el.transfer.create();
            var url = api.baseUrl +api.apiUrl + api.uploadImage;
            var target = el.pathForImage(imageStore);
            var filename = imageStore;
            var options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params : {'file': filename, 'user_id': user_id},
                headers: headers,
                httpMethod: 'POST',
                trustAllHosts: true,
            };
            console.log(options);
            fileTransfer.onProgress((progressEvent) => {
                if (progressEvent.lengthComputable) {
                    this.percentageComplete = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                    console.log(this.percentageComplete);
                }
            })
            fileTransfer.upload(target, url, options).then(data => {
                let uploadImageResponse = JSON.parse(data['response']);
                console.log(uploadImageResponse);
                if(uploadImageResponse.status === true){               
                    // el.presentToast('Image succesful uploaded ["'+filename+'"]');
                    resolve(uploadImageResponse);
                }else{
                    el.presentToast('Image not Uploaded Please Try Again..! ["'+filename+'"]');
                    resolve(false); 
                }
            },function (error) {
                el.presentToast('Error while uploading image ["'+filename+'"]');
                resolve(false);
            })
        });
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
    *@description: set Function get creation detail page data.
    *@return: true/false
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    creationDetailService(userName,titlename){
        this.checktoken.loadUserCredentials();
        let el = this;
        let url = api.baseUrl +api.apiUrl +userName +api.creationDetail +titlename;
        
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        let options = new RequestOptions({headers: headers});
        return new Promise(resolve => {
            this.http.get(url,options).subscribe(data => {
                let dataSet = data.json(); 
                if(data.status){
                    resolve(dataSet)
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("get creation detail data API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    /**
    *@description: set Function to delete creation detail page image.
    *@return: true/false
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    creationImageDeleteService(id){
        this.checktoken.loadUserCredentials();
        let el = this;
        let url = api.baseUrl +api.apiUrl +'delete_image/'+id;
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
                resolve(data.status);
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("User Profile Delete Creation Detail Image API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    /**
    *@description: set Function to get detail data of edit creation image detail
    *@return: true/false
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    CreationImageDataForEdit(id){
        this.checktoken.loadUserCredentials();
        let el = this;
        let url = api.baseUrl +api.apiUrl +'edit_image/'+id;
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
               
                let dataForEdit = data.json();
                if(data.status == 200){
                    resolve(dataForEdit)
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("User Profile Delete Creation Detail Image API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    
    /**
    *@description: set Function to update creation image and creation image data
    *@return: true/false
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    creationImageUpdate(imageStore,formData){
        console.log("provider section imageStore filename");
        this.checktoken.loadUserCredentials();
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        let filename = imageStore;
        return new Promise(resolve => {
            let el = this;
            const fileTransfer: TransferObject = el.transfer.create();
            //var url = "http://uat.uimatic.com/ionictestapp/edit.php";
             let url = api.baseUrl +api.apiUrl+ api.updateCreationImage;
            var target = el.pathForImage(imageStore);
            var options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                headers: headers, 
                params : {'filename': filename,'data': formData }
            };
            fileTransfer.upload(target, url, options).then(data => {
                let uploadImageResponse = JSON.parse(data['response']);
                if(uploadImageResponse.status === true){
                    resolve(uploadImageResponse.status);
                }else{
                    el.presentToast('Image not Uploaded Please Try Again..! ["'+filename+'"]');
                    resolve(false); 
                }
            },function (error) {
                console.log(error);
                el.presentToast('Error while uploading image ["'+filename+'"]');
                resolve(false);
            })
        });
    }

    /**
    *@description: Post In case of Image not there
    *@return: true/false
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    creationDataUpdate(formData){
       this.checktoken.loadUserCredentials();
       let el = this;
       let data = 'data='+formData;
       let url = api.baseUrl +api.apiUrl+ api.updateCreationImage;
       var headers = new Headers();
       headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
       return new Promise(resolve => {
           this.http.post(url,data,{headers:headers}).subscribe(data => {
               let uploadImageResponse = data.json();
               if(uploadImageResponse.status === true){
                   resolve(uploadImageResponse.status);
               }else{
                   resolve(false);
               }
           },function (error) {
               el.checktoken.onErrorHandlerBuzz("Review API Endpoint Error: ", error);
               resolve(false);
           });
       });
   }
   
   /**
    *@description: Set function to get team member data 
    *@return: true/false
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    teamMemberDataApi(userId){
        this.checktoken.loadUserCredentials();
        let el = this; 
        let url = api.baseUrl +api.apiUrl  +api.teamMemberlistData +userId
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
            let teamMemberDataSet = data.json();
                if(data.status===200){
                    resolve(teamMemberDataSet);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("User Profile Team Member API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    getCoverSlider(id: number){
        this.checktoken.loadUserCredentials();
        let url = api.baseUrl + api.apiUrl  + api.coverSlider + id;
        console.log(url);
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url, {headers:headers}).subscribe((data: any)=>{
                let coverslider = JSON.parse(data._body);
                if(data.status===200){
                    resolve(coverslider)
                }else{
                    resolve(false);
                }
            }, error =>{
                this.checktoken.onErrorHandlerBuzz("API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
}


