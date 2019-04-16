import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { MinervaAccountDialogService } from '../../../shared/services/minerva-account/minerva-account-dialog/minerva-account-dialog.service';
import { MinervaAccountImageDialogService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-image-dialog.service';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';
import { MinervaAccountService } from '../../../shared/services/minerva-account/minerva-account-dialog/minerva-account.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../shared/services/auth/user-services';

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

    constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private minervaAccountImageDialogService: MinervaAccountImageDialogService,
    private minervaAccountDialogService: MinervaAccountDialogService,
    private minervaAccountChangeService: MinervaAccountChangeService,
    private minervaAccountService: MinervaAccountService,
    private userService: UserService) {
      this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result);
      userService.userData$.subscribe((user) => this.loggedInUser = user);
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
      let converted_date = new Date(date);
      return converted_date;
    }

    openDialog(title: string) {
        this.minervaAccountDialogService.confirm({
          title: title
        }).subscribe((result) => {});
    }

    changeImageDialog(title: string) {
        this.minervaAccountImageDialogService.confirm({ title: title })
        .subscribe(result => {});
    }
}
