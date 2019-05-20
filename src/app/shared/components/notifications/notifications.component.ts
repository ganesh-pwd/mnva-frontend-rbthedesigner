import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MinervaNewsService } from '../../services/minerva-news/minerva-news.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../shared/services/auth/user-services';

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
  public selected;

  public basic: number = 3000;
  public professional: number = 5000;
  public remaining_mentions: number = 0;
  public remaining_algo: number = 0;

  private req: Subscription;

  // Dummy notifications
  notifications: any[] = JSON.parse(sessionStorage.getItem('notifications')) || [];

  constructor(private router: Router, 
    private minervaNewsService: MinervaNewsService,
    private userService: UserService) { 

    userService.userData$.subscribe((user) => {
      this.loggedInUser = user;

      // set selected account
      this.selected = sessionStorage.getItem('selectedAccount') ?  
      (JSON.parse(sessionStorage.getItem('selectedAccount'))).accountName : 
      user.accountNames[0].accountName;

      if(this.loggedInUser){
        let userAccountType = this.loggedInUser.accountType === 'Basic' 
        ? this.basic 
        : this.professional;

        let remaining_mentions = userAccountType - this.loggedInUser.mentions;
        this.remaining_mentions = (remaining_mentions/userAccountType) * 100;
      }
    });
  }


  ngOnInit() {
    this.getNews(); // get news notification  

    this.router.events.subscribe((routeChange) => {
        const selectedUserFromTemp = JSON.parse(sessionStorage.getItem('selectedAccount'));
        const selectedUser = selectedUserFromTemp || this.loggedInUser.accountNames.filter(el => el.accountName === this.selected)[0]

        if (routeChange instanceof NavigationEnd) {
          this.isDataboxAdded  = sessionStorage.getItem('databox_new');
          this.isDataboxDeleted = sessionStorage.getItem('deleted_databox_true');
          this.isDataboxUpdated = sessionStorage.getItem('databox_updated');
          this.isUserAdded = sessionStorage.getItem('user_new');
          this.isUserDeleted = sessionStorage.getItem('user_deleted');

          // if databox is added
          if (this.isDataboxAdded) {
            this.updateNotification(this.isDataboxAdded, 'widgets', '/databoxes', 'primary');
          }

          // if databox is deleted
          if (this.isDataboxDeleted) {
            this.updateNotification(this.isDataboxDeleted, 'widgets', '/databoxes', 'warn');
          }

          // if databox is updated
          if (this.isDataboxUpdated) {
            this.updateNotification(this.isDataboxUpdated, 'widgets', '/databoxes', 'primary');
          }

          // if user is added
          if ((selectedUser.when_user_join && this.isUserAdded)) {
            this.updateNotification(this.isUserAdded, 'assignment_ind', '/accounts/users', 'primary');
          }

          // if user is deleted
          if ((selectedUser.when_user_leave && this.isUserDeleted)) {
            this.updateNotification(this.isUserDeleted, 'assignment_ind', '/accounts/users', 'warn');
          }

          // if mentions is below 80%
          if (selectedUser.when_credit_warning && (this.remaining_mentions >= 80 && this.remaining_mentions <= 99)) {
            let findNotif = this.notifications.find(el => el.message === 'Your mentions credit is now below 80%');
            
            if(!findNotif){
              this.updateNotification('Your mentions credit is now below 80%', 'widgets', '/accounts/settings', 'accent');
            }
          }

          // if mentions is above 100%
          if (selectedUser.when_credit_expired && (this.remaining_mentions >= 100)) {
            let findNotif = this.notifications.find(el => el.message === 'Your mentions credit are now expired');
            
            if(!findNotif){
              this.updateNotification('Your mentions credit are now expired', 'widgets', '/accounts/settings', 'warn');
            }
          }

          this.notificPanel.close();
        }
    });
  }

  addNotif(message, icon, route, color){
    return {
      message: message,
      icon: icon,
      time: '1 min ago',
      route: route,
      color: color
    }
  }

  updateNotification(message, icon, route, color) {
    this.notifications.push(this.addNotif(message, icon, route, color));

    sessionStorage.setItem('notifications', JSON.stringify(this.notifications));
    sessionStorage.setItem('notificationCount', `${this.notifications.length}`);
  }

  getNews(){
    this.req = this.minervaNewsService.getAllItems().subscribe(result => {
      let notification = JSON.parse(sessionStorage.getItem('notifications')) || this.notifications;
      let findExist = notification.find(el => el.message === result[0].title);

      if(result && !findExist){
        result.forEach(el => {
          this.notifications.push({
            message: el.title,
            icon: el.icon,
            time: '1 min ago',
            route: '/accounts/minerva-notifications',
            color: el.color
          })
        });
      }
    });
  }

  clearAll(e) {
    e.preventDefault();
    this.notifications = [];
  }
}
