import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemplateGalleryRoutes } from './template-gallery.routing';
import { MainTemplateGalleryComponent } from './main-template-gallery/main-template-gallery.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TemplateGalleryLinkComponent } from './template-gallery-link/template-gallery-link.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import {
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatProgressBarModule,
  MatButtonModule,
  MatChipsModule,
  MatListModule,
  MatGridListModule,
  MatSelectModule
 } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatProgressBarModule,
    MatButtonModule,
    MatChipsModule,
    MatSelectModule,
    MatListModule,
    MatGridListModule,
    FlexLayoutModule,
    SharedModule,
    RouterModule.forChild(TemplateGalleryRoutes)
  ],
  declarations: [
    MainTemplateGalleryComponent,
    TemplateGalleryLinkComponent
  ]
})
export class TemplateGalleryModule { }
