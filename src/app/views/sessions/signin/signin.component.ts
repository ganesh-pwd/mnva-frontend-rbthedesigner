import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatButton } from '@angular/material';
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
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
<<<<<<< HEAD
      rememberMe: new FormControl(false)
=======
      rememberMe: new FormControl(true)
>>>>>>> 5b23fc1deadab64d1841200b143b364d0d0f1ac5
    })
  }

  signin() {
    const signinData = this.signinForm.value
    console.log(signinData);
<<<<<<< HEAD
=======

    this.submitButton.disabled = true;
  }
>>>>>>> 5b23fc1deadab64d1841200b143b364d0d0f1ac5

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }

}