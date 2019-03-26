import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { map } from 'rxjs/operators';
import { egretAnimations } from '../../../shared/animations/egret-animations';

import { AmplifyService } from 'aws-amplify-angular';
import { Router} from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialUser, AuthService  } from 'angularx-social-login';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

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
  awsConfirm: any;

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(
    private amplifyService: AmplifyService ,
    private router: Router,
    private socialAuthService: AuthService,
    public navCtrl: NgxNavigationWithDataComponent) {
    console.log('Signin Component constructor');
  }

  ngOnInit() {

    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        console.log('User is already logged In');
        this.router.navigate(['/databoxes']);
      }
    });

    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
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

  signin() {
    console.log('Sign in Component sign in Data');

    const signinData = this.signinForm.value;
    console.log(signinData);
    this.submitButton.disabled = true;
    // this.progressBar.mode = 'indeterminate';

    this.amplifyService.auth().signIn(signinData)
    .then(data => {
      console.log(data);
      this.awsConfirm = data;
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
      this.submitButton.disabled = false;
    });

  }

}