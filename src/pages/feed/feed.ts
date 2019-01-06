import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
//Get user information form the session
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import * as api from '../../app/config/environment';
import { FeedProvider } from '../../providers/feed/feed';
import { InspodataProvider } from '../../providers/inspodata/inspodata';
// import { InspirationDetailPage } from '../../pages/inspiration-detail/inspiration-detail';
import { plainText } from '../../pipes/plaintext';
import { CreatnewactivityPage } from '../creatnewactivity/creatnewactivity';
import { ImageLoader } from 'ionic-image-loader';
@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
  @ViewChild('signupSlider') signupSlider: any;
  @ViewChild('signupSlider1') signupSlider1: any;
	@ViewChild(Content) content: Content;
	public baseurl: string = api.baseUrl;
	public page: number = 1;
	public isloader: number = 1;
    public currentSlide = 0;
	public feedData: any;
	public isScrollToTop: boolean = false; 
	public hasMoreData: boolean = true;
	public user_id: number;
	constructor(public imageLoader: ImageLoader, public events: Events, public inspo: InspodataProvider, public checktoken: UserAuthenticationProvider, public changeDetectorRef: ChangeDetectorRef, public feedservice: FeedProvider, public loading: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
        if(this.checktoken.userAuthData){
            this.user_id = (JSON.parse(this.checktoken.userAuthData)).id;
        }
        this.getfeeds(this.page, this.isloader, this.user_id);
        // this.events.subscribe('feed', () => {
        //     this.getfeeds(this.page, this.isloader, this.user_id);
        // });
    }
	ionViewDidLoad() {}
    addPhoto(){
        this.navCtrl.push(CreatnewactivityPage, {back: true});
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
    plainText(val){
        var v = new plainText();
        return v.transform(val)
    }
    //Scroll to top Function
    scroll(){
    	console.log(this.content);
    	this.content.scrollToTop();
        this.changeDetectorRef.detectChanges();
    }
    //slider
    slideChanged(){
        this.currentSlide = this.signupSlider.getActiveIndex();
    }
    thumbclick(index){
        this.signupSlider1.slideTo(index);
    }
    doRefresh(refresher) {
        this.imageLoader.clearCache();
        this.page = 1;
        this.isloader = 1;
        this.getfeeds(this.page, this.isloader, this.user_id);
        setTimeout(() => {
            refresher.complete();
        }, 1000);
    } 
    doInfinite(infiniteScrollEvent){
    	this.page += 1;
        this.isloader = 0;
        this.feedservice.getFeeds(this.page, this.user_id).then((data: any) => {
        	if(this.page <= data.total_pages){
        		for(let i = 0; i < data.feeds.length; i++){
	        		this.feedData.push(data.feeds[i]);
	        	}
                console.log(this.feedData);
	        	infiniteScrollEvent.complete();
        	}else{
                this.hasMoreData = false;
                return false;
            }
        });
    }
  	getfeeds(page, loader, user_id){
  		if(loader){
  			let loader = this.loading.create({content: 'Loading..'});
  			return loader.present().then(() => {
  				this.feedservice.getFeeds(page, user_id).then((data: any) => {
  					console.log(data);
  					this.feedData = data.feeds;
  					loader.dismiss();
  				});
  			});
  		}
  	}
  	postLike(feed: any, index){
      console.log(feed);
  		let likeObj = {"user_id": this.user_id, "image_id": feed.image_id, "to_user": feed.user_id};
  		this.inspo.postLike(likeObj).then((data) => {
  			let flag:boolean = false;
  			if(data['status']){
                flag = true;
            }else if(data['status'] == false){
                flag = false;
            }
            this.feedData[index]['like_status'] = flag;
            this.feedData[index]['likes'] = data['like_count'];
  		});
  	}
  	//Go to Inspirational detail page with perticular id.
    inspirationDetail(imageId: number, toUserId: number){
       var info: any = {
         imageId: imageId,
         toUserId: toUserId
       }
       this.navCtrl.push('InspirationDetailPage', info, {animate:true,animation:'transition',duration:500,direction:'forward'});
    }
    adviceDetail(advice_id: number){
        if(localStorage.getItem('adviceId')){
            localStorage.removeItem('adviceId');
        }
        this.navCtrl.push('AdvicedetailPage', {adviceId: advice_id}, {animate:true,animation:'transition',duration:500,direction:'forward'});
    }
    writePost(){
        this.navCtrl.push('WritepostPage');
    }
    profileVier(param){
        console.log(param);
        this.navCtrl.push('ProfilePage', param, {animate:true,animation:'transition',duration:500,direction:'forward'});
    }
}
