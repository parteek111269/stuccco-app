import { Component,ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import { IonicPage, NavController, NavParams, ActionSheetController,Platform, AlertController} from 'ionic-angular';
// import { ProfilePage } from '../profile/profile';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { ChangeDetectorRef } from '@angular/core';
import { InAppBrowser} from '@ionic-native/in-app-browser';
import { LoadingController } from 'ionic-angular';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import * as api from '../../app/config/environment';

declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-chatting',
  templateUrl: 'chatting.html',
})
export class ChattingPage {
     @ViewChild(Content) content: Content;
    public messages = [];
    public chatText:any;
    public baseUrl:any;
    public userAuthData:any;
    public page:number=1;
    public sendingMessageStatus:boolean = false;
    public isScrollToBottom:boolean = false;
    public total_page:any;
    public messageAttachStore = [];
    public hasMoreComment:boolean = false;
    constructor(
            public navCtrl: NavController,
            public navParams: NavParams,
            private filePath: FilePath,
            private file: File,
            private camera: Camera,
            public changeDetectorRef: ChangeDetectorRef,
            public checktoken:UserAuthenticationProvider,
            public messageService:MessageServiceProvider,
            public actionSheetCtrl: ActionSheetController,
            public platform: Platform,
            public loading: LoadingController,
            private iab: InAppBrowser,
             public alertCtrl: AlertController,
            ) {
            console.log(navParams.data);
            this.baseUrl = api.baseUrl;
            let userAuthToken = checktoken.authToken;
            this.userAuthData = (userAuthToken) ? JSON.parse(checktoken.userAuthData) : "null";
        }

    /**
    *@description: Set Function to send Message.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */    
    sendMessage(){
        let message  = this.chatText;
        if((message ==undefined || message == "") && (this.messageAttachStore).length<=0){
            alert("Opps! Message field is requird");
            return false;
        }
        this.sendingMessageStatus = true;
        let dataObj={'body': message,'conversation_id': this.navParams.data.conversation_id,'attachment':JSON.stringify(this.messageAttachStore)};
        this.messageService.postMessageService(dataObj).then(dataSet=>{
            dataSet['position'] = 'right';
            this.messages.push(dataSet); 
            this.chatText = "";
            this.sendingMessageStatus = false;
            //Remove attached message
            this.messageAttachStore = [];
            setTimeout(() => {
                this.content.scrollToBottom(200);
            });
        })
        
    }
    backbutton(){
        this.navCtrl.pop();
    }
    
     /**
    *@description: function to get coversation message with perticular user
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    conversationMessage(){
        let loader = this.loading.create({content: 'Loading...'});
        return loader.present().then(() => { 
            this.messageService.conversationMessageService(this.navParams.data.conversation_id,this.page).then(dataSet=>{
                this.total_page = dataSet['total_pages'];
                this.hasMoreComment = false;
                for(var i=0;i<dataSet['messages'].length;i++){
                    if(dataSet['messages'][i].user_id == this.userAuthData.id){
                        dataSet['messages'][i]['position'] = 'right';   
                    }else{
                        dataSet['messages'][i]['position'] = 'left';
                    } ;
                    let message = dataSet['messages'][i];
                    this.messages.unshift(message);
                    this.timeOut();
                }
                loader.dismiss();
            })
        })
    }
    
    timeOut(){
        if(this.page == 1){
             setTimeout(() => {
                this.content.scrollToBottom(10);
            });
        }else{
            return false;
        }
    }
    
    /**
    *@description: Set Function To Load More Message.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    loadMoreMessage(){
        if(this.page<this.total_page){
            this.page+=1;
            this.hasMoreComment = true;
            this.conversationMessage();
        }
    }
    
    /**
    *@description: Set Function To scroll to bottom 
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */ 
    scrollToBottom(){
        setTimeout(() => {
            this.content.scrollToBottom(100);
        });
    }
    
