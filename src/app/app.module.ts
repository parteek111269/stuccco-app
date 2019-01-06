//Native Plugin
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ImagePicker } from '@ionic-native/image-picker';
import { IonicImageLoader } from 'ionic-image-loader';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Badge } from '@ionic-native/badge';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { IonicImageViewerModule } from 'ionic-img-viewer';
// import { BackgroundMode } from '@ionic-native/background-mode';
import { FCM } from '@ionic-native/fcm';
// import { NativeStorage } from '@ionic-native/native-storage';
// ------------------------------------------------------------
//Pages
import { DashboardPage } from '../pages/dashboard/dashboard';
import { DesignerPage } from '../pages/designer/designer';
// import { FeedPage } from '../pages/feed/feed';
import { CheckoutPage } from '../pages/checkout/checkout';
import { SuccessPage } from '../pages/success/success';
import { ProjectlistingdetailPage } from '../pages/projectlistingdetail/projectlistingdetail';
import { CreatnewactivityPage } from '../pages/creatnewactivity/creatnewactivity';
import { CreationdetailsPage } from '../pages/creationdetails/creationdetails';
import { CreationeditimagePage } from '../pages/creationeditimage/creationeditimage';
import { SettingProfilePage } from '../pages/setting-profile/setting-profile';
// lazy loaded pages
// import { TermAndConditionsPage } from '../pages/term-and-conditions/term-and-conditions';
// import { LoginPage } from '../pages/login/login';
// import { RegisterPage } from '../pages/register/register';
// import { ProfilePage } from '../pages/profile/profile';
// import { LogoutPage } from '../pages/logout/logout';
// import { NewsPage } from '../pages/news/news';
// import { InspirationPage } from '../pages/inspiration/inspiration';
// import { MessagePage } from '../pages/message/message';
// import { ReviewstylePage } from '../pages/reviewstyle/reviewstyle';
// import { InspirationDetailPage } from '../pages/inspiration-detail/inspiration-detail';
// import { ProfileAboutPage } from '../pages/profile-about/profile-about';
// import { ProjectListingPage } from '../pages/project-listing/project-listing';
// import { ProfileActivityPage } from '../pages/profile-activity/profile-activity';
// import { SettingsPage } from '../pages/settings/settings';
// import { SettingProjectBillingPage } from '../pages/setting-project-billing/setting-project-billing'
// import { SettingAffiliatePage } from '../pages/setting-affiliate/setting-affiliate';
// import { SettingSubscriptionPage } from '../pages/setting-subscription/setting-subscription';
// import { ChattingPage } from '../pages/chatting/chatting';
// import { HomePage } from '../pages/home/home';
// --------------------------------------------------------------------

// directives
import { appDirectives } from './appdirectives/appdirectives';
// ---------------------------------------------------------

// pipes
import { spaceToUnderScore } from '../pipes/filterdata';
// import { CurrencyPipe } from '../pipes/currency/currency';
import { addSpaceAfterComma } from '../pipes/addspaceaftrecomma';
import { plainText } from '../pipes/plaintext';
// ------------------------------------------------------------------------

// providers
import { UserAuthenticationProvider } from '../providers/user-authentication/user-authentication';
import { InspodataProvider } from '../providers/inspodata/inspodata';
import { DesignerProvider } from '../providers/designer/designer';
import { ProjectProvider } from '../providers/project/project';
import { NotificationProvider } from '../providers/notification/notification';
import { ProfileSectionProvider } from '../providers/profile-section/profile-section';
import { ProfileSettingsProvider } from '../providers/profile-settings/profile-settings';
import { MessageServiceProvider } from '../providers/message-service/message-service';
// import { PlansProvider } from '../providers/plans/plans';
import { ViewprofileProvider } from '../providers/viewprofile/viewprofile';
// import { MarketProvider } from '../providers/market/market';
import { FeedProvider } from '../providers/feed/feed';
// import { ProductProvider } from '../providers/product/product';
import { AdviceProvider } from '../providers/advice/advice';

