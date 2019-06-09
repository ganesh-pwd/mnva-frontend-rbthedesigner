import { Injectable } from '@angular/core';
import { UserDB } from '../../fake-db/users';
import { CognitoUserDB } from '../../fake-db/cognito-user';
import { UserAccountsDB } from '../../fake-db/user-accounts';
import { UserBillingInfoDB } from '../../fake-db/user-billing-info';
import { UserNotificationsDB } from '../../fake-db/user-notifications';
import { UserPlanDetailsDB } from '../../fake-db/user-plan-details';
import { PlanDatasourceDB } from '../../fake-db/plan-datasources';
import { PlanConnectorsDB } from '../../fake-db/plan-connectors';
import { PlanDetailsDB } from '../../fake-db/plan-details';

import { UserBillingService } from './user-billing-info.service';
import { UserPlanDetailsService } from './user-plan-details.service';

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

  private planData = new BehaviorSubject<any>(null);
  public planData$ = this.planData.asObservable();

  private planConnectorData = new BehaviorSubject<any>(null);
  public planConnectorData$ = this.planConnectorData.asObservable();

  private planDatasourceData = new BehaviorSubject<any>(null);
  public planDatasourceData$ = this.planDatasourceData.asObservable();

  public cognitoUser: any;
  public userAccounts: any;
  public userBillingInfoList: any[];
  public userNotificationList: any[];
  public userPlanDetailList: any[];

  public planDetailList: any[];
  public planDatasourceList: any[];
  public planConnectorList: any[];

  public loggedInUser: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userBillingService: UserBillingService,
    private userPlanDetailsService: UserPlanDetailsService) {

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

    // user notification list
    const userNotificationList = new UserNotificationsDB();
    this.userNotificationList = userNotificationList.user_notifications;

    // user plan details list
    const userPlanDetailsList = new UserPlanDetailsDB();
    this.userPlanDetailList = userPlanDetailsList.user_plan_details;

    // plan details
    const planDetails = new PlanDetailsDB();
    this.planDetailList = planDetails.plan_details;

    // plan connectors
    const planConnectors = new PlanConnectorsDB();
    this.planConnectorList = planConnectors.plan_connectors;

    // plan datasource
    const planDatasource = new PlanDatasourceDB();
    this.planDatasourceList = planDatasource.plan_datasources;

    // set currently selected authenticated user if user already in session storage
    const checkLogin = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if(checkLogin) this.setUser(checkLogin);

    const checkDatasource = JSON.parse(sessionStorage.getItem('userPlanDatasource'));
    if(checkDatasource) this.setDatasourceOnRefresh(checkDatasource);

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

  // set user connector
  setConnector(plan_id){
    const connector = this.planConnectorList.find(el => el.plan_id === plan_id);
    sessionStorage.setItem('userPlanConnector', JSON.stringify(connector));
    this.planConnectorData.next(connector);
  }

  // set user datasource
  setDatasource(plan_id){
    const datasource = this.planDatasourceList.find(el => el.plan_id === plan_id); 
    sessionStorage.setItem('userPlanDatasource', JSON.stringify(datasource));
    this.planDatasourceData.next(datasource);
  }

  // set user datasource on refresh
  setDatasourceOnRefresh(datasource){
    sessionStorage.setItem('userPlanDatasource', JSON.stringify(datasource));
    this.planDatasourceData.next(datasource);
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

      /*
        find the user plan details for the first user 
        from the list of user accounts after sign in
      */
      const filterUserPlanDetails = filterUser.accounts
        .map(el => el.plan_id)
        .map(el => this.userPlanDetailList.find(_el => _el._id === el))
          .find(_el => _el.account_id === filterUserAccounts[0]._id);

      const filterPlanDetails = this.planDetailList.find(el => el._id === filterUserPlanDetails.plan_id);
     
      // set selected user
      this.setUser(filterUserAccounts[0]);

      // set selected user connector
      this.setConnector(filterUserPlanDetails.plan_id);

      // set selected user datasource
      this.setDatasource(filterUserPlanDetails.plan_id);

      // set selected billing info for the selected uer
      this.userBillingService.setUserBillingInfo(filterUserBillingInfo);

      // set selected plan details for the selected user
      this.userPlanDetailsService.setUserUserPlanDetails(filterUserPlanDetails);

      // set selected account from multiple created user 
      sessionStorage.setItem('cognitoUser', JSON.stringify(filterCognitoUser[0]));
      sessionStorage.setItem('accountLists', JSON.stringify(filterUserAccounts));
      sessionStorage.setItem('billingInfo', JSON.stringify(filterUserBillingInfo));
      sessionStorage.setItem('userPlanDetails', JSON.stringify(filterUserPlanDetails));
      sessionStorage.setItem('userName', filterCognitoUser[0].email);

      return of(filterUserAccounts.slice());
    }
    else{ 
      alert('User does not exist');
      return of(filterCognitoUser.slice());
    }
  }

  /* USER NOTIFICATIONS */

      // get user notification list

      // change user account name
      setNotificationSettings(details): Observable<any>{
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

        filterUserAccounts[index].account_name = details.account_name;
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
}
