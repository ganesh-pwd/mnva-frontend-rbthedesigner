/* 
  The list of user details (please see user.ts for further details)

  Primary Key - _id,
      _id is also a Foreign key of
        - user.ts: account_id
        - user-billing-history.ts: account_id
        - user-billing-info.ts: account_id
        - user-notifications.ts: account_id
        - user-plan-details.ts: account_id
*/

export class UserAccountsDB {
  public user_accounts = [
    {
      '_id': 'jzut3ednmnzhuzfbsggc3cny',  // Primary Key
      'account_name': 'CCK',
      'account_enabled': true,
      'account_created': '2019-05-08T04:28:44',
      'plan_id': '9afn467a892fvdma5kjdqlud',
      'email': 'james_trussart@minerva.com',
      'profile_image': '../assets/images/face-1.jpg',
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
      '_id': 'hng57zw7413edoocrc1k4dev',  // Primary Key
      'account_name': 'Paprika Digital',
      'account_enabled': true,
      'account_created': '2019-05-08T04:28:44',
      'plan_id': 'k4qrka3cwvvlvx72hocavnnp',
      'email': 'stephan_trussart@minerva.com',
      'profile_image': '../assets/images/face-2.jpg',
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
      '_id': 'ab2g4m77wheqy3q4u5ymik4g',  // Primary Key
      'account_name': 'Digital News',
      'account_enabled': true,
      'account_created': '2019-05-08T04:28:44',
      'plan_id': '7lqjc780nrmbq5ucp5p87eil',
      'email': 'elenabennett@fibrodyne.com',
      'profile_image': '../assets/images/face-3.jpg',
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

