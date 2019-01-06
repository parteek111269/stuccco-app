import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Slides } from 'ionic-angular';
// import { ProfileActivityPage } from '../profile-activity/profile-activity';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
// import { ReviewstylePage } from '../reviewstyle/reviewstyle';
import { CheckoutPage } from '../checkout/checkout';
// import { ChattingPage } from '../chatting/chatting';
import { LoadingController } from 'ionic-angular';
import { SettingProfilePage } from '../setting-profile/setting-profile';

//Provider
import { ProfileSettingsProvider } from '../../providers/profile-settings/profile-settings';
import { ProfileSectionProvider } from '../../providers/profile-section/profile-section';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { appDirectives } from '../../app/appdirectives/appdirectives';
import * as api from '../../app/config/environment';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
    @ViewChild(Slides) slides: Slides;
    public userAuthData:any;
    public profileUserName:any;
    public userInfomation = {};
    public profileImage:any;
    public baseUrl:string;
    public profileUserId:any;
    public conversationData = {};
    public showSubHeader:boolean = false;
    public isFollowEnable:boolean = true;
    public showProfileContent:boolean = false;
    public userFollowButtonStatus:any;
    public userProfileSettingAllData:any;
    public designer: any;
    public covers: any;
    public role: number;
    public roleId: number;
    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public profileSetting : ProfileSettingsProvider,
        public modalCtrl: ModalController,
        public loading: LoadingController,
        public checktoken:UserAuthenticationProvider,
        public profileService:ProfileSectionProvider,
        public commonAlert:appDirectives,
        public messageService:MessageServiceProvider,
    ){
        this.baseUrl = api.baseUrl;
        console.log(localStorage.userAuthData);
        if(localStorage.userAuthData != undefined){
            this.role = (JSON.parse(localStorage.userAuthData)).role;
        }
        let userAuthToken = checktoken.authToken;
        this.userAuthData = (userAuthToken) ? JSON.parse(checktoken.userAuthData) : "null";
        this.profileUserName = ((navParams.data).hasOwnProperty("username")) ? (navParams.data.username) : (this.userAuthData.userName);
        this.showSubHeader = ((navParams.data).hasOwnProperty("username")) ? true : false;
        this.designer = navParams.data;
        console.log(this.designer);
        // if(this.designer.role_id){
        //     this.roleId = this.designer.role_id;
        // }else{
        //     this.roleId = this.role;
        // }
    }
   
    presentProfileModal() {
        this.navCtrl.push('ReviewstylePage', this.navParams.data)
    }
    
    review(){
        if(!this.userAuthData.id){
            let obj = {
                title: 'Heads up!',
                message: 'You must be signed in to do that.',
                buttonText: 'OK'
            };
            this.commonAlert.showConfirm(obj);
            return false;
        }  
        this.presentProfileModal();  
    }
  
    // profileComponent(id,componentType){
    //     this.navCtrl.push(ProfileActivityPage, {'id':id,'subheaderTitle':componentType,'userName': this.profileUserName,'user_id':this.profileUserId, designer: this.designer});
    // }
    navigateTo(id,componentType){
        console.log(id);
        switch(id) {
            case 1:
                this.navCtrl.push('ActivityPage', {'id':id,'subheaderTitle':componentType,'userName': this.profileUserName,'user_id':this.profileUserId, designer: this.designer});
                break;
            case 2:
                this.navCtrl.push('AboutdetailPage', {'id':id,'subheaderTitle':componentType,'userName': this.profileUserName,'user_id':this.profileUserId, designer: this.designer});
                break;
            case 3:
                this.navCtrl.push('LikesPage', {'id':id,'subheaderTitle':componentType,'userName': this.profileUserName,'user_id':this.profileUserId, designer: this.designer});
                break;
            case 4: 
                this.navCtrl.push('FollowingPage', {'id':id,'subheaderTitle':componentType,'userName': this.profileUserName,'user_id':this.profileUserId, designer: this.designer});
                break;
            case 5:
                this.navCtrl.push('FollowersPage', {'id':id,'subheaderTitle':componentType,'userName': this.profileUserName,'user_id':this.profileUserId, designer: this.designer});
                break;
            case 6:
                this.navCtrl.push('CollectionsPage', {'id':id,'subheaderTitle':componentType,'userName': this.profileUserName,'user_id':this.profileUserId, designer: this.designer});
                break;
            case 7:
                this.navCtrl.push('CreationsPage', {'id':id,'subheaderTitle':componentType,'userName': this.profileUserName,'user_id':this.profileUserId, designer: this.designer});
                break;
        }
    }
    gotomarket(){
        console.log(this.designer.user_id);
        this.navCtrl.push('MarketPage', {page: 'profile', id: this.designer.user_id});
    }
    
    /**
    *@description: function to get user information for profile page from its provider
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    profileData(){
        let loader = this.loading.create({content: 'Loading...'});
        return loader.present().then(() => { 
            this.profileService.profilePageData(this.profileUserName).then((profileData: any) => {
                if(!profileData){
                    return false;
                }
                this.roleId = profileData.role_id
                this.showProfileContent = true;
                this.userInfomation = profileData;
                this.profileUserId = (this.userInfomation['id']);
                if(this.designer.user_id == undefined){
                    this.designer.user_id = this.profileUserId;
                }
                this.conversationDetail(this.profileUserId);
                if(this.userInfomation['follower_status'] == 1){
                    this.userFollowButtonStatus = 'Following'
                }else{
                    this.userFollowButtonStatus = 'Follow';
                }
                if(this.userAuthData.id){
                    this.profileSetting.getProfileSettingDataApi(this.userAuthData.id).then(dataSet=>{
                        // console.log(dataSet);
                        this.userProfileSettingAllData = dataSet['user'];
                    });
                }
                this.profileService.getCoverSlider(this.designer.user_id).then((response: any)=>{
                    this.covers = response.slider_array;
                    loader.dismiss();
                });
            });
        });
    }
    
    /**
    *@description: function to set to book designer
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    instantBook(){
        if(!this.userAuthData.id){
            let obj = {
                title: 'Heads up!',
                message: 'You must be signed in to do that.',
                buttonText: 'OK'
            };
            this.commonAlert.showConfirm(obj);
            return false;
        }
        let param =  this.designer;
        // console.log(param);
        var plan = JSON.parse(localStorage.getItem(param.username + "_" + param.id));
        if(!plan || plan == null)
            this.navCtrl.push('PlanPage', param, {animate:true,animation:'transition',duration:500,direction:'forward'});
        else    
            this.navCtrl.push(CheckoutPage, {plan: plan, hiredDesigner: param}, {animate:true,animation:'transition',duration:500,direction:'forward'});
    }
    
    
    /**
    *@description: function to set to follow any user.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    doFollow(event){
        let captionHeading = (event.target.textContent).trim();
        if(!this.userAuthData.id){
            let obj = {
                title: 'Heads up!',
                message: 'You must be signed in to do that.',
                buttonText: 'OK'
            };
            this.commonAlert.showConfirm(obj);
            return false;
        }  
        this.userFollowButtonStatus = 'Loading..';
        this.isFollowEnable = false;
        this.profileService.userProfileFollowService(this.profileUserId,captionHeading).then(userFollowStatus=>{
            if(userFollowStatus){
                this.userFollowButtonStatus = (captionHeading=='Follow') ? 'Following' : 'Follow';
            }else{
                alert("Opps! Something went wrong while updating status");
            }
            this.isFollowEnable=true; 
        });  
    }
    
    /**
    *@description: add refresher to pull down.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    doRefresh(refresher) {
        this.profileData();
        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }
    
    /**
    *@description: set function to go to conversation page and pass conversation data.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    goToChattingPage(){
        if(!this.userAuthData.id){
            let obj = {
                title: 'Heads up!',
                message: 'You must be signed in to do that.',
                buttonText: 'OK'
            };
            this.commonAlert.showConfirm(obj);
            return false;
        }
        this.navCtrl.push('ChattingPage',this.conversationData);
    }
    
    
    /**
    *@description: set function to get conversation data like conversation_id sender_id and reciever_id
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    
    conversationDetail(user_id){
        if(user_id != this.userAuthData.id){
            this.messageService.conversationDetailService(user_id,this.userAuthData.id).then(dataSet=>{
                this.conversationData = dataSet;
                // console.log(this.conversationData);
                return this.conversationData ;
            })  
        }
    }
    
    backbutton(){
      this.navCtrl.pop({animate:true,animation:'transition',duration:500,direction:'back'});
    }
    
    /**
    *@description: set Function to push you on profile setting page.
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    profileSettingPage(){
        let param = this.userProfileSettingAllData
        this.navCtrl.push(SettingProfilePage,param);
    }

    ionViewDidLoad() {
      // console.log('ionViewDidLoad ProfilePage');
      this.profileData();
    }
}
