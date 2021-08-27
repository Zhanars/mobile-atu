import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UmkdPage } from './umkd.page';

const routes: Routes = [
  {
    path: '',
    component: UmkdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UmkdPageRoutingModule {}
