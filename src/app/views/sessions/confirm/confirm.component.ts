import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { FlexLayoutModule } from '@angular/flex-layout';
import { map } from 'rxjs/operators';
import { egretAnimations } from '../../../shared/animations/egret-animations';

import { AmplifyService } from 'aws-amplify-angular';
import { Router, ActivatedRoute} from '@angular/router';
import { NgxNavigationWithDataComponent } from 'ngx-navigation-with-data';

@Component({
  selector: 'app-confirm',
  animations: [egretAnimations],
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  @Input()
  username: string;

  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  awsConfirm: any;

  confirmForm: FormGroup;
  constructor(
    private amplifyService: AmplifyService ,
    private router: Router,
    private route: ActivatedRoute,
    public navCtrl: NgxNavigationWithDataComponent
    ) {
      console.log('this navCtrl data::', this.navCtrl.data);
  }

  ngOnInit() {

    console.log('confirm Component ngOnInit');


    this.confirmForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
      agreed: new FormControl('', (control: FormControl) => {
        const agreed = control.value;
        if (!agreed) {
          return { agreed: true };
        }
        return null;
      })
    });
  }

  confirm() {

    console.log('confirm Component confirm confirm::::');

    this.username = this.navCtrl.get('username');
    const confirmData = this.confirmForm.value;
    console.log(confirmData);

    this.submitButton.disabled = true;
    // this.progressBar.mode = 'indeterminate';

    const code = this.confirmForm.get('code').value;

    this.amplifyService.auth().confirmSignUp(this.username, code)
    .then(data => {
      console.log(data);
      this.awsConfirm = data;
      if (this.awsConfirm) {
        console.log('confirm the confirm');
        this.router.navigate(['/sessions/signin']);
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