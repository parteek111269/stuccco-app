import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

//Providers or Services
import { ProjectProvider } from '../../providers/project/project';
// import { ProfilePage } from '../profile/profile';
import { LoadingController } from 'ionic-angular';

//Get user information form the session like user_id user_type
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
//common service and function
import { appDirectives } from '../../app/appdirectives/appdirectives';

//Enviorment variable
import * as api from '../../app/config/environment';

// @IonicPage()
@Component({
  selector: 'page-projectlistingdetail',
  templateUrl: 'projectlistingdetail.html',
})
export class ProjectlistingdetailPage {
    public project_id:any;
    public projectDetail = [];
    public projectStatus:boolean;
    public userAuthToken:any;
    public userAuthData:any;
    public dataId:any;
    public user_id:any;
    public user_type:any;
    public attachments:any;
    public projectDeatilContent:any;
    public projectContentShow:boolean = false;
    public projectTitle:any;
    public isMarkComepleteEnable:boolean = true;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public checktoken:UserAuthenticationProvider,
                public project: ProjectProvider,
                public commonAlert:appDirectives,
                public alertCtrl: AlertController,
                public loading: LoadingController
               ){
                this.dataId = this.navParams.data;
                if(this.dataId.project_id){
                    this.project_id = this.dataId.project_id;
                }else{
                    this.project_id = this.dataId;
                }
                this.userAuthToken = checktoken.authToken;
                this.userAuthData = JSON.parse(checktoken.userAuthData);
                if(this.userAuthToken){
                    this.user_id = this.userAuthData.id;
                    this.user_type = this.userAuthData.role; 
                    }
                }
  
    /**
    *@description: Set function to start get project deatil based on project id
    *@return: 
    *@param: project Id
    *@createdBy: Raj M
    *@modified:  15/9/17
    */
    projectDetailService(){
        let loader = this.loading.create({content: 'Loading...'});
        return loader.present().then(() => { 
                this.project.getProjectDetailData(this.project_id).then(projectDetailData => {
                    if(!projectDetailData){
                    loader.dismiss();
                    return false;
                }
                for(var key in projectDetailData){
                    for(var image in projectDetailData[key].Attachments){
                       projectDetailData[key].Attachments[image]['image_thumb_url'] = api.baseUrl+ projectDetailData[key].Attachments[image]['image_thumb_url'];
                          projectDetailData[key].Attachments[image]['img_url'] = api.baseUrl+ projectDetailData[key].Attachments[image]['img_url'];
                    }
                    this.projectDetail = projectDetailData[key];
                    this.attachments = this.projectDetail['Attachments']
                    this.user_id = projectDetailData[key].user_id;
                    this.projectTitle = (this.projectDetail['user_type'] == 'hired_to_do') ? 'Project hired to do - details' : 'Project I hired someone else to do - details'
                    if(projectDetailData[key].status === 'In Progress' && this.user_type == 1){
                        this.projectStatus = true;
                    }else{
                        this.projectStatus = false;
                    }
                }
                loader.dismiss();
            }) 
        })
    }
    
    /**
    *@description: Set function to start get project deatil based on project id
    *@return: 
    *@param: project Id
    *@createdBy: Raj M
    *@modified:  15/9/17
    */
    
    changeStatus(){
         let obj = {
                title: 'Important:',
                message: 'By selecting "Complete" I agree that I’ve satisfied my obligations to the best of my ability and have sent the client the deliverables. I understand that the client will be notified that the project status has changed to Complete and they will be asked to submit a review of my work.',
                buttonText: 'OK'
            };
        this.showConfirm(obj);
    }
    
    
     /*
    *@description: show agree or disagree alert controll
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified: 
    */
    showConfirm(obj) {
        let confirm = this.alertCtrl.create({
            title: (obj.title),
            message:  (obj.message),
            buttons: [
                {
                    text: 'cancel',
                    handler: () => {
                }
            },
                {
                  text: 'Complete',
                  handler: () => {
                    this.completeChange();
                }
            }
          ]
        });
        confirm.present();
    }
  
     /*
    *@description: show agree or disagree alert controll
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified: 
    */
    completeChange(){
        this.isMarkComepleteEnable = false;
        this.project.changeStatusApi(this.user_id,this.project_id).then(projectUpdatedStatus =>{
            if(projectUpdatedStatus){
                this.projectStatus = false;
                this.projectDetail['status'] = 'Completed';
               }else{
                this.projectStatus = true;
            }
            this.isMarkComepleteEnable = true;
        });
    }

    /*
    *@description: set function go to user profile
    *@return: 
    *@param:
    *@createdBy: Raj M
    *@modified: 
    */
    goToUserProfile(username){
        let param = {'username':username};
        this.navCtrl.push('ProfilePage', param, {animate:true,animation:'transition',duration:500,direction:'forward'});
    }
    
    
    backbutton(){
        this.navCtrl.pop();
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad ProjectlistingdetailPage');
      this.projectDetailService();
    }

}
