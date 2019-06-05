import { Injectable } from '@angular/core';
import { UserDB } from '../../fake-db/users';
import { CognitoUserDB } from '../../fake-db/cognito-user';
import { UserNotificationsDB } from '../../fake-db/user-notifications';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {
  private userNotificationDetails = new BehaviorSubject<any>(null);

  public userNotificationDetails$ = this.userNotificationDetails.asObservable();
  public userNotificationList: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
    const userNotificationList = new UserNotificationsDB();
    this.userNotificationList = JSON.parse(sessionStorage.getItem('user_notifications')) || userNotificationList.user_notifications;

  }

  // set user notification
  setUserNotification(notification){
    this.userNotificationDetails.next(notification);
  }

  // get all notification for the current selected user
  getAllNotifications(account_id): Observable<any>{
    const userNotifications =  JSON.parse(sessionStorage.getItem('user_notifications')) || this.userNotificationList;
    const filterUserNotification = userNotifications.filter(el => el.account_id === account_id);
    return of(filterUserNotification.slice());
  }

  //find user billing info after selecting user in sidebar
  findUserNotification(account_id){
    /*
        find the billing info for the first user 
        from the list of user accounts after sign in
    */
    const userNotification = this.userNotificationList.find(el => el.account_id === account_id)

    return userNotification;
  }

  // add to user notification
  addUserNotification(account_id, details): Observable<any>{
    const userNotification = JSON.parse(sessionStorage.getItem('user_notifications')) || this.userNotificationList;

    const data = {
      '_id': this.generateID(),
      'account_id': account_id, // Foreign Key
      'title': details.title,
      'type': details.type,
      'content': details.content,
      'icon': details.icon,
      'color': details.color,
      'route': details.route,
      'date_created': new Date()
    }

    userNotification.push(data);
    this.userNotificationList = userNotification;
    
    sessionStorage.setItem('user_notifications', JSON.stringify(userNotification));
    sessionStorage.removeItem(details.storage)

    return of(userNotification.slice());
  }

  /* @FUNCTIONS FOR GENERATING ID AND SETTING THE SELECTED DATABOX */
      // get max index
      private getMaxIndex(item) { return Math.max(...item.map(x => x.index)) }

      // generate id with length 24
      private generateID() {
        let id = '';
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 24; i++) {
          id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return id;
      }
}
