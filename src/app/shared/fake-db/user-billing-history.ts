/* 
  The list of user billing history details 


  Foreign Key - account_id (id of the currently selected user)
  Foreign Key - billing_info_id (id of the billing info of the currently selected user)
*/


export class UserBillingHistoryDB {
  public user_billing_history = [
    {
      '_id': 'lvpbgs6aw8e0yrho1uvcsy0w', // Primary Key
      'account_id': 'jzut3ednmnzhuzfbsggc3cny', // Foreign Key
      'billing_info_id': '3a7b73fa6bed15c94d1e46d4', // Foreign Key
      'product_id': 'hh7oho5416mbmsdliazoa51p',
      'status': 'Completed',
      'date_created': '2019-05-08T04:28:44',
    },
    {
      '_id': 'efrhqlo6zmt71da3p2hx8w4h', // Primary Key
      'account_id': 'jzut3ednmnzhuzfbsggc3cny', // Foreign Key
      'billing_info_id': '3a7b73fa6bed15c94d1e46d4', // Foreign Key
      'product_id': '9afn467a892fvdma5kjdqlud',
      'status': 'Completed',
      'date_created': '2019-05-08T04:28:44',
    },
    {
      '_id': 'l3gp7erlys06nq3rut3uolp3', // Primary Key
      'account_id': 'hng57zw7413edoocrc1k4dev', // Foreign Key
      'billing_info_id': 'bo3kr80vwydnfrba85mvb50e', // Foreign Key
      'product_id': '5a9ae2106518248b68251fdf',
      'status': 'Pending',
      'date_created': '2019-05-08T04:28:44',
    },
    {
      '_id': 'l3gp7erlys06nq3rut3uolp3', // Primary Key
      'account_id': 'jzut3ednmnzhuzfbsggc3cny', // Foreign Key
      'billing_info_id': 'James', // Foreign Key
      'product_id': '5a9ae2106518248b68251fdf',
      'status': 'Cancelled',
      'date_created': '2019-05-08T04:28:44',
    },
  ]
}