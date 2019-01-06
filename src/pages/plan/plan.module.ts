import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanPage } from './plan';
import { IonicImageLoader } from 'ionic-image-loader';
import { PlansProvider } from '../../providers/plans/plans';
import { CurrencyPipe } from '../../pipes/currency/currency';

@NgModule({
  declarations: [
    PlanPage,
    CurrencyPipe
  ],
  imports: [
    IonicPageModule.forChild(PlanPage),
    IonicImageLoader
  ],
  providers: [PlansProvider]
})
export class PlanPageModule {}
