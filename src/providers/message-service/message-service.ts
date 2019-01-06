import { Http,Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import { UserAuthenticationProvider } from '../user-authentication/user-authentication';
import * as api from '../../app/config/environment';
import { Transfer, TransferObject } from '@ionic-native/transfer';
declare var cordova: any;
@Injectable()
export class MessageServiceProvider {
    public messageupdateSource = new Subject<any>();
    public messageupdateCalled = this.messageupdateSource.asObservable();
    constructor(public http: Http,
        private transfer: Transfer,
        public checktoken:UserAuthenticationProvider) {
      console.log('Hello MessageServiceProvider Provider');
    }

    toParam(obj){
        var p = [];            
        for (var key in obj) {               
            p.push(key + '=' + encodeURIComponent(obj[key]));            
        }
        return p.join('&');  
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
    *@description: set Function provider to get conversation message data from server
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    
    conversationMessageService(conversationId,page){
        this.checktoken.loadUserCredentials();
        let url = api.baseUrl +api.apiUrl +api.conversationAllData +conversationId +'/'+api.conversationMessage +'?page='+page;
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
                let conversationMessage = data.json(); 
                if(data.status == 200){
                    resolve(conversationMessage)
                }else{
                    resolve(false);
                }
            },function (error) {
                resolve(false);
            });
        });
    }
      
        
    conversationDetailService(reciever_id,sender_id){
        this.checktoken.loadUserCredentials();
        let dataObj = {'id':sender_id};
        let dataSet = this.toParam(dataObj);    
        let url = api.baseUrl +api.apiUrl + api.conversationDetail +"?recipient_id=" +reciever_id +"&sender_id=" +sender_id
        var headers = new Headers();
        headers.append('Authorization', 'Bearer '+this.checktoken.authToken);
        console.log(headers);
//        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(resolve => {
            this.http.post(url,dataSet,{headers:headers}).subscribe(data => {
                let conversationDetails = data.json(); 
                console.log(data.status);
                if(data.status == 200){
                    resolve(conversationDetails)
                }else{
                    resolve(false);
                }
            },function (error) {
//                el.checktoken.onErrorHandlerBuzz("get new creation data API Endpoint Error: ", error);
                resolve(false);
            });
        }); 
    }
    
    /**
    *@description: set Function provider to get conversation message data from server
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    
    getMessageListService(){
        this.checktoken.loadUserCredentials();
        let url = api.baseUrl +api.apiUrl +api.messagelist;
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
                let messageList = data.json(); 
                if(data.status == 200){
                    resolve(messageList)
                }else{
                    resolve(false);
                }
            },function (error) {
                resolve(false);
            });
        });
    }  
    
    /**
    *@description: set Function to post message to server
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    postMessageService(dataObj){
        let conversationId = dataObj.conversation_id;
        this.checktoken.loadUserCredentials();
        let dataSet = this.toParam(dataObj);    
        let url = api.baseUrl +api.apiUrl + api.conversationDetail +'/' +conversationId +'/' +api.postMessages 
        var headers = new Headers();
        headers.append('Authorization', 'Bearer '+this.checktoken.authToken);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(resolve => {
            this.http.post(url,dataSet,{headers:headers}).subscribe(data => {
                let pstMessageResponse = data.json(); 
                if(data.status == 200){
                    resolve(pstMessageResponse)
                }else{
                    resolve(false);
                }
            },function (error) {
//                el.checktoken.onErrorHandlerBuzz("get new creation data API Endpoint Error: ", error);
                resolve(false);
            });
        }); 
    }
    
    /**
    *@description: set Function to upload image on server
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    uploadAttachmentsOnServer(imageStore){
        this.checktoken.loadUserCredentials();
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            let el = this;
            const fileTransfer: TransferObject = el.transfer.create();
//            var url = 'http://uat.uimatic.com/ionictestapp/test.php';
            var url = api.baseUrl +api.apiUrl + api.uploadAttachments;
            var target = el.pathForImage(imageStore);
            var filename = imageStore;
            var options = {
              fileKey: "file",
              fileName: filename,
              chunkedMode: false,
              mimeType: "multipart/form-data",
              headers: headers,
              params : {'file': filename}
          };
            console.log(options);
            fileTransfer.upload(target, url, options).then(data => {
                console.log(data)
                let uploadAttachmentResponse = JSON.parse(data['response']);
                console.log(uploadAttachmentResponse);
                if(data.responseCode === 200){
                    resolve(uploadAttachmentResponse);
                }else{
                    resolve(false); 
                }
            },function (error) {
                console.log("error is")
                console.log(error)
                resolve(false);
            })
        });
    }
    
    
    /**
    *@description: set Function to upload image on server
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    getUnreadMessageg(){
        this.checktoken.loadUserCredentials();
        let url = api.baseUrl +api.apiUrl +api.messageCount;
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
                let unreadMessagesCount = data.json(); 
                if(data.status == 200){
                    resolve(unreadMessagesCount)
                }else{
                    resolve(false);
                }
            },function (error) {
                resolve(false);
            });
        });
    }
    
    
    /**
    *@description: set Function to Delete Attachment
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    deleteAttachmentService(attachmentId){
        this.checktoken.loadUserCredentials();
        let url = api.baseUrl +api.apiUrl +api.deleteAttachmentFile +attachmentId;
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
                let attachmentDeleteStatus = data.json(); 
                if(data.status == 200){
                    resolve(attachmentDeleteStatus)
                }else{
                    resolve(false);
                }
            },function (error) {
                resolve(false);
            });
        });
    }
    
    
    
    deleteConversation(conversationId){
        this.checktoken.loadUserCredentials();
        let url = api.baseUrl +api.apiUrl +api.conversationDelete +conversationId ;
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe(data => {
                let conversationMessage = data.json(); 
                if(data.status == 200){
                    resolve(conversationMessage)
                }else{
                    resolve(false);
                }
            },function (error) {
                resolve(false);
            });
        });
    }
    clearMessages(){
        this.checktoken.loadUserCredentials();
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        let url = api.baseUrl +api.apiUrl +api.clearMessages;
        return new Promise(resolve => {
            this.http.get(url,{headers:headers}).subscribe((data: any) => {
                let clearMessages = data.json();
                if(data.status == 200){
                    resolve(clearMessages);
                }else{
                    resolve (false);
                }
            }, error =>{
                resolve(false);
            });
        });    
    }
    updateMessages(data: any){
        this.messageupdateSource.next(data);
    }
}
