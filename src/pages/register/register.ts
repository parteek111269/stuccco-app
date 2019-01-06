//Core Libs
import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Facebook } from '@ionic-native/facebook';
//Pages
// import { LoginPage } from '../login/login';
// import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashboard';
import { InAppBrowser } from '@ionic-native/in-app-browser';

//Providers and services
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';

//Custom Validator
import { EmailValidator } from '../../validator/emailvalidate';

//Loader
import { LoadingController } from 'ionic-angular';
import { appDirectives } from '../../app/appdirectives/appdirectives';

//import { UsernameValidator } from '../../validator/userNameValidate'
import { WebsiteValidator } from '../../validator/emailvalidate';
import * as api from '../../app/config/environment';

//Enviorment and golbal variable
import * as checkExistingValue from '../../app/config/environment';
import { FCM } from '@ionic-native/fcm';
import { NotificationProvider } from '../../providers/notification/notification';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
    //Facebook App Id
    FB_APP_ID: number = api.fbAppID;
    @ViewChild('signupSlider') signupSlider: any;
    //Declare Variable
    public existingEmailFlag: any;
    public existingEmail: any;
    public userName:any;
    public formReadOnly:boolean = false;
    public fbUserData:any;
    public uid:any = false;
    public slideOneForm: FormGroup;
    slideTwoForm: FormGroup;
    slideThreeForm: FormGroup;
    slideFourthForm: FormGroup;
    submitAttempt: boolean = false;
    formValidState:boolean = true;
    public fcmToken: string;
    //Declare an array
    userDetail = [];

    //Define ngModel variable
    profType = [];
    stateCollection = [];

    //user Email varible for facebook
    public emailExistString:any;
    currentSlide = 0;
    userRegType = 1;
    
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams, 
        public formBuilder: FormBuilder, 
        public platform: Platform,
        public authservice: UserAuthenticationProvider,
        public loading: LoadingController,
        private iab: InAppBrowser,
        public fb: Facebook,
        public appServices: appDirectives, public event: Events,
        private fcm: FCM, public alertCtrl: AlertController, public notification: NotificationProvider
    ) {
        this.emailExistString = "";
        // this.fb.browserInit(this.FB_APP_ID, "v2.8");
        //Validation rule and field assignment for setp-1
        this.slideOneForm = formBuilder.group({
            email: ['',Validators.compose([Validators.required, EmailValidator.mailFormat])],
            username: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9_-]*')])],
            password: ['',[Validators.required,Validators.minLength(8)]],
            // device_id: ['']
        });

        //Validation rule and field assignment for setp-2
        this.slideTwoForm = formBuilder.group({});
        //Validation rule and field assignment for setp-3
        this.slideThreeForm = formBuilder.group({
            first_name: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            last_name: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            nonhp_type: ['',Validators.required]
        });
        //Validation rule and field assignment for setp-4
        this.slideFourthForm = formBuilder.group({
            first_name: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            last_name: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            dob: [''],
            gender: [''],
            hp_phone_number: ['',Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
            hp_type: ['',Validators.required],
            hp_name: ['',Validators.required],
            hp_website: ['',Validators.compose([Validators.required, WebsiteValidator.urlFormat])],
            hp_address: [''],
            city: ['',Validators.required],
            hp_state: ['',Validators.required],
            zip_code:  ['',Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
            hp_about: ['',Validators.required]
        }); 
        this.initfcmnotification() 
    }
    
    /**
    * @description: Lock slider swipe and auto height
    * @param: 
    * @return: 
    * @modifoed: 31-08-2017
    * @modifiedBy: Raj-V
    */
    ngAfterViewInit() {
      this.signupSlider.autoHeight = true;
      this.signupSlider.lockSwipes(true);
    }
    initfcmnotification(){
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
                    // this.slideOneForm.controls['device_id'].setValue(this.fcmToken);
                }
            });
        }, 1000);
        //end notifications.
    }
    /**
    * @description: Slide moves to next given index
    * @param: index - 1/2/3/4
    * @return: 
    * @modifoed: 31-08-2017
    * @modifiedBy: Raj-V
    */
    next(index){
      //First unlock and then lock again for swipe event  
      this.signupSlider.lockSwipes(false);
      this.signupSlider.slideTo(index);
      this.signupSlider.lockSwipes(true);
    }
    
    /**
    * @description: Slide moves to previous given index
    * @param: index - 1/2/3/4
    * @return: 
    * @modifoed: 31-08-2017
    * @modifiedBy: Raj-V
    */
    prev(index){
      // get current Slide Index  
      this.currentSlide = this.signupSlider.getActiveIndex();
      //First unlock and then lock again for swipe event
      if(this.currentSlide == 3 ){
      this.signupSlider.lockSwipes(false);  
      this.signupSlider.slideTo(1);
      this.signupSlider.lockSwipes(true);
      }else{
      this.signupSlider.lockSwipes(false);  
      this.signupSlider.slideTo(this.currentSlide-1);
      this.signupSlider.lockSwipes(true);
      }
    }
    
    /**
    * @description: Login and get token and user info from the facebook
    * @param: 
    * @return: user info(Object), if error then return false
    * @modifoed: 31-08-2017
    * @modifiedBy: Raj-V
    */
    setDataRegForm(param){
        console.log("Setting up user data with Facebook");
        //-setting up user ID
        this.uid = param.id;
        let username = (param.name).replace(/\s+/g, '-').toLowerCase();
        //-Fill Data to first screen - Reg Screen 
        this.slideOneForm.get('email').setValue(param.email);
        this.slideOneForm.get('username').setValue(username);
        this.slideOneForm.get('password').setValue(param.id);
        
        //-Fill Data to third screen - Home Owner
        this.slideThreeForm.get('first_name').setValue(param.first_name);
        this.slideThreeForm.get('last_name').setValue(param.last_name);
        
        //-Fill Data to Forth screen - Home Professional
        this.slideFourthForm.get('first_name').setValue(param.first_name);
        this.slideFourthForm.get('last_name').setValue(param.last_name);
        
        //-Move slider to next screen once first screen filled with data
        //this.next(1);
    }
    
    /**
    * @description: Loads when view loads, Set form Data if Its already fill from FB
    * @param: 
    * @return: 
    * @modifoed: 31-08-2017
    * @modifiedBy: Raj-V
    */
    ionViewDidLoad() {
      console.log('ionViewDidLoad RegisterPage');
      //-Check if the registration is from FB (From Login page)
      let fbUserInfo = this.navParams.data.navData;
      if(fbUserInfo == 'show alert'){
        let obj = {
            title: 'Error!',
            message: 'User Does not exist, Please register!',
            buttonText: 'OK'
        };
        this.appServices.showBasicAlert(obj);
        // this.setDataRegForm(fbUserInfo);
      }
    }
    
    handleBackButton(){
      this.navCtrl.setRoot('HomePage',{}, {animate: true});
    }

    slideChanged(){
      this.currentSlide = this.signupSlider.getActiveIndex();
    }

    step1CheckPoint(){
      this.submitAttempt = true;  
      this.currentSlide = this.signupSlider.getActiveIndex();
      if(this.existingEmail.status == false){
        this.existingEmailFlag = false;
        this.emailExistString = checkExistingValue.emailExist;
      }else{
        this.existingEmailFlag = true;
        this.emailExistString ="";
      }
      console.log(this.existingEmailFlag);
      if(!this.slideOneForm.valid){      
      }else{
        if(this.existingEmailFlag == true){
            this.next(1);
        }    
      }
    }

    step2CheckPoint(option){
        this.userRegType = option;
        if(this.userRegType==1){
          this.next(2);
        }else{
            this.next(3);
            this.authservice.selectState().then(data=>{
             this.stateCollection = (data["states"]);
          })
            this.authservice.designerType().then(data=>{
                this.profType = (data["user_types"]);
          })
        }
    }
    // pass userRegisterData to Providers. 
    save(){
        this.submitAttempt = true;
        this.currentSlide = this.signupSlider.getActiveIndex();
        let registerDataSet;
        if(this.currentSlide == 2){
            if(!this.slideThreeForm.valid){
                this.formValidState = false;
                return false;
            }
            registerDataSet = this.overHome();
          }else{
            if(!this.slideFourthForm.valid){
                this.formValidState = false;
                return false;
            }
            registerDataSet = this.professional();
        }
        
    this.authservice.registerUserDetail(registerDataSet).then((data: any) =>{
            if(data) {
                this.navCtrl.setRoot(DashboardPage, {animate:true,animation:'transition',duration:500,direction:'forward'});
            }else{
                let obj = {
                    title: 'Error!',
                    message: 'Oops! seems some technical issue occurred!',
                    buttonText: 'OK'
                };
                this.appServices.showBasicAlert(obj);
            }
        }); 
    }

    // Fill and pass Data of Overhome 
    overHome(){
        let store1 = this.slideOneForm.value;
        let store2 = this.slideThreeForm.value;
        //Add role id static
        store1['uid'] = this.uid;
        store1['role_id'] = '2';
        store1['month'] = '12';
        store1['day'] = '01';
        store1['year'] = '2014';
        for(let key in store2){
            store1[key] = store2[key];
        }
        return store1;
    }

    //Fill and pass Data of Professionl
    professional(){
        let store1 = this.slideOneForm.value;
        let store2 = this.slideFourthForm.value;
        //Add role id static
        store1['uid'] = this.uid;
        store1['role_id'] = 1;
        for(let key in store2){
            if(key=='dob'){
                let dobStore = (store2[key]).split("-");
                store1['year'] = dobStore[0];
                store1['month'] = dobStore[1];
                store1['day'] = dobStore[2];
            }else if(key=='hp_type'){
                store2['id'] = store2[key]['id'];
            }else if(key=='hp_state'){
                store2['id'] = store2[key]['id'];
            }
            else{
                store1[key] = store2[key];
            }
        }
        return store1;
    }

    //onchange Email Event

    doLogin(){
      this.navCtrl.push('LoginPage',{},{animate:true,animation:'transition',duration:500,direction:'back'});
    }

    termAndCondition(){
        var opt = "location=yes,hidden=yes,hardwareback=no,zoom=no,toolbar=yes,transitionstyle=fliphorizontal";
        const browser = this.iab.create(api.baseUrl +api.termAndConditionUrl, '_blank', opt);
        browser.show();
    }

    // Blur Method For check existing Email and User name
    onBlurMethodEmail(){
        var userEmail = this.slideOneForm.value;
        this.authservice.checkEmailExist(userEmail).then((data: any)=>{
            this.existingEmail = data;
        })
    }

    onBlurMethodUserName(){
        var userName = this.slideOneForm.value;
        this.authservice.checkUserName(userName).then(data=>{
            if(data){
                this.userName = checkExistingValue.userNameExist;
            }else{
                this.userName="";
            } 
        });
    }
    
    //Facebook SignUp Funcionality
    doFbSignup(){
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
            //All steps validated
            env.authservice.checkEmailExist(fbDataSet).then(isEmailExist=>{
                if(isEmailExist){
                    var showLoader = false;
                    let env = this;
                    this.userexistprompt();     
                }else{
                    //-Register New User accordignly
                    this.setDataRegForm(fbDataSet);
                    this.next(1);
                }
            });
            loader.dismiss();
        });
    }
    userexistprompt(){
        let alert = this.alertCtrl.create({
            // title: 'Confirm purchase',
            message: 'Email already exist! Continue login with facebook',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {}
                },
                {
                    text: 'ok',
                    handler: () => {
                        console.log('ok clicked');
                        this.authservice.doFbLogin().then(fbDataSet=>{
                        //Check if user cancel and information is false
                        if(!fbDataSet){
                            return false;
                        }
                        //If email is pending and not retrieved from FB
                        if(!fbDataSet.hasOwnProperty("email")){
                            let obj = {
                                title: 'Error!',
                                message: 'Error! email was not received, please check if your email is confirmed from Facebook(FB: settings>general>contact)',
                                buttonText: 'OK'
                            };
                            this.appServices.showBasicAlert(obj);
                            return false;
                        }
                        //Check for auth API if FB data passes with all conditions
                        this.authservice.facebookAuthentication(fbDataSet).then(loginData=>{
                            if(loginData) {
                                this.navCtrl.setRoot(DashboardPage, {}, {animate:true,animation:'transition',duration:500,direction:'forward'});
                            }
                        });
                    }); 
                    }
                }
            ]
        });
        alert.present();
    }
    focus(input){
        input.setFocus();
    }
}
