import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MinervaNewsService } from '../../services/minerva-news/minerva-news.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../shared/services/auth/user-services';
import { UserNotificationService } from '../../../shared/services/auth/user-notification.service';
import { UserPlanDetailsService } from '../../../shared/services/auth/user-plan-details.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  @Input() notificPanel;

  public isDataboxAdded;
  public isDataboxDeleted;
  public isDataboxUpdated;
  public isUserAdded;
  public isUserDeleted;
  public loggedInUser;
  public userPlanDetails;

  public basic: number = 3000;
  public professional: number = 5000;
  public remaining_mentions: number = 0;
  public remaining_algo: number = 0;

  private req: Subscription;
  private notifReq: Subscription;
  private updateReq: Subscription;

  // Dummy notifications
  notifications: any[] = [];

  constructor(private router: Router, 
    private minervaNewsService: MinervaNewsService,
    private userService: UserService,
    private userPlanDetailsService: UserPlanDetailsService,
    private userNotificationService: UserNotificationService) { 

    userService.userData$.subscribe((user) => {
      this.loggedInUser = user;

      if(this.loggedInUser){
        let userAccountType = this.loggedInUser.accountType === 'Basic' 
        ? this.basic 
        : this.professional;

        let remaining_mentions = userAccountType - this.loggedInUser.remaining_mentions;
        this.remaining_mentions = (remaining_mentions/userAccountType) * 100;
      }
    });

    userPlanDetailsService.userPlanData$.subscribe((user) => {
      this.userPlanDetails = user;

      if(this.userPlanDetails){
        let userAccountType = this.userPlanDetails.accountType === 'Basic' 
        ? this.basic 
        : this.professional;

        let remaining_mentions = userAccountType - this.userPlanDetails.remaining_mentions;
        this.remaining_mentions = (remaining_mentions/userAccountType) * 100;
      }
    })
  }


  ngOnInit() {
    this.getNews(); // get news notification  

    this.getUserNotification(this.loggedInUser._id); // get user notification

    this.router.events.subscribe((routeChange) => {
        if (routeChange instanceof NavigationEnd) {
          this.isDataboxAdded  = sessionStorage.getItem('databox_new');
          this.isDataboxDeleted = sessionStorage.getItem('deleted_databox_true');
          this.isDataboxUpdated = sessionStorage.getItem('databox_updated');
          this.isUserAdded = sessionStorage.getItem('user_new');
          this.isUserDeleted = sessionStorage.getItem('user_deleted');

          // if databox is added
          if (this.isDataboxAdded) {
            this.updateNotification(this.isDataboxAdded, 'widgets', '/databoxes', 'primary', 'databox_notification', 'databox_new');
          }

          // if databox is deleted
          if (this.isDataboxDeleted) {
            this.updateNotification(this.isDataboxDeleted, 'widgets', '/databoxes', 'warn', 'databox_notification', 'deleted_databox_true');
          }

          // if databox is updated
          if (this.isDataboxUpdated) {
            this.updateNotification(this.isDataboxUpdated, 'widgets', '/databoxes', 'primary', 'databox_notification', 'databox_updated');
          }

          // if user is added
          if (this.loggedInUser && (this.loggedInUser.notifications.when_user_join && this.isUserAdded)) {
            this.updateNotification(this.isUserAdded, 'assignment_ind', '/accounts/users', 'primary', 'user_notification', 'user_new');
          }

          // if user is deleted
          if (this.loggedInUser && (this.loggedInUser.notifications.when_user_leave && this.isUserDeleted)) {
            this.updateNotification(this.isUserDeleted, 'assignment_ind', '/accounts/users', 'warn', 'user_notification', 'user_deleted');
          }

          // if mentions is below 80%
          if (this.loggedInUser && this.loggedInUser.notifications.when_credit_warning && (this.remaining_mentions >= 80 && this.remaining_mentions <= 99)) {
            let findNotif = this.notifications.find(el => el.message === 'Your mentions credit is now below 80%');
            
            if(!findNotif){
              this.updateNotification('Your mentions credit is now below 80%', 'assignment_ind', '/accounts/settings', 'accent', 'user_notification', 'user_mentions');
            }
          }

          // if mentions is above 100%
          if (this.loggedInUser && this.loggedInUser.notifications.when_credit_expired && (this.remaining_mentions >= 100)) {
            let findNotif = this.notifications.find(el => el.message === 'Your mentions credit are now expired');
            
            if(!findNotif){
              this.updateNotification('Your mentions credit are now expired', 'assignment_ind', '/accounts/settings', 'warn', 'user_notification', 'user_mentions');
            }
          }

          // get user notification
          this.getUserNotification(this.loggedInUser._id);
        }
    });
  }


  updateNotification(message, icon, route, color, type, storage) {
    const data = {
      'account_id': this.loggedInUser._id, // Foreign Key
      'title': message,
      'type': type,
      'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem necessitatibus natus fugit porro at sunt mollitia repellendus deserunt, libero similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem necessitatibus natus fugit porro at sunt mollitia repellendus deserunt, libero similique.',
      'icon': icon,
      'color': color,
      'route': route,
      'storage': storage
    }

    // update notification
    this.userNotificationService
    .addUserNotification(data.account_id, data)
    .subscribe(result => {
      this.getUserNotification(data.account_id);
    });
    
  }

  getNews(){
    this.req = this.minervaNewsService
    .getAllItems()
    .subscribe(result => {
      let notification = this.notifications;
      let findExist = notification.find(el => el.message === result[0].title);

      if(result && !findExist){
        result.forEach(el => {
          this.notifications.push({
            message: el.title,
            icon: el.icon,
            time: '1 min ago',
            route: el.route,
            color: el.color
          })
        });
      }
    });
  }

  // ge all user notification
  getUserNotification(account_id){
    this.notifReq = this.userNotificationService
    .getAllNotifications(account_id)
    .subscribe(result => {
      let notification = this.notifications;

      this.notifications = [];
      this.getNews();

      if(result){
        result.forEach(el => {
          this.notifications.push({
            message: el.title,
            icon: el.icon,
            time: '1 min ago',
            route: el.route,
            color: el.color
          });
        });
      }

      sessionStorage.setItem('notificationCount', `${this.notifications.length}`);
    });
  }


  clearAll(e) {
    e.preventDefault();
    this.notifications = [];
  }
}
