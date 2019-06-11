
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { FlexLayoutModule } from '@angular/flex-layout';
import { map } from 'rxjs/operators';
import { egretAnimations } from '../../../shared/animations/egret-animations';

import { FacebookLoginProvider, GoogleLoginProvider, SocialUser, AuthService  } from 'angularx-social-login';
import { AmplifyService } from 'aws-amplify-angular';
import { Router} from '@angular/router';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-reset-password',
  animations: [egretAnimations],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  resetForm: FormGroup;

  constructor(
    private amplifyService: AmplifyService ,
    private socialAuthService: AuthService,
    private router: Router,
    public navCtrl: NgxNavigationWithDataComponent
  ) {}

  ngOnInit() {
    this.resetForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  resetPassword() {

    console.log('re set Pass word:: ::');

    const username = this.navCtrl.get('username');

    const resetData = this.resetForm.value;
    const code = this.resetForm.get('code').value;
    const password = this.resetForm.get('password').value;

    console.log('re set Data:', resetData);

    this.submitButton.disabled = true;
    // this.progressBar.mode = 'indeterminate';

    this.amplifyService.auth().forgotPasswordSubmit(username, code, password)
    .then(data => {
      console.log(data);
      console.log('successfully changes password');
      this.router.navigate(['/sessions/signin']);
    })
    .catch(err => {
      console.log(err);
      console.log('Error message:', err.message);
      alert(err.message);
      this.submitButton.disabled = false;
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

}
