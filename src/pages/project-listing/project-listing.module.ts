import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectListingPage } from './project-listing';

@NgModule({
  declarations: [
    ProjectListingPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectListingPage),
  ],
  exports: [
    ProjectListingPage
  ]
})
export class ProjectListingPageModule {}
