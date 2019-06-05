/* 
  The list of available plan connectors (please see plan-details.ts for further details)

  Foreign Key: plan_id (Id of the currently selected plan)
*/

export class PlanConnectorsDB {
  public plan_connectors = [
    {
      '_id': 'r8tuckan80om4li11x591gzl',  // Primary Key
      'plan_id': '9afn467a892fvdma5kjdqlud', // Foreign Key
      'connector': {
        'alerts': ['Email Alerts', 'Slack Alerts', 'Data Export'],
        'connectors': ['Google Data Studio', 'Tableau Connectors', 'Power BI Connectors']
      }
    },
    {
      '_id': 'rbz99l2u786u397g0b5ertqt',  // Primary Key
      'plan_id': 'k4qrka3cwvvlvx72hocavnnp', // Foreign Key
      'connector': {
        'alerts': ['Email Alerts', 'Slack Alerts', 'Data Export'],
        'connectors': ['Google Data Studio', 'Tableau Connectors', 'Power BI Connectors']
      }
    },
    {
      '_id': 'l9dh2enaoadr8g885o2m7yg1',  // Primary Key
      'plan_id': '7lqjc780nrmbq5ucp5p87eil', // Foreign Key
      'connector': {
        'alerts': ['Email Alerts'],
        'connectors': ['Google Data Studio']
      }
    }
  ]
}

