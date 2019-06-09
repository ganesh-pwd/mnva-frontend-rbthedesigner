import { Component } from '@angular/core';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { MinervaAccountChangeService } from "../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service";
import { UserService } from '../../../shared/services/auth/user-services';
import { UserPlanDetailsService } from '../../../shared/services/auth/user-plan-details.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-algorithm-credit-remaining',
  animations: [egretAnimations],
  templateUrl: './account-algorithm-credit-remaining.component.html',
  styleUrls: ['./account-algorithm-credit-remaining.component.scss']
})
export class AccountAlgorithmCreditRemainingComponent {
  private getReqImage: Subscription;

  userImage: string;
  public loggedInUser;
  public userPlanDetails;

  public basic: number = 100;
  public professional: number = 250;

  public remaining: number = 0;
  public color;
  public value;

  constructor(
    private readonly minervaAccountChangeService: MinervaAccountChangeService,
    private readonly userService: UserService,
    private userPlanDetailsService: UserPlanDetailsService,
  ) {
    this.getReqImage = minervaAccountChangeService.image$.subscribe(
      result => (this.userImage = result)
    );
    userService.userData$.subscribe(user => this.loggedInUser = user);

    // set user plan details
    userPlanDetailsService.userPlanData$.subscribe(user => {
      if(user){ 
        this.userPlanDetails = user;

        let userAccountType = this.userPlanDetails.account_type === 'Basic' 
          ? this.basic 
          : this.professional;

          let remaining = userAccountType - this.userPlanDetails.mentions;
          this.remaining = (remaining/userAccountType) * 100;
      }
    });
  }
}
