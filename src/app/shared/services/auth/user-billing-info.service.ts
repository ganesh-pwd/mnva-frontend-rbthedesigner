import { Injectable } from '@angular/core';
import { UserBillingInfoDB } from '../../fake-db/user-billing-info';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserBillingService {
  private userBillingDetails = new BehaviorSubject<any>(null);

  public userBillingDetails$ = this.userBillingDetails.asObservable();
  public userBillingInfoList: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {

    // user billing info of the currently selected logged in user
    const userBillingInfoList = new UserBillingInfoDB();
    this.userBillingInfoList = userBillingInfoList.user_billing_info;

    // set currently selected user billing info if its already in session storage
    const checkBillingInfo = JSON.parse(sessionStorage.getItem('billingInfo'));
    if(checkBillingInfo) this.setUserBillingInfo(checkBillingInfo);
  }


  // set selected billing info
  setUserBillingInfo(details){
    this.userBillingDetails.next(details);
  }

  //find user billing info after selecting user in sidebar
  findUserBillingInfo(account_id){
    /*
        find the billing info for the first user 
        from the list of user accounts after sign in
    */
    const filterUserBillingInfo = this.userBillingInfoList.find(el => el.account_id === account_id)

    return filterUserBillingInfo;
  }

  /* USER BILLING INFO */

  // save or update billing info details
  saveUserBillingInfo(details): Observable<any>{
    const userBillingInfoList = this.userBillingInfoList;
    const index = this.userBillingInfoList.findIndex(el => el.account_id === details.account_id);

    userBillingInfoList[index].first_name = details.first_name;
    userBillingInfoList[index].last_name = details.last_name;
    userBillingInfoList[index].country = details.country;
    userBillingInfoList[index].company = details.company;
    userBillingInfoList[index].address = details.address;
    userBillingInfoList[index].address_2 = details.address_2;
    userBillingInfoList[index].city = details.city;
    userBillingInfoList[index].phone = details.phone;
    userBillingInfoList[index].email = details.email;
    userBillingInfoList[index].zip = details.zip;

    this.userBillingInfoList = userBillingInfoList;

    this.setUserBillingInfo(userBillingInfoList[index]);

    return of(userBillingInfoList.slice());
  }
}
