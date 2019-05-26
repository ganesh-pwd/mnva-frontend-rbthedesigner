/* 
  The list of users to look up after successful cognito signin

  The service will try and look for the cognito_user_id: which is the primary key of
  cognito-user.ts, then each item in the array of accounts will be populated.

  Foreign key - account_id (Id of the user details that will be selected)
  Foreign key - billing_info_id (Id of the user details billing info that will be selected)
*/

export class UserDB {
  public users = [
    {
      '_id': '03co14xhp08g3lvfpi4lhve5',
      'index': 0,
      'cognito_user_id': '7m74uo0c1eeljo6pz5faych8',
      'accounts': [
        {
          'account_id': 'jzut3ednmnzhuzfbsggc3cny', // foreign key
          'billing_info_id': '3a7b73fa6bed15c94d1e46d4' // foreign key
        },
        {
          'account_id': 'hng57zw7413edoocrc1k4dev', // foreign key
          'billing_info_id': 'bo3kr80vwydnfrba85mvb50e' // foreign key
        }
      ]
    },
    {
      '_id': 'a9u58t4wym86ewn4ahq8qk8b',
      'index': 1,
      'cognito_user_id': 'dhnf3sadc29rmc0dgvin1jcs',
      'accounts': [
        {
          'account_id': 'ab2g4m77wheqy3q4u5ymik4g', // foreign key
          'billing_info_id': 'eomp5g2wyf7au5hsus2i4xj2' // foreign key
        }
      ]
    }
  ];
}


