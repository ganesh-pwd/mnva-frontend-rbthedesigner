/* 
  The list of databox items for the currently logged in and selected user

  Foreign key - databox_id (Id of the currently selected databox)
    'token': 'token',Foreign key
     for connector
      algorithimConnectors._id : this is the id that will give the details of algorithm connectors
      data_connectors._id : this is the id that will give the details of data connectors
*/

export class DataboxItemConnectorDB {
  public databox_item_connectors = [
    {
      '_id': '08fqsc5rdgwhe5dwg66jgqko', // Primary Key
      'databox_id': '5a7b73jh6bed15c94d1e46d4', // Foreign key
      'token': 'token',
      'algorithm_connectors': [ 
        {
          'algorithm': 'Sentiment',
          '_id': '5zxygeu4wz1qouuhk92wg3kj' // Foreign key
        },
        {
          'algorithm': 'Topic Recognition',
          '_id': 'ehlw4apzz13vibjcgaj0f856' // Foreign key
        },
        {
          'algorithm': 'Gender Author',
          '_id': 'qhxf9dehnb5d9gwsbf0n0en6' // Foreign key
        },
        {
          'algorithm': 'Entity Recognition',
          '_id': '5lpizr8xfvm0az5umnsm8mn5' // Foreign key
        },
      ],
      'data_connectors': [
        {
          'data_connector': 'Email',
          '_id': 'b1t0x23xax5w1tsblyrplkb4' // Foreign key
        },
        {
          'data_connector': 'Slack',
          '_id': 'j46mw8youmsql7dzpsh1y6mg' // Foreign key
        },
        {
          'data_connector': 'Apple TV',
          '_id': '6b5mcl776o3c3jlvxrd2yc98' // Foreign key
        },
      ],
    },
    {
      '_id': '125gt7fk3padr8bx2d1ymoio', // Primary Key
      'databox_id': '5a7b73f7f79f4250b93a355a', // Foreign key
      'token': 'token',
      'algorithm_connectors': [
        {
          'algorithm': 'Sentiment',
          '_id': '5zxygeu4wz1qouuhk92wg3kj' // Foreign key
        },
        {
          'algorithm': 'Topic Recognition',
          '_id': 'ehlw4apzz13vibjcgaj0f856' // Foreign key
        },
        {
          'algorithm': 'Gender Author',
          '_id': 'qhxf9dehnb5d9gwsbf0n0en6' // Foreign key
        }
      ],
      'data_connectors': [
        {
          'data_connector': 'Slack',
          '_id': 'j46mw8youmsql7dzpsh1y6mg' // Foreign key
        },
        {
          'data_connector': 'Apple TV',
          '_id': '6b5mcl776o3c3jlvxrd2yc98' // Foreign key
        },
      ],
    },
    {
      '_id': '37bpjyq4gu6kylzj61ftiwy9', // Primary Key
      'databox_id': '5a7be3f76bed15c55d1e46d4', // Foreign key
      'token': 'token',
      'algorithm_connectors': [
        {
          'algorithm': 'Sentiment',
          '_id': '5zxygeu4wz1qouuhk92wg3kj' // Foreign key
        },
        {
          'algorithm': 'Topic Recognition',
          '_id': 'ehlw4apzz13vibjcgaj0f856' // Foreign key
        },
        {
          'algorithm': 'Gender Author',
          '_id': 'qhxf9dehnb5d9gwsbf0n0en6' // Foreign key
        }
      ],
      'data_connectors': [
        {
          'data_connector': 'Email',
          '_id': 'b1t0x23xax5w1tsblyrplkb4' // Foreign key
        },
        {
          'data_connector': 'Slack',
          '_id': 'j46mw8youmsql7dzpsh1y6mg' // Foreign key
        },
        {
          'data_connector': 'Apple TV',
          '_id': '6b5mcl776o3c3jlvxrd2yc98' // Foreign key
        },
      ],
    },
    {
      '_id': 'k3hup6hl9jn69nl3f7mq3kjm', // Primary Key
      'databox_id': '5a7b73f76bed15c938be46d4', // Foreign key
      'token': 'token',
      'algorithm_connectors': [
        {
          'algorithm': 'Sentiment',
          '_id': '5zxygeu4wz1qouuhk92wg3kj' // Foreign key
        },
        {
          'algorithm': 'Topic Recognition',
          '_id': 'ehlw4apzz13vibjcgaj0f856' // Foreign key
        },
        {
          'algorithm': 'Gender Author',
          '_id': 'qhxf9dehnb5d9gwsbf0n0en6' // Foreign key
        }
      ],
      'data_connectors': [
        {
          'data_connector': 'Email',
          '_id': 'b1t0x23xax5w1tsblyrplkb4' // Foreign key
        },
        {
          'data_connector': 'Slack',
          '_id': 'j46mw8youmsql7dzpsh1y6mg' // Foreign key
        },
        {
          'data_connector': 'Apple TV',
          '_id': '6b5mcl776o3c3jlvxrd2yc98' // Foreign key
        },
      ],
    },
    {
      '_id': '7ofysa71dytg4nwz7nuwqbqc', // Primary Key
      'databox_id': '5a7b73f76bed15c9e8ae46d4', // Foreign key
      'token': 'token',
      'algorithm_connectors': [
        {
          'algorithm': 'Sentiment',
          '_id': '5zxygeu4wz1qouuhk92wg3kj' // Foreign key
        },
        {
          'algorithm': 'Topic Recognition',
          '_id': 'ehlw4apzz13vibjcgaj0f856' // Foreign key
        },
        {
          'algorithm': 'Gender Author',
          '_id': 'qhxf9dehnb5d9gwsbf0n0en6' // Foreign key
        }
      ],
      'data_connectors': [
        {
          'data_connector': 'Email',
          '_id': 'b1t0x23xax5w1tsblyrplkb4' // Foreign key
        },
        {
          'data_connector': 'Slack',
          '_id': 'j46mw8youmsql7dzpsh1y6mg' // Foreign key
        },
        {
          'data_connector': 'Apple TV',
          '_id': '6b5mcl776o3c3jlvxrd2yc98' // Foreign key
        },
      ],
    }
  ];
}
