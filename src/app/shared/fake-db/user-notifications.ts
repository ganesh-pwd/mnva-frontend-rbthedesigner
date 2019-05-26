/*
  List of user notifications, 

  Foreign Key: account_id (Id of the currently selected users)
*/

export class UserNotificationsDB {
  public user_notifications = [
    {
      '_id': '5a7b73f76bed15c94d1e46da',
      'account_id': 0,
      'title': 'Invited a new user',
      'type': 'minerva_notification',
      'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem necessitatibus natus fugit porro at sunt mollitia repellendus deserunt, libero similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem necessitatibus natus fugit porro at sunt mollitia repellendus deserunt, libero similique.',
      'icon': 'library_books',
      'color': 'primary',
      'date_created': '2019-05-08T04:28:44',
    },
    {
      '_id': '5a7b73f76bed15c94d1e46da',
      'account_id': 0,
      'title': 'Created a new databox',
      'type': 'databox_notification',
      'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem necessitatibus natus fugit porro at sunt mollitia repellendus deserunt, libero similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem necessitatibus natus fugit porro at sunt mollitia repellendus deserunt, libero similique.',
      'icon': 'library_books',
      'color': 'primary',
      'date_created': '2019-05-08T04:28:44',
    },
  ];
}
