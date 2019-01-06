import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import * as api from '../../app/config/environment';
//Get user information form the session
import { UserAuthenticationProvider } from '../user-authentication/user-authentication';
import { Transfer, TransferObject } from '@ionic-native/transfer';
declare var cordova: any;

@Injectable()
export class AdviceProvider {
	private headers: any;
	constructor(public http: Http,  private checktoken:UserAuthenticationProvider, private transfer: Transfer,) {
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
  	}
  	// Always get the accurate path to your apps folder
    public pathForImage(img) {
        if (img === null) {
            return '';
        }else{
            return cordova.file.dataDirectory + img;
        }
    }
  	getImageUrl(lastImage){
        return new Promise(resolve => {
            let el = this;
            var url = api.baseUrl + api.apiUrl + api.adviceDetail + api.upload_asset;
            // File for Upload
            var targetPath = this.pathForImage(lastImage);
            // File name only
            var filename = lastImage;
            this.checktoken.loadUserCredentials();
            this.headers = new Headers()
            this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
            var options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params : {'file': filename},
                headers: this.headers,
                httpMethod: 'POST'
            };
            const fileTransfer: TransferObject = this.transfer.create();
            // Use the FileTransfer to upload the image
            fileTransfer.upload(targetPath, url, options).then(data => {
            console.log(data);
                let uploadAttachmentResponse = JSON.parse(data['response']);
                if(data.responseCode === 200){
                    resolve(uploadAttachmentResponse);
                }else{
                    resolve(false); 
                }
            },err => {
                console.log(err);
                resolve(false);
            });
        });
  	}
    submitAdvice(post){
        console.log(post.value.description);
        var url = api.baseUrl + api.apiUrl + api.adviceDetail + api.create_question;
        this.checktoken.loadUserCredentials();
        this.headers = new Headers()
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise((resolve)=>{
            this.http.post(url, {title: post.value.title, description: post.value.description} , {headers: this.headers}).subscribe((res: any)=>{
                console.log(res);
                let createquestionres = JSON.parse(res._body);
                if(res.status === 200){
                    resolve(createquestionres);
                }else{
                    alert("Request failed please try again!");
                    resolve(false);
                }
            }, error=>{
                this.checktoken.onErrorHandlerBuzz("API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    deleteAdvice(advice_id){
        var url = api.baseUrl + api.apiUrl + api.adviceDetail + api.deleteAdvice + '?id=' + advice_id;
        this.checktoken.loadUserCredentials();
        this.headers = new Headers()
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise((resolve)=>{
            this.http.get(url, {headers: this.headers}).subscribe((data: any)=>{
                console.log(data);
                var delResponse = JSON.parse(data._body);
                if(data.status === 200){
                    resolve(delResponse);
                }else{
                    alert("Request failed please try again!");
                    resolve(false);
                }
            },error =>{
                this.checktoken.onErrorHandlerBuzz("API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    editAdvice(advice_id, post){
        var url = api.baseUrl + api.apiUrl + api.adviceDetail + api.editAdvice;
        this.checktoken.loadUserCredentials();
        this.headers = new Headers()
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise((resolve)=>{
            this.http.post(url, {id: advice_id, title: post.value.title, description: post.value.description}, {headers: this.headers}).subscribe((data: any)=>{
               console.log(data); 
               var editAdviceRes = JSON.parse(data._body);
               if(data.status === 200){
                    resolve(editAdviceRes);
                }else{
                    alert("Request failed please try again!");
                    resolve(false);
                }
            }, error=>{
                this.checktoken.onErrorHandlerBuzz("API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    getComments(id: number, limit: number){
        console.log(id);
        var url = api.baseUrl + api.apiUrl + api.adviceDetail + id + '/' + api.getadvicecomment + '?page=' + limit;
        this.checktoken.loadUserCredentials();
        this.headers = new Headers()
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise((resolve)=>{
            this.http.get(url, {headers: this.headers}).subscribe((data: any)=>{
                console.log(data);
                var commentRes = JSON.parse(data._body);
                if(data.status === 200){
                    resolve(commentRes);
                }else{
                    alert("Request failed please try again!");
                    resolve(false);
                }
            },error=>{
                this.checktoken.onErrorHandlerBuzz("API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    addComment(id, comment){
        var url = api.baseUrl + api.apiUrl + api.adviceDetail + api.addcomment;
        this.checktoken.loadUserCredentials();
        this.headers = new Headers()
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise((resolve)=>{
            this.http.post(url, {advice_question_id: id, answer: comment}, {headers: this.headers}).subscribe((data: any)=>{
                var addCommentData = JSON.parse(data._body);
                if(data.status == 200){
                    resolve(addCommentData);
                }else{
                    alert("Request failed please try again!");
                    resolve(false);
                }
            }, error =>{
                this.checktoken.onErrorHandlerBuzz("API Endpoint Error: ", error);
                resolve(false);
            })
        });
    }
    deleteComment(id: number){
        var url = api.baseUrl + api.apiUrl + api.adviceDetail + api.delComment + '?id=' +  id;
        this.checktoken.loadUserCredentials();
        this.headers = new Headers()
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise((resolve)=>{
            this.http.get(url, {headers: this.headers}).subscribe((data: any)=>{
                console.log(data);
                var delCommentData = JSON.parse(data._body);
                if(data.status == 200){
                    resolve(delCommentData)
                }else{
                    alert("Request failed please try again!");
                    resolve(false);
                }
            }, error =>{
                this.checktoken.onErrorHandlerBuzz("API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    editComment(id, commentId, comment){
        var url = api.baseUrl + api.apiUrl + api.adviceDetail + 'update_answer';
        console.log(url);
        this.checktoken.loadUserCredentials();
        this.headers = new Headers()
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise((resolve)=>{
            this.http.post(url, {id:commentId, answer: comment}, {headers: this.headers}).subscribe((data: any)=>{
                console.log(data);
                var updateCommentData = JSON.parse(data._body);
                if(data.status == 200){
                    resolve(updateCommentData)
                }else{
                    alert("Request failed please try again!");
                    resolve(false);
                }
            }, error =>{
                this.checktoken.onErrorHandlerBuzz("API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
}
