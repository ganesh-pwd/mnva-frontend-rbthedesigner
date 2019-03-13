import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { map } from 'rxjs/operators';
import { egretAnimations } from '../../../shared/animations/egret-animations';

@Component({
  selector: 'app-signin',
  animations: [egretAnimations],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;

  constructor() {}

  ngOnInit() {
  }

  signin() {
    this.submitButton.disabled = false;
    this.progressBar.mode = 'indeterminate';
  }

  ngOnDestroy() {
  }

}
