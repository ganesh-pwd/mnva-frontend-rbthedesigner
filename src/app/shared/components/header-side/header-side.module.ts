import  { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 

import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from '../../../app.component';



@NgModule({ 
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgbModule
  ],
  declarations: [AppComponent],
  providers: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})


export class HeaderSideModule { } 


