import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MarketProvider } from '../../providers/market/market';
//Loader
import { LoadingController, NavController, NavParams, Events, IonicPage } from 'ionic-angular';
import * as api from '../../app/config/environment';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
//scroll to top
import { Content } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class MarketPage {
    @ViewChild(Content) content: Content;
	public marketItems: any;	
  	public baseUrl:string = api.baseUrl;
  	public gender: any;
  	public isCollapsed: boolean = false;
  	public filterText: string = 'Show filters';
    public room_type: any;  
    public styles: any;
    public searchUrl: string = '';
    public status: any;
    public filter: FormGroup;
    public noContent: boolean = false;
    public loadmoreText: string = 'Load more';
    public limit: number = 1;
    public total_pages: number;
    public role: number;
    public view: string;
    public designerId: number;
    public filterData: any = {price: '', project_category_id: '', style_id: '', room_budget: '', room_area: '', room_shape: ''};
	constructor(public changeDetectorRef: ChangeDetectorRef, public formBuilder: FormBuilder, public event: Events, public navCtrl: NavController, public navParams: NavParams, public marketprovider: MarketProvider, public loading: LoadingController) {
        this.view = this.navParams.data.page;
        this.designerId = this.navParams.data.id;
        console.log(this.designerId);
        this.role = (JSON.parse(localStorage.userAuthData)).role;
        this.getMarketItems(this.searchUrl, this.limit, this.view, this.designerId);
        
        this.event.subscribe('addtemplate', (data) => {
            this.updation(data)
        });
        this.filter = formBuilder.group({
            room_type: [this.filterData.project_category_id],
            style_id: [this.filterData.style_id],
            price: [this.filterData.price],
            room_budget: [this.filterData.room_budget],
            room_area: [this.filterData.room_area],
            room_shape: [this.filterData.room_shape]
        });
  	}
	ionViewDidLoad() {
    	console.log('ionViewDidLoad MarketPage');
    }
    getMarketItems(searchUrl, limit, view, id){
  		let loader = this.loading.create({content: 'Loading..'});
    	loader.present();
  		this.marketprovider.getMarketItems(searchUrl, limit, view, id).then((res: any)=>{
            this.status =  res.status;
            this.total_pages = res.total_pages;
            this.room_type = res.room_type;
            this.styles = res.styles;
            if(limit == 1){
                this.marketItems = res.data;
            }else{
                this.loadmoreText = 'Load more';
                for(let i = 0; i < res.data.length; i++){
                    this.marketItems.push(res.data[i]);
                }
            }
            console.log(this.marketItems);
            if(this.marketItems.length === 0){
                this.noContent = true;
            }else{
                this.noContent = false;
            } 
  			loader.dismiss();
  		});
  	}
    updation(data: any){
        this.marketItems.push(data);
    } 
  	Collapsed(){
  		this.isCollapsed =! this.isCollapsed;
  		if(this.isCollapsed == true)
    	    this.filterText = 'Hide filters';
	    else if(this.isCollapsed == false)
	    	this.filterText = 'Show filters';
	}
    gotodetail(templateId){
        var templateinfo = {
            templateid: templateId, 
            room_type: this.room_type, 
            styles: this.styles
        }
        console.log(templateinfo);
        this.navCtrl.push('MarkettemplatesPage', templateinfo);
    }
    dofiltering(){
        if(this.filter.controls.price.value)
            this.searchUrl = 'price=' + this.filter.controls.price.value +'&';
        if(this.filter.controls.room_type.value)
            this.searchUrl = 'project_category_id=' + this.filter.controls.room_type.value +'&';
        if(this.filter.controls.room_area.value)
            this.searchUrl = 'room_area=' + this.filter.controls.room_area.value +'&';
        if(this.filter.controls.room_budget.value)
            this.searchUrl = 'room_budget=' + this.filter.controls.room_budget.value +'&';
        if(this.filter.controls.room_shape.value) 
            this.searchUrl = 'room_shape=' + this.filter.controls.room_shape.value +'&';
        if(this.filter.controls.style_id.value)    
            this.searchUrl = 'style_id=' + this.filter.controls.style_id.value +'&';
        this.getMarketItems(this.searchUrl, 1, this.view, this.designerId);
    }
    removefiltering(){
        this.filter.controls['room_type'].setValue("");
        this.filter.controls['price'].setValue("");
        this.filter.controls['room_area'].setValue("");
        this.filter.controls['room_budget'].setValue("");
        this.filter.controls['room_shape'].setValue("");
        this.filter.controls['style_id'].setValue("");
        this.getMarketItems('', 1, this.view, this.designerId);
    }
    addProduct(){
        var obj = {
            room_type: this.room_type,
            styles: this.styles
        }
        this.navCtrl.push('TemplateformPage', {obj});
    }
    loadMore(){
        if(this.limit < this.total_pages){
            this.limit++;
            this.loadmoreText = 'Loading...'
            this.getMarketItems('', this.limit, this.view, this.designerId);
            // this.getrating(this.designerName, this.limit);
        }
    }
    backbutton(){
        this.navCtrl.pop();
    }
    gotoProfile(param){
        console.log(param);
        this.navCtrl.push('ProfilePage', param, {animate:true,animation:'transition',duration:500,direction:'forward'});
    }
    //Scroll to top Function
    scroll(){
       this.content.scrollToTop();
       this.changeDetectorRef.detectChanges();
    }
}
