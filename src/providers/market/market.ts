import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserAuthenticationProvider } from '../user-authentication/user-authentication';
//Impost Enviorment Variable to get Base Url As well As end url
import * as api from '../../app/config/environment';

@Injectable()
export class MarketProvider {
	public url: string;
    private headers:any;
    constructor(public http: Http, private checktoken: UserAuthenticationProvider,) {
        this.url = api.baseUrl + api.apiUrl;
    }
    getMarketItems(searchUrl, limit, view, id){
        console.log(view);
        var url;
        if(searchUrl){
            searchUrl = '&' + searchUrl;
        }else{
            searchUrl = ''
        }
        if(view == 'profile'){
            url = this.url + 'templates?user_id=' + id;
        }else{
            url = this.url + api.marketTemplatesPage + limit + searchUrl;
        }
  	    this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve =>{
    	    this.http.get(url, {headers: this.headers}).subscribe((data: any)=>{
                console.log(data)
    		    var marketData = JSON.parse(data._body);
    		    if(data.status === 200){
                    resolve(marketData);
                }else{
                    alert("Request failed please try again!");
                    resolve(false);
                }
    	    }, error=>{
    		    this.checktoken.onErrorHandlerBuzz("Market page API Endpoint Error: ", error);
    		    resolve(false);
    	    });
        });
    }
    getTemplateDetails(templateId){
        let url = this.url + api.marketTemplates + '/' + templateId;
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.get(url, {headers: this.headers}).subscribe((data: any) => {
                var templateInfo = JSON.parse(data._body);
                if(data.status === 200){
                    resolve(templateInfo);
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
    updateTemplateForm(values, templateId){
        let url = this.url + api.marketTemplates + '/' + templateId;
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.patch(url, values, {headers: this.headers}).subscribe((data: any)=>{
                var templateUpdatedInfo = JSON.parse(data._body);
                if(data.status === 200){
                   resolve(templateUpdatedInfo);
                }else{
                    alert("Request failed please try again!");
                    resolve(false);
                }
           }, error => {
               this.checktoken.onErrorHandlerBuzz("API Endpoint Error: ", error);
               resolve(false);
           })
        })
    }
    addTemplateForm(values){
        let url = this.url + api.marketTemplates;
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.post(url, values, {headers: this.headers}).subscribe((data: any) => {
                var templateAddInfo = JSON.parse(data._body);
                if(data.status === 200){
                    resolve(templateAddInfo);
                }else{
                    alert("Request failed please try again!");
                    resolve(false);
                }
            },error =>{
                this.checktoken.onErrorHandlerBuzz("API Endpoint Error: ", error);
                resolve(false);
            })
        })
    }
    checkout(dataStore, stripeToken, id){
        let url = this.url + api.marketTemplates + api.purchaseTemplate;
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        let dataSet = 'data=' + JSON.stringify(dataStore);
        return new Promise(resolve => {
            this.http.post(url, {stripeToken, id}, {headers: this.headers}).subscribe((data: any) => {
                var checkoutRes = JSON.parse(data._body);
                if(checkoutRes.status === true){
                    resolve(checkoutRes)
                }else{
                    alert(JSON.stringify(checkoutRes))
                    resolve(false);
                }
            }, error =>{
                this.checktoken.onErrorHandlerBuzz("Checkout process API Endpoint Error: ", error);
                resolve(false);
            });
        })
    }
    startNewConversation(current_user_id: number, recipient_id: number){
        var url = this.url + api.conversationDetail + '?sender_id=' + current_user_id + '&recipient_id=' + recipient_id;
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            this.http.post(url, {headers: this.headers}).subscribe((data: any)=>{
                var conversationRes = JSON.parse(data._body);
                if(data.status === 200){
                    resolve(conversationRes);
                }else{
                    resolve(false);
                }
            }, error =>{
                this.checktoken.onErrorHandlerBuzz("API Endpoint Error: ", error);
                resolve(false);
            })
        });
    }
}
