import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InspirationDetailPage } from '../../pages/inspiration-detail/inspiration-detail';
// import { ProfilePage } from '../../pages/profile/profile'
import { ProfileSectionProvider } from '../../providers/profile-section/profile-section';
import { LoadingController } from 'ionic-angular';
//Get user information form the session
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import { InspodataProvider } from '../../providers/inspodata/inspodata';
//Enviorment variable
import * as api from '../../app/config/environment';
import { appDirectives } from '../../app/appdirectives/appdirectives';

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
	public total_page: any;
    public userAuthData: any;
    public userAuthToken: any;
    public user_name: any;
    public userActiveData = [];
    public page:number = 1;
    public isloader:number = 1;
    public user_id: any;
    public activityAllData: any;
    public activitytitle: boolean = false;
    public activityContent: any;
    public hasMoreData: boolean = true;
    public baseUrl: any;
    constructor( public navCtrl: NavController,
        public navParams: NavParams,
        public profileService:ProfileSectionProvider,
        public loading: LoadingController,
        public inspo: InspodataProvider,
        public commonAlert:appDirectives,
        public checktoken:UserAuthenticationProvider) {
        console.log('Hello ActivityComponent Component');
        this.baseUrl = api.baseUrl;  
        let userAuthToken = checktoken.authToken;
        this.userAuthData = (userAuthToken) ? JSON.parse(checktoken.userAuthData) : "null";
        this.user_name = ((navParams.data).hasOwnProperty("userName")) ? (navParams.data.userName) : (this.userAuthData.userName);
        this.user_id = ((navParams.data).hasOwnProperty("user_id")) ? (navParams.data.user_id) : (this.userAuthData.user_id);
        this.activityData(); 
    }
	ionViewDidLoad() {
    	console.log('ionViewDidLoad ActivityPage');
  	}
  	activityData(){
        if(this.isloader){
            let loader = this.loading.create({content: 'Loading...'});
            return loader.present().then(() => {
                return this.profileService.userLikesDataApi(this.user_name,this.page,'activity').then(userActivityData => {
                if(userActivityData['status'] == false){
                    this.activitytitle = true;
                    this.activityContent = api.activitiesContent;
                    loader.dismiss();
                    return false;
                }else if(!userActivityData){
                    this.activitytitle = true;
                    this.activityContent = api.activitiesContentEndUrlFailed;
                    loader.dismiss();
                    return false;
                }
                this.total_page = userActivityData['total_pages'];
                this.hasMoreData = true;
//                for(var key in userActivityData['images']){
//                    userActivityData['images'][key].avatar = api. baseUrl+userActivityData['images'][key].avatar;
//                    userActivityData['images'][key].post_image = api.baseUrl+userActivityData['images'][key].post_image;
//                }
                for(let activity of userActivityData['images']) {
                    this.userActiveData.push(activity);
                }
                this.activityAllData = this.userActiveData;
                    loader.dismiss();
                });
            })
        }else{
            return this.profileService.userLikesDataApi(this.user_name,this.page,'activity').then(userActivityData => {
                this.total_page = userActivityData['total_pages'];
                this.hasMoreData = true;
//                for(var key in userActivityData['images']){
//                    userActivityData['images'][key].avatar = api. baseUrl+userActivityData['images'][key].avatar;
//                    userActivityData['images'][key].post_image = api.baseUrl+userActivityData['images'][key].post_image;
//                }
                for(let activity of userActivityData['images']) {
                    this.userActiveData.push(activity);
                }
                this.activityAllData = this.userActiveData;
            });
        }
    }
    backbutton(){
    	this.navCtrl.pop({animate:true,animation:'transition',duration:500,direction:'back'});
    }
    postLike(postId){
        if(!this.userAuthData.id){
            let obj = {
                title: 'Heads up!',
                message: 'You must be signed in to do that.',
                buttonText: 'OK'
            };
            this.commonAlert.showConfirm(obj);
            return false;
        }
        let el = document.getElementById("like-"+postId);
        let childEl = el.getElementsByClassName('count')[0];
        let postObj = {"user_id": this.user_id, "image_id": postId};
        this.inspo.postLike(postObj).then(data => {
            if(data['status'] == true){
                el.setAttribute("fill", "liked");
                childEl.innerHTML = data['like_count'];
            }else if(data['status'] == false){
                el.removeAttribute("fill");
                childEl.innerHTML = data['like_count'];
            }else{
                return false;
            }
            childEl.innerHTML = data['like_count'];
        });
    }
    inspirationdetail(img_id){
    	this.navCtrl.push(InspirationDetailPage,img_id,{animate:true,animation:'transition',duration:500,direction:'forward'})
  	}
  	goToUserProfile(username){
        let param = {'username':username};
        this.navCtrl.push('ProfilePage', param, {animate:true,animation:'transition',duration:500,direction:'forward'});
    }
}