    /**
    *@description: Set Function check if page at bottom and then show arrow.
    *@return: 
    *@param: 
    *@createdBy: Raj 
    *@modified:  
    */ 
    //Get scroll Position
    scrollHandler(event){
        
      let x = document.querySelectorAll('.latest')[0].getBoundingClientRect().top ;
        if (event.scrollHeight  < x  ) {
          
          this.isScrollToBottom = true;
          this.changeDetectorRef.detectChanges();
        }
          
        else{
          //show fab
          this.isScrollToBottom = false;
          this.changeDetectorRef.detectChanges();
        }
       
      return false;

    }
    
    /**
    *@description: Set Function Refresh conversation Page.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */ 
    refreshPage(){
        this.messages = [];
        this.page = 1;
        this.conversationMessage();
    }
    
    /**
    *@description: Set Function go to user profile.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */    
    goTouserProfile(param){
        this.navCtrl.push('ProfilePage', param, {animate:true,animation:'transition',duration:500,direction:'forward'});
    } 
    
    /***
    *@description: Set function to pass image to provider 
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    private copyFileToLocalDir(namePath, currentName, newFileName) {
     let loader = this.loading.create({content: 'Beautiful file! One moment while we upload it.'});
        return loader.present().then(() => {     
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
           let newImage = newFileName;
           this.messageService.uploadAttachmentsOnServer(newImage).then(ObjectValue =>{
               if(ObjectValue['id']){
                   this.messageAttachStore.push(ObjectValue['id'])
                   loader.dismiss();
               }else{
                   loader.dismiss();
               }
           });
        }, error => {
            loader.dismiss();
           console.log("error");
           
        })
    })
      
    }
    /**
    *@description: function to set to create new image for image.
    *@return: 
    *@param: index
    *@createdBy: Raj M
    *@modified:  
    */
    private createFileName() {
        var d = new Date(),
        n = d.getTime(),
        newFileName =  n + ".jpg";
        return newFileName;
    }
    
    /*@description:set function to take picture by gallery or camera.
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    public takePictureByCamera(sourceType) {
        console.log(sourceType)
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
//            if((this.insertImage).length>=5){
//                alert("No More images Select")
//                return false;
//            }
            console.log("image path");
            console.log(imagePath);
            
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath).then(filePath => {
                  console.log("file path");
                  console.log(filePath);  
                  let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                  let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                  this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                });
            }else{
              var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
              var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        }, (err) => {
                console.log("out of function");
        });
    }
    
     /**
    *@description: Set Function To open Action Sheet to choose attachemnts from gallery or Camera.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */    
    attachments(){
          let actionSheet = this.actionSheetCtrl.create({
            buttons: [{
                text: 'Choose From Gallery',
                handler: () => {
                    this.takePictureByCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },{
                text: 'Take Picture',
                handler: () => {
                    this.takePictureByCamera(this.camera.PictureSourceType.CAMERA);
                }
            },{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        actionSheet.present();
    }
    
    downloadFile(param){ 
        let url = api.baseUrl +param.original_filename
        this.iab.create(url,'_system','location=yes');
    }
    
     /**
    *@description: Set Function Delete attachment file.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    deleteAttachment(param,parentIndex,index){
        console.log(param.filename)
        let alert = this.alertCtrl.create({
          title: 'Delete Attachment',
          message: 'Do you want to delete this Attachment?' +param.filename,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
                return true;
              }
            },
            {
              text: 'Confirm',
              handler: () => {
                 this.deleteAttachmentsFile(param.id,parentIndex,index);
              }
            }
          ]
      });
      alert.present();
    }
    
    deleteAttachmentsFile(id,parentIndex,index){
//        console.log(this.messages[index])
        this.messageService.deleteAttachmentService(id).then(dataSet =>{
            if(dataSet['status']){
               this.messages[parentIndex].attachments.splice(index,1)
            }
        });
    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad ChattingPage');
        this.conversationMessage();    
    }
}
