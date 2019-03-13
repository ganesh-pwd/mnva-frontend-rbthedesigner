import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
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
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SessionsRoutes } from "./sessions.routing";
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';

const classesToInclude = [
  LockscreenComponent, 
  SigninComponent, 
  SignupComponent, 
  NotFoundComponent, 
  ErrorComponent
]

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