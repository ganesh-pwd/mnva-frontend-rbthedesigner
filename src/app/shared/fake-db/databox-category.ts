/* 
  The list of categories for the currently selected databox 
  for the currently logged in and selected user

  Foreign key - databox_id (Id of databox)
*/

export class DataboxCategory {
  public databox_categories =  [
    {
      '_id': 'bnr4n3obo9juyvjm3cvhtuva', 
      'index': 0,
      'databox_id': '5a7b73jh6bed15c94d1e46d4', // Foreign Key
      'category_available': 20,
      'category_used': 4,
      'sub_category_available': 20,
      'sub_category_available_used': 3,
      'categories': [
        {
          'name': 'Movistar',
          'type': 'Category',
          'query-type': 'basic',
          'expression': 'movistar OR "movi"',
          'index': 0,
          'query': '',
          'optional-keywords': [`"movi"`],
          'required-keywords': [`movistar`],
          'excluded-keywords': []
        },
        {
          'name': 'Kolbi',
          'type': 'Category',
          'query-type': 'basic',
          'expression': 'kolbi OR "kolbi"',
          'index': 1,
          'query': '',
          'optional-keywords': [`"kolbi"`],
          'required-keywords': [`kolbi`],
          'excluded-keywords': []
        },
        {
          'name': 'Claro',
          'type': 'Category',
          'query-type': 'basic',
          'expression': 'claro',
          'index': 2,
          'query': '',
          'optional-keywords': [],
          'required-keywords': [`claro`],
          'excluded-keywords': []
        },
        {
          'name': 'Internet',
          'type': 'Sub Category',
          'query-type': 'basic',
          'expression': 'internet',
          'index': 3,
          'query': '',
          'optional-keywords': [],
          'required-keywords': [`internet`],
          'excluded-keywords': []
        },
      ]
    },
    {
      '_id': 'i1jqhy93q8lqyok9agdsekfb', 
      'index': 1,
      'databox_id': '5a7b73f7f79f4250b93a355a', // Foreign Key
      'category_available': 20,
      'category_used': 3,
      'sub_category_available': 20,
      'sub_category_available_used': 0,
      'categories': [
        {
          'name': 'Movistar',
          'type': 'Category',
          'query-type': 'basic',
          'expression': 'movistar OR "movi"',
          'index': 0,
          'query': '',
          'optional-keywords': [`"movi"`],
          'required-keywords': [`movistar`],
          'excluded-keywords': []
        },
        {
          'name': 'Kolbi',
          'type': 'Category',
          'query-type': 'basic',
          'expression': 'kolbi OR "kolbi"',
          'index': 1,
          'query': '',
          'optional-keywords': [`"kolbi"`],
          'required-keywords': [`kolbi`],
          'excluded-keywords': []
        },
        {
          'name': 'Claro',
          'type': 'Category',
          'query-type': 'basic',
          'expression': 'claro',
          'index': 2,
          'query': '',
          'optional-keywords': [],
          'required-keywords': [`claro`],
          'excluded-keywords': []
        }
      ]
    },
    {
      '_id': 'u7tygzlmu7jn7hj37lui2gvv', 
      'index': 2,
      'databox_id': '5a7be3f76bed15c55d1e46d4', // Foreign Key
      'category_available': 20,
      'category_used': 2,
      'sub_category_available': 20,
      'sub_category_available_used': 0,
      'categories': [
        {
          'name': 'Movistar',
          'type': 'Category',
          'query-type': 'basic',
          'expression': 'movistar OR "movi"',
          'index': 0,
          'query': '',
          'optional-keywords': [`"movi"`],
          'required-keywords': [`movistar`],
          'excluded-keywords': []
        },
        {
          'name': 'Kolbi',
          'type': 'Category',
          'query-type': 'basic',
          'expression': 'kolbi OR "kolbi"',
          'index': 1,
          'query': '',
          'optional-keywords': [`"kolbi"`],
          'required-keywords': [`kolbi`],
          'excluded-keywords': []
        },
      ]
    },
    {
      '_id': 'y60evgpxi3vve2frfm320tas', 
      'index': 3,
      'databox_id': '5a7b73f76bed15c938be46d4', // Foreign Key
      'category_available': 20,
      'category_used': 2,
      'sub_category_available': 20,
      'sub_category_available_used': 0,
      'categories': []
    },
    {
      '_id': 'mwp6jztvihhx3ig2m3phv6ea', 
      'index': 4,
      'databox_id': '5a7b73f76bed15c9e8ae46d4', // Foreign Key
      'category_available': 20,
      'category_used': 2,
      'sub_category_available': 20,
      'sub_category_available_used': 0,
      'categories': []
    },

  ];
}
