import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { map } from 'rxjs/operators';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../../shared/services/auth/user-services';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';
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

  private reqUser: Subscription;

  constructor(private router: Router,
    private userService: UserService,
    private minervaAccountChangeService: MinervaAccountChangeService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    // initialize sign in form
    this.createForm();
  }

  // build sign in form
  createForm() {
    this.signinForm = this.formBuilder.group({
      'username': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'agreed': [null, Validators.compose([Validators.required])],
      'rememberMe': false,
    });
  }

  // simple sign in
  signin() {
    let body = {
      'username': this.signinForm.get('username').value,
      'password': this.signinForm.get('password').value
    }

    // temporary select a user and set it as the currently logged in user
    this.reqUser = this.userService
    .signInUser(body.username, body.password)
    .subscribe((result) => {

      // set logged in user from ../fake-db/user.ts
      sessionStorage.setItem('loggedInUser', JSON.stringify(result[0]));

      // set image
      this.minervaAccountChangeService.setImage(result[0].profile_image);

      // navigate to databox dashboard
      setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true });
        this.router.navigate(['/databoxes']);
      }, 1000);
    });

    /* temporary disable
    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate'; */
  }

}
