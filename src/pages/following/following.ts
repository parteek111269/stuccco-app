import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { appDirectives } from '../../app/appdirectives/appdirectives';
import { ProfileSectionProvider } from '../../providers/profile-section/profile-section';
import { LoadingController } from 'ionic-angular';
// import { ProfilePage } from '../../pages/profile/profile';
//Get user information form the session
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
//Enviorment variable
import * as api from '../../app/config/environment';
@IonicPage()
@Component({
  selector: 'page-following',
  templateUrl: 'following.html',
})
export class FollowingPage {
	public userAuthToken:any;
    public userAuthData:any;
    public followingarea:boolean = false;
    public user_name:any;
    public followingAlldata:any;
    public followingContent:any;
    public isloader:number=1;
    public baseUrl:string;
    public loggedinUser_id:any;
    public page: number = 1;
    public hasMoreData: boolean = true;
  	constructor(public commonAlert:appDirectives, public navCtrl: NavController, public profileService:ProfileSectionProvider, public loading: LoadingController, public navParams: NavParams, public checktoken:UserAuthenticationProvider) {
        this.baseUrl = api.baseUrl;
        let userAuthToken = checktoken.authToken;
        this.userAuthData = (userAuthToken) ? JSON.parse(checktoken.userAuthData) : "null";
        this.user_name = ((navParams.data).hasOwnProperty("userName")) ? (navParams.data.userName) : (this.userAuthData.userName);
        this.loggedinUser_id = ((navParams.data).hasOwnProperty("user_id")) ? (navParams.data.user_id) : (this.userAuthData.user_id);
        this.followingData(this.page);   
    }
	ionViewDidLoad() {
    	console.log('ionViewDidLoad FollowingPage');
  	}
  	backbutton(){
    	this.navCtrl.pop({animate:true,animation:'transition',duration:500,direction:'back'});
    }
    /**
    *@description: function to get users following data
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    followingData(page){
        if(this.isloader){
            let loader = this.loading.create({content: 'Loading...'});
            return loader.present().then(() => { 
                this.profileService.followingApiData(this.user_name, 'following', page).then((followingData: any) => {
                    if(followingData.status == false){
                        this.followingarea = true;
                        this.followingContent = api.followingsContent;
                        loader.dismiss();
                        return false;
                    }else if(!followingData){
                        this.followingarea = true;
                        this.followingContent = api.followingsContentEndUrlFailed;
                        loader.dismiss();
                        return false;
                    }
                    this.followingAlldata = followingData.followers;
                    loader.dismiss();
                });
            })
        }
    }
    doInfinite(infiniteScrollEvent){
        this.page += 1;
        this.isloader = 0;
        this.profileService.followingApiData(this.user_name, 'followers', this.page).then((followerData: any) => {
            if(this.page <= followerData.total_pages){
                for(let i = 0; i < followerData.followers.length; i++){
                    this.followingAlldata.push(followerData.followers[i]);
                }
                console.log(this.followingAlldata);
                infiniteScrollEvent.complete();
            }else{
                this.hasMoreData = false;
                return false;
            }
        });
    }
    /**
    *@description: function to set go to user profile page
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */

    goToUserProfile(username){
        let param = {'username':username};
        this.navCtrl.push('ProfilePage', param, {animate:true,animation:'transition',duration:500,direction:'forward'});
    }
}
