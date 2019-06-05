/* 
  The account types that can be created by the currently selected user (see. user-accounts.ts) 
  - Refer to the current database schema

  Foreign Key: account_id (id of the currently selected user)
*/
export class MinervaAccountDB {
  public minerva_accounts = [
    {
      '_id': '5a7b73f76bed15c94d1e46da',  // Primary Key
      'account_id': 'jzut3ednmnzhuzfbsggc3cny', // Foreign Key
      'index': 0,
      'status': 'Active',
      'age': 30,
      'name': 'Stefanie Marsh',
      'user_type': 'Administrator',
      'profile_image': '../assets/images/face-4.jpg',
      'date_created': '2015-02-08T04:28:44',
      'gender': 'female',
      'company': 'ACIUM',
      'email': 'stefaniemarsh@mnrva.com',
      'phone': '+1 (857) 535-2066',
      'address': '163 Poplar Avenue, Cliffside, Virginia, 4592',
      'bd': '2015-02-08T04:28:44'
    },
    {
      '_id': '5a7b73f7f79f4250b96a355b',  // Primary Key
      'account_id': 'jzut3ednmnzhuzfbsggc3cny', // Foreign Key
      'index': 1,
      'status': 'Active',
      'age': 39,
      'name': 'Elena Bennett',
      'user_type': 'Normal User',
      'profile_image': '../assets/images/face-5.jpg',
      'date_created': '2017-11-15T09:04:57',
      'gender': 'female',
      'company': 'FIBRODYNE',
      'email': 'elenabennett@mnrva.com',
      'phone': '+1 (994) 570-2070',
      'address': '526 Grace Court, Cherokee, Oregon, 7017',
      'bd': '2017-11-15T09:04:57'
    },
    {
      '_id': '5a7b73f78b64a02a67204d6c',  // Primary Key
      'account_id': 'jzut3ednmnzhuzfbsggc3cny', // Foreign Key
      'index': 2,
      'status': 'Active',
      'age': 23,
      'name': 'Joni Cabrera',
      'user_type': 'Normal User',
      'profile_image': '../assets/images/face-3.jpg',
      'date_created': '2017-10-15T12:55:51',
      'gender': 'female',
      'company': 'POWERNET',
      'email': 'jonicabrera@mnrva.com',
      'phone': '+1 (848) 410-2368',
      'address': '554 Barlow Drive, Alamo, Michigan, 3686',
      'bd': '2017-10-15T12:55:51'
    },
    {
      '_id': '5a7b73f7572e59b231149b9d',  // Primary Key
      'account_id': 'hng57zw7413edoocrc1k4dev', // Foreign Key
      'index': 3,
      'status': 'Active',
      'age': 37,
      'name': 'Gallagher Shaw',
      'user_type': 'Administrator',
      'profile_image': '../assets/images/face-4.jpg',
      'date_created': '2017-11-19T03:38:30',
      'gender': 'male',
      'company': 'ZILLAR',
      'email': 'gallaghershaw@mnrva.com',
      'phone': '+1 (896) 422-3786',
      'address': '111 Argyle Road, Graball, Idaho, 7272',
      'bd': '2017-11-19T03:38:30'
    },
    {
      '_id': '5a7b73f70f9d074552e1309e',  // Primary Key
      'account_id': 'hng57zw7413edoocrc1k4dev', // Foreign Key
      'index': 4,
      'status': 'Active',
      'age': 26,
      'name': 'Blanchard Knapp',
      'user_type': 'Administrator',
      'profile_image': '../assets/images/face-5.jpg',
      'date_created': '2014-05-28T01:33:58',
      'gender': 'male',
      'company': 'ACRODANCE',
      'email': 'blanchardknapp@mnrva.com',
      'phone': '+1 (867) 542-2772',
      'address': '707 Malta Street, Yukon, Wyoming, 6861',
      'bd': '2014-05-28T01:33:58'
    },
    {
      '_id': '5a7b73f78988bd6e9265047f',  // Primary Key
      'account_id': 'dhnf3sadc29rmc0dgvin1jcs', // Foreign Key
      'index': 5,
      'status': 'Active',
      'age': 34,
      'name': 'Parker Rivas',
      'user_type': 'Administrator',
      'profile_image': '../assets/images/face-6.jpg',
      'date_created': '2015-01-05T09:55:23',
      'gender': 'male',
      'company': 'SLAMBDA',
      'email': 'parkerrivas@mnrva.com',
      'phone': '+1 (997) 413-2418',
      'address': '543 Roosevelt Place, Tibbie, Minnesota, 6944',
      'bd': '2015-01-05T09:55:23'
    }
  ];
}
