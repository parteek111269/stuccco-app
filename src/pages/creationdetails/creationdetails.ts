import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import { ProfileSectionProvider } from '../../providers/profile-section/profile-section';
import { LoadingController } from 'ionic-angular';
import * as api from '../../app/config/environment';
import { InspodataProvider } from '../../providers/inspodata/inspodata';
// import { InspirationDetailPage } from '../../pages/inspiration-detail/inspiration-detail';
import { appDirectives } from '../../app/appdirectives/appdirectives';
import { CreationeditimagePage } from '../creationeditimage/creationeditimage';
// @IonicPage()
@Component({
  selector: 'page-creationdetails',
  templateUrl: 'creationdetails.html',
})
export class CreationdetailsPage {
    public creationTitleName:any;
    public userAuthData:any;
    public user_name:any;
    public total_page:any;
    public user_id:any;
    public cretionDetailsALlData = [];
    public baseUrl:any;
    public loggedinUser_id:any;
    constructor(
        public alertCtrl: AlertController,
        public navCtrl: NavController, 
        public navParams: NavParams,
        public loading: LoadingController,
        public profileService:ProfileSectionProvider,
        public checktoken:UserAuthenticationProvider,
        public inspo: InspodataProvider,
        public commonAlert:appDirectives)
        {
            this.creationTitleName = navParams.data.title;
            let userAuthToken = checktoken.authToken;
            this.userAuthData = (userAuthToken) ? JSON.parse(checktoken.userAuthData) : "null";
            this.user_name = ((navParams.data).hasOwnProperty("userName")) ? (navParams.data.userName) : (this.userAuthData.userName);
            this.loggedinUser_id = ((navParams.data).hasOwnProperty("user_id")) ? (navParams.data.user_id) : (this.userAuthData.id);
            this.baseUrl = api.baseUrl;
        }
    
    
    getCreationDetailData(){
        let loader = this.loading.create({content: 'Loading...'});
            return loader.present().then(() => {
                this.profileService.creationDetailService(this.user_name,this.creationTitleName).then(dataSet=>{
                    this.total_page = dataSet['total_pages'] 
                    console.log(dataSet['status']);
                    if(!dataSet){
                        loader.dismiss();
                        return false;
                    }else if(dataSet['status'] == true){
                        for(let creations of dataSet['images']) {
                            this.cretionDetailsALlData.push(creations);
                        }
                    }else{
                        loader.dismiss();
                        return false;
                    }
                    loader.dismiss();
                })
            })
    }
    
    
    
    /**
    *@description: function to be set to link with inspiration single page loader.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    inspirationdetail(creationData: any){
        console.log(creationData);
        var info: any = {
            imageId: creationData.id,
            toUserId: creationData.user_id
        }
        this.navCtrl.push('InspirationDetailPage', info, {animate:true,animation:'transition',duration:500,direction:'forward'})
    }
    
    postLike(creationData: any){
        if(!this.userAuthData.id){
            let obj = {
                title: 'Heads up!',
                message: 'You must be signed in to do that.',
                buttonText: 'OK'
            };
            this.commonAlert.showConfirm(obj);
            return false;
        }
        let el = document.getElementById("like-"+ creationData.id);
        let childEl = el.getElementsByClassName('count')[0];
        let postObj = {"user_id": this.user_id, "image_id": creationData.id, "to_user": creationData.user_id};
        this.inspo.postLike(postObj).then(data => {
            console.log(data);
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
    
    /**
    *@description: function to be delete creation detail page image
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    
    deleteCreationImage(id,index){
        console.log(id);
        let obj = {
            title: 'Heads up!',
            message: 'Are You sure?',
            index:index,
            buttonText: 'OK'
        };
        this.showalertdelete(obj,id);
        return false;
    }
    
    /**
    *@description: function to be set show alert box to choose action for delete.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    showalertdelete(obj,id) {
        let confirm = this.alertCtrl.create({
            title: (obj.title),
            message:  (obj.message),
            buttons: [
                {
                    text: 'cancel',
                    handler: () => {
                    console.log('Disagree clicked');
                }
            },
            {
                text: 'ok',
                handler: () => {
                    this.profileService.creationImageDeleteService(id).then(info => {
                        if(info){
                            this.cretionDetailsALlData.splice(obj.index, 1);
                        }else{
                            alert("Opps! review was not deleted successfully");
                        }
                    });
                }
            }
          ]
        });
        confirm.present();
    }    
    
    /**
    *@description: function to be get data detail for edit creation image.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    editCreation(id){
        console.log(id);
        this.profileService.CreationImageDataForEdit(id).then((dataSet: any)=>{
            if(dataSet.status){
               this.navCtrl.push(CreationeditimagePage, dataSet.home_prof);
            }
        })
    }
    
    backbutton(){
        this.navCtrl.pop();
    }
    ionViewDidLoad() {
      console.log('ionViewDidLoad CreationdetailsPage');
      this.getCreationDetailData();
    }
}
