import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { DataboxesRoutes } from './databoxes.routing';
import { MainDataboxesComponent } from './main-databoxes/main-databoxes.component';
import { DataboxItemInitializeComponent } from './databox-item-initialize/databox-item-initialize.component';
import { SearchPipe } from '../../shared/pipes/search-pipe';
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
  MatRadioModule,
  MatTabsModule,
  MatInputModule,
  MatTooltipModule,
  MatDialogModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTableModule, 
  MatPaginatorModule, 
  MatSortModule,
  MatSelectModule,
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { SharedModule } from '../../shared/shared.module';
import { DataboxItemComponent } from './databox-item/databox-item.component';
import { DataboxFolderComponent } from './databox-folder/databox-folder.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DataboxItemSettingsComponent } from './databox-item-settings/databox-item-settings.component';
import { DataboxItemConnectivityComponent } from './databox-item-connectivity/databox-item-connectivity.component';
import { DataboxItemPagesearchComponent } from './databox-item-pagesearch/databox-item-pagesearch.component';
import { HotTableModule } from '@handsontable-pro/angular';

@NgModule({
  imports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule,
    MatSelectModule,
    FlexLayoutModule,
    NgxDatatableModule,
    ChartsModule,
    FileUploadModule,
    CommonModule,
    FormsModule,
    LayoutModule,
    SharedModule,
    HotTableModule,
    RouterModule.forChild(DataboxesRoutes)
  ],
  declarations: [
    MainDataboxesComponent, 
    DataboxItemComponent,
    DataboxFolderComponent, 
    DataboxItemInitializeComponent, 
    DataboxItemSettingsComponent, 
    DataboxItemConnectivityComponent, 
    DataboxItemPagesearchComponent,
    SearchPipe,
  ]
})
export class DataboxesModule { }
