import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { appDirectives } from '../../app/appdirectives/appdirectives';
import { ProfileSectionProvider } from '../../providers/profile-section/profile-section';
import { LoadingController } from 'ionic-angular';
//Get user information form the session
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import { CreationdetailsPage } from '../../pages/creationdetails/creationdetails';
//Enviorment variable
import * as api from '../../app/config/environment';

@IonicPage()
@Component({
  selector: 'page-creations',
  templateUrl: 'creations.html',
})
export class CreationsPage {
	public total_page:any;
  	public user_name:any;
  	public userAuthData:any;
  	public creationarea:boolean = false;
  	public creativeData = [];
  	public page:number=1;
  	public isloader:number=1;
  	public creationsAllData:any;
  	public creativeContentShow:any;
  	public hasMoreData:boolean = true;
  	public id:any;
  	public loggedinUser_id:any;
  	public creationId:any;
  	public baseUrl:any;
	constructor(public alertCtrl: AlertController, public commonAlert:appDirectives, public navCtrl:NavController, public navParams: NavParams, public profileService:ProfileSectionProvider, public loading: LoadingController, public checktoken:UserAuthenticationProvider) {
        this.baseUrl = api.baseUrl;
        let userAuthToken = checktoken.authToken;
        this.userAuthData = (userAuthToken) ? JSON.parse(checktoken.userAuthData) : "null";
        this.user_name = ((navParams.data).hasOwnProperty("userName")) ? (navParams.data.userName) : (this.userAuthData.userName);
        this.loggedinUser_id = ((navParams.data).hasOwnProperty("user_id")) ? (navParams.data.user_id) : (this.userAuthData.id);
        this.creationData();
    }

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad CreationsPage');
  	}
  	backbutton(){
    	this.navCtrl.pop({animate:true,animation:'transition',duration:500,direction:'back'});
  	}
  	/*
    *@description: Notify user that save failed;
    *@return: 
    *@param:
    *@createdBy: Raj
    *@modified: 
    */
    failedAlert(obj,text) {
      let alert = this.alertCtrl.create({
        title: 'Failed',
        subTitle: text,
        buttons: [{
        text: 'OK',
            handler: () => {
                this.promptAlert(obj);
            }
        }]

      });
      alert.present();
    }
        
    /*
    *@description: Common prompt alert with two input fields;
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified: 
    */
    
    promptAlert(obj){
        let prompt = this.alertCtrl.create({
            title: (obj.title),
            inputs: [{
                type: 'text',
                value:(obj.titleName),
                name:'title',
                placeholder: 'Album Name',
            },{
                type: 'text',
                value:(obj.description),
                placeholder : 'Description',    
                name:'description'
            }],
             
            buttons: [{
                text: 'Cancel',
                handler: data => {  
                    return true;
                }
            },
            {
                text: 'Save',
                handler:data=>{   
                  
                    if(data.title == "" || data.description == "") {
                      obj.titleName =  data.title;
                      obj.description =  data.description;  
                      this.failedAlert(obj,"All fields are required");
                    } else {
                        this.updateCreation(data, obj.index);
                }
                    
                }
            }]
        });
        prompt.present();
    }             
    
    /*
    *@description: alert with two confirmation to delete;
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified: 
    */
    
    showalertdelete(obj) {
        let confirm = this.alertCtrl.create({
            title: (obj.title),
            message:  (obj.message),
            buttons: [
                {
                    text: 'cancel',
                    handler: () => {
                    console.log('Disagree clicked');
                }
            },
                {
                  text: 'ok',
                  handler: () => {
                    this.deleteCollectionFunction(obj.index);
                }
            }
          ]
        });
        confirm.present();
    }
    
    
    /**
    *@description: Set function to get users creation component informationfrom its provider
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    creationData(){
        if(this.isloader){
            let loader = this.loading.create({content: 'Loading...'});
            return loader.present().then(() => { 
                 this.profileService.collectionDataApi(this.user_name,this.page,'creation').then(creationData => {
                    if(creationData['status'] == false){
                        this.creationarea = true;
                        this.creativeContentShow = api.creativeContent;
                        loader.dismiss();
                        return false;
                    }else if(!creationData){
                        this.creationarea = true;
                        this.creativeContentShow = api.creativeContentEndUrlFailed;
                        loader.dismiss();
                        return false;
                    }
                    this.total_page = creationData['total_pages'];
                    this.hasMoreData = true;
                    this.creationsAllData = creationData['creations']
                    loader.dismiss();
                });
            })
        }else{
            return this.profileService.collectionDataApi(this.user_name,this.page,'creation').then(creationData => {
                this.total_page = creationData['total_pages'];
                this.hasMoreData = true;
                this.creationsAllData = creationData['creations']
            });
        }
    }
    
    /**
    *@description: function to be set to infinite loader show for pagination
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    doInfinite(infiniteScrollEvent){
        if(this.page<this.total_page){
        this.page+=1;
        }else{
            this.hasMoreData = false;
            return false;
        }
        this.isloader = 0;
        this.creationData().then(()=>{
            if(this.page != this.total_page){
                infiniteScrollEvent.complete();
            }else{
                this.hasMoreData = false;
                return false;
            }
        });
    }
    
    /**
    *@description: Set function to update the name of your creations
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    update(id,index){
        this.creationId= id;
        this.profileService.collectionEditData(this.creationId,'creation').then(editData=>{
            if(editData['status']){
                let obj = {
                    title: 'Edit Creation Name',
                    titleName: editData['creation'].title ? editData['creation'].title : "",
                    description: editData['creation'].description ? editData['creation'].description : "",
                    index: index
                };
                this.promptAlert(obj);
            }
        });
    }
    
    
    /**
    *@description: Set function to Update your creation album
    *@return: 
    *@param: creationEditData
    *@createdBy: Raj M
    *@modified:  
    */
    updateCreation(creationEditData, index){
        creationEditData['id'] = this.creationId;
        this.profileService.collectionUpdate(creationEditData,'creation').then(creationNewData =>{
            console.log(creationNewData);
            if(creationNewData['status']){
               console.log(this.creationsAllData[index]['title']);
               this.creationsAllData[index]['title'] = creationEditData['title'];
            }else{
                 alert("creation not update Successfully Try Again!")
                 return false;
            }
        });
    }
    /**
    *@description: Set function to delete your creations album
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    
    deleteAlbum(id,index){
        this.creationId = id;
        let obj = {
                title: "Are you sure you'd like to delete this album?",
                index:index,
            };
        this.showalertdelete(obj);
    }
    
    /**
    *@description: Set function to delete your creations album using provider
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    
    deleteCollectionFunction(index){
        this.profileService.collectionDeleteApi(this.creationId,'creation').then(deleteCollectionStatus=>{
            if(deleteCollectionStatus){
                this.creationsAllData.splice(index, 1);
            }else{
                 alert("creation not delete Successfully Try Again!")
            }
        })
    }
    
    goToCretaionDetail(titlename){
        console.log(titlename);
        let param = {'title':titlename,'userName':this.user_name,'user_id':this.loggedinUser_id}
        this.navCtrl.push(CreationdetailsPage, param);
    }
}
