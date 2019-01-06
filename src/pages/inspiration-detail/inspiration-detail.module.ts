import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspirationDetailPage } from './inspiration-detail';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    InspirationDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(InspirationDetailPage),
    IonicImageLoader
  ],
  exports: [
    InspirationDetailPage
  ]
})
export class InspirationDetailPageModule {}
