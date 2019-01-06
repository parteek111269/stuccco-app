import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvicedetailPage } from './advicedetail';
import { FeedProvider } from '../../providers/feed/feed';

@NgModule({
  declarations: [
    AdvicedetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AdvicedetailPage),
  ],
  providers: [
  	FeedProvider
  ]
})
export class AdvicedetailPageModule {}
