import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataboxesRoutes } from './databoxes.routing';
import { MainDataboxesComponent } from './main-databoxes/main-databoxes.component';
import {
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTooltipModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatChipsModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatRadioModule,
  MatTabsModule,
  MatInputModule,
  MatDialogModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSelectModule,
  MatExpansionModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { SharedModule } from '../../shared/shared.module';
import { DataboxItemComponent } from './databox-item/databox-item.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DataboxItemSettingsComponent } from './databox-item-settings/databox-item-settings.component';
import { DataboxItemConnectivityComponent } from './databox-item-connectivity/databox-item-connectivity.component';
import { HotTableModule } from '@handsontable-pro/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatExpansionModule,
    FlexLayoutModule,
    NgxDatatableModule,
    ChartsModule,
    FileUploadModule,
    CommonModule,
    LayoutModule,
    SharedModule,
    HotTableModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forChild(DataboxesRoutes)
  ],
  declarations: [
    MainDataboxesComponent,
    DataboxItemComponent,
    DataboxItemSettingsComponent,
    DataboxItemConnectivityComponent
  ]
})
export class DataboxesModule { }
