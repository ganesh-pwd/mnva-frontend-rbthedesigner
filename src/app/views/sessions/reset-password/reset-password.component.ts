
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { FlexLayoutModule } from '@angular/flex-layout';
import { map } from 'rxjs/operators';
import { egretAnimations } from '../../../shared/animations/egret-animations';

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
    private router: Router,
    public navCtrl: NgxNavigationWithDataComponent
  ) {
    console.log('re set pass word Component constructor');
  }

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

}
