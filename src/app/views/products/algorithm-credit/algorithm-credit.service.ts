import { Injectable } from '@angular/core';

@Injectable()
export class TablesService {
  constructor() { }
  getDataConf() {
    return [
      {
        prop: 'id'
      },
      {
        prop: 'algorithm',
        name: 'Algorithm'
      },
      {
        prop: 'price',
        name: 'Price'
      }
    ];
  }
  getAll() {
    return [
      {
        'id': 0,
        'algorithm': 'Sentiment',
        'price': '$0.00004 mention'
      },
      {
        'id': 1,
        'algorithm': 'Gender author',
        'price': '$0.00004 mention'
      },
      {
        'id': 2,
        'algorithm': 'Image recognition',
        'price': '$0.00004 mention'
      },
      {
        'id': 3,
        'algorithm': 'Lorem Ipsum',
        'price': '$0.00004 mention'
      },
      {
        'id': 4,
        'algorithm': 'Ipsum',
        'price': '$0.00004 mention'
      },
    ];
  }
}
