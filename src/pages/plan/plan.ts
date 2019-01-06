import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,ToastController } from 'ionic-angular';
import * as api from '../../app/config/environment';
import { PlansProvider } from '../../providers/plans/plans';
import { CheckoutPage } from '../../pages/checkout/checkout';
//Loader
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-plan',
  templateUrl: 'plan.html',
})
export class PlanPage {
	public hiredDesigner: any;  
  	public stripePlans: any;
  	public totalPrice: number = 0;
  	public servicePrice: number = 0;
  	public serviceType: any = '...';
  	public previousComponent: string;
  	public exampleImages: any = [];
  	constructor(public loading: LoadingController, public navParams: NavParams, public plans: PlansProvider, public navCtrl: NavController) {
	    console.log('Hello PlansComponent Component');
	    this.hiredDesigner = navParams.data;
	    var val = this.navCtrl.last();
	    this.previousComponent = val.component.name;
	    console.log(this.previousComponent)
	    this.createplans();
	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad PlanPage');
  	}
  	createplans(){
	    let loader = this.loading.create({content: 'Loading..'});
	    loader.present();
	    this.plans.getplans().then((data: any)=>{
	    	loader.dismiss(); 
	      	console.log(data);
	      	this.stripePlans = data.stripe_plans;
	    });
  	}
  	selectPlan(plan){
    	this.totalPrice = this.servicePrice = (plan.amount)/100;
    	this.serviceType = plan.name;
    	localStorage.setItem((this.hiredDesigner.username + "_" + this.hiredDesigner.id), JSON.stringify(plan));
    	this.navigateto(plan);
  	}
  	navigateto(plan){
    	// var designerPlanInfo = this.hiredDesigner.username + "_" + this.hiredDesigner.id;
    	if(this.previousComponent == 'ProfileActivityPage'){
      		localStorage.removeItem("checkout_post_"+(this.hiredDesigner.id));
    	}
    	this.navCtrl.push(CheckoutPage,{plan: plan, hiredDesigner: this.hiredDesigner},{animate:true,animation:'transition',duration:500,direction:'forward'})
  	}
  	backbutton(){
    	this.navCtrl.pop({animate:true,animation:'transition',duration:500,direction:'back'});
  	}
}
