/* 
  The list of databox items for the currently logged in and selected user

  Foreign key - account_id (Id of the currently selected user)
  Primary Key - _id,
      _id is also a Foreign key of:
         - databox-category.ts: databox_id
         - databox-item-connectors.ts: databox_id
         - databox-item-test-query.ts: databox_id
         - databox-item-query.ts: databox_id
         - databox-item-suggestions.ts: databox_id
*/

export class DataboxDB {
  public databox_items = [
    {
      '_id': '5a7b73jh6bed15c94d1e46d4', // databox id
      'account_id': 'jzut3ednmnzhuzfbsggc3cny', // Foreign key
      'index': 0,
      'first_create': false,
      'databox_name': 'BAC',
      'datasource': 'Facebook',
      'location': ['Costa Rica'],
      'last_updated': 'Thurs, July 12, 2018',
      'date_created': 'Thurs, July 12, 2017',
      'expiry_date': 'Thurs, July 12, 2018',
      'algorithm_quota': 100,
      'mentions': 3600,
      'mentions_per_day': 8.4,
      'credit_remaining': 120,
      'page_search_name': 'Facebook Page',
      'status': 'Active',
      'historical': 'Full Archive',
      'include_comments': true,
      'specify_max_number_result': false,
      'monitor_only_news_media': true,
      'monitor_specific_page': false,
      'exclude_specific_pages': false,
      'max_number_result': 1,
      'facebook_page_id': '',
      'excluded_pages': ''
    },
    {
      '_id': '5a7b73f7f79f4250b93a355a',
      'account_id': 'jzut3ednmnzhuzfbsggc3cny', // Foreign key
      'index': 1,
      'first_create': false,
      'databox_name': 'Banco Popular',
      'datasource': 'Facebook',
      'location': ['Costa Rica'],
      'last_updated': 'Thurs, July 12, 2018',
      'date_created': 'Thurs, July 12, 2017',
      'expiry_date': 'Thurs, July 12, 2018',
      'algorithm_quota': 100,
      'mentions': 1200,
      'mentions_per_day': 8.4,
      'credit_remaining': 100,
      'page_search_name': 'Facebook Page',
      'status': 'Active',
      'historical': 'Full Archive',
      'include_comments': true,
      'specify_max_number_result': false,
      'monitor_only_news_media': true,
      'monitor_specific_page': false,
      'exclude_specific_pages': false,
      'max_number_result': 1,
      'facebook_page_id': '',
      'excluded_pages': ''
    },
    {
      '_id': '5a7be3f76bed15c55d1e46d4',
      'account_id': 'hng57zw7413edoocrc1k4dev', // Foreign key
      'index': 2,
      'first_create': false,
      'databox_name': 'Banco Popular 2',
      'datasource': 'Twitter',
      'page_search_name': 'Twitter Profile',
      'location': ['Costa Rica'],
      'last_updated': 'Thurs, July 12, 2018',
      'date_created': 'Thurs, July 12, 2017',
      'expiry_date': 'Thurs, July 12, 2018',
      'algorithm_quota': 100,
      'mentions': 4600,
      'mentions_per_day': 8.4,
      'credit_remaining': 80,
      'status': 'Paused',
      'historical': 'Full Archive',
      'include_comments': true,
      'specify_max_number_result': false,
      'monitor_only_news_media': true,
      'monitor_specific_page': false,
      'exclude_specific_pages': false,
      'max_number_result': 1,
      'facebook_page_id': '',
      'excluded_pages': ''
    },
    {
      '_id': '5a7b73f76bed15c938be46d4',
      'account_id': 'ab2g4m77wheqy3q4u5ymik4g', // Foreign key
      'index': 3,
      'first_create': false,
      'databox_name': 'Banco Nacional',
      'datasource': 'Web',
      'location': ['Costa Rica'],
      'last_updated': 'Thurs, July 12, 2018',
      'date_created': 'Thurs, July 12, 2017',
      'expiry_date': 'Thurs, July 12, 2018',
      'algorithm_quota': 100,
      'mentions': 4200,
      'mentions_per_day': 8.4,
      'credit_remaining': 0,
      'page_search_name': 'Website',
      'status': 'Draft',
      'historical': 'Full Archive',
      'include_comments': true,
      'specify_max_number_result': false,
      'monitor_only_news_media': true,
      'monitor_specific_page': false,
      'exclude_specific_pages': false,
      'max_number_result': 1,
      'facebook_page_id': '',
      'excluded_pages': ''
    },
    {
      '_id': '5a7b73f76bed15c9e8ae46d4',
      'account_id': 'ab2g4m77wheqy3q4u5ymik4g', // Foreign key
      'index': 4,
      'first_create': false,
      'databox_name': 'Banco Nacional 2',
      'datasource': 'Web',
      'location': ['Costa Rica'],
      'last_updated': 'Thurs, July 12, 2018',
      'date_created': 'Thurs, July 12, 2017',
      'algorithm_quota': 100,
      'mentions': 4200,
      'mentions_per_day': 8.4,
      'credit_remaining': 80,
      'page_search_name': 'Website',
      'status': 'Paused',
      'historical': 'Full Archive',
      'include_comments': true,
      'specify_max_number_result': false,
      'monitor_only_news_media': true,
      'monitor_specific_page': false,
      'exclude_specific_pages': false,
      'max_number_result': 1,
      'facebook_page_id': '',
      'excluded_pages': ''
    }
  ];
}
