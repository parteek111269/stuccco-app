import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,AlertController} from 'ionic-angular';

//Serives and models
import { InspodataProvider } from '../../providers/inspodata/inspodata';

//ActionSheet Controller
import { ActionSheetController, Content} from 'ionic-angular';

//Loader
import { LoadingController } from 'ionic-angular';

//pages
// import { ProfilePage } from '../profile/profile';

//Social Sharing
import { SocialSharing } from '@ionic-native/social-sharing';

//Enviorment variable
import * as api from '../../app/config/environment';

//Get user information form the session
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';

import { appDirectives } from '../../app/appdirectives/appdirectives';

//Scroll to Top Content

@IonicPage()
@Component({
  selector: 'page-inspiration-detail',
  templateUrl: 'inspiration-detail.html',
  providers:[InspodataProvider]
})

export class InspirationDetailPage {
    @ViewChild('signupSlider') signupSlider: any;
    @ViewChild(Content) content: Content;
    currentSlide = 0;
    public image_id:number;
    public user_id:number;
    public inspodetails = {};
    public inspoDetailComment = [];
    public baseUrl = {};
    public value = {};
    public comments = [];
    public commentInput:any;
    public userAuthData:any;
    public userAuthToken:any;
    public index:number = 6;
    public commentListEl:any;
    public page:number = 1;
    public total_page:any;
    public hasMoreComment:boolean = false;
    public to_userid:number
    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        public sharingVar: SocialSharing,
        public alertCtrl: AlertController,
        public actionSheetCtrl: ActionSheetController,
        public inspo: InspodataProvider,
        public navParams: NavParams,
        public loading: LoadingController,
        public checktoken: UserAuthenticationProvider,
        public commonAlert: appDirectives
    ){
        this.userAuthToken = checktoken.authToken;
        this.userAuthData = JSON.parse(checktoken.userAuthData);
        if(this.userAuthToken){
            this.user_id = this.userAuthData.id;
        }else{
            this.user_id = null;
        }
        this.baseUrl = api.baseUrl;
        this.commentInput = "";
        this.to_userid = navParams.data.toUserId;
            this.image_id = navParams.data.imageId;
        console.log(navParams.data);
    }
    
    //Show basic alert
    showBasicAlert(obj){
        let alert = this.alertCtrl.create({
          title: (obj.title),
          message: (obj.message),
          buttons: [(obj.buttonText)]
        });
        alert.present();
    }

    /**
    *@description: function to be set to load single image Data
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    inspoDetail(){
        let loader = this.loading.create({content: 'Loading..'});
        loader.present().then(() => { 
            this.inspo.loadInspoDetailData(this.image_id).then(data => {
                this.inspodetails = data;
                console.log(this.inspodetails);
                loader.dismiss();
            });
        });
    }
    
    /**
    *@description: function to be set to load Comments with pagination data from service
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    inspoDetailComments(image_id, page){
        this.inspo.loadInspoComments(this.image_id,this.page).then(data => {
            this.total_page = data['total_pages'];
            this.hasMoreComment = false;
            for(var i=0; i<data['comments'].length;i++){
                let comment = data['comments'][i];
                this.inspoDetailComment.unshift(comment);
            }
        });
    }
    
    /**
    *@description: function to be set to load more comments.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    loadMoreComment(){
        if(this.page<this.total_page){
            this.page+=1;
            this.hasMoreComment = true;
            this.inspoDetailComments(this.image_id, this.page);
        }
    }
    //Load to inital view
    ionViewDidLoad() {
        console.log('ionViewDidLoad InspirationDetailPage');
        this.inspoDetail();
        this.inspoDetailComments(this.image_id, this.page);
    }
    
    //Load Icon Image
    loadRelatedPost(postData){
        console.log(postData);
       this.image_id = postData.id;
       this.inspoDetail();
       this.inspoDetailComment = [];
       this.inspoDetailComments(this.image_id, 1);
    }
    
    //Share post by facebook
    facebookShare(){
        this.sharingVar.shareViaFacebook("Share via Facebok",null,api.baseUrl+this.inspodetails['share_url']).then(()=>{
        },error =>{
             console.log("Sharing Faild try again")
        })
    }

    //Share post by email
    emailShare(){
        this.sharingVar.share("Share By Email",null/*Subject*/,api.baseUrl+this.inspodetails['share_url']).then(()=>{
        },error=>{
             console.log("Sharing Faild try again")
        })
    }

    //slider
    slideChanged(){
        this.currentSlide = this.signupSlider.getActiveIndex();
    }
    
    //Action sheet
    actionsheet(){
        let actionSheet = this.actionSheetCtrl.create({
        title: 'Share',
        buttons: [{
              icon:'logo-facebook',
              text:'Share',
              handler: () => {
                this.facebookShare();
              }
            },{
              icon:'mail',
              text: 'Email',
              handler: () => {
                  this.emailShare();
             }
            },{
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
              }
            }] 
        });
        actionSheet.present();
    }
    
    
    //---------------
    //Actions Block
    //---------------
    
    removeEl(el){
        el.parentNode.removeChild(el);
    }
    
    getCommentCount(){
        let el:any = document.getElementById("comment-details-"+this.image_id);
        let childEl:any = el.getElementsByClassName('count')[0];
        let childCount = parseInt(childEl.innerHTML);
        return childCount;
    }
    
    updateCommentCount(updateData){
        this.inspodetails['comment_count'] = updateData.comment_count;
        this.inspodetails['comment_status'] = updateData.status;
        this.updateCommentColor(updateData);
    }
    
    //change Comment icon color if any comment present of current login-user.
    updateCommentColor(data){
        let el:any = document.getElementById("comment-details-"+this.image_id);
        if(data['comments']){
            el.setAttribute("fill", "changecolor");
        }else if(data.comment_status){
            el.setAttribute("fill", "changecolor");
        }else{
            el.removeAttribute("fill");
        }
    }
    
    getLikeCount(){
        let el:any = document.getElementById("like-details-"+this.image_id);
        let childEl:any = el.getElementsByClassName('count')[0];
        let childCount = parseInt(childEl.innerHTML);
        return childCount;
    }
    
    updateLikeCount(updateData){
        this.inspodetails['like_count'] = updateData.like_count;
        this.inspodetails['like_status'] = updateData.status;
    }
    
    updateFilledColor(flag){
        let el:any = document.getElementById("like-details-"+this.image_id);
        if(flag){
            el.setAttribute("fill", "liked");
        }else{
            el.removeAttribute("fill");
        }
    }
    
    //--------------------
    // End Actions Block
    //--------------------
    
    
    //Post Like Controller inititilated
    postLike(){
            if(!this.user_id){
            let obj = {
                title: 'Heads up!',
                message: 'You must be signed in to do that',
                buttonText: 'OK'
            };
            this.commonAlert.showConfirm(obj);
            return false;
        }
        let postObj = {"image_id": this.image_id, 'to_user': this.to_userid};
        this.inspo.postLike(postObj).then(data => {
            this.updateLikeCount(data);
        });
    }
    
    //Actionsheet for comment delete/edit section.
    actionShtComment(targetDataSet,event,index){
        //Get parent ID
        this.commentListEl = (event.target.offsetParent);
        let cmtListLabel = (this.commentListEl).getElementsByClassName("inspirtion-details-cmt-box")[0];
        let newUpdateComment =  cmtListLabel.innerHTML
        //Check if the user id does'nt match with replier id then bypass actionsheet
        if(this.user_id!=targetDataSet.replier_id){
            return false;
        }
        let actionSheet = this.actionSheetCtrl.create({
        title: 'Please choose your action',
        buttons: [{
              icon:'trash',
              text:'Delete',
              handler: () => {
                this.deleteComment(targetDataSet.comment_id,index);
              }
            },{
              icon:'create',
              text: 'Edit',
              handler: () => {
                  this.editComment(targetDataSet,newUpdateComment);
             }
            },{
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
              }
            }] 
        });
        actionSheet.present();
    }
    
    //Post Comment
    postComment(event){
        if(!this.user_id){
            let obj = {
                title: 'Warning',
                message: 'User must logged in first to countinue',
                buttonText: 'OK'
            };
            this.commonAlert.showConfirm(obj);
            return false;
        }
        
        let comment  = this.commentInput;
        comment = (comment.toString()).trim();
        //Avoid if the comment leanth is less than or equal to 0 (Means blank :) )
        if(comment.length<=0){
            return false;
        }
        
        var dataObj = {"image_id": this.image_id, "comment": comment, "to_user": this.to_userid}
        event.target.innerHTML = "Posting..";
        this.inspo.postCommentService(dataObj).then(data => {
            if(data['status']){
                this.inspoDetailComment.push(data['comment']);
                setTimeout(() => {
                    this.content.scrollToBottom(300);
                });
                this.commentInput = "";
                this.updateCommentCount(data);
               event.target.innerHTML = "Post";
            }else if(!data['status']){
              event.target.innerHTML = "Try Again!";
              event.target.disabled = true;
              setTimeout(function(){
                  event.target.innerHTML = "Post";
                  event.target.disabled = false;
              },1000);
              return false;
            }else{
                event.target.innerHTML = "Post";
                return false;
            }
        });
    }
    
    //Delete Comment
    deleteComment(comment_id,index){
        this.inspo.deleteCommentService(comment_id).then(data => {
            if(data['status']){
                //Remove comment from the list
                // this.removeEl(this.commentListEl);
                // let commentCount = this.getCommentCount();
                let commentCount = (this.inspoDetailComment.length-1);
                this.inspoDetailComment.splice(index,1);
                let obj = {"comment_count":commentCount, "comment_status": data}
                this.updateCommentCount(obj);
            }else if(data['status'] == false){
                let obj = {"title":"Error!","message":"Comment not deleted successfully","buttonText":"OK"};
                this.showBasicAlert(obj);
            }else{
                return false;
            }
        });
    }
    
    
    //Update comment with ajax call
    updateCommentPost(commentData){
        var dataObj = {"comment_id":commentData.comment_id,"comment":commentData.new_comment};
        this.inspo.editCommentService(dataObj).then(data => {
            if(data['status']){
               let cmtListLabel = (this.commentListEl).getElementsByClassName("inspirtion-details-cmt-box")[0];
               cmtListLabel.innerHTML = commentData.new_comment;
            }else if(data['status'] == false){
               let obj = {"title":"Error!","message":"Comment not updated successfully","buttonText":"OK"};
               this.showBasicAlert(obj);
            }else{
               return false;
            }
        });
    }
    //Edit Comment
    editComment(commentData,newComment){
        let prompt = this.alertCtrl.create({
            title: 'Edit Comment',
            inputs: [{
              type: 'text',
              name: 'comment',
              value: newComment,
            }],
            
            buttons: [{
                text: 'Cancel',
                handler: data => {  
                    return true;
                }
            },
            {
                text: 'Update',
                handler: data => {   
                    let comment  = data.comment;
                    comment = (comment.toString()).trim();
                    //Avoid if the comment leanth is less than or equal to 0 (Means blank :) )
                    if(comment.length<=0){
                         return false;
                    }
                    commentData.new_comment = comment;
                    this.updateCommentPost(commentData); 
                }
            }]
        });
        prompt.present();
    }

            //Swipe Image Left Right
        swipeEvent(obj,event,id){
            let dataset = obj;
            let objIndex:number;
            for(var key in dataset){ 
                if(id == dataset[key].id){
                    objIndex = parseInt(key);
                }
            }
            
            switch(event.direction){
                case 2:
                    objIndex = (objIndex+1);
                    break;
                case 4:
                    objIndex = (objIndex-1);
                    break;
            }
            
            if(dataset[objIndex] && dataset[objIndex]!=undefined){
                let obj = dataset[objIndex];
                this.image_id = obj.id;
                this.inspoDetail();
                // load related comment
                console.log(this.image_id)
                this.inspoDetailComment = [];
                this.inspoDetailComments(this.image_id, 1);
            }
        }
        
        backbutton(){
            this.navCtrl.pop();
        }
        
         profileView(param){
            this.navCtrl.push('ProfilePage', param, {animate:true,animation:'transition',duration:500,direction:'forward'});
        } 
}
    