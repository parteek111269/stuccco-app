import { Injectable } from '@angular/core';
import { AlertController,App} from 'ionic-angular';

@Injectable()
export class appDirectives{
    constructor(public alertCtrl: AlertController,public app:App){}
    showBasicAlert(obj){
          let alert = this.alertCtrl.create({
            title: (obj.title),
            message: (obj.message),
            buttons: [(obj.buttonText)]
        });
        alert.present();
    }
   
    /*
    *@description: show agree or disagree alert controll
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified: 
    */
    showConfirm(obj) {
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
                    this.pop_from_root();
                }
            }
          ]
        });
        confirm.present();
    }
    
   /*
    *@description: pop from root page of non logged in user
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified: 
    */
    pop_from_root(){
        this.app.getRootNav().pop();
    }
}
