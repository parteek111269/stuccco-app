import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { DashboardPage } from '../../pages/dashboard/dashboard';
@IonicPage()
@Component({
  selector: 'page-notificationalert',
  templateUrl: 'notificationalert.html',
})
export class NotificationalertPage {
	constructor(public notify: NotificationProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {}
	ionViewDidLoad() {
    	console.log('ionViewDidLoad NotificationalertPage');
  	}
  	alertprompt(){
  		let alert = this.alertCtrl.create({
            title: 'Stuccco Would Like To Send You Notifications',
            message: 'Notification may include alerts, sounds and icon badges.',
            buttons: [
                {
                    text: "Don't allow",
                    role: 'cancel',
                    handler: () => {
                        console.log("Don't allow");
                        this.updateNotificationSettings(false);
                    }
                },
                {
                    text: 'Allow',
                    handler: () => {
                        console.log('Allow');
                        this.updateNotificationSettings(true);
                    }
                }
            ]
        });
        alert.present();
  	}
  	updateNotificationSettings(notification_status: boolean){
        console.log(notification_status);
        this.notify.updateInitialNotification(notification_status).then((data: any)=>{
            console.log(data);
            this.route();
        })
    }
    skipalertprompt(){
    	this.updateNotificationSettings(false);
    }
    route(){
    	this.navCtrl.setRoot(DashboardPage);
    }
}
