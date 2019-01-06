import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams , MenuController} from 'ionic-angular';

/**
 * Generated class for the SuccessPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-success',
  templateUrl: 'success.html',
})
export class SuccessPage {
    @Input() text;
    public header_data:any;
    constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
      
    }

    ionViewDidLoad(){
      console.log( "ion view DidLoad success" );

    }
}
