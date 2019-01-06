import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarketPage } from './market';
import { IonicImageLoader } from 'ionic-image-loader';
import { NocontentComponent } from '../../components/nocontent/nocontent';
import { MarketProvider } from '../../providers/market/market';

@NgModule({
  declarations: [
    MarketPage,
    NocontentComponent
  ],
  imports: [
    IonicPageModule.forChild(MarketPage),
    IonicImageLoader
  ],
  providers: [
  	MarketProvider
  ]
})
export class MarketPageModule {}
