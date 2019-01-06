import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , Tabs, Platform, AlertController} from 'ionic-angular';

//Page
import { DesignerPage } from '../designer/designer';
// import { NewsPage } from '../news/news';
// import { InspirationPage } from '../inspiration/inspiration';
// import { MessagePage } from '../message/message';
import { ProjectListingPage } from '../project-listing/project-listing';
// import { ProfilePage } from '../profile/profile';
import { CreatnewactivityPage } from '../creatnewactivity/creatnewactivity';
// import { SettingsPage } from '../settings/settings';
// import { MarketComponent } from '../../components/market/market';
// import { FeedPage } from '../feed/feed';
//Env Variable
import * as tabtitle from '../../app/config/environment';
import { NotificationProvider } from '../../providers/notification/notification';


//Serives and models
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import { MessageServiceProvider } from '../../providers/message-service/message-service';


// @IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers:[CreatnewactivityPage],
})
export class DashboardPage {
    public userAuthData:any;
    public iconInspo:any;
    public iconDesigner:any;
    public iconNews:any;
    public iconMarket: any;
    public iconMessage:any;
    tab3Root: any = DesignerPage;
    tab2Root: any = 'MarketPage';
    tab1Root: any = 'InspirationPage';
    tab4Root: any = 'FeedPage';
    tab5Root: any = 'ProjectListingPage';
    tab6Root: any = 'ProfilePage';
    tab7Root: any = CreatnewactivityPage;
    tab8Root: any = 'SettingsPage';
    tab9Root: any = 'NewsPage';
    tab10Root: any = 'MessagePage';
    tab11Root: any = 'ProductPage';
    desginer:any;
    market: any;
    inspo: any;
    message: any;
    userToken: any;
    public mySelectedIndex:number;
    public unReadMsgCount:number;
    public notificationCount: number = 9;
    @ViewChild('dashboardTabs') tabRef: Tabs;
    constructor( 
        public navCtrl: NavController, 
        public navParams: NavParams,
        public checktoken: UserAuthenticationProvider,
        public create : CreatnewactivityPage,
        public messageService:MessageServiceProvider,
        public platform: Platform, public alertCtrl: AlertController,
        public notify: NotificationProvider,
        ){
            if (this.platform.is('android')) { 
                 this.iconInspo = 'images';
                this.iconDesigner = 'contacts';
                this.iconNews = 'notifications';
                this.iconMarket = 'ios-cart';
                this.iconMessage = 'chatbubbles';
            }else if (this.platform.is('ios')) {
                this.iconInspo = 'ios-images-outline';
                this.iconDesigner = 'ios-people-outline';
                this.iconNews = 'ios-notifications-outline';
                this.iconMessage = 'ios-chatbubbles-outline';
                this.iconMarket = 'ios-cart-outline';
            }
            this.inspo = tabtitle.inspiration;
            this.desginer = tabtitle.designer;
            this.message = tabtitle.message;
            this.market = tabtitle.market;
            this.userToken = checktoken.authToken;
            console.log(navParams);
            this.mySelectedIndex = navParams.data.tabIndex || 0;
            let userAuthToken = checktoken.authToken;
            this.userAuthData = (userAuthToken) ? JSON.parse(checktoken.userAuthData) : "null";
            console.log(this.navParams.data);
            this.notificationCount = this.navParams.data.count;
            console.log(this.notificationCount);
    }
    
    camera(){
       this.tabRef.select(6);
    }
    
    /**
    *@description: function to get Unread Messages from service.
    *@return: 
    *@param: index
    *@createdBy: Raj M
    *@modified:  
    */
    loadUnreadMessage(){
        this.messageService.getUnreadMessageg().then(dataSet=>{
            let localCount = dataSet['count'];
            this.unReadMsgCount = localCount > 0 ?  localCount : '' ;
        })
    }

    ionViewDidLoad() {}

    goToHome(){
        this.tabRef.select(0);
    }
}