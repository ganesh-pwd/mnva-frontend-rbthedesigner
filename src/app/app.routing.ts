import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/services/auth/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'sessions/signin',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: './views/sessions/sessions.module#SessionsModule',
        data: { title: 'Session'}
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'accounts',
        loadChildren: './views/minerva-account/minerva-account.module#MinervaAccountModule',
        data: { title: 'Accounts'}
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'help',
        loadChildren: './views/help/help.module#HelpModule',
        data: { title: 'Help', breadcrumb: 'Help'}
      },
      {
        path: 'accounts',
        loadChildren: './views/minerva-account/minerva-account-auth.module#MinervaAccountAuthModule',
        data: { title: 'Accounts', breadcrumb: 'Accounts'}
      },
      {
        path: 'databoxes',
        loadChildren: './views/databoxes/databoxes.module#DataboxesModule',
        data: { title: 'Databoxes', breadcrumb: 'Databoxes'}
      },
      {
        path: 'template-gallery',
        loadChildren: './views/template-gallery/template-gallery.module#TemplateGalleryModule',
        data: { title: 'Template Gallery', breadcrumb: 'Template Gallery'}
      },
      {
        path: 'products',
        loadChildren: './views/products/products.module#ProductsModule',
        data: { title: 'Products', breadcrumb: 'Products'}
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];
