import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MinervaAccountRoutes } from './minerva-account.routing';
import { MainMinervaAccountComponent } from './main-minerva-account/main-minerva-account.component';
import {
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
  MatProgressBarModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { LayoutModule } from '@angular/cdk/layout';
import { CreateMinervaAccountComponent } from './create-minerva-account/create-minerva-account.component';
import { CreateMinervaEmailComponent } from './create-minerva-email/create-minerva-email.component';
import { ChooseMinervaAccountComponent } from './choose-minerva-account/choose-minerva-account.component';

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
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule,
    NgxDatatableModule,
    ChartsModule,
    FileUploadModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    RouterModule.forChild(MinervaAccountRoutes)
  ],
  declarations: [
    MainMinervaAccountComponent,
    CreateMinervaAccountComponent,
    CreateMinervaEmailComponent,
    ChooseMinervaAccountComponent
  ]
})
export class MinervaAccountModule { }
