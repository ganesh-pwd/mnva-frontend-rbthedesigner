export class MinervaAccountDB {
    public minerva_accounts = [
      {
        '_id': '5a7b73f76bed15c94d1e46da',
        'index': 0,
        'guid': 'c01da2d1-07f8-4acc-a1e3-72dda7310af8',
        'status': 'Active',
        'balance': 9999,
        'name': 'CCK',
        'profile_image': '../assets/images/face-4.jpg',
        'date_created': '2015-02-08T04:28:44',
        'company': 'ACIUM',
        'email': 'stefaniemarsh@mnrva.com',
        'phone': '+1 (857) 535-2066',
        'address': '163 Poplar Avenue, Cliffside, Virginia, 4592',
        'accountType': 'Enterprise',
        'mentions': 9999999999,
        'algorithmCredits': 500,
        'created_users': [
            { '_id': '5a7b73f76bed15c94d1e46da' },
            { '_id': '5a7b73f7f79f4250b96a355b' },
        ],
        'max_created_users': 9999999999,
        'connector': {
            'alerts': ['Email Alerts', 'Slack Alerts'],
            'connectors': ['Google Data Studio', 'Tableau Connectors', 'Power BI Connectors']
        },
        'notifications': [
            {
                'when_user_join': false,
                'when_data_released': false,
                'when_invoice_generated': false,
                'when_user_leave': false,
                'when_credit_warning': false,
                'when_credit_expired': false,
                'when_purchase_declined': false,
                'when_purchase_success': false,
            }
        ],
        'datasources': ['Facebook', 'Twitter', 'Web', 'Owned Facebook Page', 'Owned Twitter Profile', 'AirBnB', 'Waze'],
        'bd': '2015-02-08T04:28:44'
      }
    ];
}
