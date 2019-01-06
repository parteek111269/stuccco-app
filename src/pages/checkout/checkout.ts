import { Component, ViewChild } from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController,ToastController,Platform,App} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
// import { ProjectListingPage } from '../project-listing/project-listing';
import { DesignerProvider } from '../../providers/designer/designer';
import { LoadingController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { SuccessPage } from '../success/success';
import { appVaildator } from '../../validator/appVaildator';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import * as api from '../../app/config/environment';

import * as homepath from '../../app/config/environment';
declare var Stripe;
declare var cordova: any;

// @IonicPage({
//     directives: [SuccessPage]
// })

@Component({
    selector: 'page-checkout',
    templateUrl: 'checkout.html',
  
   
})
export class CheckoutPage {
    @ViewChild('Slider') Slider: any;
    checkoutList: any;
    currentSlide=0;
    public backText: string = 'Back';
    public totalPrice: number;
    public loader:any;
    public insertImage = [];
    public deleteImage = [];
    public imagesBundle = {};
    public checkFlag:boolean = false;
    public showloader:boolean = false;
    public ImagesCountCheck  = [];
    public secondSliderData:any;
    public thirdSliderData:any;
    public photos = [];
    public slideForm: FormGroup;
    public slideOneForm: FormGroup;
    public slideTwoForm: FormGroup;
    public slideThreeForm: FormGroup;
    public slideFourthForm: FormGroup;
    public sliderData:any;
    public activeSlide:any;
    public slideTwoActive:any;
    public isenabled:boolean = false;
    public room_type_id:any;
    public stylePrefrence:any;
    public cardNumber:any;
    public modalRoomType:any;
    public modalStyplePrefrence:any;
    public sqm:any;
    public resetsucess:boolean;
    public user_id:any;
    public userAuthToken:any;
    public userAuthData:any;
    public message:any;
    public cvcmessage:any;
    public postData:any;
    public subheaderTitle:any = "Select room";
    public modelRoomType:any;
    public modelStylePrefrence:any;
    public storageCheckoutStore:any;
    public designerId:any;
    public isOrderPlaced:boolean;
    public checkOutLoader:any;
    public baseUrl:any;
    public page:number=1;
    public sorting:any = "trending";
    public id:any = "";
    public planName: string;
    Stripe: any;
    ngAfterViewInit() {
        this.Slider.autoHeight = true;
        this.Slider.lockSwipes(true);
    }
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public designer: DesignerProvider,
        public formBuilder: FormBuilder,
        public platform: Platform,
        private camera: Camera,
        public loading: LoadingController,
        public actionSheetCtrl: ActionSheetController,
        public checktoken:UserAuthenticationProvider,
        public app: App ,
        private file: File,
        private filePath: FilePath,
        public toastCtrl: ToastController,
        private imagePicker: ImagePicker,
        ){
        this.baseUrl = homepath.baseUrl;
        this.isOrderPlaced = false;
        this.cvcmessage = '';
        this.message = '';
        this.userAuthToken = checktoken.authToken;
        this.userAuthData = JSON.parse(checktoken.userAuthData);
        if(this.userAuthToken){
            this.user_id = this.userAuthData.id;
        }
        this.resetsucess = false;
        this.modalRoomType = '';
        this.modalStyplePrefrence = '';
        //-Dont remove this variable stroing selected post values/data
        this.postData = navParams.data;
        console.log(this.postData);
        this.totalPrice = (this.postData.plan.amount)/100;
        this.planName = this.postData.plan.name;
        this.isenabled = false;
        //Validation rule and field assignment for setp-1
        this.slideForm = formBuilder.group({ 
            room_type_id: ['',Validators.required]
        });
        this.slideOneForm = formBuilder.group({ 
            style_type: ['',Validators.required]
        });
        this.slideTwoForm = formBuilder.group({ 
            stores: this.formBuilder.array([])
        });
        this.slideThreeForm = formBuilder.group({
            description: ['',Validators.required],
            estimated_budget: ['0.00',Validators.compose([Validators.required , appVaildator.isZero])],
            width:   ['0.00'],
            length:  ['0.00'],
            height:  ['0.00'],
            plan_id: [this.postData.plan.id],
            amount: [this.totalPrice]
        });

        this.slideFourthForm = formBuilder.group({
            card_name: ['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            card_number:  ['',Validators.compose([Validators.required, appVaildator.checkcardnumber])],
            mnth_year:  ['',Validators.compose([Validators.required, appVaildator.expirydatecheck])],
            cvv:  ['',Validators.compose([appVaildator.checkcvc, Validators.required])],
//            texttemp: [''],
        });
    }
    slideChanged(){
        this.currentSlide = this.Slider.getActiveIndex();
        if(this.currentSlide == 0){
            this.Slider.lockSwipes(true);
            this.subheaderTitle = "Select room";
        }else if(this.currentSlide == 1){
            this.backText = 'Prev';
            this.subheaderTitle = "Style preference";
        }else if(this.currentSlide == 2){
            this.backText = 'Prev';
            this.subheaderTitle = "Favorite stores";
        }else if(this.currentSlide == 3){
            this.backText = 'Prev';
            this.subheaderTitle = "Design requirements"
        }else{
            this.backText = 'Prev';
            this.subheaderTitle = "Billing information"
        }
    }

    next(index){
        this.Slider.lockSwipes(false);
        this.Slider.slideTo(index);
    }
    
    /**
    *@description: Get all slider data
    *@return: stored json data
    *@param:
    *@createdBy: Raj V
    *@modified:  
    */
    getFormAllSliderData(){
        let sliderData = [];
        sliderData.push(JSON.stringify(this.slideForm.value));
        sliderData.push(JSON.stringify(this.slideOneForm.value));
        sliderData.push(JSON.stringify(this.slideTwoForm.value));
        sliderData.push(JSON.stringify(this.slideThreeForm.value));
        sliderData.push(JSON.stringify(this.slideFourthForm.value));
        return JSON.stringify(sliderData);
    }
    
    
    /**
    *@description: Store checkout process data into localstorage
    *@return:
    *@param: postID
    *@createdBy: Raj V
    *@modified:  
    */
    storageCheckOutProcess(){
        let flag = this.checkEnableNextOpt();
        if(!flag){
            let dataSliderSet = this.getFormAllSliderData();
            localStorage.setItem("checkout_post_"+(this.postData.hiredDesigner.id), dataSliderSet);
            this.isenabled = false;
        }else{
            this.isenabled = true;   
        }
    } 
    

    prevslide(){
        if(this.currentSlide == 0){
            this.navCtrl.pop();
        }else{
            this.Slider.lockSwipes(false);
            this.Slider.slidePrev();
            this.isenabled = true;
            this.Slider.lockSwipes(true);
        }
    }

    clicked(indexes,name){
        this.room_type_id = {'room_id': indexes,'name': name};
        this.isenabled = true; 
        this.activeSlide = this.room_type_id.room_id; 
        this.nextSlide();
    }
    
    clickedSecondSlide(indexes,name){
        this.isenabled = true; 
        this.stylePrefrence = {'stylePrefrence_id': indexes,'name': name};
        this.slideTwoActive = this.stylePrefrence.stylePrefrence_id;        
        this.nextSlide();
    }
    
    
    /**
    * @description: Push category values on click - FUNCTION NOT USING
    * @param: id, checked
    * @return: true/false
    */
    clickedThirdSlide(dataid, isChecked: boolean){
        const stores = <FormArray>this.slideTwoForm.controls.stores;
        if(isChecked) {
            stores.push(new FormControl(dataid));
            this.isenabled = true;
        } 
        else{
            if(stores.controls.length == 1){
                this.isenabled = false;
            }
            for(var i = 0 ; i <= stores.controls.length; i++){
                if(stores.value[i] == dataid){
                    stores.removeAt(i);
                }

            }
            
        }
    }
    
    /**
    * @description: Make checkbox selected or not
    * @param: postID 
    * @return: true/false
    */
    stylePrefCheckedStore(index){
        if(index==3){
            return true
        }else{
            return false;
        }
    }
    
    /**
    * @description: Make checkbox selected or not
    * @param: postID 
    * @return: true/false
    */
    makeStylePrefActive(obj){
        for(let i=0 ; i<(obj.length);i++){
            for(let j=0; j<(this.thirdSliderData).length; j++){
                let record = this.thirdSliderData[j];
                if(obj[i]==record.id){
                    this.thirdSliderData[j]['status'] = true;
                    this.clickedThirdSlide(obj[i], true)
                }
            }
        }
    }

    /**
    * @description: get the local stroage value  into json parse and set into [this.storageCheckoutStore ]
    * @param: postID 
    * @return: true/false
    */

    getSliderStorageJSON(){
        let sliderData = localStorage.getItem("checkout_post_"+(this.postData.hiredDesigner.id));
        this.storageCheckoutStore = JSON.parse(sliderData);
    }
    
    /**
    * @description: Check if this post is not fully submitted and stored inside app local storage
    * @param: postID 
    * @return: true/false
    */
    fillFormSlidersWithStorage(){
        
        //-Get the values of the local storage method into JSON parse Values
        this.getSliderStorageJSON();
        // let sliderData = localStorage.getItem("checkout_post_"+(this.postData.id));
        // this.storageCheckoutStore = JSON.parse(sliderData);
        for(let i=0 ; i<this.storageCheckoutStore.length ; i++){
            let dataSet:any = JSON.parse(this.storageCheckoutStore[i]);
            switch(i){
                case 0:
                this.modelRoomType = (dataSet.room_type_id);
                break;
                case 1:
                this.modelStylePrefrence = (dataSet.style_type);
                break;
                case 2:
                this.makeStylePrefActive(dataSet.stores);
                break;
                case 3: 
                this.slideThreeForm.get('description').setValue(dataSet.description);
                this.slideThreeForm.get('estimated_budget').setValue(dataSet.estimated_budget);
                this.slideThreeForm.get('length').setValue(dataSet.length);
                this.slideThreeForm.get('width').setValue(dataSet.width);
                this.slideThreeForm.get('height').setValue(dataSet.height);
                this.sqm = (dataSet.width * dataSet.length);
                break;
            }
        }
    }
    
    
    /**
    * @description: Check if this post is not fully submitted and stored inside app local storage
    * @param: postID 
    * @return: true/false
    */
    checkPostStrogae(){
        let keyString = "checkout_post_"+(this.postData.hiredDesigner.id);
        if(keyString in localStorage){
            return true;
        } else {
            return false;
        }
    }
    
    
    resetAllPages(){
        Object.keys(localStorage).filter(function(k) { return /checkout_post_/.test(k); }).forEach(function(k) {
            localStorage.removeItem(k);
        });
        localStorage.removeItem(this.postData.hiredDesigner.username + "_" + this.postData.hiredDesigner.id);
        let el = this;
        el.checkOutLoader.dismiss(); 
        el.resetsucess = true;
        setTimeout(function(){
            el.resetsucess =false;
            //outer.navCtrl.parent.select(1);
            el.navCtrl.setRoot('ProjectListingPage')
        },1500);
    }
      
    /**
    * @description: saveCheckoutDetails Function where all data get from localstorage and card detail from form value and pass it to providers
    * @param: *
    * @return:
    */
    saveCheckoutDetails(stripeToken){
        let outer = this;
        let dataStore = [];
        let dataSet:any;
        let sliderData = localStorage.getItem("checkout_post_"+(this.postData.hiredDesigner.id));
        sliderData = JSON.parse(sliderData);
        for(let i= 0 ; i < sliderData.length-1 ; i++){
            dataSet = JSON.parse(sliderData[i]);
            console.log(dataSet)
            switch(i){
                case 3:
                    dataSet['sqm'] = this.sqm;
                    dataSet['attachments'] = this.imagesBundle;
                break;
            }
            dataStore.push(dataSet);
        }
        /*PUSH CREDIT CARD DETAILS*/
        let creditCardDetail = this.slideFourthForm.value;
        dataStore.push(creditCardDetail);
        
        /*PUSH USER DETAILS*/
        let user = {'user_id':this.user_id,'hp_user_id':this.postData.hiredDesigner.id,'stripeToken':stripeToken};
        dataStore.push(user);
        
        /*PUSH COUPEN DETAILS*/
        let coupen = {'coupon_code':""}
        dataStore.push(coupen);
        this.designer.checkOutDetailDataApi(dataStore , this.postData.hiredDesigner.id).then((checkOutResponse: any) =>{
            console.log(checkOutResponse)
            if(checkOutResponse){
                outer.resetAllPages();
            }else{
                this.checkOutLoader.dismiss(); 
                return false;
            }
            this.isOrderPlaced = true;
        });
    }

    /**
    * @description: Place-order and get stripe key and save them  
    * @param: *
    * @return:
    */
    placeOrder(){
        //this.stripeResponseHandler(status, response)
        this.checkOutLoader = this.loading.create({content: 'Loading...'});
        this.checkOutLoader.present(); 
        this.isOrderPlaced = false;
        let cardNumber = this.slideFourthForm.value.card_number;
        let dataStore = (this.slideFourthForm.value.mnth_year).split('-');
        let month = parseInt(dataStore[1]);
        let year = parseInt(dataStore[0]);
        let cvc = this.slideFourthForm.value.cvv;
        Stripe.setPublishableKey(api.stripeKey);
        let card = {
            number: cardNumber,
            expMonth: month ,
            expYear:  year,
            cvc: cvc
        };
        try {
            Stripe.card.createToken(card, (status, response) =>{
                if(!response.error) {
                    let token = response.id;
                    this.saveCheckoutDetails(token);
                }else{
                    this.checkOutLoader.dismiss();
                    alert(response.error.message);
                }
            });
        }catch (e) {
            console.log(e);
        }
    }


    /**
    *@description: calculate Square feet (width * length)
    *@return: stored json data
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    calculate(){
        let width = this.slideThreeForm.value.width;
        let length = this.slideThreeForm.value.length;
        this.sqm = (width * length);
    }
    
    
    /**
    *@description: Check weather next option is enabled if localstorage exist or not
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    checkEnableNextOpt(){
        //Means local stroage has value but need to check if key and value exist 
        let slideIndex = this.Slider.getActiveIndex();
        slideIndex = (!slideIndex || slideIndex==undefined) ? 0 : slideIndex;
        let isKeyValExist = false;
        //Check if localstroage is exist for the post Type
        if(!this.checkPostStrogae() || this.getFormAllSliderData()){
            let nonlocalstorage = JSON.parse(this.getFormAllSliderData());
            let checkOutData = JSON.parse(nonlocalstorage[slideIndex]);
            for (var k in checkOutData) {
                if(checkOutData[k].length>0){
                    isKeyValExist = true;
                }
                else{
                    isKeyValExist = false;
                }
                return isKeyValExist; 
            }
        }   
        else{
            return false;
        }
        try{
            this.getSliderStorageJSON();
            let checkOutSliderData = JSON.parse(this.storageCheckoutStore[slideIndex]);
            for (var key in checkOutSliderData){
                if(checkOutSliderData[key].length>0){
                    isKeyValExist = true; 
                }
                else{
                    isKeyValExist = false;
                }   
            }
            return isKeyValExist;
        }catch(err){
            return false;
        }
    }
    
    /**
    *@description: Set flag for enable and disable
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    makeOptEnable(){
        let flag = this.checkEnableNextOpt();
        if(flag && flag==true){
            this.isenabled = true;
        }else{
            this.isenabled = false;
        }
    }

    /**
    *@description: Enable slider to move to forward direction
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */    
    nextSlide(){
        this.Slider.lockSwipes(false);
        this.Slider.slideNext();
        this.storageCheckOutProcess();
        this.Slider.lockSwipes(true);
    }
    
    makeObject(){
        this.imagesBundle = {'insert':this.insertImage,'delete':this.deleteImage};
    }
    
    /**
    *@description: function to set delete photo select by user.
    *@return: 
    *@param: index
    *@createdBy: Raj M
    *@modified:  
    */    
    deletePhoto(index){
        this.photos.splice(index, 1);
        this.ImagesCountCheck.splice(index,1);
        let deleteImageId = this.insertImage[index];
        this.insertImage.splice(index, 1);
        let delImageId = deleteImageId;
        this.deleteImage.push(delImageId);
        this.makeObject();
    }
    
    
    
    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();   

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


    isArrayLengthEqual(){
        if(this.ImagesCountCheck.length != this.insertImage.length){
           this.checkFlag = true;
           this.showloader = true;
        }else{
           this.checkFlag = false;
           this.showloader = false;
        }
    }
    //Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName, index) {
            this.checkFlag = true;
            this.showloader = true;
            this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            let newImage = newFileName;
            this.ImagesCountCheck.push(newImage);
            this.designer.uploadImages(newImage,index).then(imgStatus =>{
                if(imgStatus['isUpload'] == true){
                    this.photos[index]['isUpload'] = imgStatus['isUpload'];
                    this.insertImage.push(imgStatus['ImageId']);
                    this.makeObject(); 
                 }else{ 
                    this.insertImage.push(imgStatus);
                    this.deletePhoto(imgStatus['Index']);
                }   

                this.isArrayLengthEqual();        
            });
        }, error => {
            this.presentToast('Error while storing file.');
        });
    }
    /*@description: Set common function for camera and gallery to upload path of images on server.
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    uploadImageOnServer(imagePath, index){
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),index);
    }

    /*@description: Push Image for the local use
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified: 
    */
    ImagesPushStore(results){
        for (let i=0; i < results.length; i++) {
            let imagePath = results[i];
            let obj = {'Imagesrc': results[i], 'isUpload':false}
            let index = (this.photos.length);
            this.photos.push(obj);
            this.uploadImageOnServer(imagePath,index);
        }   
    }

    /*@description: Set function to get multiple or single image from gallery 
    *@return:  
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    // getPicturesFromGallery(){
    //     if(this.photos.length >= 5){
    //         alert("no more image select");
    //         return false;
    //     }
    //     let options = { maximumImagesCount: 5}
    //     this.imagePicker.getPictures(options).then((results) => {
    //         this.ImagesPushStore(results);            
    //     }, (err) => { });
    // }

    /*
    *@description: Set function to Take photo from camera or gallery 
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified: 
    */
    public takePictureByCamera(sourceType) {
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
            let results = [];
            results[0] = imagePath;
            this.ImagesPushStore(results);    
        });
    }
    
    /*
    * @description: Action Sheet Open to choose that image from gallery or capture image
    * @param:
    * @return:
    */
    openActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            buttons: [{
                text: 'Choose From Gallery',
                handler: () => {
                    // this.getPicturesFromGallery();
                    this.takePictureByCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },{
                text: 'Take Picture',
                 handler: () => {
                        this.takePictureByCamera(this.camera.PictureSourceType.CAMERA)
                     // this.takePicture(this.camera.PictureSourceType.CAMERA);
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

    /**
     * 
    *@description  Calculate to decimals
    *@param: numner -n 
    *@return decimal
    */
    formatDecimal(n){
        let num = parseInt(n);
        let nDecimal = (num / 100).toFixed(2);
        return nDecimal;   
    }

    /**
    *@description  Set decimal number to given input fields
    *@param: 
    *@return
    */
    toDecimalForm(event, key){
        //Check if the form data is valid
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
    
    
    /**
    * @description: Load checkout detail data by api.
    * @param: 
    * @return:
    */
    checkoutDetailsDataService(){
        let loader = this.loading.create({content: 'Loading..'});
        return loader.present().then(() => {
            this.designer.getDesignerPageData(this.page,this.id,this.sorting).then(Checkoutdata=>{
                this.sliderData = Checkoutdata['project_categories'];
                this.secondSliderData = Checkoutdata['styles'];
                this.thirdSliderData = Checkoutdata['stores'];
                for(let i=0; i<(this.thirdSliderData).length; i++){
                    this.thirdSliderData[i]['status'] = false;  
                }
                if(this.checkPostStrogae() && this.checkPostStrogae()==true){
                    this.fillFormSlidersWithStorage();
                    this.makeOptEnable();
                }
                loader.dismiss();
            })
        })
    }
    /**
    * @description: Ionic page loads at the initial time
    * @param: 
    * @return:
    */
    ionViewDidLoad(){
        this.checkoutDetailsDataService();
    }
}

