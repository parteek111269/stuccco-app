import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TemplateformPage } from './templateform';
import { MarketProvider } from '../../providers/market/market';

@NgModule({
  declarations: [
    TemplateformPage,
  ],
  imports: [
    IonicPageModule.forChild(TemplateformPage),
  ],
  providers: [
  	MarketProvider
  ]
})
export class TemplateformPageModule {}
