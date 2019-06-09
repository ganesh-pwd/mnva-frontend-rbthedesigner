import { Routes } from '@angular/router';
import { MainDataboxesComponent } from './main-databoxes/main-databoxes.component';
import { DataboxItemComponent } from './databox-item/databox-item.component';
import { DataboxItemSettingsComponent } from './databox-item-settings/databox-item-settings.component';
import { DataboxItemConnectivityComponent } from './databox-item-connectivity/databox-item-connectivity.component';

export const DataboxesRoutes: Routes = [
  { path: '', component: MainDataboxesComponent },
  { path: 'create-databox/:id', component: DataboxItemSettingsComponent },
  { path: 'edit-query/:id', component: DataboxItemSettingsComponent },
  {
    path: 'settings',
    children: [
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
  }
];
