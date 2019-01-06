import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedPage } from './feed';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    FeedPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedPage),
    IonicImageLoader,
  ],
})
export class FeedPageModule {}