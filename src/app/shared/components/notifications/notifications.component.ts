import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  @Input() notificPanel;

  public isDataboxAdded;
  public isDataboxDeleted;
  public isDataboxUpdated;

  // Dummy notifications
  notifications: any[] = JSON.parse(sessionStorage.getItem('notifications')) || [{
    message: 'New contact added',
    icon: 'assignment_ind',
    time: '1 min ago',
    route: '/inbox',
    color: 'primary'
  }, {
    message: 'New message',
    icon: 'chat',
    time: '4 min ago',
    route: '/chat',
    color: 'accent'
  }, {
    message: 'Server rebooted',
    icon: 'settings_backup_restore',
    time: '12 min ago',
    route: '/charts',
    color: 'warn'
  }];

  constructor(private router: Router) {}


  ngOnInit() {
    this.router.events.subscribe((routeChange) => {
        if (routeChange instanceof NavigationEnd) {
          this.isDataboxAdded  = sessionStorage.getItem('databox_new');
          this.isDataboxDeleted = sessionStorage.getItem('deleted_databox_true');
          this.isDataboxUpdated = sessionStorage.getItem('databox_updated');

          if (this.isDataboxAdded) {
            this.notifications.push({
              message: this.isDataboxAdded,
              icon: 'widgets',
              time: '1 min ago',
              route: '/databoxes',
              color: 'primary'
            });

            sessionStorage.setItem('notifications', JSON.stringify(this.notifications));
            sessionStorage.setItem('notificationCount', `${this.notifications.length}`);
          }

          if (this.isDataboxDeleted) {
            this.notifications.push({
              message: this.isDataboxDeleted,
              icon: 'widgets',
              time: '1 min ago',
              route: '/databoxes',
              color: 'warn'
            });

            sessionStorage.setItem('notifications', JSON.stringify(this.notifications));
            sessionStorage.setItem('notificationCount', `${this.notifications.length}`);
          }

          if (this.isDataboxUpdated) {
            this.notifications.push({
              message: this.isDataboxUpdated,
              icon: 'widgets',
              time: '1 min ago',
              route: '/databoxes',
              color: 'primary'
            });

            sessionStorage.setItem('notifications', JSON.stringify(this.notifications));
            sessionStorage.setItem('notificationCount', `${this.notifications.length}`);
          }

          this.notificPanel.close();
        }
    });
  }

  updateNotif(data) {
    if (this.isDataboxAdded) {
      this.notifications.push({
        message: this.isDataboxAdded,
        icon: 'widgets',
        time: '1 min ago',
        route: '/databoxes',
        color: 'primary'
      });

      sessionStorage.setItem('notifications', JSON.stringify(this.notifications));
      sessionStorage.setItem('notificationCount', `${this.notifications.length}`);
    }
  }

  clearAll(e) {
    e.preventDefault();
    this.notifications = [];
  }
}
