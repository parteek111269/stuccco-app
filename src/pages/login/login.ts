//Core libs
import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, AlertController, MenuController, Platform } from 'ionic-angular';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Facebook } from '@ionic-native/facebook';
//Pages 
// import { RegisterPage } from '../register/register';
// import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';
import { InAppBrowser } from '@ionic-native/in-app-browser';
//Serives and models
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';

//Validators
import { EmailValidator } from '../../validator/emailvalidate';

//Loader
import { LoadingController } from 'ionic-angular';

//common services
import { appDirectives } from '../../app/appdirectives/appdirectives';

//Env variable or ForgotPassword Url.
import * as api from '../../app/config/environment';
import { FCM } from '@ionic-native/fcm';
import { NotificationProvider } from '../../providers/notification/notification';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    //Facebook App Id
    FB_APP_ID: number = api.fbAppID;
    //variable name
    guestName:any;
    public showloader: boolean =false;
    //Member variable of the class
    loginForm: FormGroup;
    public userInfo:any;
    public fbUserEmail:any;
    public flag:any = 0;
    public fb_login: any = false;
    fcmToken: string;
    submitAttempt: boolean = false;
    constructor(public notification: NotificationProvider, private fcm: FCM,public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser, public authservice: UserAuthenticationProvider, public alertCtrl: AlertController, public formBuilder: FormBuilder, public platform: Platform, public loading: LoadingController, public menu: MenuController, public fb: Facebook, public commonService:appDirectives, public event: Events){
        // this.fb.browserInit(this.FB_APP_ID, "v2.8");
        this.loginForm = formBuilder.group({
            email: ['',Validators.compose([Validators.required, EmailValidator.mailFormat])],
            password: ['',[Validators.required,Validators.minLength(8)]],
            device_id: ['']
        });
        this.menu.swipeEnable(false);
        // this.event.subscribe('dofblogin', () => {
        //     console.log('do fb login from register');
        //     this.doFbLogin();
        // });
    }
    ionViewDidLoad() {
        this.initfcmnotification();
    }
    initfcmnotification(){
        //Notifications
        // this.fcm.subscribeToTopic('all');
        this.fcm.onTokenRefresh().subscribe(token=>{ console.log(token); });
        setTimeout(()=>{
            this.fcm.getToken().then(token=>{
                console.log(token);
                this.fcmToken = token;
                if(this.fcmToken == null){
                    this.initfcmnotification();
                }else{
                    localStorage.setItem('fcmToken', this.fcmToken);
                    console.log(localStorage.getItem('fcmToken'));
                    this.loginForm.controls['device_id'].setValue(this.fcmToken);
                }
            });
        }, 1000);
        //end notifications.
    }
    /**
    * @description: doAuthenticate function authenticate user with normal credintials, and set data
    * @param: 
    * @return: 
    * @modifoed: 31-08-2017
    */
    doAuthenticate(){
        this.showloader = true;
        this.submitAttempt = true; 
        if(!this.loginForm.valid){
            this.showloader = false;
            return false;
        } else { 
            var userLoginDetail = this.loginForm.value;
                this.authservice.authenticate(userLoginDetail).then(data => {
                    if(data) {
                        this.showloader = true;
                        this.navCtrl.setRoot(DashboardPage, {}, {animate:true,animation:'transition',duration:500,direction:'forward'});
                    } else {
                        this.showloader = false;
                        this.loginForm.get('password').setValue("");
                        // let obj = {
                        //     title: 'Authentication Error!',
                        //     message: 'Username or Password is wrong!',
                        //     buttonText: 'OK'
                        // };
                        // this.commonService.showBasicAlert(obj);
                    }
            });
        }
    }
    
    
    /**
    * @description: Create New account(Push registration page)
    * @param: 
    * @return: 
    * @modifoed: 31-08-2017
    * @modifiedBy: Raj-V
    */
    createAccount(navData) {
      this.navCtrl.push('RegisterPage',{navData}, {animate:true,animation:'transition',duration:500,direction:'forward'});
    }

    /**
    * @description: Forgot password in-app browser page open(no app page for forgot password)
    * @param: 
    * @return: 
    * @modifoed: 31-08-2017
    * @modifiedBy: Raj-M
    */
    forgetPassword(){
        var opt = "location=yes,hidden=yes,hardwareback=no,zoom=no,toolbar=yes,transitionstyle=fliphorizontal";
        const browser = this.iab.create(api.baseUrl +api.forgotPasswordUrl, '_blank', opt);
        browser.show();
    }
    
    /**
    * @description: Will send to home page on back button click
    * @param: 
    * @return: 
    * @modifoed: 31-08-2017
    * @modifiedBy: Raj-M
    */
    handleBackButton(){
      this.navCtrl.setRoot('HomePage',{}, {animate: true});
    }


    /**
    * @description: Authenticate user with facebook and set data
    * @param: 
    * @return: 
    * @modifoed: 31-08-2017
    * @modifiedBy: Raj-V
    */
    doFbLogin(){
        let env = this;
        let loader = env.loading.create({content: 'Loading..'});
        loader.present();
        env.authservice.doFbLogin().then(fbDataSet=>{
            console.log(fbDataSet);
            //Check if user cancel and information is false
            if(!fbDataSet){
                loader.dismiss();
                return false;
            }
            
            //If email is pending and not retrieved from FB
            if(!fbDataSet.hasOwnProperty("email")){
                alert("Error! email was not received, please check if your email is confirmed from Facebook(FB: settings>general>contact)");
                loader.dismiss();
                return false;
            }

            //Check for auth API if FB data passes with all conditions
            env.authservice.facebookAuthentication(fbDataSet).then(loginData=>{
                if(loginData) {
                    this.navCtrl.setRoot(DashboardPage, {}, {animate:true,animation:'transition',duration:500,direction:'forward'});
                }else{
                    env.createAccount('show alert');
                }
                //Dismiss Loader
                loader.dismiss();
            });
        });
    }

    focus(input){
        input.setFocus();
    }
}