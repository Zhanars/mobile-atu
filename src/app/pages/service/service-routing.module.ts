import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicePage } from './service.page';
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: 'form/:productId',
    loadChildren: () => import('./form/form.module').then( m => m.FormPageModule)
  },
  {
    path: '',
    component: ServicePage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [RouterModule],
})

export class ServicePageRoutingModule {}
