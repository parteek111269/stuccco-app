import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewstylePage } from './reviewstyle';
import { Ionic2RatingModule } from 'ionic2-rating';
@NgModule({
  declarations: [
    ReviewstylePage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewstylePage),
    Ionic2RatingModule
  ],
  exports: [
    ReviewstylePage
  ]
})
export class ReviewstylePageModule {}
