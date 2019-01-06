import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController,Platform,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ProfilePage } from '../profile/profile';
import { Camera } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';
import { ProfileSectionProvider } from '../../providers/profile-section/profile-section';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import * as api from '../../app/config/environment';
import { SuccessPage } from '../success/success';
declare var cordova: any;
// @IonicPage({
//     directives: [SuccessPage]
// })
@Component({
  selector: 'page-creationeditimage',
  templateUrl: 'creationeditimage.html',
})
export class CreationeditimagePage {
        formGroupActivity: FormGroup;
        formGroupCreationAlbum: FormGroup;
        formValidState:boolean = true;
        public resetPage:boolean = false;
        public showDefalutPhoto:boolean = true;
        public photo:any;
        public baseUrl:any;
        public albumId:any;
        public catogries = [];
        public location = [];
        public creations = [];
        public showAlbumList = [];
        public editCreationImageData = {};
        public correctPath:any;
        public currentName:any;
        public isDisable:boolean = false;
        public isImageChoose:boolean = false;
        constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            private filePath: FilePath,
            public platform: Platform,
            private file: File,
            public formBuilder: FormBuilder,
            private camera: Camera,
            public toastCtrl: ToastController,
            public loading: LoadingController,
            public actionSheetCtrl: ActionSheetController,
            public profileService:ProfileSectionProvider
        ){
        this.albumId = this.navParams.data.album_id
        this.baseUrl = api.baseUrl;
        this.photo = this.navParams.data.image_url;
        this.formGroupActivity = formBuilder.group({
            title: [this.navParams.data.title,Validators.required],
            description: [this.navParams.data.description,Validators.required],
            photo_category_id:[this.navParams.data.photo_category_id,Validators.required],
            location:[this.navParams.data.location,Validators.required],
            tag:[this.navParams.data.tag],
            id: [this.navParams.data.id]
        });
        
        this.formGroupCreationAlbum = this.formBuilder.group({
            album_id: ['',Validators.required],
            title: [''],
            description: [''],
        });
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

    resetAllPages(){
        let el = this;
        el.resetPage = true;
        setTimeout(function(){
            el.resetPage =false;
            el.navCtrl.setRoot('ProfilePage')
        },2000);
    }
    
    optionsFn(value){
        this.showAlbumList = value;
    }
    
    
     /**
    *@description: Set function to open action sheet to choose take image option 
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    openActionSheet(){
        let actionSheet = this.actionSheetCtrl.create({
            buttons: [{
                text: 'Choose From Gallery',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },{
                text: 'Take Picture',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
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
    
    /**
    *@description: Set function to take picture by caamera/gallery
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    public takePicture(sourceType) {
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        
        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
            this.photo = imagePath;
            this.showDefalutPhoto = false;
            this.isImageChoose = true;
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath).then(filePath => {
                    this.correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    this.currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                  //this.copyFileToLocalDir(this.createFileName());
                });
            }else {
              
              this.currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
              this.correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
//              this.copyFileToLocalDir(this.createFileName());
            }
        }, (err) => {
            this.presentToast('Error while selecting image.');
        });
    }
    
    //Copy the image to a local folder
    private copyFileToLocalDir(newFileName) {
            let correctPath = this.correctPath;
            let correntName = this.currentName;
            let formData = this.editCreationImageData;
            let loader = this.loading.create({content: 'Please Wait...'});
            return loader.present().then(() => {
                this.file.copyFile(correctPath, correntName, cordova.file.dataDirectory, newFileName).then(success => {
                this.profileService.creationImageUpdate(newFileName , formData).then(imgStatus =>{
                    if(imgStatus){
                        loader.dismiss();
                        this.isDisable = false;
                        this.resetAllPages();
                    }else{
                        loader.dismiss();
                        this.isDisable = false;
                        return false;
                    }        
                });
            }, error => {
                loader.dismiss();
                this.presentToast('Error while storing file.');
            });
        })
    }

    public updatePhotoWithoutImage(){
        this.profileService.creationDataUpdate(this.editCreationImageData).then(dataSet=>{
               if(dataSet){
                   this.resetAllPages();
               }else{
                   return false;
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
        let jsonData;
        if(this.formGroupCreationAlbum.value['album_id'] > 1){
            jsonData = {"home_professional":this.formGroupActivity.value}
            jsonData['home_professional']['album_id'] = this.formGroupCreationAlbum.value['album_id'];
        }else{
            delete this.formGroupCreationAlbum.value['album_id'];
            jsonData = {"home_professional":this.formGroupActivity.value,"album":this.formGroupCreationAlbum.value}
        } 
        this.editCreationImageData = JSON.stringify(jsonData);
        if(this.isImageChoose == true){
           this.copyFileToLocalDir(this.createFileName());
        }else{
            //Call provider send data wihtout images
            this.updatePhotoWithoutImage();
        }

    }
    
    /**
    *@description: Update the photo 
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    update(){
        if(!this.formGroupActivity.valid){
            this.formValidState = false;
            return false;
        }
        this.isDisable = true;
        this.checkAlbumId()
    }
    
    backbutton(){
        this.navCtrl.pop();
    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad CreationeditimagePage');
      this.getCreations();
    }
}
