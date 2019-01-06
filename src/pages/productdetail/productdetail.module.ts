import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductdetailPage } from './productdetail';
import { ProductProvider } from '../../providers/product/product';
@NgModule({
  declarations: [
    ProductdetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductdetailPage),
  ],
  providers: [ProductProvider]
})
export class ProductdetailPageModule {}
