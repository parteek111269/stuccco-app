import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Events, LoadingController } from 'ionic-angular';
import { MarketProvider } from '../../providers/market/market';
import * as api from '../../app/config/environment';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';

@IonicPage()
@Component({
  selector: 'page-markettemplates',
  templateUrl: 'markettemplates.html',
})
export class MarkettemplatesPage {
    @ViewChild(Slides) slides: Slides;
	public templateId: number;
	public templateInfo: any = {};
    public baseUrl: string = api.baseUrl;
    public room_type: any;
    public styles: any;
    public role: number;
    public user_id: number;
    public postCreatedBy: number;
	constructor(public checktoken: UserAuthenticationProvider, public event: Events, public loading: LoadingController, public navCtrl: NavController, public navParams: NavParams, public marketprovider: MarketProvider) {
        console.log(this.navParams.data);
        this.role = JSON.parse(localStorage.userAuthData).role;
        this.user_id = JSON.parse(localStorage.userAuthData).id;
        this.templateId = this.navParams.data.templateid;
        this.room_type = this.navParams.data.room_type;
        this.styles = this.navParams.data.styles;
        this.getTemplateDetails(this.templateId);
        this.event.subscribe('templateform', (values) => {
            this.updation(values)
        });
    }
	ionViewDidLoad() {}
    backbutton(){
        this.navCtrl.pop();
    }
  	getTemplateDetails(templateId){
        let loader = this.loading.create({content: 'Loading...'});
        return loader.present().then(() => { 
    		this.marketprovider.getTemplateDetails(templateId).then((res: any) => {
                this.templateInfo = {
                    status: res.status,
    				description: res.data.description,
    				id: res.data.id,
    				name: res.data.name,
    				price: res.data.price,
    				user_id: res.data.user_id,
    				username: res.data.username,
    				hp_name: res.data.hp_name,
    				avg_rating: res.data.avg_rating,
    				featured_image: res.data.featured_image,
    				room_type: res.data.room_type,
    				style_type: res.data.style_type,
    				room_shape: res.data.room_shape,
    				images: res.data.images,
    				square_footage: res.data.square_footage,
    				room_budget: res.data.room_budget,
    				document: res.data.document,
                    room_type_id: res.data.room_type_id,
                    style_type_id: res.data.style_type_id
    			}
                loader.dismiss();
                console.log(this.templateInfo);
    		});
        });  
  	}
    editTemplate(templateInfo){
        console.log(templateInfo);
        var obj = {
            room_type: this.room_type,
            styles: this.styles
        }
        this.navCtrl.push('TemplateformPage', {templateInfo, obj});
    }
    updation(data){
        this.templateInfo = {
            status: true,
            description: data.description,
            id: data.id,
            name: data.name,
            price: data.price,
            user_id: data.user_id,
            username: data.username,
            hp_name: data.hp_name,
            avg_rating: data.avg_rating,
            featured_image: data.featured_image,
            room_type: data.room_type,
            style_type: data.style_type,
            room_shape: data.room_shape,
            images: data.images,
            square_footage: data.square_footage,
            room_budget: data.room_budget,
            document: data.document,
            room_type_id: data.room_type_id,
            style_type_id: data.style_type_id
        }
    }
    purchase(templateInfo){
        console.log(templateInfo);
        this.navCtrl.push('PurchasetemplatePage', templateInfo);
    }
    goToChattingPage(templateInfo){
        var current_user_id: number = this.user_id;
        var recipient_id: number = templateInfo.user_id;
        console.log(current_user_id, recipient_id);
        this.marketprovider.startNewConversation(current_user_id, recipient_id).then((res: any)=>{
            let param = {'conversation_id': res.conversation_id};
            this.navCtrl.push('ChattingPage', param);
        })
    }
}
