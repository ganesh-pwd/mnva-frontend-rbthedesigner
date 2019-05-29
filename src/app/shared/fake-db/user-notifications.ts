/*
  List of user notifications, 

  Foreign Key: account_id (Id of the currently selected users)
*/

export class UserNotificationsDB {
  public user_notifications = [
    {
      '_id': 'x2svigxrw0rye0phlf27gri9',
      'account_id': 'jzut3ednmnzhuzfbsggc3cny', // Foreign Key
      'title': 'Invited a new user',
      'type': 'minerva_notification',
      'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem necessitatibus natus fugit porro at sunt mollitia repellendus deserunt, libero similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem necessitatibus natus fugit porro at sunt mollitia repellendus deserunt, libero similique.',
      'icon': 'library_books',
      'color': 'primary',
      'date_created': '2019-05-08T04:28:44',
    },
    {
      '_id': 'fh3idow4p3g0zh5iqoaoz90u',
      'account_id': 'hng57zw7413edoocrc1k4dev', // Foreign Key
      'title': 'Created a new databox',
      'type': 'databox_notification',
      'content': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem necessitatibus natus fugit porro at sunt mollitia repellendus deserunt, libero similique. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem necessitatibus natus fugit porro at sunt mollitia repellendus deserunt, libero similique.',
      'icon': 'library_books',
      'color': 'primary',
      'date_created': '2019-05-08T04:28:44',
    },
  ];
}
