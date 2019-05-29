/* 
  The list of user details (please see user.ts for further details)

  Primary Key - _id,
      _id is also a Foreign key of user.ts (account_id)
*/

export class UserAccountsDB {
  public user_accounts = [
    {
      '_id': 'jzut3ednmnzhuzfbsggc3cny', 
      'accountName': 'CCK',
      'isActive': true,
      'balance': 9999,
      'email': 'james_trussart@minerva.com',
      'profile_image': '../assets/images/face-1.jpg',
      'accountType': 'Enterprise',
      'mentions': 9999999999,
      'datasources': ['Facebook', 'Twitter', 'Web','Owned Facebook Page', 'Owned Twitter Profile', 'AirBnB', 'Waze'],
      'algorithmCredits': 500,
      'max_created_users': 9999999999,
      'connector': {
        'alerts': ['Email Alerts', 'Slack Alerts'],
        'connectors': ['Google Data Studio', 'Tableau Connectors', 'Power BI Connectors']
      },
      'notifications': {
        'when_user_join': false, 
        'when_data_released': false, 
        'when_invoice_generated': false,
        'when_user_leave': false,
        'when_credit_warning': false,
        'when_credit_expired': false,
        'when_purchase_declined': false,
        'when_purchase_success': false,
      }
    },
    {
      '_id': 'hng57zw7413edoocrc1k4dev', 
      'accountName': 'Paprika Digital',
      'isActive': true,
      'balance': 2838.08,
      'email': 'stephan_trussart@minerva.com',
      'profile_image': '../assets/images/face-2.jpg',
      'accountType': 'Professional',
      'mentions': 5000,
      'datasources': ['Facebook', 'Twitter', 'Web','Owned Facebook Page', 'Owned Twitter Profile'],
      'algorithmCredits': 250,
      'max_created_users': 5,
      'connector': {
        'alerts': ['Email Alerts', 'Slack Alerts'],
        'connectors': ['Google Data Studio', 'Tableau Connectors', 'Power BI Connectors']
      },
      'notifications': {
        'when_user_join': false, 
        'when_data_released': false, 
        'when_invoice_generated': false,
        'when_user_leave': false,
        'when_credit_warning': false,
        'when_credit_expired': false,
        'when_purchase_declined': false,
        'when_purchase_success': false,
      }
    },
    {
      '_id': 'ab2g4m77wheqy3q4u5ymik4g', 
      'accountName': 'Digital News',
      'isActive': true,
      'balance': 2838.08,
      'email': 'elenabennett@fibrodyne.com',
      'profile_image': '../assets/images/face-3.jpg',
      'accountType': 'Basic',
      'mentions': 3000,
      'datasources': ['Facebook'],
      'algorithmCredits': 100,
      'max_created_users': 2,
      'connector': {
        'alerts': ['Email Alerts'],
        'connectors': ['Google Data Studio']
      },
      'notifications': {
        'when_user_join': false, 
        'when_data_released': false, 
        'when_invoice_generated': false,
        'when_user_leave': false,
        'when_credit_warning': false,
        'when_credit_expired': false,
        'when_purchase_declined': false,
        'when_purchase_success': false,
      }
    },
  ]
}

