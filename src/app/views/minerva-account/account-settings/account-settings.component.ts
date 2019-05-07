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

  constructor(
    private minervaAccountDialogService: MinervaAccountDialogService,
    private minervaAccountImageDialogService: MinervaAccountImageDialogService,
    private minervaAccountChangeService: MinervaAccountChangeService,
    private userService: UserService,
    private router: Router,
    public snackbar: MatSnackBar
    ) {
    this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result);
    userService.userData$.subscribe((user) => {
      const selectedAccount = sessionStorage.getItem('selectedAccount');

      this.loggedInUser = user;
      // set selected account
      this.selected = selectedAccount ?  
      (JSON.parse(selectedAccount)).accountName : 
      user.accountNames[0].accountName;

      this.new_value = this.selected;

      this.when_user_join = selectedAccount ?  
      (JSON.parse(selectedAccount)).when_user_join : 
      user.accountNames[0].when_user_join;

      this.when_data_released = selectedAccount ?  
      (JSON.parse(selectedAccount)).when_data_released : 
      user.accountNames[0].when_data_released;

      this.when_invoice_generated = selectedAccount ?  
      (JSON.parse(selectedAccount)).when_invoice_generated : 
      user.accountNames[0].when_invoice_generated;
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

  saveChanges(){
    const body = {
      'id': (this.loggedInUser.accountNames.filter(el => el.accountName === this.selected)[0]).id,
      'accountName': this.new_value,
      'old_accountName': this.selected,
      'when_user_join': this.when_user_join,
      'when_data_released': this.when_data_released,
      'when_invoice_generated': this.when_invoice_generated,
    }

    this.req = this.userService.setAccountName(body).subscribe(result => {
      const url = this.router.url;

      this.router.navigateByUrl('', { skipLocationChange: true })
      .then(() => sessionStorage.setItem('selectedAccount', JSON.stringify(body)))
      .then(() => this.router.navigate([url]));
    });
  }
}
