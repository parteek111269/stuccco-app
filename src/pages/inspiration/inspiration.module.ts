import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspirationPage } from './inspiration';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    InspirationPage,
  ],
  imports: [
    IonicPageModule.forChild(InspirationPage),
    IonicImageLoader
  ],
  exports: [
    InspirationPage
  ]
})
export class InspirationPageModule {}
