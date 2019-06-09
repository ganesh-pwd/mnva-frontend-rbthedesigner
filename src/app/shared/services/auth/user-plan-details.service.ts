import { Injectable } from '@angular/core';
import { UserPlanDetailsDB } from '../../fake-db/user-plan-details';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserPlanDetailsService {
    private userPlanData = new BehaviorSubject<any>(null);
    public userPlanData$ = this.userPlanData.asObservable();
    public userPlanLists: any;
    public userPlanDetails;

    constructor(private router: Router,
      private activatedRoute: ActivatedRoute) {

      // user billing info of the currently selected logged in user
      const userPlanLists = new UserPlanDetailsDB();
      this.userPlanLists = userPlanLists.user_plan_details;

      // set currently selected user billing info if its already in session storage
      const checkUserPlanDetails = JSON.parse(sessionStorage.getItem('userPlanDetails'));
      if(checkUserPlanDetails) this.setUserUserPlanDetails(checkUserPlanDetails);

      // set logged in user everytime component has been refreshed
      this.userPlanData$.subscribe(result => this.userPlanDetails = result);
    }


    // set selected billing info
    setUserUserPlanDetails(details){
      this.userPlanData.next(details);
    }

    //find user billing info after selecting user in sidebar
    findUserUserPlanDetails(account_id){
      /*
          find the billing info for the first user 
          from the list of user accounts after sign in
      */
      const filterUserUserPlanDetails = this.userPlanLists.find(el => el.account_id === account_id)

      return filterUserUserPlanDetails;
    }


  /* USER MENTIONS */

      // compute remaining mentions
      computeRemainingMention(mention, account_id): Observable<any> {
        const index = this.userPlanLists.findIndex(el => el.account_id === account_id);
        const userAccountList = this.userPlanLists;

        // find the list of user accounts associated with user
        let computeMentions = this.userPlanDetails.remaining_mentions - mention;
        userAccountList[index].remaining_mentions = computeMentions;

        this.userPlanLists = userAccountList;
        this.setUserUserPlanDetails(userAccountList[index]);
        sessionStorage.setItem('userPlanDetails', JSON.stringify(userAccountList[index]));

        return of(userAccountList.slice()).pipe(delay(500));
      }
}
