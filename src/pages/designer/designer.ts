import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , Slides, App} from 'ionic-angular';
import {ChangeDetectorRef} from '@angular/core';
//Pages
import { CheckoutPage } from '../checkout/checkout';
// import { ProfilePage } from '../profile/profile';
import { Content } from 'ionic-angular';
//Loader
import { LoadingController } from 'ionic-angular';

//Get user information form the session
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';


//Providers and services
import { DesignerProvider } from '../../providers/designer/designer';

import { appDirectives } from '../../app/appdirectives/appdirectives';

//Enviorment variable
import * as api from '../../app/config/environment';

// @IonicPage()
@Component({
  selector: 'page-designer',
  templateUrl: 'designer.html',
  providers:[CheckoutPage],
})
export class DesignerPage {
    //@ViewChild(Slides) designerSlider: Slides;
    @ViewChild(Slides) slides: Slides;
    @ViewChild(Content) content: Content;
    public designerUsersData=[];
    public total_page:number;
    public page:number=1;
    public id:any = "";
    public isloader:number=1;
    public filterStyles:any;
    public sorting:any = "trending";
    public designerListData:any;
    public designerPageTitle:any;
    public instantTitle:any;
    public takeATour:any;
    public checkout:any;
    public roomType:any;
    public hasMoreData:boolean = true;
    public style:any;
    public userAuthToken:any;
    public userAuthData:any;
    public user_id:any;
    public isScrollToTop:boolean;
    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public designAuth: DesignerProvider,
                public loading: LoadingController,
                public checktoken:UserAuthenticationProvider,
                public app:App,
                public commonAlert:appDirectives,
                public changeDetectorRef: ChangeDetectorRef
                ){
                    this.userAuthToken = checktoken.authToken;
                    this.userAuthData = JSON.parse(checktoken.userAuthData);
                    if(this.userAuthToken){
                        this.user_id = this.userAuthData.id;
                    }
                    this.designerPageTitle = api.designerTitle;
                    this.instantTitle = api.designerInstantTitle;
                    this.takeATour = api.takeTour;
                    this.checkout = api.checkout;
                    this.roomType = api.roomType;
                    this.style = api.stylePrefrences;
                }
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad DesignerPage');
        this.designerlist();    
    }
    
    //DesignerList Api Function to get list
    designerlist(){
        if(this.isloader){    
            let loader = this.loading.create({content: 'Loading..'});
            return loader.present().then(() => {    
                this.designAuth.getDesignerPageData(this.page,this.id,this.sorting).then(data=>{
                if(!data){
                    loader.dismiss(); 
                    return false;
                }
                let designerUserlistingData = data;
                this.total_page = designerUserlistingData["total_pages"];
                this.hasMoreData = true;
                    for(var key in designerUserlistingData["users"]){
                        designerUserlistingData["users"][key].avatar = api. baseUrl+designerUserlistingData["users"][key].avatar;
                        for(var key1 in designerUserlistingData["users"][key].featured_images){
                           designerUserlistingData["users"][key].featured_images[key1] = api.baseUrl+designerUserlistingData["users"][key].featured_images[key1];
                        };
                    }
                    for(let usersData of designerUserlistingData["users"]) {
                        this.designerUsersData.push(usersData);
                    }
                    this.designerListData = this.designerUsersData;
                    
                    this.filterStyles = designerUserlistingData["styles"]  
                    loader.dismiss();             
                });
            });
        }else{
            return this.designAuth.getDesignerPageData(this.page,this.id,this.sorting).then(data=>{
                let designerUserlistingData = data;
                this.hasMoreData = true;
                this.total_page = designerUserlistingData["total_pages"];
                    for(var key in designerUserlistingData["users"]){
                        designerUserlistingData["users"][key].avatar = api. baseUrl+designerUserlistingData["users"][key].avatar;
                        for(var key1 in designerUserlistingData["users"][key].featured_images){
                           designerUserlistingData["users"][key].featured_images[key1] = api. baseUrl +designerUserlistingData["users"][key].featured_images[key1];
                        };
                }
                for(let usersData of designerUserlistingData["users"]) {
                    this.designerUsersData.push(usersData);
                }
                this.designerListData = this.designerUsersData;
                this.filterStyles = designerUserlistingData["styles"]                              
            });
        }
    }
    
    //Instant Book FUnctionLity
    instantBook(param){
        console.log(param);
        if(!this.user_id){
            let obj = {
                title: 'Heads up!',
                message: 'You must be signed in to do that.',
                buttonText: 'OK'
            };
            this.commonAlert.showConfirm(obj);
            return false;
        }
        var designerPlanInfo = localStorage.getItem(param.username + "_" + param.id);
        var plan = JSON.parse(designerPlanInfo);
        if(!designerPlanInfo || designerPlanInfo == null)
            this.navCtrl.push('PlanPage', param, {animate:true,animation:'transition',duration:500,direction:'forward'})
        else
            this.navCtrl.push(CheckoutPage,{plan: plan, hiredDesigner: param},{animate:true,animation:'transition',duration:500,direction:'forward'})
    }
    
    //Infinite scroll load more page
    doInfinite(infiniteScrollEvent){
        if(this.page<this.designAuth.total_page){
        this.page+=1;
        }else{
            this.hasMoreData = false;
            return false;
        }
        this.isloader = 0;
        this.designerlist().then(()=>{
            if(this.page != this.designAuth.total_page){
                infiniteScrollEvent.complete();
            }else{
                this.hasMoreData = false;
                return false;
            }
        });
    }
    
    //Sort By filter Function
    sortByFilter(styleId) {
        let env = this;
        env.page = 1;
        env.isloader = 1;
        env.id = styleId;
        env.designerUsersData = [];
        env.designerlist();
    }
    
    //Sort By StYle Function (Trending or Rating)
    sortByStyle(style){
        let env = this;
        env.sorting = style;
        env.page = 1;
        this.isloader = 1;
        env.designerUsersData = [];
        env.designerlist();
    }
    
    
    /**
    *@description: Scroll to top function
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    
    scrollToTop() {
       this.content.scrollToTop();
       this.changeDetectorRef.detectChanges();
    }
    
    /**
    *@description: Scroll to top icon And its functionality
    *@return: 
    *@param: event
    *@createdBy: Raj M
    *@modified:  
    */
    
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
    
    /**
    *@description: set function to linking with profile page
    *@return: 
    *@param: event
    *@createdBy: Raj M
    *@modified:  
    */
    
    profileView(param){
        this.navCtrl.push('ProfilePage', param, {animate:true,animation:'transition',duration:500,direction:'forward'});
    }
}
