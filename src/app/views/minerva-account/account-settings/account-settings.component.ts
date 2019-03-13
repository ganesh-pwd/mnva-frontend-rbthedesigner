import { Component, OnInit, OnDestroy  } from '@angular/core';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { MinervaAccountDialogService } from '../../../shared/services/minerva-account/minerva-account-dialog/minerva-account-dialog.service';
import { MinervaAccountImageDialogService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-image-dialog.service';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';
import { Subscription } from 'rxjs';

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

  userImage: string;

  constructor(
    private minervaAccountDialogService: MinervaAccountDialogService,
    private minervaAccountImageDialogService: MinervaAccountImageDialogService,
    private minervaAccountChangeService: MinervaAccountChangeService
    ) {
    this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result);
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
}
