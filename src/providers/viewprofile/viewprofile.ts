import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as api from '../../app/config/environment';
//Get user information form the session
import { UserAuthenticationProvider } from '../user-authentication/user-authentication';

@Injectable()
export class ViewprofileProvider {
  public url: string;
  private headers: any;
  constructor(public http: Http, private checktoken: UserAuthenticationProvider,) {
      this.url = api.baseUrl + api.apiUrl;
    }
    public getaboutData(designerId){
        let url = this.url + api.about;
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve =>{
            this.http.get(url + '/' + designerId, {headers: this.headers}).subscribe((data: any)=>{
                let aboutdata = JSON.parse(data._body);
                if(data.status===200){
                    resolve(aboutdata);
                }else{
                    alert("Request failed please try again!");
                    resolve(false);
                }
            },error =>{
                this.checktoken.onErrorHandlerBuzz("Designer page API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    public getreviews(username: string, limit){
        let url = this.url + username + '/' + api.aboutReview + limit;
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve =>{
            this.http.get(url, {headers: this.headers}).subscribe((data: any)=>{
                let reviewData = JSON.parse(data._body);
                if(data.status == 200){
                    resolve(reviewData);
                }else{
                    alert("Request failed please try again!");
                    resolve(false);
                }
            }, error =>{
                this.checktoken.onErrorHandlerBuzz("Designer page API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
}