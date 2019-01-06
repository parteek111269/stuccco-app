import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchasetemplatePage } from './purchasetemplate';
import { MarketProvider } from '../../providers/market/market';

@NgModule({
  declarations: [
    PurchasetemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(PurchasetemplatePage),
  ],
  providers: [
  	MarketProvider
  ]
})
export class PurchasetemplatePageModule {}
