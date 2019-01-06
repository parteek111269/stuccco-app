import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectlistingdetailPage } from '../projectlistingdetail/projectlistingdetail';
// import { ProfilePage } from '../profile/profile';
// import { InspirationDetailPage } from '../inspiration-detail/inspiration-detail';
//Loader
import { LoadingController } from 'ionic-angular';
//Providers and services
import { NotificationProvider } from '../../providers/notification/notification';

//Get user information form the session
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';

//Enviorment variable
import * as api from '../../app/config/environment';
import { Badge } from '@ionic-native/badge';
@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
    public userAuthToken: any;
    public userAuthData: any;
    public user_id: any;
    public total_page: number;
    public page: number = 1;
    public notifyData = [];
    public isloader: number = 1;
    public hasMoreData: boolean = true;
    public notifications: any;
    public pagename: any;
    public baseUrl: any;
    public userprofile: any;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public loading: LoadingController,
                public notify:NotificationProvider,
                public checktoken:UserAuthenticationProvider, public badge: Badge
              ) {
                console.log(navParams.data);
                this.baseUrl = api.baseUrl;
                this.userAuthToken = checktoken.authToken;
                this.userAuthData = JSON.parse(checktoken.userAuthData);
                this.badge.decrease(navParams.data);
                // this.badge.clear();
                if(this.userAuthToken){
                    this.user_id = this.userAuthData.id;
                }
        }
  
    /**
    *@description: Set function Show the project Detail
    *@return: 
    *@param: project Id
    *@createdBy: Raj M
    *@modified:  
  */
  userProfile(param){
    this.navCtrl.push('ProfilePage', param, {animate:true,animation:'transition',duration:500,direction:'forward'});
  }
  
    /**
    *@description: Set function to show the user Profile
    *@return: 
    *@param: project Id
    *@createdBy: Raj M
    *@modified:  
  */
    notification(notificationType: string, id: any, username: string, touserid: number){
        let param = {'username':username};
        switch(notificationType){
            case "like":
                this.userprofile = "";
                this.pagename = 'InspirationDetailPage';
                var obj: any = {'imageId': id, 'toUserId': touserid};
                // localStorage.setItem('InspirationDetailPageInfo', obj);
                this.navCtrl.push(this.pagename, obj, {animate:true,animation:'transition',duration:500,direction:'forward'});
                break; 
            case "comment":
                this.userprofile = "";
                this.pagename = 'InspirationDetailPage';
                var obj: any = {'imageId': id, 'toUserId': touserid};
                // localStorage.setItem('InspirationDetailPage', obj);
                this.navCtrl.push(this.pagename, {'imageId': id, 'toUserId': touserid}, {animate:true,animation:'transition',duration:500,direction:'forward'});
                break; 
            case "project":
                this.userprofile ="";
                this.pagename = ProjectlistingdetailPage;
                this.navCtrl.push(this.pagename, id, {animate:true,animation:'transition',duration:500,direction:'forward'});
                break;    
            case "project_complete":
                this.userprofile ="";
                this.pagename = ProjectlistingdetailPage;
                this.navCtrl.push(this.pagename, id, {animate:true,animation:'transition',duration:500,direction:'forward'});
                break;    
            case "follow":
                 this.pagename = "";
                 this.userprofile = 'ProfilePage';
                 this.navCtrl.push(this.userprofile, param, {animate:true,animation:'transition',duration:500,direction:'forward'});
                break;  
            case "review":
                this.userprofile = 'ProfilePage';
                this.pagename = "";
                this.navCtrl.push(this.userprofile, param, {animate:true,animation:'transition',duration:500,direction:'forward'});
                break;
            case "design_template":
                this.userprofile = '';
                this.pagename = "ProductdetailPage";
                this.navCtrl.push(this.pagename, {tempid: id}, {animate:true,animation:'transition',duration:500,direction:'forward'});
                break;
            case "advice_reply":
                this.userprofile = '';
                this.pagename = "AdvicedetailPage";
                this.navCtrl.push(this.pagename, {adviceId: id}, {animate:true,animation:'transition',duration:500,direction:'forward'});
                localStorage.setItem('adviceId', id);
                break;
            default:
                this.pagename = "";
                this.userprofile = "";
                console.log("no case in list");
                break;
        }  
    }
  
    /**
    *@description: Set function to show get in app notification data
    *@return: 
    *@param: project Id
    *@createdBy: Raj M
    *@modified:  
    */
    notificationService(){
        if(this.isloader){
            let loader = this.loading.create({content: 'Loading..'});
            return loader.present().then(() => { 
                this.notify.notificationApi(this.page).then(notificationData =>{
                    //check if api failed
                    if(!notificationData){
                        loader.dismiss();  
                        return false;
                    }
                    this.total_page = notificationData["total_pages"];
                    this.hasMoreData = true;
                    
                    for(let notifications of notificationData['notofications']) {
                        this.notifyData.push(notifications);
                    }
                    this.notifications = this.notifyData;
                    loader.dismiss();  
                });
            })
        }else{
            return this.notify.notificationApi(this.page).then(notificationData =>{
                this.total_page = notificationData["total_pages"];
                this.hasMoreData = true;
                for(let notifications of notificationData['notofications']) {
                    this.notifyData.push(notifications);
                }
                this.notifications = this.notifyData 
            });
        }
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
            return this.notify.notificationApi(this.page).then(notificationData =>{
                this.total_page = notificationData["total_pages"];
                this.hasMoreData = true;
                this.notifyData  = [];
                for(let notifications of notificationData['notofications']) {
                    this.notifyData.push(notifications);
                }
                this.notifications = this.notifyData ;
                setTimeout(() => {
                    refresher.complete();
                }, 1000);
            });
        
    }       
    
    //Infinite scroll load more page
    doInfinite(infiniteScrollEvent){
        if(this.page<this.total_page){
        this.page+=1;
        }else{
            this.hasMoreData = false;
            return false;
        }
        this.isloader = 0;
        this.notificationService().then(()=>{
            if(this.page != this.total_page){
                infiniteScrollEvent.complete();
            }else{
                this.hasMoreData = false;
                return false;
            }
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad NewsPage');
        this.notificationService();
        this.clearNotifications()
    }
    clearNotifications(){
        this.notify.clearNotification().then((data: any)=>{
            this.notify.updateNotification(data.status);
        })
    }
}
