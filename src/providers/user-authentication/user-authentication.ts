import { Injectable } from '@angular/core';
import { AlertController} from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Facebook } from '@ionic-native/facebook';
import {JwtHelper} from "angular2-jwt";
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
   
//Model and configuration variables
//import { User } from '../../models/user';

//config type variable
import * as api from '../../app/config/environment';
// import { FCM } from '@ionic-native/fcm';


/*
  Generated class for the UserAuthenticationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserAuthenticationProvider {
    public isLoggedin: boolean;
    public authToken;
    public userAuthData;
    public registerData:any;
    public jwtHelper:any;
    public headers: any;
    // public fcmToken: any;
    constructor(public http: Http,
                public alertCtrl: AlertController,
                public fb: Facebook,
                // private fcm: FCM
                ) {
                this.http = http;
                this.isLoggedin = false;
                this.authToken = null;
                this.userAuthData = null;
                this.jwtHelper = new JwtHelper();
                // this.fcm.subscribeToTopic('all');
                // this.fcm.getToken().then(token=>{
                //     this.fcmToken = token;
                // })
                // console.log(this.fcmToken);
            }
    //Convert an object to param for API request, will add & into each string.
    toParam(obj){
        var p = [];            
        for (var key in obj) {               
            p.push(key + '=' + encodeURIComponent(obj[key]));            
        }
        return p.join('&');  
    }

    onErrorHandlerBuzz(customMessage, error){
        let obj = {};
        if(error.status == 500){
            obj = {
                title: 'Heads up!',
                message: "Internal Server Error: "+error.status,
                buttonText: 'OK'
            };
            // customMessage+''+(error.status)+' '+(error.errorMessage)
        }else if(error.status == 401 ){
            obj = {
                title: 'Heads up!',
                message: 'Oh! Authentication failed',
                buttonText: 'OK'
            };
        }else if(error.status == 404 ){
            obj = {
                title: 'Heads up!',
                message: 'API end point not found! '+error.status,
                buttonText: 'OK'
            };
        }else{
            obj = {
                title: 'Heads up!',
                message: customMessage+''+(error.status)+' '+(error),
                buttonText: 'OK'
            };
        }
        this.showBasicAlert(obj);
    }

    storeUserCredentials(token,userData) {
        let userDetails = JSON.stringify(userData);
        window.localStorage.setItem('logintoken', token);
        window.localStorage.setItem('userAuthData', userDetails);
        this.useCredentials(token , userDetails);
    }
   
    useCredentials(token,userData) {
        this.isLoggedin = true;
        this.authToken = token;
        this.userAuthData = userData;
    }
    
    loadUserCredentials() {
        let token = window.localStorage.getItem('logintoken');
        let userData =  window.localStorage.getItem('userAuthData');
        this.useCredentials(token,userData);
    }
    destroyUserCredentials(Fcmtoken) {
        console.log(Fcmtoken)
        var fcmtoken = localStorage.getItem('fcmToken');
        console.log(fcmtoken)
        console.log(window.localStorage.getItem('userAuthData'))
        var userid: any = JSON.parse(window.localStorage.getItem('userAuthData'));
        console.log(userid.id);
        // console.log(this.fcmToken);
        this.headers = new Headers();
        this.headers.append('Authorization', 'Bearer ' + this.authToken);
        let url = api.baseUrl + api.apiUrl + api.logout + '?device_token=' + null + '&user_id=' + userid.id;
        return new Promise(resolve => {
            this.http.get(url, {headers: this.headers}).subscribe((data: any)=>{
                if(data.status == 200){
                    let logoutData = JSON.parse(data._body);
                    this.isLoggedin = false;
                    this.authToken = null;
                    this.userAuthData = null;
                    window.localStorage.clear();
                    resolve(logoutData);
                }else{
                    resolve(false);
                }
            }, error=>{
                this.onErrorHandlerBuzz("Authenticate API Endpoint Error: ", error);
                resolve (false);
            })
        })
    }
    showBasicAlert(obj){
          let alert = this.alertCtrl.create({
            title: (obj.title),
            message: (obj.message),
            buttons: [(obj.buttonText)]
        });
        alert.present();
    }
    
    /**
    * @description: Authnticate user via Username/Password Inputs
    * @param: 
    * @return: Object (User information)
    * @modifoed: 31-08-2017
    * @modifiedBy: Raj-V
    */
    authenticate(user) {
        //var userAuthData = "email=" + user.email + "&password=" + user.password;
        let el = this;
        let userAuthData = this.toParam(user);
        let url = api.baseUrl +api.apiUrl  + api.login; 
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(resolve => {
        this.http.post(url, userAuthData, {headers: headers}).subscribe(data => {
                let authDataSet = data.json();
                if(data.status===200){
                    //let createToken = authDataSet.user.id+'__'+btoa(authDataSet.user.name);
                    let user_id = this.jwtHelper.decodeToken(authDataSet.auth_token).user_id;
                    let createToken = authDataSet.auth_token
                    let userDataSet = {'id':user_id, 'role':authDataSet.role, 'name':authDataSet.name, 'userName': authDataSet.username};
                    this.storeUserCredentials(createToken,userDataSet);
                    resolve(true);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.onErrorHandlerBuzz("Authenticate API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    /**
    * @description: Save new user and authenticate user
    * @param: 
    * @return: Object (User information)
    * @modifoed: 31-08-2017
    * @modifiedBy: Raj-V
    */ 
    registerUserDetail(userData) {
        let el = this;
        var userAuthData: any = this.toParam(userData);
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return new Promise(resolve => {
            let url = api.baseUrl +api.apiUrl  +api.register
            this.http.post(url,userAuthData, {headers: headers}).subscribe(data => {
                let authDataSet = data.json();
                if(authDataSet.status===true){
                    //Authenticate user and redirect to dashboard
                    var deviceId = localStorage.getItem('fcmToken');
                    let userField = {'email':userData.email, 'password':userData.password, device_id: deviceId}
                    this.authenticate(userField).then(data=>{
                        this.registerData = data;
                        resolve(true);
                    });
                }else{
                    resolve(false);
                }
            },error => {
                el.onErrorHandlerBuzz("Registration API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    /**
    * @description: Login and get token and user info from the facebook
    * @param: 
    * @return: user info(Object), if error then return false
    * @modifoed: 31-08-2017
    * @modifiedBy: Raj-V
    */
    doFbLogin(){
        let permissions = new Array<string>();
        permissions = ["public_profile","email"];
        let fbInt = this;
        //fbInt.fb.logout(); //Logout before login
        return new Promise(resolve => {
            //logout if status is already connected
            fbInt.fb.getLoginStatus().then(function(res){
                console.log(res);
                if(res.status === 'connected'){
                    fbInt.fb.logout(); 
                }
            }); 
            
            fbInt.fb.login(permissions).then(function(response){
                console.log("FB connect status");
                console.log(response);
                let params = new Array<string>();
                fbInt.fb.api("/me?fields=name,email,first_name,last_name", params).then(function(user) {
                    console.log(user);
                    resolve(user);
                },function (error) {
                    console.log(error);
                    fbInt.onErrorHandlerBuzz("Graph API Endpoint Error: " , error);
                    resolve(false);
                });    
            },function (error) {
                console.log(error);
                fbInt.onErrorHandlerBuzz("FB Login API Endpoint Error: " , error);
                resolve(false);
            });
        });
    }

    /**
    * @description: Get Facebook Data and Match with the Database
    * @param: 
    * @return: user info(Object), if error then return false
    * @modifoed: 31-08-2017
    * @modifiedBy: Raj-V
    */
    facebookAuthentication(fbData){
        console.log('actual method')
        console.log(fbData);
        let el = this;
        return new Promise(resolve => {
            var device_id = localStorage.getItem('fcmToken');
            console.log(device_id);
            let url = api.baseUrl +api.apiUrl  + api.facebook_auth + '?email=' + fbData.email + '&device_id=' + device_id;
            this.http.get(url).subscribe(data => {
                console.log(fbData);
                let authDataSet = data.json();
                if(authDataSet.status){
                    let user_id =this.jwtHelper.decodeToken(authDataSet.user.auth_token).user_id;
                    let createToken = authDataSet.user.auth_token
                    let userDataSet = {'id':user_id, 'role':authDataSet.user.role, 'name':authDataSet.user.name,'userName': authDataSet.user.username};
                    this.storeUserCredentials(createToken,userDataSet);
                    resolve(true);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.onErrorHandlerBuzz("Authentication endpoint error: ", error);
                resolve(false);
            });
        });
    }
    
    /**
    * @description: Get State List 
    * @param: 
    * @return: state Data
    * @modifoed: 31-08-2017
    * @modifiedBy: Raj-V
    */
    selectState(){
        let el = this;
        return new Promise(resolve => {
            this.http.get(api.baseUrl +api.apiUrl + api.states).subscribe(data => {
                let statesName = data.json();
                if(statesName){
                    resolve(statesName);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.onErrorHandlerBuzz("Select state API Endpoint Error: ", error);
                resolve(false);
            });
        });     
    }
    
    //designer Type for Professional Api
    designerType(){
        let el = this;
        return new Promise(resolve => {
            this.http.get(api.baseUrl +api.apiUrl + api.designerType,).subscribe(data => {
                let professionalDesignerTypes = data.json();
                if(professionalDesignerTypes){
                    resolve(professionalDesignerTypes);
                }else{
                    resolve(false);
                }
            },function (error) {
                el.onErrorHandlerBuzz("Designer type API Endpoint Error: ",  error);
                resolve(false);
            });
        });
    }
    
    // check Email already exist or not
    checkEmailExist(user){
        let el = this;
        return new Promise(resolve => {
            let url = api.baseUrl +api.apiUrl +api.checkEmail + '?email='+user.email
            this.http.get(url).subscribe(data => {
                let emailCheck = data.json();
                console.log(emailCheck);
                if(emailCheck.status===false){
                    resolve(emailCheck);
                }else{
                    resolve(false)
                }
            },function (error) {
                el.onErrorHandlerBuzz("Email Exist API Endpoint Error: ", error);
                resolve(false);
            });
        });
    }
    
    // check Username Valid or Not
    checkUserName(user){
        let el = this;
        return new Promise(resolve => {
            let url = api.baseUrl +api.apiUrl  + api.checkUserName + '?username='+user.username
            this.http.get(url).subscribe(data => {
                let userName = data.json();
                if(userName.status===false){
                    resolve(true);
                }else{
                    resolve(false)
                }
            },function (error) {
                el.onErrorHandlerBuzz("Username Exist API Endpoint Error: " , error);
                resolve(false);
            });
        });
    }
}
