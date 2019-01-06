import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import * as api from '../../app/config/environment';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { InAppBrowser} from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html',
})
export class ProductdetailPage {
	public templateId: number;
	public detail: any = {};
	public baseurl: string = api.baseUrl;
	public isDownloading: boolean = false;
	public downloadtxt: string = 'Download Design';
	public role: number;
	public title: string;
	constructor(private iab: InAppBrowser,private transfer: FileTransfer, private file: File, public loading: LoadingController, public productservice: ProductProvider, public navCtrl: NavController, public navParams: NavParams) {
  		console.log(this.navParams.data);
  		this.title = this.navParams.data.type;
  		this.templateId = this.navParams.data.tempid;
  		this.getproductDetail(this.templateId);
  		this.role = JSON.parse(localStorage.userAuthData).role;
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ProductdetailPage');
  	}
  	backbutton(){
  		this.navCtrl.pop();
  	}
  	getproductDetail(templateId: number){
  		let loader = this.loading.create({content: 'Loading...'});
        return loader.present().then(() => { 
	  		this.productservice.getProductDetail(templateId).then((data: any)=>{
	  			this.detail = {
	  				name: data.product_name,
	  				designer: data.designer_seller,
	  				description: data.description,
	  				room_type: data.room_type,
	  				style_type: data.style_type,
	  				room_shape: data.room_shape,
	  				price: data.price,
	  				est_area: data.room_area,
	  				est_cost: data.estimated_room_cost,
	  				file_type: data.file_type,
	  				file_size: data.file_size,
	  				time: data.purchased_date_time,
	  				file_url: data.file_url
	  			}
	  			loader.dismiss();
	  		});
	  	});	
  	}
  	downloadDesign(param){ 
        let url = api.baseUrl + this.detail.file_url;
        this.iab.create(url,'_system','location=yes');
    }
  // 	downloadDesign(){
  // 		// this.isDownloading = true;
  // 		// this.downloadtxt = 'Downloading...'
  // 		const fileTransfer: FileTransferObject = this.transfer.create();
  // 		const url = this.baseurl + this.detail.file_url;
  // 		console.log(url);
  // 		fileTransfer.download(url, this.file.dataDirectory + 'test.pdf', true).then((entry) => {
		//     console.log(entry);
		//     console.log('download complete: ' + entry.toURL());
		//     // this.isDownloading = false;
		//     // this.downloadtxt = 'Download Design';
		    
		// }, (error) => {
		//     console.log(error);
		// });
  // 	}
}
