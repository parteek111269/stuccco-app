import { Component, NgZone } from '@angular/core';
import { normalizeURL, LoadingController, Loading, IonicPage, NavController, NavParams, ToastController, ActionSheetController,Platform, Tabs} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProfileSectionProvider } from '../../providers/profile-section/profile-section';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
// import { ProfilePage } from '../profile/profile';
import { SuccessPage } from '../success/success';
declare var cordova: any;
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import * as api from '../../app/config/environment';
import { DomSanitizer } from '@angular/platform-browser';
// @IonicPage({
//     directives: []
// })
@Component({
    selector: 'page-creatnewactivity',
    templateUrl: 'creatnewactivity.html',
})
export class CreatnewactivityPage {
    formGroupActivity: FormGroup;
    formGroupCreationAlbum: FormGroup;
    formValidState:boolean = true;
    public showAlbumList:any;
    public isPhoto:boolean = false;
    public checkFlag:boolean = true; 
    public showloader:boolean = false;
    public resetsucess:boolean = false;
    public ImagesCountCheck =[];
    public catogries = [];
    public location = [];
    public creations = [];
    public uploadImageId = [];
    public user_id: number;
    public headers: any;
    public insertImage = [];
    public uploadedImage: any;
    public baseurl: string = api.baseUrl;
    public multiple_images = [];
    tab:Tabs;
    public lastImage: string = null;
    list = [];
    public isBack: any;
    loading1: Loading;
    public selectedPictureUri: any;
    public loadProgress: number = 0;
    public acticityPageStore : FormArray = new FormArray([]);
    constructor(public zone: NgZone, private sanitizer: DomSanitizer, private filePath: FilePath, public navCtrl: NavController,
        public navParams: NavParams, public toastCtrl: ToastController, public formBuilder: FormBuilder,
        public platform: Platform, private camera: Camera, public loadingCtrl: LoadingController, 
        public profileService:ProfileSectionProvider, public actionSheetCtrl: ActionSheetController, private file: File,private transfer: Transfer,
        private imagePicker: ImagePicker, public checktoken: UserAuthenticationProvider
        ) {
        this.tab = this.navCtrl.parent;
        this.isBack = this.navParams.data.back;
        this.formGroupActivity = this.formBuilder.group({
            title: ['',Validators.required],
            description: ['',Validators.required],
            photo_category_id :['',Validators.required],
            location:['',Validators.required],
            tag:[''],
            photo_credit:[''],
            id: ['', Validators.required],
        });
        console.log(this.formGroupActivity)
        this.formGroupCreationAlbum = this.formBuilder.group({
            album_id: ['',Validators.required],
            title: [],
            description: [''],
        });
        if(this.checktoken.userAuthData){
            this.user_id = (JSON.parse(this.checktoken.userAuthData)).id;
        }
    }
    resetAllPages(){
        let el = this;
        el.resetsucess = true;
        setTimeout(function(){
            el.resetsucess =false;
            el.navCtrl.setRoot('ProfilePage');
        },1500);
    }
    
