import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingSubscriptionPage } from './setting-subscription';

@NgModule({
  declarations: [
    SettingSubscriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingSubscriptionPage),
  ],
})
export class SettingSubscriptionPageModule {}
