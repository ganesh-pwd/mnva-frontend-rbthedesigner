/* 
  For mocking the cognito sign in implementation, 
  Primary Key - _id, also a foreign key of the "user.ts": cognito_user_id
  
  After sign in there's a function that will look up to user.ts and compare
     _id to cognito_user_id in "user.ts"
*/

export class CognitoUserDB {
  public cognito_users = [
    {
      '_id': '7m74uo0c1eeljo6pz5faych8',
      'index': 0,
      'password': 'password',
      'username': 'username',
      'email': 'james_trussart@minerva.com'
    },
    {
      '_id': 'dhnf3sadc29rmc0dgvin1jcs',
      'index': 0,
      'password': 'password',
      'username': 'username2',
      'email': 'luis.r@minerva.com'
    }
  ];
}
