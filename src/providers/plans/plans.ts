import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as api from '../../app/config/environment';
//Get user information form the session
import { UserAuthenticationProvider } from '../user-authentication/user-authentication';

@Injectable()
export class PlansProvider {
  private headers:any;
  constructor(public http: Http,  private checktoken:UserAuthenticationProvider) {
    console.log('Hello PlansProvider Provider');
  }
  getplans(){
  	this.headers = new Headers();
    this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken); 
  	let url = api.baseUrl +api.apiUrl  + api.plans;
  	return new Promise(resolve => {
  		this.http.get(url, {headers: this.headers}).subscribe((data: any)=>{
	  		let stripePlans = JSON.parse(data._body);
	  		if(stripePlans.status){
	  			resolve(stripePlans);
	  		}else{
	  			resolve(false);
	  		}
	  	},function (error) {
            this.checktoken.onErrorHandlerBuzz("Project Listing API Endpoint Error: ", error)
            resolve(false);
        });
  	});
  }

}
