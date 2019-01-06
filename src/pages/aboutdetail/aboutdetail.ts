import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ViewprofileProvider } from '../../providers/viewprofile/viewprofile';

@IonicPage()
@Component({
  selector: 'page-aboutdetail',
  templateUrl: 'aboutdetail.html',
})
export class AboutdetailPage {
	text: string;
	public designerId: number;
	public designerName: string;
	public aboutDetail: any = {}; 
	public rating: any = {};
	public reviews: any;
	public limit: number = 1;
	public total_pages: number;
	public loadmoreText: string = 'Load more';
  	public isCollapsed: boolean = false;
  	public showmore: string = 'Show more...';
	constructor(public loading: LoadingController, public navCtrl:NavController, public navParams: NavParams, public viewprofileservice: ViewprofileProvider) {
		this.designerId = this.navParams.data.user_id;
		this.designerName = this.navParams.data.userName;
    	let loader = this.loading.create({content: 'Loading..'});
    	loader.present();
		this.getaboutData(this.designerId);
		this.getrating(this.designerName, this.limit);
    	loader.dismiss();
	}
	ionViewDidLoad() {
    	console.log('ionViewDidLoad AboutdetailPage');
  	}
  	backbutton(){
    	this.navCtrl.pop({animate:true,animation:'transition',duration:500,direction:'back'});
    }
  	getaboutData(designerId: number): any{
	  this.viewprofileservice.getaboutData(designerId).then((data: any)=>{
			if(data.status){
			  this.aboutDetail = { about: data.about, awards: data.awards, city: data.city, founding_date: data.founding_date, hide_contact_number: data.hide_contact_number, hp_address: data.hp_address, hp_phone_number: data.hp_phone_number, members_associated: data.members_associated, our_story: data.our_story, primary_contact: data.primary_contact, specialities: data.specialities, user_styles: data.user_styles, why_us: data.why_us, work_hours: data.work_hours, zip_code: data.zip_code };
		  	}
	  	});
	}
	getrating(designerName: string, limit): any{
		this.viewprofileservice.getreviews(designerName, limit).then((res: any)=>{
			if(res.status){
				if(limit == 1){
					this.rating = res.total_count;
  					this.reviews = res.reviews;
  					this.total_pages = res.total_pages;
				}else{
					this.loadmoreText = 'Load more';
					for(let i = 0; i < res.reviews.length; i++){
						this.reviews.push(res.reviews[i]);
					}
				}
			}
		});
	}
	loadMore(){
		if(this.limit < this.total_pages){
			this.limit++;
			this.loadmoreText = 'Loading...'
			this.getrating(this.designerName, this.limit);
		}
	}
	viewPlans(){
		this.navCtrl.push('PlanPage', this.navParams.data.designer, {animate:true,animation:'transition',duration:500,direction:'forward'})
	}
  	Collapsed(){
    	this.isCollapsed =! this.isCollapsed;
    	if(this.isCollapsed == true)
    		this.showmore = 'show less';
    	else if(this.isCollapsed == false)
    		this.showmore = 'show more';
  	}
}
