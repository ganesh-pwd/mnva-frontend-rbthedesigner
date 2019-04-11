import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MinervaAccountAuthRoutes } from './minerva-account-auth.routing';
import { SharedModule } from '../../shared/shared.module';
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
import { MinervaNotificationsComponent } from './minerva-notifications/minerva-notifications.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { MinervaUsersComponent } from './minerva-users/minerva-users.component';
import { MinervaBillingComponent } from './minerva-billing/minerva-billing.component';

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
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    RouterModule.forChild(MinervaAccountAuthRoutes)
  ],
  declarations: [
    MinervaNotificationsComponent,
    AccountSettingsComponent,
    MinervaUsersComponent,
    MinervaBillingComponent
  ]
})
export class MinervaAccountAuthModule { }
