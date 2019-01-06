import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { InspirationDetailPage } from '../../pages/inspiration-detail/inspiration-detail';
// import { ProfilePage } from '../../pages/profile/profile';
import { ProfileSectionProvider } from '../../providers/profile-section/profile-section';
import { LoadingController } from 'ionic-angular';
//Get user information form the session
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import { InspodataProvider } from '../../providers/inspodata/inspodata';
import { appDirectives } from '../../app/appdirectives/appdirectives';
//Enviorment variable
import * as api from '../../app/config/environment';
@IonicPage()
@Component({
  selector: 'page-likes',
  templateUrl: 'likes.html',
})
export class LikesPage {
	public total_page: any;
	public userAuthData: any;
	public userAuthToken: any;
	public user_name: any;
	public userLikeData = [];
	public page: number = 1;
	public isloader: number = 1;
	public likesAllData: any;
	public user_id: any;
	public nothingFoundContent: any;
	public hasMoreData: boolean = true;
	public baseUrl: any;
	constructor(public navCtrl: NavController, public navParams: NavParams, public profileService:ProfileSectionProvider, public loading: LoadingController, public inspo: InspodataProvider, public checktoken:UserAuthenticationProvider, public commonAlert:appDirectives){
        this.likesAllData = [];
        this.baseUrl = api.baseUrl;
        let userAuthToken = checktoken.authToken;
        this.userAuthData = (userAuthToken) ? JSON.parse(checktoken.userAuthData) : "null";
        this.user_name = ((navParams.data).hasOwnProperty("userName")) ? (navParams.data.userName) : (this.userAuthData.userName);
        this.user_id = ((navParams.data).hasOwnProperty("user_id")) ? (navParams.data.user_id) : (this.userAuthData.user_id);
        this.nothingFoundContent = api.likesContent;
        this.likesData();
    }

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad LikesPage');
  	}
  	/**
    *@description: function to get user likes images of diffrent-diffrent pages.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    likesData(){
        if(this.isloader){
            let loader = this.loading.create({content: 'Loading...'});
            return loader.present().then(() => {
                    this.profileService.userLikesDataApi(this.user_name,this.page,'likes').then(dataset => {
                    if(dataset['status'] == false){
                        loader.dismiss();
                        return false;
                    }
                    this.total_page = dataset['total_pages'];
                    this.hasMoreData = true;
                    for(let likes of dataset['images']) {
                        this.userLikeData.push(likes);
                    }
                    this.likesAllData = this.userLikeData;
                    loader.dismiss();
                });
            });
        }else{
            return this.profileService.userLikesDataApi(this.user_name,this.page,'likes').then(dataset => {
                this.total_page = dataset['total_pages'];
                this.hasMoreData = true;
                for(let likes of dataset['images']) {
                    this.userLikeData.push(likes);
                }
                this.likesAllData = this.userLikeData;
            });
        }
    } 

    /**
    *@description: function to be set to infinite loader show for pagination
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    doInfinite(infiniteScrollEvent){
        if(this.page<this.total_page){
        this.page+=1;
        }else{
            this.hasMoreData = false;
            return false;
        }
        this.isloader = 0;
        this.likesData().then(()=>{
            if(this.page != this.total_page){
                infiniteScrollEvent.complete();
            }else{
                this.hasMoreData = false;
                return false;
            }
        });
    }

    postLike(postId, index, toUserId){
        if(!this.userAuthData.id){
            let obj = {
                title: 'Heads up!',
                message: 'You must be signed in to do that.',
                buttonText: 'OK'
            };
            this.commonAlert.showConfirm(obj);
            return false;
        }
        let postObj = {"user_id": this.user_id, "image_id": postId, 'to_user': toUserId};
        this.inspo.postLike(postObj).then(data => {
            let flag:boolean = false;
            if(data['status']){
                flag = true;
            }else if(data['status'] == false){
                flag = false;
            }
            this.likesAllData[index]['like_status'] = flag;
            this.likesAllData[index]['like_count'] = data['like_count'];
        });
    }
   
   /**
    *@description: function to set go to inspiration single page
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    inspirationdetail(img_id, toUserId){
        this.navCtrl.push('InspirationDetailPage', {imageId: img_id, toUserId: toUserId}, {animate:true,animation:'transition',duration:500,direction:'forward'})
    }

  /**
    *@description: function to set go to user profile page
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    goToUserProfile(username){
        console.log(username);
        let param = {'username':username};
        this.navCtrl.push('ProfilePage', param, {animate:true,animation:'transition',duration:500,direction:'forward'});
    }
  	backbutton(){
    	this.navCtrl.pop({animate:true,animation:'transition',duration:500,direction:'back'});
    }
}
