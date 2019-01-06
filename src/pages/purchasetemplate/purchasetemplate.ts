import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { appVaildator } from '../../validator/appVaildator';
import { MarketProvider } from '../../providers/market/market';
import { ProjectListingPage } from '../project-listing/project-listing';
declare var Stripe;
import * as api from '../../app/config/environment';

@IonicPage()
@Component({
  selector: 'page-purchasetemplate',
  templateUrl: 'purchasetemplate.html',
})
export class PurchasetemplatePage {
	public orderData: any;
	public stripeform: FormGroup;
    private Stripe: any;
    public checkOutLoader: any;
    public isOrderPlaced:boolean;
    public resetsucess: boolean = false;
	constructor(public marketservice: MarketProvider, public loading: LoadingController, public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
  		console.log(this.navParams.data);
  		this.orderData = this.navParams.data;
  		this.stripeform = formBuilder.group({
            card_name: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],  
      		card_number: ['',Validators.compose([Validators.required, appVaildator.checkcardnumber])],
      		exp: ['',Validators.compose([Validators.required, appVaildator.expirydatecheck])],
      		cvv: ['',Validators.compose([appVaildator.checkcvc, Validators.required])],
    	});
        this.isOrderPlaced = false;
  	}
	ionViewDidLoad() {
    	console.log('ionViewDidLoad PurchasetemplatePage');
  	}
  	backbutton(){
  		this.navCtrl.pop();
  	}
    onSubmit(values){
        console.log(values);
        this.checkOutLoader = this.loading.create({content: 'Loading...'});
        this.checkOutLoader.present(); 
        this.isOrderPlaced = false;
        let cardNumber = this.stripeform.value.card_number;
        let dataStore = (this.stripeform.value.exp).split('-');
        let month = parseInt(dataStore[1]);
        let year = parseInt(dataStore[0]);
        let cvc = this.stripeform.value.cvv;
        Stripe.setPublishableKey(api.stripeKey);
        let card = {
            number: cardNumber,
            expMonth: month ,
            expYear: year,
            cvc: cvc
        }; 
        try {
            Stripe.card.createToken(card, (status, response) =>{
                if(!response.error) {
                    let token = response.id;
                    this.saveCheckoutDetails(token);
                }else{
                    this.checkOutLoader.dismiss();
                    alert(response.error.message);
                }
            });
        }catch(e) {
            console.log(e);
        }    
    }
    saveCheckoutDetails(token){
        let dataStore = [];
        /*PUSH CREDIT CARD DETAILS*/
        let creditCardDetail = this.stripeform.value;
        dataStore.push(creditCardDetail);

        /*PUSH USER DETAILS*/
        // let user = {'user_id':this.user_id,'hp_user_id':this.postData.hiredDesigner.id,'stripeToken':stripeToken};
        // dataStore.push(user);

        /*PUSH COUPEN DETAILS*/
        let coupen = {'coupon_code':""}
        dataStore.push(coupen);
        this.marketservice.checkout(dataStore, token, this.orderData.id).then((data: any) => {
            if(data){
                this.checkOutLoader.dismiss();
                this.resetsucess = true;
                this.navCtrl.push('ThankyouPage', this.orderData);
            }else{
                this.checkOutLoader.dismiss(); 
                return false;
            }
            this.isOrderPlaced = true;
        });
    }
}
