import { Component, OnInit, OnDestroy  } from '@angular/core';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { MinervaAccountDialogService } from '../../../shared/services/minerva-account/minerva-account-dialog/minerva-account-dialog.service';
import { MinervaAccountImageDialogService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-image-dialog.service';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';
import { UserService } from '../../../shared/services/auth/user-services';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-account-algorithm-credit-remaining',
  animations: [egretAnimations],
  templateUrl: './account-algorithm-credit-remaining.component.html',
  styleUrls: ['./account-algorithm-credit-remaining.component.scss']
})
export class AccountAlgorithmCreditRemainingComponent implements OnInit {

	private getItemSub: Subscription;
	private getReqImage: Subscription;
	private req: Subscription;

	userImage: string;
	public loggedInUser;

	public basic: number = 100;
	public professional: number = 250;

	public remaining: number = 0;
	public color;
	public value;

	constructor(
	  private minervaAccountDialogService: MinervaAccountDialogService,
	  private minervaAccountImageDialogService: MinervaAccountImageDialogService,
	  private minervaAccountChangeService: MinervaAccountChangeService,
	  private userService: UserService
	  ) {
	  this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result);
	  userService.userData$.subscribe((user) => {
	  	this.loggedInUser = user;

	  	if(this.loggedInUser){
	  		let userAccountType = this.loggedInUser.accountType === 'Basic' 
	  		? this.basic 
	  		: this.professional;

	  		let remaining = userAccountType - this.loggedInUser.algorithmCredits;
	  		this.remaining = (remaining/userAccountType) * 100;
	  	}
	  });
	}

	ngOnInit() {

	}
	ngOnDestroy() {

	}
}
