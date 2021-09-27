import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UmkdPageRoutingModule } from './umkd-routing.module';
import { UmkdPage } from './umkd.page';
import { ExpandableComponent } from '../../../components/expandable/expandable.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UmkdPageRoutingModule
  ],
  declarations: [UmkdPage,ExpandableComponent]
})
export class UmkdPageModule {}
