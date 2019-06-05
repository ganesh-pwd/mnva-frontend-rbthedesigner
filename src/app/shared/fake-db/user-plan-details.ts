/* 
  The list of user plan details (please see user.ts for further details)

  Foreign Key: account_id (Id of the currently selected user)
*/

export class UserPlanDetailsDB {
  public user_plan_details = [
    {
      '_id': 't6p92jwo3ztjxltsduh7nfv2',
      'account_id': 'jzut3ednmnzhuzfbsggc3cny', // Foreign key
      'plan_id': '9afn467a892fvdma5kjdqlud',  // Foreign key
      'account_type': 'Enterprise',
      'remaining_mentions': 999999999999, 
      'algorithm_credits': 500,
      'max_created_users': 999999999999,
    },
    {
      '_id': 'kjkqfel4sstpr7xer1af7bxw',
      'account_id': 'hng57zw7413edoocrc1k4dev',  // Foreign key
      'plan_id': 'k4qrka3cwvvlvx72hocavnnp', // Foreign key
      'account_type': 'Professional',
      'remaining_mentions': 5000, 
      'algorithm_credits': 250,
      'max_created_users': 5,
    },
    {
      '_id': 'mjd5n99xvmmxpq8gkcgmwk84',
      'account_id': 'ab2g4m77wheqy3q4u5ymik4g', // Foreign key
      'plan_id': '7lqjc780nrmbq5ucp5p87eil', // Foreign key
      'account_type': 'Basic',
      'remaining_mentions': 3000, 
      'algorithm_credits': 100,
      'max_created_users': 2,
    }
  ]
}

