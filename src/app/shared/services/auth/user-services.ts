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

  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
  public loggedInUser: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
    const users = new UserDB();
    this.users = users.users;

    this.loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  }

  // ******* Implement your APIs ********
  getItems(): Observable<any> {
    return of(this.users.slice()).pipe(delay(500));
  }

  // ** select single user
  selectUser(): Observable<any> {
    const filterUser = this.users.filter(el => el._id === '5a7b73f78b64a02a67204d6e');
    return of(filterUser.slice());
  }

  // temporary sign in
  signInUser(user, pass): Observable<any> {
    const filterUser = this.users.filter(el => el.username === user && el.password === pass);

    if (filterUser.length === 1) {
      return of(filterUser.slice());
    }
    else alert('User does not exist')
  }

  // compute remaining mentions
  computeRemainingMention(mention): Observable<any> {
    const filterUser = this.users.findIndex(el => el._id === this.loggedInUser._id);
    const userList = this.users;

    let computeMentions = this.loggedInUser.mentions - mention;
    userList[filterUser].mentions = computeMentions;

    sessionStorage.setItem('loggedInUser', JSON.stringify(userList[filterUser]));

    return of(userList.slice()).pipe(delay(500));
  }
}
