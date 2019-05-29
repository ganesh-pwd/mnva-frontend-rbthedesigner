/* 
  The list of databox items queries for the currently logged in and selected user databox

  Foreign key - databox_id (Id of the currently selected databox)
*/

export class DataboxQueryDB {
  public databox_items_query = [
    {
      '_id': 'y9gnw3xq0zj6s6mck04ynrzc',
      'databox_id': '5a7b73jh6bed15c94d1e46d4', // Foreign Key
      'query-type': 'basic',
      'keywords': 5,
      'expression': '((Mitsubishi) OR ("Toyota OR Lexus OR Mazda")) AND (NOT (Kia))',
      'query': '',
      'optional-keywords': ['Toyota', 'Lexus', 'Mazda'],
      'required-keywords': ['Mitsubishi'],
      'excluded-keywords': ['Kia']
    },
    {
      '_id': '6xxa2icag9rhxkgn29o0o4p5',
      'databox_id': '5a7b73f7f79f4250b93a355a', // Foreign Key
      'query-type': 'advance',
      'keywords': 3,
      'expression': '',
      'query': '( "Hino" OR Toyota OR Lexus OR Mercedes Benz OR "KIA" OR "Fiat" OR Suzuki OR [Mase(r|rr)ati] OR "BMW" OR hyundai OR mitsubishi ) AND NOT ( contiguo OR conjunto a OR "frente a" OR "norte" OR "oeste" OR "sur" OR metros )',
      'optional-keywords': [],
      'required-keywords': [],
      'excluded-keywords': []
    },
    {
      '_id': 'qii6tkbf259r86rje8lchdfu',
      'databox_id': '5a7be3f76bed15c55d1e46d4', // Foreign Key
      'query-type': 'basic',
      'keywords': 5,
      'expression': '((Tesla) OR ("Opel OR Toyota OR Mitsubishi")) AND (NOT (Kia))',
      'query': '',
      'optional-keywords': ['Opel', 'Toyota', 'Mitsubishi'],
      'required-keywords': ['Tesla'],
      'excluded-keywords': ['Kia']
    },
    {
      '_id': 'n5kk80ec381vr95r4vp93m11',
      'databox_id': '5a7b73f76bed15c938be46d4', // Foreign Key
      'query-type': 'basic',
      'keywords': 5,
      'expression': '((Ferrari) OR ("Lotus OR Koenigsegg Agera OR Lexus OR Maclaren")) AND (NOT (Kia))',
      'query': '',
      'optional-keywords': ['Lotus', 'Koenigsegg Agera', 'Lexus', 'Maclaren'],
      'required-keywords': ['Ferrari'],
      'excluded-keywords': ['Kia']
    },
    {
      '_id': '8z2enz8ebgeanggklw6k2ub1',
      'databox_id': '5a7b73f76bed15c9e8ae46d4', // Foreign Key
      'query-type': 'basic',
      'keywords': 5,
      'expression': '((Mitsubishi) OR ("Maserrati OR Toyota OR Lexus OR Fiat")) AND (NOT (Kia))',
      'query': '',
      'optional-keywords': ['Maserrati', 'Toyota', 'Lexus', 'Fiat'],
      'required-keywords': ['Mitsubishi'],
      'excluded-keywords': ['Kia']
    }
  ];
}
