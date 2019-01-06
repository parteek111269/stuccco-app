import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowersPage } from './followers';
import { IonicImageLoader } from 'ionic-image-loader';
@NgModule({
  declarations: [
    FollowersPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowersPage),
    IonicImageLoader,
  ],
})
export class FollowersPageModule {}
