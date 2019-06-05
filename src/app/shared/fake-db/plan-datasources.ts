/* 
  The list of user plan data sources (please see plan-details.ts for further details)

  Foreign Key: plan_id (Id of the plan for the currently selected user)
*/

export class PlanDatasourceDB {
  public plan_datasources = [
    {
      '_id': '4tswnvgf5emdab1cnbn4kp0r', // Primary Key
      'plan_id': '9afn467a892fvdma5kjdqlud', // Foreign Key
      'datasources': ['Facebook', 'Twitter', 'Web','Owned Facebook Page', 'Owned Twitter Profile', 'AirBnB', 'Waze'],
    },
    {
      '_id': '4rtg89b5t7fyhn8l069owgjz', // Primary Key
      'plan_id': 'k4qrka3cwvvlvx72hocavnnp', // Foreign Key
      'datasources': ['Facebook', 'Twitter', 'Web','Owned Facebook Page', 'Owned Twitter Profile'],
    },
    {
      '_id': '0bjen6l847s8h2vke220jiyz', // Primary Key
      'plan_id': '7lqjc780nrmbq5ucp5p87eil', // Foreign Key
      'datasources': ['Facebook'],
    }
  ]
}

