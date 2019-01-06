import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

//Get user information form the session
import { UserAuthenticationProvider } from '../user-authentication/user-authentication';

//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

//import { InspoDetail } from '../../models/inspodetail';
import * as api from '../../app/config/environment';

@Injectable()
export class ProjectProvider {
    public url:any;
    private headers:any;
    constructor(public http: Http, private checktoken:UserAuthenticationProvider) {
        console.log('Hello ProjectProvider Provider');
    }
    
    /**
    *@description: Api call for Project listing.
    *@return: project list data
    *@param: user_id
    *@createdBy: Raj M
    *@modified:  14/9/2017
    */
//    let url = api.baseUrl +api.apiUrl  + api.projectlisting +'/' + '?projects_type='+projectType +'&page=' +pageno;
    getProjectListingData(projectType,pageno){
    this.checktoken.loadUserCredentials();
    let el = this;
    let url = '';
    switch(projectType){
            case "hired_me":
                url = api.baseUrl +api.apiUrl  + api.projectlisting +'/' + '?projects_type='+projectType +'&page=' +pageno;
                break; 
            case 'hired_others':
                url = api.baseUrl +api.apiUrl  + api.projectlisting +'/' + '?projects_type='+projectType +'&page=' +pageno;
                break;
            default:
                console.log("no case in list");
                break;
    }
    
    this.headers = new Headers();
    this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);    
        return new Promise(resolve => {
            this.http.get(url,{headers: this.headers}).subscribe(data => {
                let projectlistingHiredMe = data.json(); 
                if(data.status ===200){
                    resolve(projectlistingHiredMe);
                }else{
                    resolve(false);
                }
            },function (error) {
                    el.checktoken.onErrorHandlerBuzz("Project Listing API Endpoint Error: ", error)
                    resolve(false);
            })
        }); 
    }
   
    /**
        *@description: Api call for Project detail data based on project id.
        *@return: 
        *@param: project id
        *@createdBy: Raj M
        *@modified:  14/9/2017
    */

    getProjectDetailData(id){
         this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        let el = this;
        let url = api.baseUrl +api.apiUrl  + api.projectlisting +'/'+id
        return new Promise(resolve => {
            this.http.get(url,{headers: this.headers}).subscribe(projectDetail => {
            let projectListingDetailData = projectDetail.json();
            if(projectDetail.status ===200){
                    resolve(projectListingDetailData);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("Project Deatil API Endpoint Error: ", error)
                resolve(false);
            });
        }); 
    }

    /**
        *@description: Api call for change Project status from inprogress to completed.
        *@return: 
        *@param: project id
        *@createdBy: Raj M
        *@modified:  14/9/2017
    */

    changeStatusApi(usr_id,prjct_id){
        this.checktoken.loadUserCredentials();
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        let el = this;
        let id = {'user_id':usr_id};
        let url = api.baseUrl +api.apiUrl  + api.projectChangeStatusUrl + "?id=" + prjct_id;
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(resolve => {
            this.http.post(url,id,{headers: this.headers}).subscribe(changeStatusValue => {
            let StatusValue = changeStatusValue.json();
                if(changeStatusValue.status ===200){
                    resolve(StatusValue.status);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.checktoken.onErrorHandlerBuzz("Project Complete API Endpoint Error: ", error)
                resolve(false);
            });
        }); 
    }
}
