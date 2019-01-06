import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowingPage } from './following';
import { IonicImageLoader } from 'ionic-image-loader';
@NgModule({
  declarations: [
    FollowingPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowingPage),
    IonicImageLoader
  ],
})
export class FollowingPageModule {}
