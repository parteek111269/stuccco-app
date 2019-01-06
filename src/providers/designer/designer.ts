import { Injectable } from '@angular/core';
import {ToastController} from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
//Get user information form the session
import { UserAuthenticationProvider } from '../user-authentication/user-authentication';
//Impost Enviorment Variable to get Base Url As well As end url
import * as api from '../../app/config/environment';
import { Transfer, TransferObject } from '@ionic-native/transfer';
declare var cordova: any;
@Injectable()
export class DesignerProvider {
    public sliderImage=[];
    public total_page:number;
    public userSlidesData:any;
    public projectId:any;
    private headers:any;
    public imageAttachments = [];
    constructor(
        public http: Http,
        private transfer: Transfer,
        private checktoken: UserAuthenticationProvider, 
        public toastCtrl: ToastController
        ){}     
    
    
    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }
    
    /**
    *@description: getDesignerPageData
    *@return: true/false
    *@param: page,id,style
    *@createdBy: Raj M
    *@modified:  
    */
    getDesignerPageData(page,id,style){
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        let el = this;
        let url = api.baseUrl +api.apiUrl  + api.designerList +'/' +"?page=" + page + "&filter_by_style=" + id + "&sorting=" + style;
        return new Promise(resolve => {
            this.http.get(url,{headers: this.headers}).subscribe(data => {
                let designerPageListData = data.json(); 
                this.total_page = designerPageListData.total_pages;
                if(data.status===200){
                    this.userSlidesData = designerPageListData;
                    resolve(designerPageListData);
                }else{
                    alert("Request failed please try again!");
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("Designer page API Endpoint Error: ", error);
                resolve(false);
            });
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
    *@description: Upload all images 
    *@return: true/false
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    uploadImages(imageStore,index){
        console.log(index);
        let obj = {}
        let url = "";
        // if(index == 1){
        //     url = api.baseUrl +api.apiUrl + api.imageUploadUrl +api.apiUrl + api.imageUploadUrl;
        // }else{
        //      url = api.baseUrl +api.apiUrl + api.imageUploadUrl;    
        // }
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            let el = this;
            const fileTransfer: TransferObject = el.transfer.create();
//            var url = "http://uat.uimatic.com/ionictestapp/test.php";
            url = api.baseUrl +api.apiUrl + api.imageUploadUrl;
            var target = el.pathForImage(imageStore);
            var filename = imageStore;
            var options = {
                fileKey: "file",
               fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                headers: this.headers,
                params : {'filename': filename}
            };
            fileTransfer.upload(target, url, options).then(data => {
                let uploadImageResponse = JSON.parse(data['response']);
                if(uploadImageResponse.status){
                    el.presentToast('Image succesful uploaded ["'+filename+'"]');
                    obj = {'ImageId': uploadImageResponse.img_id, 'Index': index, 'isUpload': true  }
                    resolve(obj);
                }else{
                    el.presentToast('Image not Uploaded Please Try Again..! ["'+filename+'"]');
                    obj = {'Index': index, 'isUpload': false  }
                    resolve(obj);
                }
            },function (error) {
                el.presentToast('Error while uploading image ["'+filename+'"]');
                obj = {'Index': index, 'isUpload': false  }
                resolve(obj);
            })
        });
    }
    
    /**
    *@description: Api call for submit the checkout detail page.
    *@return: true/false
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    checkOutDetailDataApi(dataObj , projectId){
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        let el = this;
        this.projectId = projectId; //setting up project id -> hp_user_id -> designerId
        let dataSet = 'data=' + JSON.stringify(dataObj);
        let url = api.baseUrl +api.apiUrl +api.checkOutEndUrl;
        console.log(url);
        /* Added Headers */
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({headers: this.headers});
        return new Promise(resolve => { 
        this.http.post(url, dataSet , options).subscribe((checkOutResponse: any) => {
                let checkOutDataSet = checkOutResponse.json();
                    if(checkOutDataSet.success){
                    resolve(checkOutDataSet);
                }else{
                    console.log(JSON.stringify(checkOutDataSet));
                    alert(JSON.stringify(checkOutDataSet));
                    resolve(false);
                }
            },function(error){
                el.checktoken.onErrorHandlerBuzz("Checkout process API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
}
