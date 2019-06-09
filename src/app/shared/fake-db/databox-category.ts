/* 
  The list of categories for the currently selected databox for the currently logged in and selected user.
  categories field can contain an array of categories including query values for basic and advance

  Foreign key _ databox_id (Id of databox)
*/

export class DataboxCategory {
  public databox_categories =  [
    {
      '_id': 'bnr4n3obo9juyvjm3cvhtuva', // Primary Key
      'databox_id': '5a7b73jh6bed15c94d1e46d4', // Foreign Key
      'category_available': 20,
      'category_used': 4,
      'sub_category_available': 20,
      'sub_category_available_used': 3, 
      'categories': [ 
        {
          'name': 'Movistar', 
          'type': 'Category',
          'query_type': 'basic',
          'expression': 'movistar OR "movi"',
          'index': 0,
          'query': '',
          'optional_keywords': [`"movi"`],
          'required_keywords': [`movistar`],
          'excluded_keywords': []
        },
        {
          'name': 'Kolbi',
          'type': 'Category',
          'query_type': 'basic',
          'expression': 'kolbi OR "kolbi"',
          'index': 1,
          'query': '',
          'optional_keywords': [`"kolbi"`],
          'required_keywords': [`kolbi`],
          'excluded_keywords': []
        },
        {
          'name': 'Claro',
          'type': 'Category',
          'query_type': 'basic',
          'expression': 'claro',
          'index': 2,
          'query': '',
          'optional_keywords': [],
          'required_keywords': [`claro`],
          'excluded_keywords': []
        },
        {
          'name': 'Internet',
          'type': 'Sub Category',
          'query_type': 'basic',
          'expression': 'internet',
          'index': 3,
          'query': '',
          'optional_keywords': [],
          'required_keywords': [`internet`],
          'excluded_keywords': []
        },
      ]
    },
    {
      '_id': 'i1jqhy93q8lqyok9agdsekfb', // Primary Key
      'databox_id': '5a7b73f7f79f4250b93a355a', // Foreign Key
      'category_available': 20,
      'category_used': 3,
      'sub_category_available': 20,
      'sub_category_available_used': 0,
      'categories': [
        {
          'name': 'Movistar',
          'type': 'Category',
          'query_type': 'basic',
          'expression': 'movistar OR "movi"',
          'index': 0,
          'query': '',
          'optional_keywords': [`"movi"`],
          'required_keywords': [`movistar`],
          'excluded_keywords': []
        },
        {
          'name': 'Kolbi',
          'type': 'Category',
          'query_type': 'basic',
          'expression': 'kolbi OR "kolbi"',
          'index': 1,
          'query': '',
          'optional_keywords': [`"kolbi"`],
          'required_keywords': [`kolbi`],
          'excluded_keywords': []
        },
        {
          'name': 'Claro',
          'type': 'Category',
          'query_type': 'basic',
          'expression': 'claro',
          'index': 2,
          'query': '',
          'optional_keywords': [],
          'required_keywords': [`claro`],
          'excluded_keywords': []
        }
      ]
    },
    {
      '_id': 'u7tygzlmu7jn7hj37lui2gvv', // Primary Key
      'databox_id': '5a7be3f76bed15c55d1e46d4', // Foreign Key
      'category_available': 20,
      'category_used': 2,
      'sub_category_available': 20,
      'sub_category_available_used': 0,
      'categories': [
        {
          'name': 'Movistar',
          'type': 'Category',
          'query_type': 'basic',
          'expression': 'movistar OR "movi"',
          'index': 0,
          'query': '',
          'optional_keywords': [`"movi"`],
          'required_keywords': [`movistar`],
          'excluded_keywords': []
        },
        {
          'name': 'Kolbi',
          'type': 'Category',
          'query_type': 'basic',
          'expression': 'kolbi OR "kolbi"',
          'index': 1,
          'query': '',
          'optional_keywords': [`"kolbi"`],
          'required_keywords': [`kolbi`],
          'excluded_keywords': []
        },
      ]
    },
    {
      '_id': 'y60evgpxi3vve2frfm320tas', // Primary Key
      'databox_id': '5a7b73f76bed15c938be46d4', // Foreign Key
      'category_available': 20,
      'category_used': 2,
      'sub_category_available': 20,
      'sub_category_available_used': 0,
      'categories': []
    },
    {
      '_id': 'mwp6jztvihhx3ig2m3phv6ea', // Primary Key
      'databox_id': '5a7b73f76bed15c9e8ae46d4', // Foreign Key
      'category_available': 20,
      'category_used': 2,
      'sub_category_available': 20,
      'sub_category_available_used': 0,
      'categories': []
    },

  ];
}
