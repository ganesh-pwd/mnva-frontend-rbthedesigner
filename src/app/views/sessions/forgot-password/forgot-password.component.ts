import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';

import { AmplifyService } from 'aws-amplify-angular';
import { Router} from '@angular/router';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  userEmail;
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  
  constructor(
    private amplifyService: AmplifyService ,
    private router: Router,
    public navCtrl: NgxNavigationWithDataComponent
    ) {
    console.log('For got Pass word Compo nent constructor');
  }


  ngOnInit() {
    console.log('For got Pass word Comp onent ngOn Init');
  }
  submitEmail() {
    this.submitButton.disabled = true;
    // this.progressBar.mode = 'indeterminate'; 'indeterminate';

    console.log('For got Pass this.userEmail:', this.userEmail);

    this.amplifyService.auth().forgotPassword(this.userEmail)
    .then(data => {
      console.log(data);
      if (data) {
        console.log('forgot user name:');
        this.navCtrl.navigate('/sessions/resetPassword', {username: this.userEmail});
      }
    })
    .catch(err => {
      console.log(err);
      console.log('Error message:', err.message);
      alert(err.message);
      this.submitButton.disabled = false;
    });

  }
}
