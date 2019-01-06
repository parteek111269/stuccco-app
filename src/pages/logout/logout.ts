import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

//Pages
// import { HomePage } from '../home/home';

//Get user information form the session
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';


@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
    constructor(public navCtrl: NavController, public navParams: NavParams, public checktoken:UserAuthenticationProvider, public fb: Facebook, public alertCtrl: AlertController){
        var fcmtoken = localStorage.getItem('fcmToken');
        fb.getLoginStatus().then(function(res){
            if(res.status === 'connected'){
                fb.logout().then(function(response){
                    checktoken.destroyUserCredentials(fcmtoken).then((data: any)=>{
                        console.log(data);
                        if(data.status == true){
                            navCtrl.setRoot('HomePage',{},{animate:true});
                            let alert = alertCtrl.create({
                                title: '',
                                subTitle: "You've signed out. It's been a pleasure serving you :) !",
                                buttons: ['OK']
                            });
                            alert.present();
                        }
                    })
                },function(error){
                    alert("Opps! Error while logout, try again");
                });
            }else{
                console.log('email logout')     
                checktoken.destroyUserCredentials(fcmtoken).then((data: any)=>{
                    console.log(data);
                    if(data.status == true){
                        navCtrl.setRoot('HomePage',{},{animate:true});
                        let alert = alertCtrl.create({
                            title: '',
                            subTitle: "You've signed out. It's been a pleasure serving you :) !",
                            buttons: ['OK']
                        });
                        alert.present();
                    }
                })
            }
        },function(error){
            console.log(error);
            let alert = alertCtrl.create({
                title: '',
                subTitle: "Something went wrong try again later :) !",
                buttons: ['OK']
            });
            alert.present();
        });
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad LogoutPage');
    }
}
