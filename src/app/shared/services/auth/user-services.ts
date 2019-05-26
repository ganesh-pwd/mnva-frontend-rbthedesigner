import { Injectable } from '@angular/core';
import { UserDB } from '../../fake-db/users';
import { CognitoUserDB } from '../../fake-db/cognito-user';
import { UserAccountsDB } from '../../fake-db/user-accounts';
import { UserBillingInfoDB } from '../../fake-db/user-billing-info';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[];

  private userData = new BehaviorSubject<any>(null);
  public userData$ = this.userData.asObservable();

  private userBillingDetails = new BehaviorSubject<any>(null);
  public userBillingDetails$ = this.userBillingDetails.asObservable();

  public cognitoUser: any;
  public userAccounts: any;
  public userBillingInfoList: any;
  public loggedInUser: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {

    // cognito users
    const cognitoUsers = new CognitoUserDB();
    this.cognitoUser   = cognitoUsers.cognito_users;

    // users to look for after cognito sign in is validated
    const users = new UserDB();
    this.users  = users.users;

    // since each user can have multiple user accounts
    const userAccounts = new UserAccountsDB();
    this.userAccounts  = userAccounts.user_accounts;

    // user billing info of the currently selected logged in user
    const userBillingInfoList = new UserBillingInfoDB();
    this.userBillingInfoList = userBillingInfoList.user_billing_info;

    // set currently selected authenticated user if user already in session storage
    let checkLogin = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if(checkLogin) this.setUser(checkLogin);

    // set currently selected user billing info if its already in session storage
    let checkBillingInfo = JSON.parse(sessionStorage.getItem('billingInfo'));
    if(checkBillingInfo) this.setUserBillingInfo(checkBillingInfo);

    // set logged in user everytime component has been refreshed
    this.userData$.subscribe(result => this.loggedInUser = result);
  }

  // ******* Implement your APIs ********
  getItems(): Observable<any> {
    return of(this.users.slice()).pipe(delay(500));
  }

  // set selected user
  setUser(user){
    this.userData.next(user);
  }

  // set selected billing info
  setUserBillingInfo(details){
    this.userBillingDetails.next(details);
  }

  // temporary sign in
  signInUser(user, pass): Observable<any> {
    // search from cognito user fake db
    const filterCognitoUser = this.cognitoUser.filter(el => el.username === user && el.password === pass);

    if (filterCognitoUser.length > 0) {
      // find the user via cognito_user_id
      const filterUser = this.users.find(el => el.cognito_user_id === filterCognitoUser[0]._id);

      // find the list of user accounts associated with user
      const filterUserAccounts = filterUser.accounts
        .map(el => el.account_id)
        .map(el => this.userAccounts
          .find(_el => _el._id == el));

      /*
        find the billing info for the first user 
        from the list of user accounts after sign in
      */
      const filterUserBillingInfo = filterUser.accounts
        .map(el => el.billing_info_id)
        .map(el => this.userBillingInfoList
          .find(_el => _el._id == el))
          .find(_el => _el.account_id === filterUserAccounts[0]._id);
     
      // set selected user
      this.setUser(filterUserAccounts[0]);
      // set selected billing info for the selected uer
      this.setUserBillingInfo(filterUserBillingInfo);

      // set selected account from multiple created user 
      sessionStorage.setItem('cognitoUser', JSON.stringify(filterCognitoUser[0]));
      sessionStorage.setItem('accountLists', JSON.stringify(filterUserAccounts));
      sessionStorage.setItem('billingInfo', JSON.stringify(filterUserBillingInfo));
      sessionStorage.setItem('userName', filterCognitoUser[0].email);

      return of(filterUserAccounts.slice());
    }
    else{ 
      alert('User does not exist');
      return of(filterCognitoUser.slice());
    }
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

  // change user account name
  setNotifications(details): Observable<any>{
    // find currently sign in user
    const filterCognitoUser = this.cognitoUser.filter(el => el._id === (JSON.parse(sessionStorage.getItem('cognitoUser')))._id);
    
    // find the user via cognito_user_id
    const filterUser = this.users.find(el => el.cognito_user_id === filterCognitoUser[0]._id);

    // find the list of user accounts associated with user
    const filterUserAccounts = filterUser.accounts
      .map(el => el.account_id)
      .map(el => this.userAccounts
        .find(_el => _el._id == el));

    const index = filterUserAccounts.findIndex(el => el._id === details._id);

    filterUserAccounts[index].accountName = details.accountName;
    filterUserAccounts[index].notifications.when_user_join = details.when_user_join;
    filterUserAccounts[index].notifications.when_data_released = details.when_data_released;
    filterUserAccounts[index].notifications.when_invoice_generated = details.when_invoice_generated;

    filterUserAccounts[index].notifications.when_user_leave = details.when_user_leave;
    filterUserAccounts[index].notifications.when_credit_warning = details.when_credit_warning;
    filterUserAccounts[index].notifications.when_credit_expired = details.when_credit_expired;
    filterUserAccounts[index].notifications.when_purchase_declined = details.when_purchase_declined;
    filterUserAccounts[index].notifications.when_purchase_success = details.when_purchase_success;

    const url = this.router.url;

    this.router.navigateByUrl('', { skipLocationChange: true })
    .then(() => this.userAccounts = filterUserAccounts)
    .then(() => sessionStorage.setItem('accountLists', JSON.stringify(filterUserAccounts)))
    .then(() => sessionStorage.setItem('loggedInUser', JSON.stringify(filterUserAccounts[index])))
    .then(() => this.setUser(filterUserAccounts[index]))
    .then(() => this.router.navigate([url]));

    return of(filterUserAccounts.slice());
  }


  // compute remaining mentions
  computeRemainingMention(mention): Observable<any> {
    console.log(this.loggedInUser)

    const index = this.userAccounts.findIndex(el => el._id === this.loggedInUser._id);
    const userAccountList = this.userAccounts;

    // find the list of user accounts associated with user
    let computeMentions = this.loggedInUser.mentions - mention;
    userAccountList[index].mentions = computeMentions;

    this.userAccounts = userAccountList;
    this.setUser(userAccountList[index]);
    sessionStorage.setItem('loggedInUser', JSON.stringify(userAccountList[index]));

    return of(userAccountList.slice()).pipe(delay(500));
  }
}
