import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { map } from 'rxjs/operators';
import { egretAnimations } from '../../../shared/animations/egret-animations';

@Component({
  selector: "app-main-minerva-account",
  animations: [egretAnimations],
  templateUrl: "./main-minerva-account.component.html",
  styleUrls: ["./main-minerva-account.component.scss"]
})
export class MainMinervaAccountComponent implements OnInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;
  public loggedInUser: any;

  constructor() {
    this.loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  }

  ngOnInit() {}

  signin() {
    this.submitButton.disabled = false;
    this.progressBar.mode = 'indeterminate';
  }

  ngOnDestroy() {}
}
