import { Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, Content } from 'ionic-angular';
import { ProjectProvider } from '../../providers/project/project';
//Get user information form the session
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
//Loader
import { LoadingController } from 'ionic-angular';
//common service and function
import { appDirectives } from '../../app/appdirectives/appdirectives';
import { ProductProvider } from '../../providers/product/product';
@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
    @ViewChild(Content) content: Content;
    public type:any;
    public hasMoreData:boolean = true;
    public page:number=1;
    public isloader:number=1;
    public dataSetPurchased = [];
    public dataSetSale = [];
    public userAuthData:any;
    public user_type:any;
    public hireByCountPage:number = 1;
    public hireByOtherCountPage:number = 0;
    public isScrollToTop:boolean;
    public total_page:any;
    public flag:boolean = true;
    public role: number;
    constructor(public navCtrl: NavController, public project: ProjectProvider, public checktoken:UserAuthenticationProvider, public commonAlert:appDirectives, public loading: LoadingController, public changeDetectorRef: ChangeDetectorRef, public productservice: ProductProvider){   
        this.role = JSON.parse(localStorage.userAuthData).role;
        let userAuthToken = checktoken.authToken;
        this.userAuthData = (userAuthToken) ? JSON.parse(checktoken.userAuthData) : "null";
        this.user_type = (this.userAuthData) ? this.userAuthData.role : 'null';
        this.type = "I_have_purchased";
        // if(this.role === 1){
        //     this.type = 'I_have_listed_for_sale';
        // }
    }
    ionViewDidLoad(){
        this.purchased();
        // if(this.user_type == 1){
        //     this.purchased();
        // }else{
        //     this.sale();
        // }
    }
    purchased(){
        let projectType = 'bought_others';
        if(this.isloader){
            let loader = this.loading.create({content: 'Loading...'});
                loader.present().then(() =>{
                    this.productservice.getProducts(projectType,this.page).then((projectListHiredMeData: any) => {
                    console.log(projectListHiredMeData);
                    if(!projectListHiredMeData){
                        loader.dismiss();
                        return false;
                    }
                    this.total_page = projectListHiredMeData.total_pages;
                    this.hasMoreData = true;
                    for(var key of projectListHiredMeData.inventory){
                        this.dataSetPurchased.push(key)
                    }
                    loader.dismiss();
                })
            })
        }else{
            return this.productservice.getProducts(projectType,this.page).then((projectListHiredMeData: any) => {
                console.log(projectListHiredMeData);
                this.total_page = projectListHiredMeData.total_pages;
                this.hasMoreData = true;
                for(var key of projectListHiredMeData.inventory){
                    this.dataSetPurchased.push(key)
                }
            })
        }
    }
    sale(){
        let projectType = 'bought_me'
        if(this.isloader){
            let loader = this.loading.create({content: 'Loading...'});
            loader.present().then(() =>{
                this.productservice.getProducts(projectType,this.page).then((projectListHiredByOtherData: any) => {
	                console.log(projectListHiredByOtherData);
	                if(!projectListHiredByOtherData){
	                    loader.dismiss();
	                    return false;
	                }
	                this.total_page = projectListHiredByOtherData.total_pages;
	                this.hasMoreData = true;
	                for(var key of projectListHiredByOtherData.inventory){
	                    this.dataSetSale.push(key)
	                }
	                if(this.dataSetSale.length==0){
	                    this.hasMoreData = false;
	                }
	                loader.dismiss();
	            })
	        })
        }else{
            return this.productservice.getProducts(projectType,this.page).then((projectListHiredByOtherData: any) => {
                console.log(projectListHiredByOtherData);
                this.total_page = projectListHiredByOtherData.total_pages;
                this.hasMoreData = true;
                for(var key of projectListHiredByOtherData.inventory){
                    this.dataSetSale.push(key)
                }
            })
        }
    }    
    updatePage(type) {
        if(type == 'I_have_listed_for_sale' && (this.flag || this.page != 1)){
            this.page = this.hireByOtherCountPage + 1;
            this.sale();
            this.flag = false;
            this.LoaderForChangeSegment();
        }else{
            this.LoaderForChangeSegment();
        }
    }
    LoaderForChangeSegment(){
        let loader = this.loading.create({content: 'Loading...'});
            loader.present().then(() =>{
                setTimeout(function(){
                loader.dismiss();
            },50);
        })
    }
    scrollToTop() {
       this.content.scrollToTop();
       this.changeDetectorRef.detectChanges();
    }
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
    doInfinite(infiniteScrollEvent, type){
        if(this.page < this.total_page){
        this.page+=1;
        }else{
            this.hasMoreData = false;
            return false;
        }
        this.isloader = 0;
        if(type=='I_have_purchased'){
            this.hireByCountPage++;
            this.page = this.hireByCountPage;
            this.purchased().then(()=>{
                if(this.page != this.total_page){
                    infiniteScrollEvent.complete();
                }else{
                    this.hasMoreData = false;
                    return false;
                }
            });
        }else{
            this.hireByOtherCountPage++;
            this.page = this.hireByOtherCountPage;
            this.sale().then(()=>{
                if(this.page != this.total_page){
                    infiniteScrollEvent.complete();
                }else{
                    this.hasMoreData = false;
                    return false;
                }
            });
        }
    }  
    productDetail(tempId: number, str: string){
        var type;
        if(str == 'purchased'){
            type = 'Template purchased - details';
        }else{
            type = 'Template sold - details';
        }
        this.navCtrl.push('ProductdetailPage', {tempid: tempId, type: type});
    } 
}

