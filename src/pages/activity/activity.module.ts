import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityPage } from './activity';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    ActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityPage),
    IonicImageLoader
  ],
})
export class ActivityPageModule {}
