import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as api from '../../app/config/environment';
import { FCM } from '@ionic-native/fcm';
//Get user information form the session
import { UserAuthenticationProvider } from '../user-authentication/user-authentication';
@Injectable()
export class FeedProvider {
	public url: string;
	private headers: any;
  public fcmToken: any;
	constructor(public http: Http, private checktoken: UserAuthenticationProvider, public fcm: FCM) {
    	this.url = api.baseUrl + api.apiUrl;
  	}
  	loadUserCredentials(){
  		this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
  	}
  	public getFeeds(page, user_id){
  		let url = this.url + api.feeds + '?user_id=' + user_id + '&page=' + page + '&device_id=' + this.fcmToken;
  		this.loadUserCredentials();
  		return new Promise(resolve => {
  			this.http.get(url, {headers: this.headers}).subscribe((data: any) => {
  				var feedData = JSON.parse(data._body);
    		    if(data.status === 200){
                    resolve(feedData);
                }else{
                    alert("Request failed please try again!");
                    resolve(false);
                }
  			},error => {
  				this.checktoken.onErrorHandlerBuzz("API Endpoint Error: ", error);
    		    resolve(false);
  			});
  		});
  	}
    public getadviceDetails(advice_id: number){
        let url = this.url + api.adviceDetail + advice_id;
        this.loadUserCredentials();
        return new Promise(resolve => {
            this.http.get(url, {headers: this.headers}).subscribe((data: any)=>{
                var adviceDetail = JSON.parse(data._body);
                if(data.status === 200){
                    resolve(adviceDetail);
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
