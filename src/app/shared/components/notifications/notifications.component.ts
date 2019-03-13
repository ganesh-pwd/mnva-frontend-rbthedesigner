import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  @Input() notificPanel;

  public isFolderDeleted;
  public isFolderAdded;
  public isDataboxAdded;


  // Dummy notifications
  notifications: any[] = [{
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
  }]

  constructor(private router: Router) {
    this.isFolderAdded   = sessionStorage.getItem('added_databox_folder');
    this.isFolderDeleted = sessionStorage.getItem('delete_databox_folder');
    this.isDataboxAdded  = sessionStorage.getItem('databox_new');

    if(this.isFolderAdded){
      this.notifications.push({
        message: this.isFolderAdded,
        icon: 'widgets',
        time: '1 min ago',
        route: '/databoxes/' + this.isFolderAdded.replace(/\s/g, '-'),
        color: 'primary'
      })

      sessionStorage.setItem('notificationCount', '4');
    } 

    if(this.isFolderDeleted){
      this.notifications.push({
        message: this.isFolderDeleted,
        icon: 'widgets',
        time: '1 min ago',
        route: '/databoxes',
        color: 'warn'
      })

      sessionStorage.setItem('notificationCount', '4');
    } 

    if(this.isDataboxAdded){
      this.notifications.push({
        message: this.isDataboxAdded,
        icon: 'widgets',
        time: '1 min ago',
        route: '/databoxes',
        color: 'primary'
      })

      sessionStorage.setItem('notificationCount', '4');
    } 

    
  }

  ngOnInit() {
    this.router.events.subscribe((routeChange) => {
        if (routeChange instanceof NavigationEnd) {
          this.notificPanel.close();
        }
    });
  }
  clearAll(e) {
    e.preventDefault();
    this.notifications = [];
  }
}
