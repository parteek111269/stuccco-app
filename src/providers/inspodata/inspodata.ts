import { Injectable } from '@angular/core';
import { appDirectives } from '../../app/appdirectives/appdirectives';
import { Http, Headers,RequestOptions } from '@angular/http';

//Get user information form the session
import { UserAuthenticationProvider } from '../user-authentication/user-authentication';

//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

//import { InspoDetail } from '../../models/inspodetail';
import * as api from '../../app/config/environment';

@Injectable()
export class InspodataProvider {
    public inspoData=[];
    public total_page:number;
    private headers:any;
    constructor(public http: Http,public common:appDirectives,private checktoken:UserAuthenticationProvider) {
        console.log('Hello InspodataProvider Provider');
        
    }
    
    //Convert an object to param for API request, will add & into each string.
    toParam(obj){
        var p = [];            
        for (var key in obj) {               
            p.push(key + '=' + encodeURIComponent(obj[key]));            
        }
        return p.join('&');  
    }
    
    /**
    *@description: Load inspiration main page (Home,recent,popular)
    *@return: 
    *@param:page,view,id 
    *@createdBy: Raj M
    *@modified:  
    */
    load(page,view,firstPage) {
        if(firstPage == 1){
            this.inspoData = [];
        }
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken); 
        let el = this;
        let url = '';
        switch(view){
            case 'home':
                url = api.baseUrl +api.apiUrl + api.inspoUrl +"?page=" +page;
                break
            case 'recent':
                url = api.baseUrl +api.apiUrl + api.recentInspoUrl +"?page=" + page;
                break;
            default:
                url = api.baseUrl +api.apiUrl + api.popularPageUrl +"?page=" + page;
                break;
        }
      
        return new Promise(resolve => {
            this.http.get(url,{headers: this.headers}).subscribe(data => {
               let inspoHomeData = data.json();
               this.total_page = inspoHomeData.total_pages;
                for(var key in inspoHomeData.images){
                   inspoHomeData.images[key].avatar = api. baseUrl+inspoHomeData.images[key].avatar;
                   inspoHomeData.images[key].post_image = api. baseUrl+inspoHomeData.images[key].post_image;
                }
                for(let inspo of inspoHomeData.images) {
                    this.inspoData.push(inspo);
                }
                if(this.inspoData){
                    resolve(this.inspoData);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("Inspiration API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }

    /**
    *@description: Load inspirationDetail or single page.
    *@return: 
    *@param:image_id,user_id
    *@createdBy: Raj M
    *@modified:  
    */
    loadInspoDetailData(img_id){
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        this.headers.append('Cache-control', 'no-cache');
        this.headers.append('Cache-control', 'no-store'); 
        this.headers.append('Expires', '0');
        this.headers.append('Pragma', 'no-cache');
        let el = this;
        let url = api.baseUrl +api.apiUrl  + api.inspoSingleImageUrl+"?image_id=" +img_id;
        return new Promise(resolve => {
            this.http.get(url,{headers: this.headers}).subscribe(data => {
               let inspoSinglePageData = data.json();
               inspoSinglePageData.avatar = api. baseUrl+inspoSinglePageData.avatar;
               inspoSinglePageData.post_image = api. baseUrl+inspoSinglePageData.post_image;
                if(inspoSinglePageData){
                    resolve(inspoSinglePageData);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("Inspiration Detail page API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    /**
    *@description: set to function to like or unlike post
    *@return: 
    *@param:dataobj
    *@createdBy: Raj M
    *@modified:  
    */
    postLike(dataObj){
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken); 
        let el = this;
        let dataSet = this.toParam(dataObj);
        let url = api.baseUrl +api.apiUrl +api.postLike; 
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(resolve => {
            this.http.post(url, dataSet, {headers: this.headers}).subscribe(data => {
                let resultSet = data.json();
                resolve(resultSet);
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("Post like API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    /**
    *@description: set to function add comment on post.
    *@return: 
    *@param:dataObj 
    *@createdBy: Raj M
    *@modified:  
    */
    postCommentService(dataObj){
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken); 
       let el = this;
       let dataSet = this.toParam(dataObj);
       let url = api.baseUrl +api.apiUrl  + api.postComment;
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(resolve => {
            this.http.post(url, dataSet, {headers: this.headers}).subscribe(data => {
                let resultSet = data.json();
                resolve(resultSet);
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("Post comment API Endpoint Error: ", error);
                resolve(false);
            });
        });  
    }
    
    /**
    *@description: set to function to delete comment on post.
    *@return: 
    *@param:dataObj 
    *@createdBy: Raj M
    *@modified:  
    */
    deleteCommentService(dataObj){
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken); 
        let el = this;
        //let dataSet = this.toParam(dataObj);
        let url = api.baseUrl +api.apiUrl  + api.deletePostComment;
        let body = {
            'comment_id': dataObj
        };
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        let options= new RequestOptions({body: body,headers:headers});
        return new Promise(resolve => {
            this.http.delete(url,options).subscribe(data => {
                let resultSet = data.json();
                resolve(resultSet);
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("Post Delete comment API Endpoint Error: ", error);
                resolve(false);
            });
        }); 
    }
    
     /**
    *@description: set to function edit comment on post.
    *@return: 
    *@param:dataObj 
    *@createdBy: Raj M
    *@modified:  
    */
    editCommentService(dataObj){
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken); 
        let el = this;
        let url = api.baseUrl +api.apiUrl  + api.editPostComment;
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        let options= new RequestOptions({headers:headers});
        return new Promise(resolve => {
            this.http.patch(url,dataObj,options).subscribe(data => {
                let resultSet = data.json();
                resolve(resultSet);
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("Update comment API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }   
    
    /**
    *@description: set to function load comments for post.
    *@return: 
    *@param:dataObj 
    *@createdBy: Raj M
    *@modified:  
    */
    loadInspoComments(imageId,page){
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken); 
        let el = this;
        let url = api.baseUrl +api.apiUrl  + api.getComment +imageId +"?page=" +page;
        return new Promise(resolve => {
            this.http.get(url,{headers: this.headers}).subscribe(data => {       
               let inspoComments = data.json();
                if(inspoComments){
                    resolve(inspoComments);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("Inspiration get Comment API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
}
