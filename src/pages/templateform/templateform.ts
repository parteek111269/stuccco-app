import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { appVaildator } from '../../validator/appVaildator';
import * as api from '../../app/config/environment';
import { ImagePicker } from '@ionic-native/image-picker';
import { MarketProvider } from '../../providers/market/market';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-templateform',
  templateUrl: 'templateform.html',
})
export class TemplateformPage {
  public isenabled:boolean = false;
  public template: FormGroup;
  public roomShape: any;
  public featuredImages: any;
  public baseurl: any;
  public room_type: any;
  public styles: any;
  public isPhoto:boolean = false;
  public list: any = [];
  public checkFlag:boolean = true; 
  public showloader:boolean = false;
  public ImagesCountCheck =[];
  public uploadImageId = [];
  public insertImage = [];
  public selected: boolean = false;
  public templateId: number;
  public prevItem: any;
  public editMode: any;
  public userData: any;
  constructor(public loading: LoadingController, public auth: UserAuthenticationProvider, public event: Events,public marketservice: MarketProvider,  public imagePicker: ImagePicker, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.baseurl = api.baseUrl;
    console.log(this.navParams.data);
    if(this.navParams.data.templateInfo){
      var editmode = this.editMode = true;
      this.templateId = this.navParams.data.templateInfo.id;
      this.featuredImages = this.navParams.data.templateInfo.images;
    }else{
      var editmode = this.editMode = false;
    }
    this.room_type = this.navParams.data.obj.room_type;
    this.styles = this.navParams.data.obj.styles;
    this.template = formBuilder.group({
      name: [editmode ? this.navParams.data.templateInfo.name : '', Validators.compose([Validators.required])],
      description: [editmode ? this.navParams.data.templateInfo.description : '', Validators.compose([Validators.required])],
      price: [editmode ? this.navParams.data.templateInfo.price : '', Validators.compose([Validators.required])],
      project_category_id: [editmode ? this.navParams.data.templateInfo.room_type_id : '', Validators.compose([Validators.required])],
      style_id: [editmode ? this.navParams.data.templateInfo.style_type_id : '', Validators.compose([Validators.required])],
      room_shape: [editmode ? this.navParams.data.templateInfo.room_shape : '', Validators.compose([Validators.required])],
      room_area: [editmode ? this.navParams.data.templateInfo.square_footage : '', Validators.compose([Validators.required])],
      room_budget: [editmode ? this.navParams.data.templateInfo.room_budget : '', Validators.compose([Validators.required])],
      document: ['', Validators.compose([])],
      template_images:  ['', Validators.compose([])],
      featured_image:  ['', Validators.compose([])],
    });
  }
  ionViewDidLoad() {
    if(this.editMode){
      this.deselectPrevThumb();
    }else if(!this.editMode){
      this.userData =  JSON.parse(window.localStorage.getItem('userAuthData'));
      this.template.addControl('user_id', new FormControl(this.userData.id, Validators.compose([Validators.required])));
    }  
  }
  backbutton(){
  	this.navCtrl.pop();
  }
  onSubmit(values){
    let loader = this.loading.create({content: 'Loading..'});
    loader.present();
    if(this.editMode){
      this.marketservice.updateTemplateForm(values, this.templateId).then((data: any) => {
        if(data.status == true){
          this.event.publish('templateform', data.data);
          loader.dismiss();
          this.navCtrl.pop();
        }
      });
    }else if(!this.editMode){
      this.marketservice.addTemplateForm(values).then((data: any) => {
        if(data.status == true){
          this.event.publish('addtemplate', data.data);
          loader.dismiss();
          this.navCtrl.pop();
        }
      });
    }
  }
  selectImage(event, i){
    this.deselectPrevThumb();
    let current = this.featuredImages[i];
    current["selected"] = true;
    this.template.controls['featured_image'].setValue(i);
  }
  deselectPrevThumb(){
    if(this.featuredImages.find( key => key.selected === true )){
      this.prevItem = this.featuredImages.find( key => key.selected === true);
      delete this.prevItem["selected"];
    }
  }
  toDecimalForm(event, key){
    if(isNaN(event.value[key]) || event.value[key]<=0){
      event.get(key).setValue('0.00');
      this.isenabled = false;
      return false
    }
    let value:any = (event.value[key]).toString(); //convert it into string
    value = value.replace(/\./g,''); //Remove decimal place first
    value = (value.replace(/^0+/, '')); //Remove leading 0
    let n = this.formatDecimal(value); 
    event.get(key).setValue(n);
  }
  formatDecimal(n){
    let num = parseInt(n);
    let nDecimal = (num / 100).toFixed(2);
    return nDecimal;   
  }





  // image upload
  getImagesFromGalery(){
    let options = { maximumImagesCount: 6};
    this.imagePicker.getPictures(options).then((result: any)=>{
      console.log(result);
      this.activityStorePush(result);
    }, error=>{
      console.log(error);
    });
  }
  activityStorePush(results){
    for (let i=0; i < results.length; i++) {
      this.isPhoto = true;
      let imagePath = results[i];
      let obj = {'Imagesrc': results[i], 'isUpload':false}
      let index = (this.list.length);
      this.list.push(obj);
      this.uploadImageOnServer(imagePath,index);
    }
  }
  uploadImageOnServer(imagePath, index){
    var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),index);
  }
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
  private copyFileToLocalDir(namePath, currentName, newFileName,index) {}
}
