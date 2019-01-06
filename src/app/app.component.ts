// native and Libs
import { Component, ViewChild, } from '@angular/core';
import { Platform, MenuController, Nav, AlertController, NavController, App } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
//Pages
// import { HomePage } from '../pages/home/home';
// import { LoginPage } from '../pages/login/login';
// import { RegisterPage } from '../pages/register/register';

// import { ProfilePage } from '../pages/profile/profile';
// import { LogoutPage } from '../pages/logout/logout';
// import { SettingsPage } from '../pages/settings/settings';
import { DashboardPage } from '../pages/dashboard/dashboard';
// import { ProjectListingPage } from '../pages/project-listing/project-listing';
// import { MessagePage } from '../pages/message/message';
// import { NewsPage } from '../pages/news/news';
//Native 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserAuthenticationProvider } from '../providers/user-authentication/user-authentication';
import { Http, Headers,RequestOptions } from '@angular/http';
import * as api from '../app/config/environment';
import { NotificationProvider } from '../providers/notification/notification';
import { MessageServiceProvider } from '../providers/message-service/message-service'
import { Subscription } from 'rxjs/Subscription';
import { Badge } from '@ionic-native/badge';
import { ImageLoader, ImageLoaderConfig } from 'ionic-image-loader';

@Component({
  templateUrl: 'app.html',
  providers:[UserAuthenticationProvider]
})
export class MyApp {
    @ViewChild(Nav) nav: any;
    @ViewChild(NavController) navCtrl: NavController;
    public rootPage:any;
    public notificationCount: number;
    public subscription: Subscription = new Subscription();
    public msgCount: number;
    public messageSubscription: Subscription = new Subscription();
    pages: Array<{title: string, component: any, tabComponent?: any, index?: number, icon:string, ios:string}>;
    constructor(public imageLoaderConfig: ImageLoaderConfig, public imageLoader: ImageLoader, public platform: Platform, public menu: MenuController, public statusBar: StatusBar, public splashScreen: SplashScreen, public checktoken:UserAuthenticationProvider, public http: Http, public alertCtrl: AlertController, private fcm: FCM, public msgService: MessageServiceProvider, public notification: NotificationProvider, public badge: Badge) {
        this.subscription = this.notification.NotificationupdateCalled.subscribe((data: any)=>{
            if(data){
                this.notificationCount = 0;
            }
        });
        this.messageSubscription = this.msgService.messageupdateCalled.subscribe((data: any)=>{
            if(data){
                this.msgCount = 0;
            }
        });
        checktoken.loadUserCredentials();
        if(checktoken.authToken){
            this.rootPage = DashboardPage;
        }else{
            this.rootPage = 'HomePage'; 
        }
        this.initializeApp();
        this.getNotificationCount();
        // set our app's pages
        this.pages = [
          // { title: 'Inspiration', component: 'DashboardPage', tabComponent: DashboardPage, index: 3, icon: "images", ios: "ios-image-outline"},
          { title: 'My Profile', component: DashboardPage, tabComponent: 'ProfilePage', index: 5, icon: "contact", ios: "ios-contact"},
          { title: 'Messages', component: DashboardPage, tabComponent: 'MessagePage', index: 9, icon: "paper", ios: "ios-paper-outline"},
          { title: 'Notifications', component: DashboardPage, tabComponent: 'NewsPage', index: 8, icon: "notifications", ios: "ios-notifications-outline"},
          { title: 'Projects', component: DashboardPage, tabComponent: 'ProjectListingPage', index: 4, icon: "briefcase", ios: "ios-briefcase-outline"},
          { title: 'Products', component: DashboardPage, tabComponent: 'ProductPage', index: 10, icon: "albums", ios: "ios-albums-outline"},
          { title: 'Settings', component: DashboardPage, tabComponent: 'SettingsPage', index: 7, icon: "settings", ios: "ios-settings-outline"}, 
          { title: 'Sign out', component: 'LogoutPage', icon: "log-out", ios: "ios-log-out-outline"} 
        ];
    }
    initializeApp() {
        this.platform.ready().then(() => {
            this.initfcmnotification();
            this.imageLoader.clearCache();
            this.imageLoaderConfig.setImageReturnType('base64');
            this.statusBar.show();
            this.statusBar.overlaysWebView(true);
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
    openPage(page) {
        this.menu.close();
        let params = {tabIndex: null, count: null};
        if (page.index) {
            params = { tabIndex: page.index, count: null };
        }
        if(this.nav.getActive().length && page.index != undefined){
            this.nav.getActive()[0].select(page.index);
        }else {
            // Tabs are not active, so reset the root page. In this case: moving to or from SpecialPage
            // this.nav.setRoot(page.component, params);
            switch(page.title){
                case "News":
                    params.count = this.notificationCount;
                break;
                case "Message":
                    params.count = this.msgCount
                    
                break;
                default:
                break;
            }
            this.nav.setRoot(page.component, params);
        }
    }
    initfcmnotification(){
        this.fcm.subscribeToTopic('all');
        this.fcm.onTokenRefresh().subscribe(token=>{ console.log(token); });
        setTimeout(()=>{
            this.fcm.getToken().then(token=>{
                var fcmtoken = token;
                if(fcmtoken == null){
                    this.initfcmnotification();
                }else{
                    localStorage.setItem('fcmToken', fcmtoken);
                    console.log(localStorage.getItem('fcmToken'));
                }
            });
        }, 1000);
        this.fcm.onNotification().subscribe((data: any)=>{
            var page: any;
            if(data.wasTapped){
                this.routeDecider(data, true);
                this.badge.clear();
                this.fcm.unsubscribeFromTopic('all');
                console.log("Received in background");
            } else {
                if(data.notification_type == 9){
                    this.msgCount =  data.specific_badge_count;
                }else{
                    this.notificationCount = data.specific_badge_count;
                }
                this.notificationAlert(data);
                console.log("Received in foreground");
            } 
        });
    }
    getNotificationCount(){
        this.notification.notificationCount().then((data: any)=>{
            this.notificationCount = data.count;
            this.msgCount = data.msg_count;
        })
    }
    notificationAlert(data: any){
        let alert = this.alertCtrl.create({
            title: data.title,
            message: data.body,
            buttons: [
                { text: 'Cancel', role: 'cancel', handler: () => {} },
                { text: 'View', handler: () => {
                        this.routeDecider(data, false);
                    }
                }
            ]
        });
        alert.present();
    }
    routeDecider(data: any, setTimeOut: boolean){
        console.log('routeDecider');
        var page: any;
        if(data.notification_type == 9){
            this.msgCount =  data.badge;
            page = { title: 'Message', component: DashboardPage, tabComponent: 'MessagePage', index: 9, icon: "paper", ios: "ios-paper-outline"};
            if(setTimeOut == true){
                setTimeout(()=>{
                    this.openPage(page);
                },1000);
            }else{
                this.openPage(page);
            }     
        }else{
            this.notificationCount = data.badge;
            page = { title: 'News', component: DashboardPage, tabComponent: 'NewsPage', index: 8, icon: "notifications", ios: "ios-notifications-outline"};
            if(setTimeOut == true){
                setTimeout(()=>{
                    this.openPage(page);
                },1000);
            }else{
                this.openPage(page);
            }
        }
    }
}