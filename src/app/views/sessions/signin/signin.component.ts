import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { map } from 'rxjs/operators';
import { egretAnimations } from '../../../shared/animations/egret-animations';

import { AmplifyService } from 'aws-amplify-angular';
import { FacebookLoginProvider, GoogleLoginProvider, SocialUser, AuthService  } from 'angularx-social-login';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

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
  // @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;
  awsConfirm: any;

  private user: SocialUser;
  private loggedIn: boolean;

  private reqUser: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private minervaAccountChangeService: MinervaAccountChangeService,
    private formBuilder: FormBuilder,
    private amplifyService: AmplifyService ,
    private socialAuthService: AuthService,
    public navCtrl: NgxNavigationWithDataComponent
  ) {
    console.log('Signin Component constructor');
  }

  ngOnInit() {
    // initialize sign in form
    this.createForm();

    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        console.log('User is already logged In');
        this.router.navigate(['/databoxes']);
      }
    });
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

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in in data : ' , userData);
        this.handleSocialSignIn(userData, socialPlatform);
      }
    );
  }

  async handleSocialSignIn(data, socialPlatform) {

    console.log('handle social Sign In', data);

    const { expiresIn, name, email, photoUrl } = data;
    const expires_at = expiresIn * 1000 + new Date().getTime();
    sessionStorage.setItem('userName', name);
    sessionStorage.setItem('photoUrl', photoUrl);

    let { authToken: token } = data;
    if (socialPlatform === 'google') {
      token = data['idToken'];
    }

    try {
      const federatedResponse = await this.amplifyService.auth().federatedSignIn(
        socialPlatform,
        { token, expires_at },
        { name, email }
      );
      if (federatedResponse.authenticated) {
        console.log('AWS federated Response:', federatedResponse);
        this.router.navigate(['/databoxes']);
      }
    } catch (error) {
      console.log('error:', error);
    }
  }

  // simple sign in
  signin() {
    console.log('Sign in Component sign in Data');
    const body = {
      'username': this.signinForm.get('username').value,
      'password': this.signinForm.get('password').value
    };

    const signinData = this.signinForm.value;
    console.log('signinData: ', signinData);

    // this.submitButton.disabled = true;

    // temporary disable
    // this.progressBar.mode = 'indeterminate';
    /*
    this.amplifyService.auth().signIn(signinData)
    .then(data => {
      console.log('data: ', data);
      this.awsConfirm = data;
      console.log('awsConfirm: ', this.awsConfirm);
      if (this.awsConfirm) {
        const username = this.awsConfirm.username;
        console.log('username:', username);
        sessionStorage.setItem('userName', signinData.username);
        this.router.navigate(['/databoxes']);
      }
    })
    .catch(err => {
      console.log(err);
      console.log('Error message:', err.message);
      if (err.code === 'UserNotConfirmedException') {
        this.navCtrl.navigate('/sessions/confirm', {username: signinData.username});
      }
      alert(err.message);
      // this.submitButton.disabled = false;
    });*/

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

  }

}
