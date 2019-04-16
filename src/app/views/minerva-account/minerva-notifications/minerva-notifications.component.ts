import { Component, OnInit, OnDestroy } from '@angular/core';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { MinervaAccountDialogService } from '../../../shared/services/minerva-account/minerva-account-dialog/minerva-account-dialog.service';
import { MinervaAccountImageDialogService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-image-dialog.service';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../shared/services/auth/user-services';

@Component({
  selector: "app-minerva-notifications",
  animations: [egretAnimations],
  templateUrl: "./minerva-notifications.component.html",
  styleUrls: ["./minerva-notifications.component.scss"]
})
export class MinervaNotificationsComponent implements OnInit, OnDestroy {
  private getItemSub: Subscription;
  private getReqImage: Subscription;
  private req: Subscription;
  userImage: string;

  public loggedInUser: any;

  constructor(
    private minervaAccountDialogService: MinervaAccountDialogService,
    private minervaAccountImageDialogService: MinervaAccountImageDialogService,
    private minervaAccountChangeService: MinervaAccountChangeService,
    private userService: UserService
  ) {
    this.getReqImage = minervaAccountChangeService.image$.subscribe(result => (this.userImage = result));
	  userService.userData$.subscribe((user) => this.loggedInUser = user);
  }

  ngOnInit() {}
  ngOnDestroy() {
    if (this.getItemSub) this.getItemSub.unsubscribe();
    if (this.req) this.req.unsubscribe();
  }

  changeImageDialog(title: string) {
    this.minervaAccountImageDialogService
      .confirm({ title: title })
      .subscribe(result => {});
  }
}
