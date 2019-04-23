import { Component, OnInit, OnDestroy  } from '@angular/core';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { MinervaAccountDialogService } from '../../../shared/services/minerva-account/minerva-account-dialog/minerva-account-dialog.service';
import { MinervaAccountImageDialogService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-image-dialog.service';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';
import { UserService } from '../../../shared/services/auth/user-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-type',
  animations: [egretAnimations],
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.scss']
})
export class AccountTypeComponent implements OnInit {
	private getItemSub: Subscription;
	private getReqImage: Subscription;
	private req: Subscription;

	userImage: string;
	public loggedInUser;

	constructor(
	  private minervaAccountDialogService: MinervaAccountDialogService,
	  private minervaAccountImageDialogService: MinervaAccountImageDialogService,
	  private minervaAccountChangeService: MinervaAccountChangeService,
	  private userService: UserService
	  ) {
	  this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result);
	  userService.userData$.subscribe((user) => this.loggedInUser = user);
	}

	ngOnInit() {

	}
	ngOnDestroy() {

	}
}
