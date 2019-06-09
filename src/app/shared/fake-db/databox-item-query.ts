/* 
  The list of databox items queries for the currently logged in and selected user databox
  Foreign key _ databox_id (Id of the currently selected databox)
*/

export class DataboxQueryDB {
  public databox_items_query = [
    {
      '_id': 'y9gnw3xq0zj6s6mck04ynrzc', // Primary Key
      'databox_id': '5a7b73jh6bed15c94d1e46d4', // Foreign Key
      'query_type': 'basic',
      'keywords': 5,
      'expression': '((Mitsubishi) OR ("Toyota OR Lexus OR Mazda")) AND (NOT (Kia))',
      'query': '',
      'optional_keywords': ['Toyota', 'Lexus', 'Mazda'],
      'required_keywords': ['Mitsubishi'],
      'excluded_keywords': ['Kia']
    },
    {
      '_id': '6xxa2icag9rhxkgn29o0o4p5', // Primary Key
      'databox_id': '5a7b73f7f79f4250b93a355a', // Foreign Key
      'query_type': 'advance',
      'keywords': 3,
      'expression': '',
      'query': '( "Hino" OR Toyota OR Lexus OR Mercedes Benz OR "KIA" OR "Fiat" OR Suzuki OR [Mase(r|rr)ati] OR "BMW" OR hyundai OR mitsubishi ) AND NOT ( contiguo OR conjunto a OR "frente a" OR "norte" OR "oeste" OR "sur" OR metros )',
      'optional_keywords': [],
      'required_keywords': [],
      'excluded_keywords': []
    },
    {
      '_id': 'qii6tkbf259r86rje8lchdfu', // Primary Key
      'databox_id': '5a7be3f76bed15c55d1e46d4', // Foreign Key
      'query_type': 'basic',
      'keywords': 5,
      'expression': '((Tesla) OR ("Opel OR Toyota OR Mitsubishi")) AND (NOT (Kia))',
      'query': '',
      'optional_keywords': ['Opel', 'Toyota', 'Mitsubishi'],
      'required_keywords': ['Tesla'],
      'excluded_keywords': ['Kia']
    },
    {
      '_id': 'n5kk80ec381vr95r4vp93m11', // Primary Key
      'databox_id': '5a7b73f76bed15c938be46d4', // Foreign Key
      'query_type': 'basic',
      'keywords': 5,
      'expression': '((Ferrari) OR ("Lotus OR Koenigsegg Agera OR Lexus OR Maclaren")) AND (NOT (Kia))',
      'query': '',
      'optional_keywords': ['Lotus', 'Koenigsegg Agera', 'Lexus', 'Maclaren'],
      'required_keywords': ['Ferrari'],
      'excluded_keywords': ['Kia']
    },
    {
      '_id': '8z2enz8ebgeanggklw6k2ub1', // Primary Key
      'databox_id': '5a7b73f76bed15c9e8ae46d4', // Foreign Key
      'query_type': 'basic',
      'keywords': 5,
      'expression': '((Mitsubishi) OR ("Maserrati OR Toyota OR Lexus OR Fiat")) AND (NOT (Kia))',
      'query': '',
      'optional_keywords': ['Maserrati', 'Toyota', 'Lexus', 'Fiat'],
      'required_keywords': ['Mitsubishi'],
      'excluded_keywords': ['Kia']
    }
  ];
}
