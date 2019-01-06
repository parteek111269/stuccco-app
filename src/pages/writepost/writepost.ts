import { Component, ViewChild, ElementRef,  } from '@angular/core';
import { Platform, Loading, IonicPage, NavController, NavParams, Events, ActionSheetController, ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { File } from '@ionic-native/file';
declare var cordova: any;
import { AdviceProvider } from '../../providers/advice/advice';
import * as api from '../../app/config/environment';
import { LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';

@IonicPage()
@Component({
  selector: 'page-writepost',
  templateUrl: 'writepost.html',
})
export class WritepostPage {
    public post: FormGroup;
    public photo: any;
    public baseurl: string = api.baseUrl;
    public img: any;
    public detailmissing: boolean = false;
    public showloader:boolean = false;
    public des: any;
    public adviceId: number;
    public type: string;
    public user_id: number;
    public lastImage: string = null;
    private headers: any;
    loading1: Loading;
    constructor(public platform: Platform, public checktoken: UserAuthenticationProvider, private transfer: Transfer, private filePath: FilePath, public toastCtrl: ToastController, public loadingCtrl: LoadingController, private camera: Camera, public actionSheetCtrl: ActionSheetController, public events: Events, private loading: LoadingController, private AdviceProvider: AdviceProvider, private file: File, private imagePicker: ImagePicker, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
        this.user_id = (JSON.parse(this.checktoken.userAuthData)).id;
        console.log(this.user_id);
        this.post = formBuilder.group({
          title: ['', Validators.compose([Validators.required])],
          description: ['' , Validators.compose([Validators.required])],
        });
        this.type = this.navParams.data.type;
        if(this.type == 'edit'){
            this.adviceId = this.navParams.data.id;
            this.post.controls['title'].setValue(this.navParams.data.adviceDetail.title);
            this.des = this.navParams.data.adviceDetail.description;
        }
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad WritepostPage');
    }
    backbutton(){
        this.navCtrl.pop();
    }
    onSubmit(post){
        console.log(this.post);
        // document.querySelector('contenteditable1').innerHTML;
        var content = document.getElementById('contenteditable1').innerHTML;
      console.log(content);
      this.post.controls['description'].setValue(content);
        if(this.post.controls['description'].value == '' || this.post.controls['title'].value == ''){
            this.detailmissing = true;
        }else{
            this.detailmissing = false;
            if(this.type == 'edit'){
                this.AdviceProvider.editAdvice(this.adviceId, post).then((data: any)=>{
                    if(data.status == true){
                        this.navCtrl.setRoot(DashboardPage);
                    }
                })
            }else{
                this.AdviceProvider.submitAdvice(post).then((data: any)=>{
                    if(data.status == true){
                        this.navCtrl.setRoot(DashboardPage);
                    }
                });
            } 
        } 
    }

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
            this.uploadImage();
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
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath).then(filePath => {
                    let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                });
            }else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        },(err) => {
            console.log(err);
        });
    }

    public uploadImage() {
        // Destination URL
        var url = api.baseUrl + api.apiUrl + api.adviceDetail + api.upload_asset;
        console.log(url);
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        // File name only
        var filename = this.lastImage;
        this.checktoken.loadUserCredentials();
        this.headers = new Headers()
        this.headers.append('Authorization', 'Bearer ' + this.checktoken.authToken);
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params : {'file': filename, 'user_id': this.user_id},
            headers: this.headers,
            httpMethod: 'POST',
            trustAllHosts: true,
        };
        const fileTransfer: TransferObject = this.transfer.create();
        this.loading1 = this.loadingCtrl.create({
            content: 'Uploading...',
        });
        this.loading1.present();
        // Use the FileTransfer to upload the image http://v-team.uistaging.site/stuccco/upload.php
        fileTransfer.upload(targetPath, url, options).then(data => {
            console.log(data)
            if(data.responseCode === 200){
                let uploadAttachmentResponse = JSON.parse(data['response']);
                console.log(uploadAttachmentResponse);
                this.img = uploadAttachmentResponse.org_img_src;
                var node = document.createElement("a");
                node.className = 'advice_img';
                node.href = '';
                node.dataset.src = this.baseurl + this.img;
                node.innerHTML += '<img data-id="'+uploadAttachmentResponse.img_id+'" src="'+this.baseurl + this.img +'" />'; 
                document.getElementById('contenteditable1').appendChild(node);
            }
            this.loading1.dismissAll()
        }, err => {
            console.log(err);
            this.loading1.dismissAll()
        });
    }
}