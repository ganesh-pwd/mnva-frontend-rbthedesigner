/* 
  The list of databox items for the currently logged in and selected user

  Foreign key - databox_id (Id of the currently selected databox)
*/

export class DataboxItemConnectorDB {
  public databox_item_connectors = [
    {
      '_id': '08fqsc5rdgwhe5dwg66jgqko',
      'databox_id': '5a7b73jh6bed15c94d1e46d4', // Foreign key
      'algorithmConnectors': ['sentiment', 'topicRecognition', 'genderAuthor', 'entityRecognition'],
      'dataConnectors': ['email', 'slack', 'appleTv'],
    },
    {
      '_id': '125gt7fk3padr8bx2d1ymoio',
      'databox_id': '5a7b73f7f79f4250b93a355a', // Foreign key
      'algorithmConnectors': ['sentiment', 'topicRecognition', 'genderAuthor'],
      'dataConnectors': ['email', 'slack'],
    },
    {
      '_id': '37bpjyq4gu6kylzj61ftiwy9',
      'databox_id': '5a7be3f76bed15c55d1e46d4', // Foreign key
      'algorithmConnectors': ['sentiment', 'topicRecognition', 'entityRecognition'],
      'dataConnectors': ['email', 'slack', 'appleTv'],
    },
    {
      '_id': 'k3hup6hl9jn69nl3f7mq3kjm',
      'databox_id': '5a7b73f76bed15c938be46d4', // Foreign key
      'algorithmConnectors': ['sentiment', 'topicRecognition', 'entityRecognition'],
      'dataConnectors': ['email', 'slack'],
    },
    {
      '_id': '7ofysa71dytg4nwz7nuwqbqc',
      'databox_id': '5a7b73f76bed15c9e8ae46d4', // Foreign key
      'algorithmConnectors': ['sentiment', 'topicRecognition', 'entityRecognition'],
      'dataConnectors': ['email', 'slack'],
    }
  ];
}
