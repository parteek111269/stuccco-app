import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LikesPage } from './likes';
import { IonicImageLoader } from 'ionic-image-loader';
@NgModule({
  declarations: [
    LikesPage,
  ],
  imports: [
    IonicPageModule.forChild(LikesPage),
    IonicImageLoader
  ],
})
export class LikesPageModule {}
