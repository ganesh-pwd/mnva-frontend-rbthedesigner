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
        prop: 'description',
        name: 'Description'
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
        'description': 'Vim falli insolens persequeris no. Eu pri aeque semper, dicunt malorum reprehendunt ex mea, viderer inimicus vim ne. Cu causae impetus eam, et atqui tibique consectetuer nam, in erroribus incorrupte vim',
        'price': '$0.00004 mention'
      },
      {
        'id': 1,
        'algorithm': 'Gender author',
        'description': 'Vim falli insolens persequeris no. Eu pri aeque semper, dicunt malorum reprehendunt ex mea, viderer inimicus vim ne. Cu causae impetus eam, et atqui tibique consectetuer nam, in erroribus incorrupte vim',
        'price': '$0.00004 mention'
      },
      {
        'id': 2,
        'algorithm': 'Image recognition',
        'description': 'Vim falli insolens persequeris no. Eu pri aeque semper, dicunt malorum reprehendunt ex mea, viderer inimicus vim ne. Cu causae impetus eam, et atqui tibique consectetuer nam, in erroribus incorrupte vim',
        'price': '$0.00004 mention'
      },
      {
        'id': 3,
        'algorithm': 'Lorem Ipsum',
        'description': 'Vim falli insolens persequeris no. Eu pri aeque semper, dicunt malorum reprehendunt ex mea, viderer inimicus vim ne. Cu causae impetus eam, et atqui tibique consectetuer nam, in erroribus incorrupte vim',
        'price': '$0.00004 mention'
      },
      {
        'id': 4,
        'algorithm': 'Ipsum',
        'description': 'Vim falli insolens persequeris no. Eu pri aeque semper, dicunt malorum reprehendunt ex mea, viderer inimicus vim ne. Cu causae impetus eam, et atqui tibique consectetuer nam, in erroribus incorrupte vim',
        'price': '$0.00004 mention'
      },
    ];
  }
}
