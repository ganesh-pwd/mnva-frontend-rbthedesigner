import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { FlexLayoutModule } from '@angular/flex-layout';
import { map } from 'rxjs/operators';
import { egretAnimations } from "../../../shared/animations/egret-animations";


@Component({
  selector: 'app-signup',
  animations: [egretAnimations],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  constructor() {}

  ngOnInit() {
  }

  signup() {
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }

}
