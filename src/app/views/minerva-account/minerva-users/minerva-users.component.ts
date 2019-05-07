import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { MinervaAccountDialogService } from '../../../shared/services/minerva-account/minerva-account-dialog/minerva-account-dialog.service';
import { MinervaAccountImageDialogService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-image-dialog.service';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';
import { MinervaAccountService } from '../../../shared/services/minerva-account/minerva-account-service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../shared/services/auth/user-services';
import { MatSnackBar } from '@angular/material';

@Component({
  	selector: 'app-minerva-users',
  	animations: [egretAnimations],
  	templateUrl: './minerva-users.component.html',
  	styleUrls: ['./minerva-users.component.scss']
})
export class MinervaUsersComponent implements OnInit, OnDestroy {
	  private getItemSub: Subscription;
    private getReqImage: Subscription;
    private req: Subscription;
    private reqUsers: Subscription;

    userImage: string;
    public data: any;
    public loggedInUser;
    public isUserAdded;

    constructor(
    private router: Router,
    private minervaAccountImageDialogService: MinervaAccountImageDialogService,
    private minervaAccountDialogService: MinervaAccountDialogService,
    private minervaAccountChangeService: MinervaAccountChangeService,
    private minervaAccountService: MinervaAccountService,
    private snackbar: MatSnackBar,
    private userService: UserService) {
      this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result);
      userService.userData$.subscribe((user) => this.loggedInUser = user);

      this.isUserAdded = sessionStorage.getItem('user_new');
      if (this.isUserAdded) this.openSnackBar(this.isUserAdded);  
    }

    ngOnInit() {
      this.getMinervaUsers();
    }
    ngOnDestroy() {
      if (this.getItemSub) this.getItemSub.unsubscribe();
      if(this.req) this.req.unsubscribe();
      if(this.reqUsers) this.reqUsers.unsubscribe();
    }

    // get all minerva users for the currently logged in user
    getMinervaUsers() { 
      this.reqUsers = this.minervaAccountService.getAllItems()
      .subscribe((result) => {
        if(result)
          this.data = result;
      });
    }

    setDate(date) {
      const converted_date = new Date(date);
      return converted_date;
    }

    openDialog(title: string, details?: any, delete_user?: boolean) {
        this.minervaAccountDialogService.confirm({
          title: title,
          details: details,
          delete: delete_user
        }).subscribe((result) => {});
    }

    changeImageDialog(title: string) {
        this.minervaAccountImageDialogService.confirm({ title: title })
        .subscribe(result => {});
    }

    // open snackbar
    openSnackBar(message: string) {
    this.snackbar.open(message, 'close');

    setTimeout(() => {
      /**/
      if(this.isUserAdded) sessionStorage.removeItem('user_new');

      this.snackbar.dismiss();
    }, 3000);
  }
}
