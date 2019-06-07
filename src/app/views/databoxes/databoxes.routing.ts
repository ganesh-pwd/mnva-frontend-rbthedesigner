import { Routes } from '@angular/router';
import { MainDataboxesComponent } from './main-databoxes/main-databoxes.component';
import { DataboxItemComponent } from './databox-item/databox-item.component';
import { DataboxItemInitializeComponent } from './databox-item-initialize/databox-item-initialize.component';
import { DataboxItemSettingsComponent } from './databox-item-settings/databox-item-settings.component';
import { DataboxItemConnectivityComponent } from './databox-item-connectivity/databox-item-connectivity.component';

export const DataboxesRoutes: Routes = [
  { path: '', component: MainDataboxesComponent },
  { path: 'create-databox/:id', component: DataboxItemSettingsComponent },
  { path: 'edit-databox/:id', component: DataboxItemSettingsComponent },
  {
    path: 'settings',
    children: [
      /*
      //temporary remove databoxes/settings/id and replaced with create and edit databox

      {
        path: ':id',
        component: DataboxItemSettingsComponent
      },

      */
      {
        path: 'connect/:id',
        component: DataboxItemConnectivityComponent
      }
    ]
  },
  {
    path: ':id',
    component: DataboxItemComponent
  },
  {
    path: ':id/:page',
    component: DataboxItemComponent
  },
  {
    path: ':id/initialize',
    component: DataboxItemInitializeComponent
  }
];
