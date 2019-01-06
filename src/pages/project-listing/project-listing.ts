import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {ChangeDetectorRef} from '@angular/core';
import { ProjectProvider } from '../../providers/project/project';
//scroll to top
import { Content } from 'ionic-angular';
//Pages
import { ProjectlistingdetailPage } from '../projectlistingdetail/projectlistingdetail';
//Get user information form the session
import { UserAuthenticationProvider } from '../../providers/user-authentication/user-authentication';
//Loader
import { LoadingController } from 'ionic-angular';
//common service and function
import { appDirectives } from '../../app/appdirectives/appdirectives';

@IonicPage()
@Component({
  selector: 'page-project-listing',
  templateUrl: 'project-listing.html',

})
export class ProjectListingPage {
    @ViewChild(Content) content: Content;
    public projectlisting:any;
    public hasMoreData:boolean = true;
    public page:number=1;
    public isloader:number=1;
    public dataSetHiredBy = [];
    public dataSetHiredByOther = [];
    public userAuthData:any;
    public user_type:any;
    public hireByCountPage:number = 1;
    public hireByOtherCountPage:number = 0;
    public isScrollToTop:boolean;
    public total_page:any;
    public flag:boolean = true;
    constructor(
            public navCtrl: NavController,
            public project: ProjectProvider,
            public checktoken:UserAuthenticationProvider,
            public commonAlert:appDirectives,
            public loading: LoadingController,
            public changeDetectorRef: ChangeDetectorRef,
        ){   
            let userAuthToken = checktoken.authToken;
            this.userAuthData = (userAuthToken) ? JSON.parse(checktoken.userAuthData) : "null";
            this.user_type = (this.userAuthData) ? this.userAuthData.role : 'null';
            this.projectlisting = "Hired_to_do";
        }
        
        /**
        *@description: Set function to show the details of hired designer
        *@return: 
        *@param:
        *@createdBy: Raj M
        *@modified:  
        */ 
        view_detail(id,tabId){
            this.navCtrl.push(ProjectlistingdetailPage,{'project_id':id,'segment_id':tabId},{animate:true,animation:'transition',duration:500,direction:'forward'});
        }
        
        
        /**
        *@description: Set function to get Project data of project type Hired Me
        *@return: 
        *@param:
        *@createdBy: Raj M
        *@modified:  
        */
        hiredBy(){
            let projectType = 'hired_me';
            if(this.isloader){
            let loader = this.loading.create({content: 'Loading...'});
                    loader.present().then(() =>{
                        this.project.getProjectListingData(projectType,this.page).then(projectListHiredMeData => {
                        if(!projectListHiredMeData){
                            loader.dismiss();
                            return false;
                        }
                        this.total_page = projectListHiredMeData['projects'].total_pages
                        this.hasMoreData = true;
                        for(var key of projectListHiredMeData['projects'].projects){
                            this.dataSetHiredBy.push(key)
                        }
                        loader.dismiss();
                    })
                })
            }else{
                return this.project.getProjectListingData(projectType,this.page).then(projectListHiredMeData => {
                    this.total_page = projectListHiredMeData['projects'].total_pages
                    this.hasMoreData = true;
                    for(var key of projectListHiredMeData['projects'].projects){
                        this.dataSetHiredBy.push(key)
                    }
                })
            }
        }
        
        /**
        *@description: Set function to get Project data of project type HiredOthers
        *@return: 
        *@param:
        *@createdBy: Raj M
        *@modified:  
        */
        hiredOthers(){
                let projectType = 'hired_others';
                if(this.isloader){
                        let loader = this.loading.create({content: 'Loading...'});
                        loader.present().then(() =>{
                            this.project.getProjectListingData(projectType,this.page).then(projectListHiredByOtherData => {
                            if(!projectListHiredByOtherData){
                                loader.dismiss();
                                return false;
                            }
                            this.total_page = projectListHiredByOtherData['projects'].total_pages
                            this.hasMoreData = true;
                            for(var key of projectListHiredByOtherData['projects'].projects){
                                 this.dataSetHiredByOther.push(key)
                            }
                            if(this.dataSetHiredByOther.length==0){
                                this.hasMoreData = false;
                            }
                            loader.dismiss();
                        })
                    })
                }else{
                    return this.project.getProjectListingData(projectType,this.page).then(projectListHiredByOtherData => {
                        this.total_page = projectListHiredByOtherData['projects'].total_pages
                        this.hasMoreData = true;
                        for(var key of projectListHiredByOtherData['projects'].projects){
                            this.dataSetHiredByOther.push(key)
                        }
                    })
                }
        }    
        
        /**
        *@description: Set function to update segment list. 
        *@return: 
        *@param:
        *@createdBy: Raj M
        *@modified:  
        */
        updatePage(projectlisting) {
            if(projectlisting == 'Hired_others_to_do' && (this.flag || this.page != 1)){
                this.page = this.hireByOtherCountPage + 1;
                this.hiredOthers();
                this.flag = false;
                this.LoaderForChangeSegment();
            }else{
                this.LoaderForChangeSegment();
            }
        }
        
        /**
        *@description: Set function just change segment time loader set time 50. 
        *@return: 
        *@param:
        *@createdBy: Raj M
        *@modified:  
        */
        LoaderForChangeSegment(){
             let loader = this.loading.create({content: 'Loading...'});
                loader.present().then(() =>{
                    setTimeout(function(){
                    loader.dismiss();
                },50);
            })
        }
        
        /**
        *@description: Set function to scroll to top project list. 
        *@return: 
        *@param:
        *@createdBy: Raj M
        *@modified:  
        */
        scrollToTop() {
           this.content.scrollToTop();
           this.changeDetectorRef.detectChanges();
        }
        
        scrollHandler(event){
            if(event.scrollTop > 0 && event.directionY =="down"){
                this.isScrollToTop = true;
                this.changeDetectorRef.detectChanges();
            }else if(event.scrollTop == 0 && event.directionY =="up"){
                this.isScrollToTop = false;
                this.changeDetectorRef.detectChanges();
            }else{
                return false
            }
        }
        
        
        /**
        *@description: function to be set to infinite loader show for pagination
        *@return: 
        *@param: 
        *@createdBy: Raj M
        *@modified:  
        */
    
        doInfinite(infiniteScrollEvent,projectListingType){
            if(this.page<this.total_page){
            this.page+=1;
            }else{
                this.hasMoreData = false;
                return false;
            }
            this.isloader = 0;
            if(projectListingType=='Hired_to_do'){
                this.hireByCountPage++;
                this.page = this.hireByCountPage;
                this.hiredBy().then(()=>{
                    if(this.page != this.total_page){
                        infiniteScrollEvent.complete();
                    }else{
                        this.hasMoreData = false;
                        return false;
                    }
                });
            }else{
                this.hireByOtherCountPage++;
                this.page = this.hireByOtherCountPage;
                this.hiredOthers().then(()=>{
                    if(this.page != this.total_page){
                        infiniteScrollEvent.complete();
                    }else{
                        this.hasMoreData = false;
                        return false;
                    }
                });
            }
        }  
        /**
        *@description: intial level function
        *@return: 
        *@param:
        *@createdBy: Raj M
        *@modified:  
        */
        ionViewDidLoad(){
            if(this.user_type == 1){
                this.hiredBy();
            }else{
                this.hiredOthers();
            }
        }
        
}

