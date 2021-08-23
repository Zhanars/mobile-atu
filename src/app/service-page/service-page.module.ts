import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicePagePageRoutingModule } from './service-page-routing.module';

import { ServicePagePage } from './service-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicePagePageRoutingModule
  ],
  declarations: [ServicePagePage]
})
export class ServicePagePageModule {}
