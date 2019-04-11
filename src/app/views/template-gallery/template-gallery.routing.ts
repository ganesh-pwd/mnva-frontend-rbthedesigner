import { Routes } from '@angular/router';
import { MainTemplateGalleryComponent } from './main-template-gallery/main-template-gallery.component';
import { TemplateGalleryLinkComponent } from './template-gallery-link/template-gallery-link.component';

export const TemplateGalleryRoutes: Routes = [
  {
    path: '', component: MainTemplateGalleryComponent,
      data: {
        title: 'Template Gallery', breadcrumb: 'Template Gallery'
      }
  },
  {
    path: ':template',
    component: TemplateGalleryLinkComponent
  }
];
