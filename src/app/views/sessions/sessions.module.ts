import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { FlexLayoutModule } from '@angular/flex-layout';

// import { CommonDirectivesModule } from './sdirectives/common/common-directives.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ChooseAccountComponent } from './choose-account/choose-account.component';
import { SessionsRoutes } from './sessions.routing';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const classesToInclude = [
  ForgotPasswordComponent,
  LockscreenComponent,
  SigninComponent,
  SignupComponent,
  ChooseAccountComponent,
  ConfirmComponent,
  ResetPasswordComponent,
  NotFoundComponent,
  ErrorComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatRadioModule,
    MatTabsModule,
    MatTooltipModule,
    MatDialogModule,
    FlexLayoutModule,
    RouterModule.forChild(SessionsRoutes)
  ],
  declarations: [classesToInclude]
})
export class SessionsModule { }