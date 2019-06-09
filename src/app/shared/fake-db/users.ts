/* 
  The list of users to look up after successful cognito signin

  The service will try and look for the cognito_user_id: which is the primary key of
  cognito-user.ts, then each item in the array of accounts will be populated.

  Foreign key - account_id (Id of the user details that will be selected)
  Foreign key - billing_info_id (Id of the user details billing info that will be selected)
  Foreign key - plan_id (Id of the user plan details that will be selected)
*/

export class UserDB {
  public users = [
    {
      '_id': '03co14xhp08g3lvfpi4lhve5',
      'cognito_user_id': '7m74uo0c1eeljo6pz5faych8', // Foreign key
      'accounts': [
        {
          'index': 0,
          'account_id': 'jzut3ednmnzhuzfbsggc3cny', // Foreign key
          'plan_id': 't6p92jwo3ztjxltsduh7nfv2', // Foreign Key
          'billing_info_id': '3a7b73fa6bed15c94d1e46d4' // Foreign key
        },
        {
          'index': 1,
          'account_id': 'hng57zw7413edoocrc1k4dev', // Foreign key
          'plan_id': 'kjkqfel4sstpr7xer1af7bxw', // Foreign Key
          'billing_info_id': 'bo3kr80vwydnfrba85mvb50e' // Foreign key
        }
      ]
    },
    {
      '_id': 'a9u58t4wym86ewn4ahq8qk8b',
      'cognito_user_id': 'dhnf3sadc29rmc0dgvin1jcs', // Foreign key
      'accounts': [
        {
          'index': 0,
          'account_id': 'ab2g4m77wheqy3q4u5ymik4g', // Foreign key
          'plan_id': 'mjd5n99xvmmxpq8gkcgmwk84', // Foreign Key
          'billing_info_id': 'eomp5g2wyf7au5hsus2i4xj2' // Foreign key
        }
      ]
    }
  ];
}


