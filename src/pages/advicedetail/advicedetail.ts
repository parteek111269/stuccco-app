import { Component, ChangeDetectorRef, ViewChild, NgZone } from '@angular/core';
import { Platform, Loading, IonicPage, NavController, NavParams, LoadingController, Events, Content, ActionSheetController, AlertController } from 'ionic-angular';
import { FeedProvider } from '../../providers/feed/feed';
import * as api from '../../app/config/environment';
import { AdviceProvider } from '../../providers/advice/advice';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
declare var cordova: any;
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';

@IonicPage()
@Component({
  selector: 'page-advicedetail',
  templateUrl: 'advicedetail.html',
})
export class AdvicedetailPage {
    @ViewChild(Content) content: Content;
	public advice_id: number;
	public adviceDetail: any = {};
	public baseurl: string = api.baseUrl;
    public user_id: number;
    // public comment_count: number;
    public userAuthData: any;
    public post: FormGroup;
    public showloader:boolean = false;
    public img: any;
    public comments = [];
    public loadmoreText: string = 'Load more';
    public limit: number = 1;
    public total_pages: number;
    public errFlag: boolean = false;
    public editData: any;
    public editFlag: boolean = false;
    public commentId: number;
    public commentEditIndex: number;
    public loading1: Loading;
    public lastImage: string = null;
    private headers: any;
	constructor(public zone: NgZone, public alertCtrl: AlertController, public feedservice: FeedProvider, public platform: Platform, public checktoken: UserAuthenticationProvider,private transfer: Transfer, private filePath: FilePath, public loadingCtrl: LoadingController, private camera: Camera, public actionSheetCtrl: ActionSheetController, public events: Events, private loading: LoadingController, private AdviceProvider: AdviceProvider, private file: File, private imagePicker: ImagePicker, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
		console.log(this.navParams.data);
        this.advice_id = this.navParams.data.adviceId;
        console.log(this.advice_id)
        var id: any = localStorage.getItem('adviceId');
        console.log(id);
        if(this.advice_id == undefined){
            console.log('in');
            this.advice_id = id;
        }
        console.log(this.advice_id);
        this.userAuthData = JSON.parse(checktoken.userAuthData);
        this.user_id = this.userAuthData.id;
        this.post = formBuilder.group({
            description: ['' , Validators.compose([Validators.required])],
        });
        this.getadviceDetail(this.advice_id);
	}
  	ionViewDidLoad() {
    	console.log('ionViewDidLoad AdvicedetailPage');
        this.calltocomments(this.advice_id, this.limit)
  	}
  	getadviceDetail(advice_id: number){
        let loader = this.loading.create({content: 'Loading..'});
        return loader.present().then(() => {
            this.feedservice.getadviceDetails(advice_id).then((data: any)=>{
                // this.comment_count = data.data.comments.length;
                this.adviceDetail = {
                    description: data.data.description,
                    user_avatar: data.data.user_avatar,
                    display_name: data.data.display_name,
                    title: data.data.title,
                    updated: data.data.updated,
                    user_id: data.data.user_id,
                    username: data.data.username,
                    status: data.data.status,
                    // comments_count: data.data.comments.length,
                    // comments: data.data.comments,
                }
                loader.dismiss();
            });      
        });		
  	}
    calltocomments(advice_id, limit){
        this.getComments(this.advice_id, this.limit).then((data: any)=>{
            console.log(data);
            if(data == true){
                setTimeout(()=>{
                    var images: any = document.getElementsByClassName("advice_img");
                    for(let i = 0; i < images.length; i++) {
                        console.log(images[i].children[0].getAttribute('src'));
                        var substring = api.baseUrl;
                        var source;
                        console.log(images[i].children[0].getAttribute('src').includes(substring));
                        if(!images[i].children[0].getAttribute('src').includes(substring)){
                            source = images[i].children[0].getAttribute('src').replace(/^/, substring);
                        }else{
                            source = images[i].children[0].getAttribute('src');
                        }
                        images[i].children[0].setAttribute('src', source);
                    }
                }, 200);
            }
        });
    }
  	backbutton(){
  		this.navCtrl.pop();
  	}
    editadvice(){
        var obj = {
            id: this.advice_id,
            adviceDetail: this.adviceDetail,
            type: 'edit',
        }
        console.log(obj);
        this.navCtrl.push('WritepostPage', obj)
    }
    deladvice(){
        // let loader = this.loading.create({content: 'Loading..'});
        // return loader.present().then(() => {
            this.AdviceProvider.deleteAdvice(this.advice_id).then((data: any)=>{
                if(data.status){
                    // loader.dismiss();
                    // this.event.publish('feed');
                    this.navCtrl.setRoot(DashboardPage);
                }
            });
        // });   
    }
    // comment section here
    getComments(id: number, limit: number){
        return new Promise(resolve => {
            this.AdviceProvider.getComments(id, limit).then((data: any)=>{
                console.log(data);
                if(data.status == true){
                    if(limit == 1){
                        this.comments = data.data;
                        this.total_pages = data.total_pages
                    }else{
                        this.loadmoreText = 'Load more';
                        for(let i = 0; i < data.data.length; i++){
                            this.comments.push(data.data[i]);
                        }
                    } 
                    resolve(true);   
                }
            });
        });
    }
    loadMore(){
        if(this.limit < this.total_pages){
            this.limit++;
            this.loadmoreText = 'Loading...'
            this.getComments(this.advice_id, this.limit);
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
    public takePicture(sourceType) {
        // Create options for the Camera Dialog
        var options: CameraOptions = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
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
        // Use the FileTransfer to upload the image 
        // http://v-team.uistaging.site/stuccco/upload.php
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
                document.getElementById('contenteditable').appendChild(node);
            }
            this.loading1.dismissAll()
        }, err => {
            console.log(err);
            this.loading1.dismissAll()
        });
    }
    onSubmit(post){
        var content = document.querySelector('[contenteditable]').innerHTML;
        this.post.controls['description'].setValue(content);
        console.log(this.post.controls['description'].value);
        if(this.post.controls['description'].value == ''){
            this.errFlag = true;
        }else{
            this.errFlag = false;
            if(!this.editFlag){
                this.AdviceProvider.addComment(this.advice_id, this.post.controls['description'].value).then((data: any)=>{
                    console.log(data);
                    if(data.status == true){
                        // this.comments.push(data.data);
                        this.getComments(this.advice_id, this.limit);
                        document.getElementById("contenteditable").innerHTML = '';
                    }
                });
            }else{
                this.editFlag = false;
                this.AdviceProvider.editComment(this.user_id, this.commentId, this.post.controls['description'].value).then((response: any)=>{
                    console.log(response);
                    if (this.commentEditIndex !== -1) {
                        this.comments[this.commentEditIndex] = response.data;
                    }
                    document.getElementById("contenteditable").innerHTML = '';
                });
            }   
        }
    }
    editcomment(comment: any){
        this.commentEditIndex = this.comments.indexOf(comment);
        console.log(this.commentEditIndex);
        this.editFlag = true;
        this.commentId = comment.id;
        document.getElementById("contenteditable").innerHTML = comment.comment;
        document.getElementById("contenteditable").focus();

    }
    delcomment(comment: any){
        const index: number = this.comments.indexOf(comment);
        console.log(index);  
        this.AdviceProvider.deleteComment(comment.id).then((data: any)=>{
            console.log(data);
            if(data.status == true){
                if (index !== -1) {
                    this.comments.splice(index, 1);
                }
            }
        });
    }
    deleteConfirm(param) {
        console.log(param);
        let alert = this.alertCtrl.create({
            // title: 'Confirm purchase',
            message: 'Are you sure?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {}
                },
                {
                    text: 'Yes',
                    handler: () => {
                        console.log('Buy clicked');
                        if(param == 'post'){
                            this.deladvice();
                        }else{
                            this.delcomment(param);
                        }
                    }
                }
            ]
        });
        alert.present();
    }
}