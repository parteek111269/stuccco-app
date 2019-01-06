import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectionsPage } from './collections';
import { IonicImageLoader } from 'ionic-image-loader';
@NgModule({
  declarations: [
    CollectionsPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectionsPage),
    IonicImageLoader
  ],
})
export class CollectionsPageModule {}
