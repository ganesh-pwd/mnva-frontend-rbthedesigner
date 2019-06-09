/* 
  The list of user billing info details (please see user.ts for further details)

  Primary Key - _id,
      _id is also a Foreign key of user.ts (billing_info_id)

  Foreign Key - account_id (id of the currently selected user)
*/


export class UserBillingInfoDB {
  public user_billing_info = [
    {
      '_id': '3a7b73fa6bed15c94d1e46d4', // Primary Key
      'account_id': 'jzut3ednmnzhuzfbsggc3cny', // Foreign Key
      'first_name': 'James',
      'last_name': 'Trussart',
      'company': 'ACIUM',
      'email': 'james_trussart@minerva.com',
      'phone': '+1 (852) 535-2066',
      'address': '163 Poplar Avenue, Cliffside, Virginia, 4592',
      'address_2': '',
      'city': 'Heredia',
      'zip': '4592',
      'country': 'Costa Rica',
      'tax_id': '123-123-123-123'
    },
    {
      '_id': 'bo3kr80vwydnfrba85mvb50e', // Primary Key
      'account_id': 'hng57zw7413edoocrc1k4dev', // Foreign Key
      'first_name': 'Stephan',
      'last_name': 'Trussart',
      'company': 'ACIUM',
      'email': 'stephan_trussart@minerva.com',
      'phone': '+1 (857) 535-2066',
      'address': '163 Poplar Avenue, Cliffside, Virginia, 4592',
      'address_2': '',
      'city': 'Heredia',
      'zip': '7017',
      'country': 'Costa Rica',
      'tax_id': '123-123-123-123'
    },
    {
      '_id': 'eomp5g2wyf7au5hsus2i4xj2', // Primary Key
      'account_id': 'ab2g4m77wheqy3q4u5ymik4g', // Foreign Key
      'first_name': 'Arnold',
      'last_name': 'Manchester',
      'company': 'Divium',
      'email': 'arnold_mnchstr@minerva.com',
      'phone': '+1 (242) 124-4563',
      'address': '523 Poplar Avenue, Cliffside, Virginia, 582',
      'address_2': '',
      'city': 'Heredia',
      'zip': '7017',
      'country': 'Costa Rica',
      'tax_id': '123-123-123-123'
    },
  ]
}