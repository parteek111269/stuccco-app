import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { appDirectives } from '../../app/appdirectives/appdirectives';
import { ProfileSectionProvider } from '../../providers/profile-section/profile-section';
import { LoadingController } from 'ionic-angular';
//Get user information form the session
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
//Enviorment variable
import * as api from '../../app/config/environment';

@IonicPage()
@Component({
  selector: 'page-collections',
  templateUrl: 'collections.html',
})
export class CollectionsPage {
	public total_page:any;
  	public userAuthToken:any;
  	public userAuthData:any;
  	public user_name:any;
  	public page:number=1;
  	public collectionarea:boolean = false;
  	public isloader:number=1;
  	public collectionsAllData:any;
  	public collectionContentShow:any;
  	public hasMoreData:boolean = true;
  	public id:any;
  	public collectionId:any;
  	public loggedinUser_id:any;
  	public collectionTitle:any;
  	public baseUrl:any;
  	public profileUserName:any;
	constructor(public navCtrl: NavController, public commonAlert:appDirectives, public alertCtrl: AlertController, public profileService:ProfileSectionProvider, public loading: LoadingController, public navParams: NavParams, public checktoken:UserAuthenticationProvider) {
        this.baseUrl = api.baseUrl
        let userAuthToken = checktoken.authToken;
        this.userAuthData = (userAuthToken) ? JSON.parse(checktoken.userAuthData) : "null";
        this.user_name = ((navParams.data).hasOwnProperty("userName")) ? (navParams.data.userName) : (this.userAuthData.userName);
        this.loggedinUser_id = ((navParams.data).hasOwnProperty("user_id")) ? (navParams.data.user_id) : (this.userAuthData.id);
        this.collectionData();
    }
	ionViewDidLoad() {
    	console.log('ionViewDidLoad CollectionsPage');
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
                placeholder : "Title",
                value:(obj.titleName),
                name:'title'
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
                      obj.description =  obj.description;  
                      this.failedAlert(obj,"All fields are required");
                    } else {
                        this.updateCollection(data, obj.index);
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
    *@description: function to get users collection component informationfrom its provider
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    collectionData(){
        if(this.isloader){
            let loader = this.loading.create({content: 'Loading...'});
            return loader.present().then(() => { 
                this.profileService.collectionDataApi(this.user_name,this.page,'collection').then(collectionData => {
                    if(collectionData['status'] == false){
                        this.collectionarea = true;
                        this.collectionContentShow = api.collectionContent;
                        loader.dismiss();
                        return false;
                    }else if(!collectionData){
                        this.collectionarea = true;
                        this.collectionContentShow = api.collectionContentEndUrlFailed;
                        loader.dismiss();
                        return false;
                    }
                    this.total_page = collectionData['total_pages'];
                    this.hasMoreData = true;             
                    this.collectionsAllData = collectionData['collections']
                     loader.dismiss();
                });
            })
        }else{
            return this.profileService.collectionDataApi(this.user_name,this.page,'collection').then(collectionData => {
                this.total_page = collectionData['total_pages']
                this.hasMoreData = true;
                this.collectionsAllData = collectionData['collections']
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
        this.collectionData().then(()=>{
            if(this.page != this.total_page){
                infiniteScrollEvent.complete();
            }else{
                this.hasMoreData = false;
                return false;
            }
        });
    }
    
    /**
    *@description: function to be set to update collection album name
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    update(id,index){
        this.collectionId = id;
        this.profileService.collectionEditData(this.collectionId,'collection' ).then(editData=>{
            if(editData['status']){
                let obj = {
                    title: 'Edit Collection Name',
                    titleName: editData['collection'].title ? editData['collection'].title : "",
                    description: editData['collection'].description ? editData['collection'].description : "",
                    index: index
                };
                this.promptAlert(obj);
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
    deleteCollection(id,index){
        this.collectionId = id;
        let obj = {
                title: "Are you sure you'd like to delete this album?",
                index:index
            };
        this.showalertdelete(obj);
    }
    
    /**
    *@description: Set function to Update your collecion album
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    updateCollection(collectionEditData, index){
        collectionEditData['id'] = this.collectionId;
        this.profileService.collectionUpdate(collectionEditData,'collection').then(collectionNewData =>{
            if(collectionNewData['status']){
              this.collectionsAllData[index]['title'] = collectionEditData['title'];
            }else{
                 alert("collection not update Successfully Try Again!");
                 return false;
            }
        });
    }
    
    /**
    *@description: Set function to Delete your collecion album
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    deleteCollectionFunction(index){
        this.profileService.collectionDeleteApi(this.collectionId,'collection').then(deleteCollectionStatus=>{
            if(deleteCollectionStatus){
                this.collectionsAllData.splice(index, 1);
            }else{
                alert("collection not delete Successfully Try Again!")
            }
        })
    }
    goToCollectionDetail(titlename: string){
        console.log(titlename);
        let param = {'title':titlename, 'userName':this.user_name, 'user_id':this.loggedinUser_id};
        // this.navCtrl.push('CollectiondetailPage', param);
    }
}
