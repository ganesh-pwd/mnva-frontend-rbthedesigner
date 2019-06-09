/* 
  The list of databox items suggestion for the currently logged in and selected user databox

  Foreign key - databox_id (Id of the currently selected databox)
*/

export class DataboxSuggestionDB {
  public databox_items_suggestion = [
    {
      '_id': '64f6zdfjref9402yz5ssvjdj', // Primary Key
      'databox_id': '5a7b73jh6bed15c94d1e46d4', // Foreign key
      'datasource_suggestion': [{
            'source': 'Facebook',
            'page_name': 'Facebook Page 1',
            'page_id': '5a7be3f76dd15c5235d1r36d4',
            'page_country': ['Costa Rica']
      }]
    },
    {
      '_id': 's5g1hy0p48e21gh0bumazw96', // Primary Key
      'databox_id': '5a7b73f7f79f4250b93a355a', // Foreign key
      'datasource_suggestion': [{
            'source': 'Facebook',
            'page_name': 'Facebook Page 2',
            'page_id': '5a7be3f76bed15c55d1r36d4',
            'page_country': ['Costa Rica']
      }]
    },
    {
      '_id': 'czi72uzulsdunbmgvynu4nd6', // Primary Key
      'databox_id': '5a7be3f76bed15c55d1e46d4', // Foreign key
      'datasource_suggestion': [{
            'source': 'Twitter',
            'page_name': 'Twitter Profile',
            'page_id': '5a7be3f76bed15c55d1e46d4',
            'page_country': ['Costa Rica']
      }]
    },
    {
      '_id': 'djbjy4jywi5bp6eg4n3nzgbc', // Primary Key
      'databox_id': '5a7b73f76bed15c938be46d4', // Foreign key
      'datasource_suggestion': [{
            'source': 'Web',
            'page_name': 'Web Name',
            'page_id': '5a7d32376bed15c55d1e46d4',
            'page_country': ['Costa Rica']
      }]
    },
    {
      '_id': '1crfoclesjy9q24wdyy8qmz9', // Primary Key
      'databox_id': '5a7b73f76bed15c9e8ae46d4', // Foreign key
      'datasource_suggestion': [{
            'source': 'Web',
            'page_name': 'Web Name',
            'page_id': '5a7d32376bed15c55d1e46d4',
            'page_country': ['Costa Rica']
      }]
    }
  ];
}
