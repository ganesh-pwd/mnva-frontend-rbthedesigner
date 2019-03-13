import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HelpComponent } from './help.component';
import { HelpRoutes } from './help.routing';
import {
  MatProgressBarModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatGridListModule,
  MatMenuModule,
  MatListModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatRadioModule,
  MatTabsModule,
  MatTooltipModule,
  MatDialogModule
 } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    MatListModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatRadioModule,
    MatTabsModule,
    MatTooltipModule,
    MatDialogModule,
    RouterModule.forChild(HelpRoutes)
  ],
  declarations: [HelpComponent]
})
export class HelpModule { }
