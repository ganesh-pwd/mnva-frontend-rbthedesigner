/* 
  The list of databox items mentions for the currently selected databox item or for the 
  associated databox item

  Foreign key - databox_id (Id of the currently selected databox)

*/


export class DataboxMentionsDB {
  public databox_items_mentions = [
    {
      '_id': 'nfauket26w2sub72ra8d1jwm', // Primary Key
      'databox_id': '5a7b73jh6bed15c94d1e46d4', // Foreign Key
      'pip_id': 'n1z8wyqh34fo1ebh2x4tap25',
      'mentions': 3600,
      'mentions_per_day': 8.4,
    },
    {
      '_id': 'vnps0trcqp6hb25bh57oigzq', // Primary Key
      'databox_id': '5a7b73f7f79f4250b93a355a', // Foreign Key
      'pip_id': '69hglpr591yyg7phkfa2189w',
      'mentions': 1200,
      'mentions_per_day': 10.4,
    },
    {
      '_id': 'gh0d8ztc9ffo1hq7emv1h5dg', // Primary Key
      'databox_id': '5a7be3f76bed15c55d1e46d4', // Foreign Key
      'pip_id': 'j69kk216couofzj0phklsyxj',
      'algorithm_quota': 100,
      'mentions': 4600,
      'mentions_per_day': 5.4,
    },
    {
      '_id': '5jxo269dfsnest23lgjj1odr', // Primary Key
      'databox_id': '5a7b73f76bed15c938be46d4', // Foreign Key
      'pip_id': 'l8j93xlyvjsbgy0e2ttll2lc',
      'mentions': 4200,
      'mentions_per_day': 10.4,
    },
    {
      '_id': 'dygklgdn184wna47w5x5gssj', // Primary Key
      'databox_id': '5a7b73f76bed15c9e8ae46d4', // Foreign Key
      'pip_id': '8m7w4b37zdu094y51uw0e56y',
      'mentions': 4200,
      'mentions_per_day': 12.4,
    }
  ];
}
