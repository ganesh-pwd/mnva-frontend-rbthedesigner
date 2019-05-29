/* 
  The list of user plan details (please see user.ts for further details)

  Foreign Key: account_id (Id of the currently selected user)
*/

export class UserPlanDetailsDB {
  public user_plan_details = [
    {
      '_id': 'ab2g4m77wheqy3q4u5ymik4g', 
      'account_id': 'ab2g4m77wheqy3q4u5ymik4g', // Foreign key
      'isActive': true,
      'balance': 2838.08,
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
      }
    }
  ]
}

