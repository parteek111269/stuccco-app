import { Component,ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
//PAGES
// import { InspirationDetailPage } from '../inspiration-detail/inspiration-detail';
// import { ProfilePage } from '../profile/profile';
//Loader
import { LoadingController } from 'ionic-angular';

//Serives and models
import { InspodataProvider } from '../../providers/inspodata/inspodata';
import { ActionSheetController } from 'ionic-angular';

//Get user information form the session
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';

//scroll to top
import { Content } from 'ionic-angular';

import { appDirectives } from '../../app/appdirectives/appdirectives';
import * as api from '../../app/config/environment';


@IonicPage()
@Component({
  selector: 'page-inspiration',
  templateUrl: 'inspiration.html',
  providers:[InspodataProvider],
})
export class InspirationPage {
    @ViewChild(Content) content: Content;
    public users;
    public home: boolean;
    public view: string;
    public user_id: number;
    public page: number = 1;
    public pageTitle: string;
    public actionSheetContent = [];
    public isloader: number = 1 ;
    public hasMoreData: boolean = true;
    public userAuthData: any;
    public userAuthToken: any;
    public isScrollToTop: boolean = false;  
    public contentShow: boolean = false;
    public inspoContent: any;
    constructor(
        public navCtrl: NavController,
        public actionSheetCtrl: ActionSheetController,
        public alertCtrl: AlertController,
        public inspo: InspodataProvider,
        public navParams: NavParams,
        public loading: LoadingController,
        public checktoken:UserAuthenticationProvider,
        public changeDetectorRef: ChangeDetectorRef,
        public commonAlert:appDirectives
        ){
        this.userAuthToken = checktoken.authToken;
        console.log(this.userAuthToken);
        this.userAuthData = JSON.parse(checktoken.userAuthData);
        console.log(this.userAuthData);
        if(this.userAuthToken){
            this.user_id = this.userAuthData.id;
            this.view = "recent";
            this.home = false;
        }else{
            this.user_id = null;
            this.view = "recent";
        }
        console.log("user_id", this.user_id);
        this.loadFirstInspoData(this.user_id,this.page,this.view,this.isloader);
        //this.isScrollToTop = true;   
    }
    
    //Set menu for the action sheet - (Popular, Home, Recent)
    setViewActionSheetData(){
        let otherActionSheet = [{
            icon:'timer',
            text: 'Recent',
            handler: () => {
                this.view = "recent";
                this.page=1;
                this.isloader = 1;
                this.hasMoreData = true;
                this.inspo.inspoData=[];
                this.loadFirstInspoData(this.user_id,this.page,this.view,this.isloader).then(()=>{
                }); 
           }
        },{
            icon:'star',
            text: 'Popular',
            handler: () => {
                this.view = "popular";
                this.page=1;
                this.isloader = 1;
                this.hasMoreData = true;
                this.inspo.inspoData=[];
                this.loadFirstInspoData(this.user_id,this.page,this.view,this.isloader).then(()=>{
                }); 
            }
        },{
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            }
        }];
        if(this.user_id){
            let homeActionSheet = {
                icon:'home',
                text:'Home',
                handler: () => {
                    this.view = "home";
                    this.page=1;
                    this.isloader = 1;
                    this.hasMoreData = true;
                    this.home = true;
                    this.inspo.inspoData=[];
                    this.loadFirstInspoData(this.user_id,this.page,this.view,this.isloader).then(()=>{
                    }); 
                }
            };
            otherActionSheet.push(homeActionSheet);
        }
        this.actionSheetContent.push(otherActionSheet);
    }
    
    ionViewDidLoad() {
        this.setViewActionSheetData();
        console.log('ionViewDidLoad -> InspirationPage');
    }
    
    //Load inspiration page data for non-logged user or recent page
    loadFirstInspoData(id,page,view,loader){
        console.log('loadFirstInspoData');
        if(loader){
            let loader = this.loading.create({content: 'Loading..'});
            return loader.present().then(() => { 
                this.inspo.load(page,view,'1').then((data: any) => {
                    console.log(data);
                    if(!data){
                        if(this.pageTitle == undefined){
                           this.pageTitle = 'home';
                           this.contentShow = true;
                           this.inspoContent = api.inspoContentEndUrl;
                           loader.dismiss();
                           return false;
                        }
                        this.view = this.pageTitle;
                        this.loadFirstInspoData(this.user_id,this.page,this.view,this.isloader);
                        loader.dismiss();
                        return false;
                    }
                    this.users = data;
                    this.pageTitle = this.view;
                    loader.dismiss();
                });
            })
        }else{
             return this.inspo.load(page,view,'0').then(data => {
                this.users = data;
                this.pageTitle = this.view;
            });
        }
    }

    // load more data When user scroll down  
    doInfinite(infiniteScrollEvent){
        this.page+=1;
        this.isloader = 0;
        if(this.user_id && this.view=="home"){
                this.loadFirstInspoData(this.user_id,this.page,this.view,this.isloader).then(()=>{
                if(this.page != this.inspo.total_page){
                    infiniteScrollEvent.complete();
                }else{
                    this.hasMoreData = false;
                    return false;
                }
            });
        }else if(this.view=="recent"){
            this.loadFirstInspoData(this.user_id,this.page,this.view,this.isloader).then(()=>{  
                if(this.page != this.inspo.total_page){
                    infiniteScrollEvent.complete();
                }else{ 
                    this.hasMoreData = false;
                    return false;
                }
            });
        }else{
            this.loadFirstInspoData(this.user_id,this.page,this.view,this.isloader).then(()=>{
                if(this.page != this.inspo.total_page){
                    infiniteScrollEvent.complete();
                }else{
                    this.hasMoreData = false; 
                    return false;
                }
            })
        }
    }
    
    //Go to Inspirational detail page with perticular id.
    inspirationDetail(inspoDetail: any){
        console.log(inspoDetail);
        var info: any = {
            imageId: inspoDetail.id,
            toUserId: inspoDetail.user_id
        }
       this.navCtrl.push('InspirationDetailPage', info, {animate:true,animation:'transition',duration:500,direction:'forward'})
    }
    
    //Action sheet for ChangeView - (Popular,Recent, Home)
    actionsheet(){
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select View',
            buttons :  this.actionSheetContent[0]
        });
        actionSheet.present();
    }
    
    //Post Like Controller inititilated
    postLike(post , index){
        if(!this.user_id){
            let obj = {
                title: 'Heads up!',
                message: 'You must be signed in to do that.',
                buttonText: 'OK'
            };
            this.commonAlert.showConfirm(obj);
            return false;
        }
        console.log(index);
        let postObj = {"user_id": this.user_id, "image_id": post.id, 'to_user': post.user_id};
        this.inspo.postLike(postObj).then(data => {
            let flag:boolean = false;
            if(data['status']){
                flag = true;
            }else if(data['status'] == false){
                flag = false;
            }
            this.users[index]['like_status'] = flag;
            this.users[index]['like_count'] = data['like_count'];
        });
    }
    
    /**
    *@description: add refresher to pull down.
    *@return: 
    *@param: 
    *@createdBy: Raj 
    *@modified:  
    */
    doRefresh(refresher) {
        this.page = 1;
        this.isloader = 1;
        this.loadFirstInspoData(this.user_id,this.page,this.view,this.isloader);
        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }    

    //Scroll to top Function
    scroll(){
       console.log(this.content);
       this.content.scrollToTop();
       this.changeDetectorRef.detectChanges();
    }
    
    //Get scroll Position
    scrollHandler(event){
        if(event.scrollTop > 0 && event.directionY =="down"){
            this.isScrollToTop = true;
            this.changeDetectorRef.detectChanges();
        }else if(event.scrollTop == 0 && event.directionY =="up"){
            this.isScrollToTop = false;
            this.changeDetectorRef.detectChanges();
        }else{
            return false
        }
    }
        
    profileView(param){
        this.navCtrl.push('ProfilePage', param, {animate:true,animation:'transition',duration:500,direction:'forward'});
    }    
}