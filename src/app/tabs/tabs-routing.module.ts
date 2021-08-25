import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'service',
        loadChildren: () => import('../pages/service/service.module').then(m => m.ServicePageModule)
      },
      {
        path: 'document',
        loadChildren: () => import('../pages/document/document.module').then(m => m.DocumentPageModule)
      },
      {
        path: 'info',
        loadChildren: () => import('../pages/info/info.module').then(m => m.InfoPageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('../pages/notification/notification.module').then(m => m.NotificationPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
