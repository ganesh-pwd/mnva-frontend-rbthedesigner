import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { MinervaAccountDialogService } from '../../../shared/services/minerva-account/minerva-account-dialog/minerva-account-dialog.service';
import { MinervaAccountImageDialogService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-image-dialog.service';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';
import { UserService } from '../../../shared/services/auth/user-services';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-account-settings',
  animations: [egretAnimations],
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit, OnDestroy {
  private getItemSub: Subscription;
  private getReqImage: Subscription;
  private req: Subscription;

  public userImage: string;
  public loggedInUser;
  public selected;

  public new_value;
  public when_user_join;
  public when_data_released;
  public when_invoice_generated;

  public when_user_leave: boolean = false;
  public when_credit_warning: boolean = false;
  public when_credit_expired: boolean = false;
  public when_purchase_success: boolean = false;
  public when_purchase_declined: boolean = false;

  constructor(
    private minervaAccountDialogService: MinervaAccountDialogService,
    private minervaAccountImageDialogService: MinervaAccountImageDialogService,
    private minervaAccountChangeService: MinervaAccountChangeService,
    private userService: UserService,
    private router: Router,
    public snackbar: MatSnackBar
    ) {
      this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result);
      if ('photoUrl' in sessionStorage) {
        this.userImage = sessionStorage.getItem('photoUrl');
      }
      userService.userData$.subscribe((user) => {
        this.selected = user.accountName;
        this.loggedInUser = user;
        // set selected account
        this.new_value = this.selected;
        this.when_user_join         = user.notifications.when_user_join;
        this.when_data_released     = user.notifications.when_data_released;
        this.when_invoice_generated = user.notifications.when_invoice_generated;
        this.when_user_leave        = user.notifications.when_user_leave;
        this.when_credit_warning    = user.notifications.when_credit_warning;
        this.when_credit_expired    = user.notifications.when_credit_expired;
        this.when_purchase_declined = user.notifications.when_purchase_declined;
        this.when_purchase_success  = user.notifications.when_purchase_success;
      });
  }

  ngOnInit() {

  }
  ngOnDestroy() {
    if (this.getItemSub) this.getItemSub.unsubscribe();
    if (this.req) this.req.unsubscribe();
  }

  changeImageDialog(title: string) {
    this.req = this.minervaAccountImageDialogService.confirm({ title: title })
      .subscribe(result => { });
  }

  deleteAccountDialog(title: string) {
    this.minervaAccountDialogService.confirm({
      title: title
    }).subscribe((result) => { });
  }

  // modify user
  saveChanges(){
    const body = {
      '_id': this.loggedInUser._id,
      'accountName': this.new_value,
      'old_accountName': this.selected,
      'when_user_join': this.when_user_join,
      'when_data_released': this.when_data_released,
      'when_invoice_generated': this.when_invoice_generated,
      'when_user_leave': this.when_user_leave,
      'when_credit_warning': this.when_credit_warning,
      'when_credit_expired': this.when_credit_expired,
      'when_purchase_declined': this.when_purchase_declined,
      'when_purchase_success': this.when_purchase_success
    }

    this.userService.setNotifications(body).subscribe(result => console.log(result));
  }
}
