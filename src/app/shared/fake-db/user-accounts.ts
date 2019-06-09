/* 
  The list of user details (please see user.ts for further details)

  Primary Key - _id,
<<<<<<< HEAD
      _id is also a Foreign key of
        - user.ts: account_id
        - user-billing-history.ts: account_id
        - user-billing-info.ts: account_id
        - user-notifications.ts: account_id
        - user-plan-details.ts: account_id
=======
      _id is also a Foreign key of user.ts (account_id)
>>>>>>> a9b81f0330884cc8b892559da7cda4146bac5919
*/

export class UserAccountsDB {
  public user_accounts = [
    {
<<<<<<< HEAD
      '_id': 'jzut3ednmnzhuzfbsggc3cny',  // Primary Key
      'account_name': 'CCK',
      'account_enabled': true,
      'account_created': '2019-05-08T04:28:44',
      'plan_id': '9afn467a892fvdma5kjdqlud',
      'email': 'james_trussart@minerva.com',
      'profile_image': '../assets/images/face-1.jpg',
=======
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
      'created_users': [
        { '_id': '5a7b73f76bed15c94d1e46da' },      
        { '_id': '5a7b73f7f79f4250b96a355b' },     
      ],
      'max_created_users': 9999999999,
      'connector': {
        'alerts': ['Email Alerts', 'Slack Alerts'],
        'connectors': ['Google Data Studio', 'Tableau Connectors', 'Power BI Connectors']
      },
>>>>>>> a9b81f0330884cc8b892559da7cda4146bac5919
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
<<<<<<< HEAD
      '_id': 'hng57zw7413edoocrc1k4dev',  // Primary Key
      'account_name': 'Paprika Digital',
      'account_enabled': true,
      'account_created': '2019-05-08T04:28:44',
      'plan_id': 'k4qrka3cwvvlvx72hocavnnp',
      'email': 'stephan_trussart@minerva.com',
      'profile_image': '../assets/images/face-2.jpg',
=======
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
      'created_users': [
        { '_id': '5a7b73f76bed15c94d1e46da' },      
        { '_id': '5a7b73f7f79f4250b96a355b' },     
      ],
      'max_created_users': 5,
      'connector': {
        'alerts': ['Email Alerts', 'Slack Alerts'],
        'connectors': ['Google Data Studio', 'Tableau Connectors', 'Power BI Connectors']
      },
>>>>>>> a9b81f0330884cc8b892559da7cda4146bac5919
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
<<<<<<< HEAD
      '_id': 'ab2g4m77wheqy3q4u5ymik4g',  // Primary Key
      'account_name': 'Digital News',
      'account_enabled': true,
      'account_created': '2019-05-08T04:28:44',
      'plan_id': '7lqjc780nrmbq5ucp5p87eil',
      'email': 'elenabennett@fibrodyne.com',
      'profile_image': '../assets/images/face-3.jpg',
=======
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
        'created_users': [
          { '_id': '5a7b73f78b64a02a67204d6c' },       
      ],
      'max_created_users': 2,
      'connector': {
        'alerts': ['Email Alerts'],
        'connectors': ['Google Data Studio']
      },
>>>>>>> a9b81f0330884cc8b892559da7cda4146bac5919
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

