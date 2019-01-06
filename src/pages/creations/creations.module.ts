import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreationsPage } from './creations';
import { IonicImageLoader } from 'ionic-image-loader';
@NgModule({
  declarations: [
    CreationsPage,
  ],
  imports: [
    IonicPageModule.forChild(CreationsPage),
    IonicImageLoader
  ],
})
export class CreationsPageModule {}
