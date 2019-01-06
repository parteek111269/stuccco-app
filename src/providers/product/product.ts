import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as api from '../../app/config/environment';
//Get user information form the session
import { UserAuthenticationProvider } from '../user-authentication/user-authentication';

@Injectable()
export class ProductProvider {
	public url: string;
  	public headers: any;
  	constructor(public http: Http, public checktoken: UserAuthenticationProvider) {
    	this.url = api.baseUrl + api.apiUrl;
  	}
  	public getProducts(type, page){
  		var url = this.url + api.product + type + '&page=' + page;
  		this.checktoken.loadUserCredentials();
    	this.headers = { 'Authorization': 'Bearer ' + this.checktoken.authToken }
  		return new Promise(resolve =>{
  			this.http.get(url, {headers: this.headers}).subscribe((data: any) => {
  				let productdata = JSON.parse(data._body);
  				if(data.status ===200){
                    resolve(productdata.inventry);
                }else{
                    resolve(false);
                }
  			}, error =>{
  				this.checktoken.onErrorHandlerBuzz("Product page API Endpoint Error: ", error);
                resolve(false);
  			});
  		});	
  	}
    public getProductDetail(templateId: number){
        var url = this.url + api.productDetail + templateId;
        this.checktoken.loadUserCredentials();
        this.headers = { 'Authorization': 'Bearer ' + this.checktoken.authToken }
        return new Promise(resolve =>{
            this.http.get(url, {headers: this.headers}).subscribe((data: any)=>{
                let productdetail = JSON.parse(data._body);
                if(data.status ===200){
                    resolve(productdetail);
                }else{
                    resolve(false);
                }
            }, error =>{
                this.checktoken.onErrorHandlerBuzz("API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    // public downloadDesign(templateId: number){
    //     var url = this.url + api.downloaddesign + templateId;
    //     this.checktoken.loadUserCredentials();
    //     this.headers = { 'Authorization': 'Bearer ' + this.checktoken.authToken };
    //     return new Promise(resolve =>{
    //         this.http.get(url, {headers: this.headers}).subscribe((data: any)=>{
    //             let downloadeditem = JSON.parse(data._body);
    //             if(data.status ===200){
    //                 resolve(downloadeditem);
    //             }else{
    //                 resolve(false);
    //             }
    //         }, error =>{
    //             this.checktoken.onErrorHandlerBuzz("API Endpoint Error: ", error);
    //             resolve(false);
    //         });
    //     });
    // }
}
