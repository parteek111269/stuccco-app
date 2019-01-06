import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController,Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
// import { ProfilePage } from '../profile/profile';
import { Camera } from '@ionic-native/camera';
import { Content } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { WebsiteValidator } from '../../validator/emailvalidate';
import { SuccessPage } from '../success/success';
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
import { ProfileSettingsProvider } from '../../providers/profile-settings/profile-settings';
import * as api from '../../app/config/environment';
declare var cordova: any;
// @IonicPage({
//     directives: [SuccessPage]
// })
@Component({
  selector: 'page-setting-profile',
  templateUrl: 'setting-profile.html',
})
export class SettingProfilePage {
    @ViewChild(Content) content: Content;
    user: FormGroup;
    teamMember:FormGroup;
    formValidState:boolean = true;
    public userAuthData:any;
    public baseUrl:any;
    public photo:any;
    public uploadImagePath = [];
    public resetPage:boolean = false;
    public showTeamMemberForm:boolean = false;
    public profileDataForUpdate:any;
    public professionalType = [];
    public stateCollection = [];
    public addImagePath:any;
    public acticityPageStore : FormArray = new FormArray([]);
    public list = [];
    public fieldObj = {};
    public showFilePhotoPath = [];
    public showloader:boolean = false;
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public formBuilder: FormBuilder,
        private file: File,
        public platform: Platform,
        private camera: Camera,
        public loading: LoadingController,
        public profileSettingService : ProfileSettingsProvider,
        public checktoken:UserAuthenticationProvider,
        public actionSheetCtrl: ActionSheetController,
        private filePath: FilePath,
        ) {
        this.photo = this.navParams.data.image; 
        this.baseUrl = api.baseUrl;
        let userAuthToken = checktoken.authToken;
        this.userAuthData = (userAuthToken) ? JSON.parse(checktoken.userAuthData) : "null";
        this.user = formBuilder.group(this.getFormField());
        if(this.navParams.data.team_members.length > 0){
            for(var i = 0;i<this.navParams.data.team_members.length;i++){
                let fct = this.formActivityValue(i);
                this.acticityPageStore.push(fct);
                let obj = {'Imagesrc': this.navParams.data.team_members[i].image,'status':false}
                this.list.push(obj);
                this.showTeamMemberForm = true;
            }
        }else{
            let fct = this.initAddress();
            this.acticityPageStore.push(fct);
            let obj = {'Imagesrc': 'assets/medium/missing.png','status':false}
            this.list.push(obj);
        }
    }
    
    getFormField(){
        this.fieldObj = {
            first_name: [this.navParams.data.first_name,Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            last_name: [this.navParams.data.last_name,Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            nonhp_type: [this.navParams.data.nonhp_type,Validators.required],
            hp_address: [this.navParams.data.hp_address,Validators.required],
            city: [this.navParams.data.city,Validators.required],
            hp_state: [this.navParams.data.hp_state,Validators.required],
            zip_code:  [this.navParams.data.zip_code,Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
        }
        this.teamMember = this.formBuilder.group({
            team_members : this.acticityPageStore
        });
        console.log(this.navParams.data);
        if(this.userAuthData.role == 1){
            let dateOfBirth = this.navParams.data.year+'-'+this.navParams.data.month+'-'+this.navParams.data.day;
            console.log(dateOfBirth);
            this.fieldObj = {
                    first_name: [this.navParams.data.first_name,Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
                    last_name: [this.navParams.data.last_name,Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
                    nonhp_type: [""],
                    hp_address: [(this.navParams.data.hp_address!="" ? this.navParams.data.hp_address : "")],
                    city: [this.navParams.data.city,Validators.required],
                    hp_state: [this.navParams.data.hp_state,Validators.required],
                    zip_code:  [this.navParams.data.zip_code,Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
                    dob: [(this.navParams.data.year!="") ? dateOfBirth : ""],
                    gender: [(this.navParams.data.gender!="" ? this.navParams.data.gender : "")],
                    hp_type: [this.navParams.data.hp_type,Validators.required],
                    hp_name: [this.navParams.data.hp_name,Validators.required],
                    hp_website: [this.navParams.data.hp_website,Validators.compose([Validators.required, WebsiteValidator.urlFormat])],
                    hp_phone_number: [this.navParams.data.hp_phone_number,Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])],
                    hp_about: [this.navParams.data.hp_about],
                    our_story:[this.navParams.data.our_story],
                    founding_date:[this.navParams.data.founding_date],
                    work_hours:[this.navParams.data.work_hours],
                    specialities:[this.navParams.data.specialities],
                    members_associated:[this.navParams.data.members_associated],
                    awards:[this.navParams.data.awards],
                    why_us:[this.navParams.data.why_us]
                }
                this.teamMember = this.formBuilder.group({
                    team_members : this.acticityPageStore
                });
            }
            return this.fieldObj;
        }
              
    formActivityValue(index) {
        return this.formBuilder.group({
           tm_first_name:[this.navParams.data.team_members[index].first_name],
           tm_last_name:[this.navParams.data.team_members[index].last_name],
           tm_location:[this.navParams.data.team_members[index].location],
           tm_role:[this.navParams.data.team_members[index].role],
           tm_accredentials:[this.navParams.data.team_members[index].accredentials],
           tm_bio:[this.navParams.data.team_members[index].bio],
           image:[this.navParams.data.team_members[index].image_name]
        });
    }
    
    
    fillImageIdInForm(obj){
        if(obj.length > 0){
            for(var i = 0; i<obj.length;i++){
                if(obj[i] != undefined){
                     this.teamMember.value['team_members'][i]['image'] = obj[i].imagePath;
                }else{
                    this.teamMember.value['team_members'][i]['image'] = this.navParams.data.team_members[i].image_name
                }
            }
        }
    }
    
    /**
    *@description: set FUnction to pass data
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    postDataToProvider(){
        let formData = this.profileDataForUpdate;
            let loader = this.loading.create({content: 'Please Wait...'});
            return loader.present().then(() => {
                this.profileSettingService.profileSettingDataService(formData).then(imgStatus =>{
                    if(imgStatus){
                        loader.dismiss();
                        this.resetAllPages();
                    }else{
                        loader.dismiss();
                    }        
                }, error => {
                loader.dismiss();
                console.log(error);
            });
        })
    }
    
    resetAllPages(){
        let el = this;
        el.resetPage = true;
        setTimeout(function(){
            el.resetPage =false;
            el.navCtrl.setRoot('ProfilePage')
        },2000);
    }
    /**
    *@description: Update the photo 
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified:  
    */
    save(){
        if(!this.user.valid){
            alert("some of the fields are missing please check and fill before save")
            this.formValidState = false;
            return false;
        }
        if(this.userAuthData.role == 1){
            for(let key in this.user.value){
                if(key=='dob'){
                    let dobStore = (this.user.value[key]).split("-");
                    this.user.value['year'] = dobStore[0];
                    this.user.value['month'] = dobStore[1];
                    this.user.value['day'] = dobStore[2];
                }
             }
        }
        delete this.user.value['dob'];
        let profileSettingData = {};
        let userInfoStore = (this.user.value);
        userInfoStore.id = this.userAuthData.id;
        let teamMemberStore = (this.teamMember.value)
        userInfoStore['team_members'] = teamMemberStore['team_members']
        profileSettingData = {"user":userInfoStore}
        this.fillImageIdInForm(this.uploadImagePath)
        this.profileDataForUpdate = JSON.stringify(profileSettingData);
        this.postDataToProvider();
    }
    
    /**
    * @description: Set function to add team member
    * @param: 
    * @return: 
    * @modifoed: 
    * @modifiedBy: Raj-M
    */
    addTeamMember(index){
        const control = <FormArray>this.teamMember.controls['team_members'];
        control.push(this.initAddress());
        let obj = {'Imagesrc': 'assets/medium/missing.png','status':false}
        this.list.push(obj);
        this.showTeamMemberForm = true;
        setTimeout(() => {
            this.content.scrollToBottom(300);
        });
    }
   
    initAddress(){
        return this.formBuilder.group({
           tm_first_name:[''],
           tm_last_name:[''],
           tm_location:[''],
           tm_role:[''],
           tm_accredentials:[''],
           tm_bio:[''],
           image:['']
        });
    }
    
    backbutton(){
        this.navCtrl.pop();
    }
    
    //Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName,index) {
            this.showloader = true;
            this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
            let newImage = newFileName;
            this.profileSettingService.uploadImages(newImage,index).then(ObjectValue =>{
                this.showloader = false;
                if(ObjectValue['imagePath']){
                   console.log(ObjectValue);
                   this.uploadImagePath[index] = ObjectValue;
                }else{
                    console.log("status not got");
                }        
            });
        }, error => {
        });
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
    * @description: Set function to take team member image by camera or from gallery
    * @param: 
    * @return: 
    * @modifoed: 
    * @modifiedBy: Raj-M
    */
    public takePicture(sourceType,index) {
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then((imagePath) => {
            this.list[index].Imagesrc = imagePath;
            this.list[index].status = true;
            if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath).then(filePath => {
                  let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                  let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                  this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),index);
                });
            }else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),index);
            }
        }, (err) => {
    
        });
    }
    
    /*
    * @description: Action Sheet Open to choose that image from gallery or capture image
    * @param:
    * @return:
    */
    openAlertSheet(index) {
        let actionSheet = this.actionSheetCtrl.create({
            buttons: [{
                text: 'Choose From Gallery',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY,index);
                }
            },{
                text: 'Take Picture',
                 handler: () => {
                     this.takePicture(this.camera.PictureSourceType.CAMERA,index);
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
    /*
    * @description: Set function to load state name and designe type data from api
    * @param: 
    * @return: 
    * @modifoed: 
    * @modifiedBy: Raj-M
    */
    loadStateAndDesignData(){
        this.checktoken.selectState().then(data=>{
            this.stateCollection = (data["states"]);
        })
        this.checktoken.designerType().then(data=>{
            this.professionalType = (data["user_types"]);
        })
    }
    
//    remove(index){
//        const control = <FormArray>this.teamMember.controls['team_members'];
//        control.removeAt(index);
//    }
    
    ionViewDidLoad() {
      this.loadStateAndDesignData();
      console.log('ionViewDidLoad SettingProfilePage');
    }
}
