/* 
  The list of databox sample test query for the currently selected databox  
  for the currently logged in and selected user

  Foreign key _ databox_id (Id of databox)
*/

export class DataboxTestQueryDB {
  public databox_test_queries = [
    {
      '_id': '2a7b73jh6bed15c94d1e46d4', // Primary Key
      'databox_id': '5a7b73jh6bed15c94d1e46d4', // Foreign key
      'query_type': 'basic',
      'expression': '( "Hino" OR Toyota OR Lexus OR Mercedes Benz OR "KIA" OR "Fiat" OR Suzuki OR [Mase(r|rr)ati] OR "BMW" OR hyundai OR mitsubishi ) AND NOT ( contiguo OR conjunto a OR "frente a" OR "norte" OR "oeste" OR "sur" OR metros )',
      'query': '( "Hino" OR Toyota OR Lexus OR Mercedes Benz OR "KIA" OR "Fiat" OR Suzuki OR [Mase(r|rr)ati] OR "BMW" OR hyundai OR mitsubishi ) AND NOT ( contiguo OR conjunto a OR "frente a" OR "norte" OR "oeste" OR "sur" OR metros )',
      'optional_keywords': ['Hino', 'Toyota', 'Lexus', 'Mercedes Benz'],
      'required_keywords': ['Mitsubishi'],
      'excluded_keywords': ['Kia']
    }
  ];
}
