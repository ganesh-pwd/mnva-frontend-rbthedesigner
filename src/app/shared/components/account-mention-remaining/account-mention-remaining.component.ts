import { Component, OnInit, OnDestroy  } from '@angular/core';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { MinervaAccountDialogService } from '../../../shared/services/minerva-account/minerva-account-dialog/minerva-account-dialog.service';
import { MinervaAccountImageDialogService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-image-dialog.service';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';
import { UserService } from '../../../shared/services/auth/user-services';
import { UserPlanDetailsService } from '../../../shared/services/auth/user-plan-details.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-account-mention-remaining',
  animations: [egretAnimations],
  templateUrl: './account-mention-remaining.component.html',
  styleUrls: ['./account-mention-remaining.component.scss']
})
export class AccountMentionRemainingComponent implements OnInit {

	private getItemSub: Subscription;
	private getReqImage: Subscription;
	private req: Subscription;

	public basic: number = 3000;
	public professional: number = 5000;

	public remaining: number = 0;
	public color;
	public value;

	userImage: string;
	public loggedInUser;
	public userPlanDetails;

	constructor(
	  private minervaAccountDialogService: MinervaAccountDialogService,
	  private minervaAccountImageDialogService: MinervaAccountImageDialogService,
	  private minervaAccountChangeService: MinervaAccountChangeService,
	  private userService: UserService,
	  private userPlanDetailsService: UserPlanDetailsService,
	  ) {
	  this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result);
	  userService.userData$.subscribe((user) => this.loggedInUser = user);

	  // set user plan details
	  userPlanDetailsService.userPlanData$.subscribe(user => {
	    if(user){ 
	    	this.userPlanDetails = user;

	    	let userAccountType = this.userPlanDetails.account_type === 'Basic' 
		  		? this.basic 
		  		: this.professional;

		  		let remaining = userAccountType - this.userPlanDetails.remaining_mentions;
		  		this.remaining = (remaining/userAccountType) * 100;
	    }
	  });
	}

	ngOnInit() {

	}
	ngOnDestroy() {

	}

}
