import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarkettemplatesPage } from './markettemplates';
import { IonicImageLoader } from 'ionic-image-loader';
import { MarketProvider } from '../../providers/market/market';

@NgModule({
  declarations: [
    MarkettemplatesPage,
  ],
  imports: [
    IonicPageModule.forChild(MarkettemplatesPage),
    IonicImageLoader
  ],
  providers: [
  	MarketProvider,
  ]
})
export class MarkettemplatesPageModule {}
