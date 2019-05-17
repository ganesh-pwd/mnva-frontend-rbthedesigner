import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { egretAnimations } from '../../../shared/animations/egret-animations';

import { AmplifyService } from 'aws-amplify-angular';
import { Router} from '@angular/router';

import { FacebookLoginProvider, GoogleLoginProvider, SocialUser, AuthService  } from 'angularx-social-login';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-signup',
  animations: [egretAnimations],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signupForm: FormGroup;
  awsConfirm: any;

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(
    private amplifyService: AmplifyService ,
    private router: Router,
    private socialAuthService: AuthService,
    public navCtrl: NgxNavigationWithDataComponent
  ) {
    console.log('Signup Component constructor');
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

    const password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: password,
      confirmPassword: confirmPassword,
      agreed: new FormControl('', (control: FormControl) => {
        const agreed = control.value;
        if (!agreed) {
          return { agreed: true };
        }
        return null;
      })
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

  signup() {
    console.log('1 Signup Component signup signup::::');

    const signupData = this.signupForm.value;
    signupData ['username'] = this.signupForm.get('email').value;

    console.log(signupData);

    this.submitButton.disabled = true;
    // this.progressBar.mode = 'indeterminate';

    this.amplifyService.auth().signUp(signupData)
    .then(data => {
      console.log(data);
      this.awsConfirm = data;
      if (this.awsConfirm) {
        console.log('confirm the signup');
        console.log(this.awsConfirm);
        const username = this.awsConfirm.user.username;
        console.log(username);
        this.navCtrl.navigate('/sessions/confirm', {username: username});
      }
    })
    .catch(err => {
      console.log(err);
      console.log('Error message:', err.message);
      alert(err.message);
      this.submitButton.disabled = false;
    });
  }

  // signup() {
  //   const signupData = this.signupForm.value;

  //   this.submitButton.disabled = true;
  //   this.progressBar.mode = 'indeterminate';
  // }

}
