import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
//Get user information form the session
import { UserAuthenticationProvider } from '../user-authentication/user-authentication';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
//Impost Enviorment Variable to get Base Url As well As end url
import * as api from '../../app/config/environment';

@Injectable()
export class NotificationProvider {
    private headers:any;
    public NotificationupdateSource = new Subject<any>();

    public NotificationupdateCalled = this.NotificationupdateSource.asObservable();
    constructor(public http: Http, private checktoken:UserAuthenticationProvider){
        console.log("I am here in constructor");
    }

    /**
    *@description: get In app Notifications
    *@return: true/false
    *@param: page,id,style
    *@createdBy: Raj M
    *@modified:  
    */
    notificationApi(page){ 
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
       let el = this;
       let url = api.baseUrl +api.apiUrl  + api.NotificationEndUrl  +"?page=" + page;
        return new Promise(resolve => {
            this.http.get(url,{headers: this.headers}).subscribe(data => {
            let newsData = data.json();
                if(data.status===200){
                    resolve(newsData);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("Notification API Endpoint Error: ", error)
                resolve(false);
            });
        }); 
    }    
    notificationCount(){
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        let url = api.baseUrl + api.apiUrl + api.notificationCount;
        return new Promise(resolve => {
            this.http.get(url, {headers: this.headers}).subscribe((data: any)=>{
                let countData = data.json();
                if(data){
                    resolve(countData)
                }else{
                    resolve(false);
                }
            }, error=>{
                this.checktoken.onErrorHandlerBuzz("Notification API Endpoint Error: ", error)
                resolve(false);
            })
        })
    }
    clearNotification(){
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        let url = api.baseUrl + api.apiUrl + api.updateNotification;
        return new Promise(resolve => {
            this.http.get(url, {headers: this.headers}).subscribe((data: any)=>{
                let clearNotification = data.json();
                if(data.status){
                    resolve(clearNotification);
                }else{
                    resolve (false);
                }
            }, error=>{
                this.checktoken.onErrorHandlerBuzz("Notification API Endpoint Error: ", error)
                resolve(false);
            })
        })
    }
    ionViewDidEnter() {
        console.log('ionViewDidLoad Notification');
    }
    updateNotification(data: any){
        this.NotificationupdateSource.next(data);
    }
    // get initial notification status
    initialNotification(){
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        let url = api.baseUrl + api.apiUrl + api.initialNotificationStatus;
        return new Promise((resolve)=>{
            this.http.get(url, {headers: this.headers}).subscribe((data: any)=>{
                console.log(data);
                let initialNotification = data.json();
                console.log(initialNotification);
                if(data.status == 200){
                    resolve(initialNotification);
                }else{
                    resolve(false);
                }
            },error =>{
                // this.checktoken.onErrorHandlerBuzz("Notification API Endpoint Error: ", error)
                resolve(false);
            })
        })
    }
    updateInitialNotification(notification_status: boolean){
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        let url = api.baseUrl + api.apiUrl + api.updateNotificationStatus;
        return new Promise((resolve)=>{
            this.http.post(url, {notification_status: notification_status}, {headers: this.headers}).subscribe((data: any)=>{
                console.log(data);
                let updateInitialNotification = data.json();
                if(data.status == 200){
                    resolve(updateInitialNotification);
                }else{
                    resolve(false);
                }
            },error =>{
                // this.checktoken.onErrorHandlerBuzz("Notification API Endpoint Error: ", error)
                resolve(false);
            });
        });
    }
}
