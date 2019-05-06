import { Injectable } from '@angular/core';
import { UserDB } from '../../fake-db/users';
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
  public loggedInUser: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
    const users = new UserDB();
    this.users = users.users;

    let checkLogin = JSON.parse(sessionStorage.getItem('loggedInUser'))

    if(checkLogin) this.setUser(checkLogin);

    this.userData$.subscribe(user =>  this.loggedInUser = user);
  }

  // ******* Implement your APIs ********
  getItems(): Observable<any> {
    return of(this.users.slice()).pipe(delay(500));
  }

  setUser(user){
    this.userData.next(user);
  }

  // ** select single user
  selectUser(): Observable<any> {
    const filterUser = this.users.filter(el => el._id === '5a7b73f78b64a02a67204d6e');

    this.setUser(filterUser[0]);
    sessionStorage.setItem('loggedInUser', JSON.stringify(filterUser[0]));
    
    return of(filterUser.slice());
  }

  // temporary sign in
  signInUser(user, pass): Observable<any> {
    const filterUser = this.users.filter(el => el.username === user && el.password === pass);

    if (filterUser.length === 1) {
      this.setUser(filterUser[0]);
      return of(filterUser.slice());
    }
    else alert('User does not exist')
  }

  // change user account name
  setAccountName(details): Observable<any> {
    const filterAccountNames = this.loggedInUser.accountNames.filter(el => el.id === details.id)[0];

    filterAccountNames.accountName = details.accountName;
    filterAccountNames.when_user_join = details.when_user_join;
    filterAccountNames.when_data_released = details.when_data_released;
    filterAccountNames.when_invoice_generated = details.when_invoice_generated;

    return of(filterAccountNames);
  }


  // compute remaining mentions
  computeRemainingMention(mention): Observable<any> {
    const filterUser = this.users.filter(el => el._id === this.loggedInUser._id);
    const userList = this.users;

    console.log(filterUser)

    let computeMentions = this.loggedInUser.mentions - mention;
    filterUser[0].mentions = computeMentions;

    this.setUser(filterUser[0]);
    sessionStorage.setItem('loggedInUser', JSON.stringify(filterUser[0]));

    return of(userList.slice()).pipe(delay(500));
  }
}
