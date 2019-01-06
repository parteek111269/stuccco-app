import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
// import { ProfilePage } from '../profile/profile';
// import { ChattingPage } from '../chatting/chatting';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import * as api from '../../app/config/environment';
import { LoadingController } from 'ionic-angular';
import { Badge } from '@ionic-native/badge';
@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
    public messagelistDetail = [];
    public baseUrl: any;
    public page: any = 1;
    constructor(
        public alertCtrl: AlertController,
        public navCtrl: NavController, 
        public navParams: NavParams,
        public messageService:MessageServiceProvider,
        public checktoken:UserAuthenticationProvider,
        public loading: LoadingController, public badge: Badge
        ) {
      console.log(navParams.data);
      this.badge.decrease(navParams.data);
      // this.badge.clear();
      this.baseUrl = api.baseUrl;
    }

    goToUserProfile(param){
         this.navCtrl.push('ProfilePage', param, {animate:true,animation:'transition',duration:500,direction:'forward'});
    }
    
    
     /**
    *@description: function to get coversation message with perticular user
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    conversationMessage(conversationId){
        this.messageService.conversationMessageService(conversationId,this.page).then(dataSet=>{
            let param = {'conversation_id':dataSet['messages'][0].conversation_id};
            this.navCtrl.push('ChattingPage', param)
        });
    }
     
     /**
    *@description: function to get Message list.
    *@return: 
    *@param: 
    *@createdBy: Raj M
    *@modified:  
    */
    getMessageList(){
      this.messagelistDetail = [];
      let loader = this.loading.create({content: 'Loading...'});
        return loader.present().then(() => {   
            this.messageService.getMessageListService().then(dataSet=>{
                for(var key in dataSet){
                    this.messagelistDetail.push(dataSet[key])
                }
                loader.dismiss();
            })
        })
    }
 
     
     /**
    *@description: function to refresh Message list.
    *@return: 
    *@param: 
    *@createdBy: Raj 
    *@modified:  
    */  
    refreshMessageList(){
      
      this.messageService.getMessageListService().then(dataSet=>{
        this.messagelistDetail = [];
          for(var key in dataSet){
              this.messagelistDetail.push(dataSet[key])
          }
      })
    }
    
    
    confirmDeleteConv(conversationId,index){
        let alert = this.alertCtrl.create({
          title: 'Delete Conversation',
          message: 'Do you want to delete this message?',
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
                 this.deleteMyMessages(conversationId,index);
              }
            }
          ]
      });
      alert.present();
    }


    /**
    *@description: add refresher to pull down.
    *@return: 
    *@param: 
    *@createdBy: Raj 
    *@modified:  
    */
    doRefresh(refresher) {
        this.refreshMessageList();
        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }  

    deleteMyMessages(conversationId,index){
        this.messageService.deleteConversation(conversationId).then(dataSet=>{
            if(dataSet['status']){
                this.messagelistDetail.splice(index,1);
            }else{
                return false;
            }
        })
    }
    clearMessages(){
        this.messageService.clearMessages().then((data: any)=>{
            console.log(data);
            this.messageService.updateMessages(data);
        })
    }
    ionViewDidLoad() {
      console.log('ionViewDidLoad MessagePage');
      this.getMessageList();
      this.clearMessages();
    }
}