// Components
// import { FollowingComponent } from '../components/following/following';
// import { FollowersComponent } from '../components/followers/followers';
// import { LikesComponent } from '../components/likes/likes';
// import { CollectionsComponent } from '../components/collections/collections';
// import { CreationsComponent } from '../components/creations/creations';
// import { ActivityComponent } from '../components/activity/activity';
// import { AboutComponent } from '../components/about/about';
// import { PlansComponent } from '../components/plans/plans';
// import { Ionic2RatingModule } from 'ionic2-rating';

// import { BuisnessoverviewComponent } from '../components/buisnessoverview/buisnessoverview';
// import { TeamComponent } from '../components/team/team';
// import { ChooseusComponent } from '../components/chooseus/chooseus';
// import { ReviesAboutComponent } from '../components/revies-about/revies-about';
// import { AboutdetailComponent } from '../components/aboutdetail/aboutdetail';
// import { MarketComponent } from '../components/market/market';
// import { NocontentComponent } from '../components/nocontent/nocontent';


@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    DesignerPage,
    // FeedPage,
    CheckoutPage,
    SuccessPage,
    ProjectlistingdetailPage,
    spaceToUnderScore,
    // CurrencyPipe,
    addSpaceAfterComma,
    plainText,
    CreatnewactivityPage,
    CreationdetailsPage,
    CreationeditimagePage,
    SettingProfilePage,
    // LoginPage,
    // RegisterPage,
    // HomePage,
    // ProfilePage,
    // LogoutPage,
    // NewsPage,
    // TermAndConditionsPage,
    // InspirationPage,
    // MessagePage,
    // InspirationDetailPage,   
    // ProjectListingPage,    
    // FollowingComponent,
    // ProfileActivityPage,
    // ProfileAboutPage,
    // FollowersComponent,
    // LikesComponent,
    // CollectionsComponent,
    // CreationsComponent,
    // ActivityComponent,
    // AboutComponent,
    // PlansComponent,
    // AboutdetailComponent,
    // MarketComponent,
    // NocontentComponent,
    // ReviewstylePage,
    // BuisnessoverviewComponent,
    // TeamComponent,
    // ChooseusComponent,
    // ReviesAboutComponent,
    // SettingsPage,
    // SettingProjectBillingPage,
    // SettingAffiliatePage,
    // SettingSubscriptionPage,
    // ChattingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicImageLoader.forRoot(),
    IonicImageViewerModule,
    // Ionic2RatingModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    DesignerPage,
    // FeedPage,
    CheckoutPage,
    ProjectlistingdetailPage,
    CreatnewactivityPage,
    CreationdetailsPage,
    CreationeditimagePage,
    SettingProfilePage,
    // LoginPage,
    // RegisterPage,
    // HomePage,
    // ProfilePage,
    // LogoutPage,    
    // NewsPage,
    // TermAndConditionsPage,
    // InspirationPage,
    // MessagePage,
    // InspirationDetailPage,    
    // ProjectListingPage,    
    // ProfileActivityPage,  
    // ReviewstylePage,
    // ProfileAboutPage,    
    // SettingsPage,    
    // SettingProjectBillingPage,
    // SettingAffiliatePage,
    // SettingSubscriptionPage,
    // ChattingPage,
    // PlansComponent,
    // AboutdetailComponent,
    // MarketComponent,
    // NocontentComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserAuthenticationProvider,
    InspodataProvider,
    DesignerProvider, 
    appDirectives,
    File,
    Transfer,
    Camera,
    FilePath,
    // BackgroundMode,
    ProjectProvider,
    NotificationProvider,
    ProfileSectionProvider,
    ImagePicker,
    ProfileSettingsProvider,
    InAppBrowser,
    MessageServiceProvider,
    ViewprofileProvider,
    AdviceProvider,
    FileTransfer, 
    FileTransferObject,
    FCM,
    Badge,
    FeedProvider,
    // ProductProvider,
    // RegisterPage,
    // PlansProvider,
    // MarketProvider,
    // NativeStorage,
  ]
})
export class AppModule {}
