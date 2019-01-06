import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage } from './product';
import { ProductProvider } from '../../providers/product/product';

@NgModule({
  declarations: [
    ProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductPage),
  ],
  providers: [ProductProvider]
})
export class ProductPageModule {}
