import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileSectionProvider } from '../../providers/profile-section/profile-section';
//Get user information form the session
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
// import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the ReviewstylePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
     selector: 'page-reviewstyle',
     templateUrl: 'reviewstyle.html',
 })
 export class ReviewstylePage {
     public userAuthToken:any;
     public userAuthData :any;
     public user_name:any; 
     public showRatingMessage:any;
     public starRate:number;
     public comment:string;
     public updateReviewId:number;
     public buttonText:string;
     public submitUpdateStatus:any;
     public isReviewEnable:boolean = true;
     constructor(
         public navCtrl: NavController, 
         public navParams: NavParams,
         public profileService:ProfileSectionProvider,
         public checktoken:UserAuthenticationProvider) 
     {  
        this.user_name = (navParams.data.username) ? navParams.data.username : "";
        this.userAuthToken = checktoken.authToken;
        this.submitUpdateStatus = (navParams.data.submit_update) ? navParams.data.submit_update : "";
        this.starRate = (this.submitUpdateStatus) ? navParams.data.rating: 0;
        this.comment = (this.submitUpdateStatus) ? navParams.data.description: "";
        this.updateReviewId = (this.submitUpdateStatus) ? navParams.data.id : 0;
        this.buttonText = (this.submitUpdateStatus) ? "Update Review" : "Save Review";
     }

     getRating(event){
        if(this.starRate<=0){
            return false;
        }
        let el = this;
        event.target.innerHTML = 'Please wait..';
        this.isReviewEnable=false;
        event.target.disabled = true;
        let obj:any;
        if(this.submitUpdateStatus){
            let navObj = this.navParams.data;
            navObj['score'] = this.starRate;
            navObj['description'] = this.comment;
            delete navObj['from_user'];
            delete navObj['rating'];
            delete navObj['name'];
            delete navObj['image'];
            delete navObj['image'];
            obj = navObj;
        }else{
           obj = {'score':this.starRate, 'description': this.comment, 'username': this.user_name};
        }
        el.profileService.reviewThisPost(obj).then(ratingDataStatus =>{
            if(ratingDataStatus){
                el.showRatingMessage = 'Rating is submitted successfully'
                setTimeout(function(){
                   let navPushObj =  el.navParams.data;
                   el.navCtrl.push('ProfilePage', navPushObj);
                },1000);
            }else{
                event.target.innerHTML = "Try Again!";
                setTimeout(function(){
                    event.target.disabled = false;
                },1000);
                return false;
            }
            this.isReviewEnable=true;
            event.target.innerHTML = this.buttonText;
        })
    }

    backbutton(){
          this.navCtrl.pop({animate:true,animation:'transition',duration:500,direction:'back'});
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad ReviewstylePage');
    }
}