    /*
    *@description: Set function to post data to provider for save on server
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    postCreationData(creationFormData){
        console.log('final step');
        console.log(this.formGroupActivity)
        let outer = this;
        this.profileService.postNewCreationDataService(creationFormData).then((dataSet: any) =>{
            console.log(dataSet);
            if(dataSet.status == true){
                console.log(dataSet)
                this.isPhoto = false;
                console.log(dataSet);
                // this.formGroupActivity.controls['multiple_images'].reset();
                outer.resetAllPages();
            }else{
                console.log("some problem Occur");
            }
        }); 
    }
    
       
    /**
    *@description: Set function to check album id and based on id add title or description array
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    checkAlbumId(){
        let newCreationFormAllData = {};
        // this.fillImageIdInForm(this.uploadImageId);
        this.multiple_images[0] = this.formGroupActivity.value;
        if(this.formGroupCreationAlbum.value['album_id'] > 1){
            console.log(this.uploadImageId);
            newCreationFormAllData = {
                home_professional: {multiple_images: this.multiple_images, album_id: this.formGroupCreationAlbum.value['album_id']}
            }
        }else{
            delete this.formGroupCreationAlbum.value['album_id'];
            newCreationFormAllData = {
                home_professional: {multiple_images: this.multiple_images},
                album: this.formGroupCreationAlbum.value,
            }
        }
        console.log(newCreationFormAllData);
        this.postCreationData(JSON.stringify(newCreationFormAllData));
    }
    
    /**
    *@description: Set function to pass data to api
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    save() {
        console.log(this.formGroupActivity)
        if(!this.formGroupActivity.valid || !this.formGroupCreationAlbum.valid){
            this.formValidState = false;
            return false;
        }
        this.checkAlbumId();
    }

    /**
    *@description: Set function to delete image and form based on index
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    deletePhoto(){
        // console.log(i);
        // var fromControl = this.formGroupActivity.controls.multiple_images['controls'];
        // fromControl.splice(i,1);
        this.loadProgress = 0;
        console.log(this.uploadImageId)
        console.log(this.ImagesCountCheck)
        console.log(this.insertImage)
        // this.uploadImageId.splice(0,1)
        this.selectedPictureUri = '';
        this.ImagesCountCheck.splice(0,1);
        this.insertImage.splice(0,1);
        
        if(this.ImagesCountCheck.length == 0){
            this.isPhoto = false;  
        }
    }
    
     /***
    *@description: Set function to Fill image_id in new creation Form 
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    
    fillImageIdInForm(obj){
        console.log(obj.id)
        // this.formGroupActivity.value['multiple_images'] = obj.id;
        this.formGroupActivity.value['id'] = obj.id;
    }
    
    /**
    *@description: Set function to open Action sheet to chose option of take photo
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    add_photo() {
        let actionSheet = this.actionSheetCtrl.create({
            // title: 'Modify your album',
            buttons: [
                {
                    text: 'Choose From Gallery',
                    handler: () => {
                        console.log('Gallery clicked');
                        // this.gallery();
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Take Picture',
                    handler: () => {
                        console.log('camera clicked');
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }
    
    public takePicture(sourceType) {
        // Create options for the Camera Dialog
        var options: CameraOptions = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true,
        };
        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
            // Special handling for Android library
            this.selectedPictureUri = normalizeURL(imagePath);
            // this.selectedPictureUri = this.sanitizer.bypassSecurityTrustUrl(imagePath);
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath).then(filePath => {
                    let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                });
            }else {
                this.selectedPictureUri = normalizeURL(imagePath);
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        },(err) => {
            console.log(err);
        });
    }

    private createFileName() {
        var d = new Date(),
        n = d.getTime(),
        newFileName =  n + ".jpg";
        return newFileName;
    }
    // Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            this.lastImage = newFileName;
            // this.checkFlag = true;
            let newImage = newFileName;
            this.ImagesCountCheck.push(newImage);
            console.log(this.ImagesCountCheck);
            this.uploadImage(newImage);
        }, error => {
            console.log(error);
        });
    }
    // Always get the accurate path to your apps folder
    public pathForImage(img) {
        if (img === null) {
            return '';
        }else{
            return cordova.file.dataDirectory + img;
        }
    }
    optionsFn(value){
        this.showAlbumList = value;
    }
    public uploadImage(newImage) {
        // Destination URL
        this.showloader = true;
        this.uploadImages(newImage, this.user_id).then((ObjectValue: any) =>{
            console.log(ObjectValue);
            this.showloader = false;
            this.isPhoto = true;
            this.formGroupActivity.controls['id'].setValue(ObjectValue.id);
            this.uploadedImage = this.baseurl + ObjectValue.image_url;
            this.loadProgress = 100;
            console.log(this.uploadedImage);
            if(ObjectValue.status == true){
                this.uploadImageId = ObjectValue;
                // this.list[index].isUpload = true;
                this.insertImage.push(ObjectValue);
            }else{
                this.insertImage.push(ObjectValue);
                // this.deletePhoto(ObjectValue['Index']);
            }
            // this.isArrayLengthEqual();
        }, error=>{
            console.log(error);
        })
    }
    uploadImages(imageStore, user_id){
        console.log(imageStore);
        this.checktoken.loadUserCredentials();
        var headers = new Headers();
        let obj = {};
        headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        return new Promise(resolve => {
            let el = this;
            const fileTransfer: TransferObject = el.transfer.create();
            var url = api.baseUrl +api.apiUrl + api.uploadImage;
            var target = el.pathForImage(imageStore);
            var filename = imageStore;
            var options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params : {'file': filename, 'user_id': user_id},
                headers: headers,
                httpMethod: 'POST',
                trustAllHosts: true,
            };
            console.log(options);
            fileTransfer.onProgress((progressEvent) => {
                this.zone.run(() => {
                    if (progressEvent.lengthComputable) {
                        this.loadProgress = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                        console.log(this.loadProgress);
                    }            
                }); 
            });
            fileTransfer.upload(target, url, options).then(data => {
                let uploadImageResponse = JSON.parse(data['response']);
                console.log(uploadImageResponse);
                if(uploadImageResponse.status === true){            
                    // el.presentToast('Image succesful uploaded ["'+filename+'"]');
                    resolve(uploadImageResponse);
                }else{
                    el.presentToast('Image not Uploaded Please Try Again..! ["'+filename+'"]');
                    resolve(false); 
                }
            },error => {
                el.presentToast('Error while uploading image ["'+filename+'"]');
                resolve(false);
            });
        });
    }
     /**
    *@description: Set function to get creation/location/category data from provider and show in form.
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    
    getCreations(){
        this.profileService.newCreationsData().then(dataSet => {
            this.catogries = dataSet['catgories'];
            this.location = dataSet['location'];
            this.creations = dataSet['creations'];
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CreatnewactivityPage');
        this.getCreations();
    }
    ionViewDidLeave(){
        console.log('leaving the page');
    }
    backbutton(){
        this.navCtrl.pop();
    }
    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }
}
