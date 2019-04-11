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
        '_id': 0,
        'name': 'Sentiment Algorithm',
        'subtitle': 'Admodum assentior ad duo',
        'description': 'Lorem ipsum dolor sit amet, et nec putent quodsi, admodum assentior ad duo. Pri ad sapientem ocurreret incorrupte.',
        'category': 'Sentiment Algorithm',
        'tags': [
          'sunt',
          'sunt',
          'culpa'
        ],
        'price': {
          'sale': 0.00004
        },
        'ratings': {
          'rating': 5.00,
          'ratingCount': 30
        },
        'features': [
          'aliquip aliquip',
          'nulla laboris',
          'pariatur consequat'
        ],
        'photo': '../../../../assets/images/image-placeholder.png',
        'gallery': [
          '../../../../assets/images/image-placeholder.png',
          '../../../../assets/images/image-placeholder.png'
        ],
        'badge': {
          'text': '20% off',
          'color': '#0D47A1'
        }
      },
      {
        'id': 1,
        'algorithm': 'Gender author',
        'subtitle': 'Admodum assentior ad duo',
        'description': 'Lorem ipsum dolor sit amet, et nec putent quodsi, admodum assentior ad duo. Pri ad sapientem ocurreret incorrupte.',
        'category': 'Sentiment Algorithm',
        'tags': [
          'sunt',
          'sunt',
          'culpa'
        ],
        'price': {
          'sale': 0.00004
        },
        'ratings': {
          'rating': 5.00,
          'ratingCount': 30
        },
        'features': [
          'aliquip aliquip',
          'nulla laboris',
          'pariatur consequat'
        ],
        'photo': '../../../../assets/images/image-placeholder.png',
        'gallery': [
          '../../../../assets/images/image-placeholder.png',
          '../../../../assets/images/image-placeholder.png'
        ],
        'badge': {
          'text': '20% off',
          'color': '#0D47A1'
        }
      },
      {
        'id': 2,
        'algorithm': 'Image recognition',
        'subtitle': 'Admodum assentior ad duo',
        'description': 'Lorem ipsum dolor sit amet, et nec putent quodsi, admodum assentior ad duo. Pri ad sapientem ocurreret incorrupte.',
        'category': 'Sentiment Algorithm',
        'tags': [
          'sunt',
          'sunt',
          'culpa'
        ],
        'price': {
          'sale': 0.00004
        },
        'ratings': {
          'rating': 5.00,
          'ratingCount': 30
        },
        'features': [
          'aliquip aliquip',
          'nulla laboris',
          'pariatur consequat'
        ],
        'photo': '../../../../assets/images/image-placeholder.png',
        'gallery': [
          '../../../../assets/images/image-placeholder.png',
          '../../../../assets/images/image-placeholder.png'
        ],
        'badge': {
          'text': '20% off',
          'color': '#0D47A1'
        }
      },
      {
        'id': 3,
        'algorithm': 'Lorem Ipsum',
        'subtitle': 'Admodum assentior ad duo',
        'description': 'Lorem ipsum dolor sit amet, et nec putent quodsi, admodum assentior ad duo. Pri ad sapientem ocurreret incorrupte.',
        'category': 'Sentiment Algorithm',
        'tags': [
          'sunt',
          'sunt',
          'culpa'
        ],
        'price': {
          'sale': 0.00004
        },
        'ratings': {
          'rating': 5.00,
          'ratingCount': 30
        },
        'features': [
          'aliquip aliquip',
          'nulla laboris',
          'pariatur consequat'
        ],
        'photo': '../../../../assets/images/image-placeholder.png',
        'gallery': [
          '../../../../assets/images/image-placeholder.png',
          '../../../../assets/images/image-placeholder.png'
        ],
        'badge': {
          'text': '20% off',
          'color': '#0D47A1'
        }
      },
      {
        'id': 4,
        'algorithm': 'Ipsum',
        'subtitle': 'Admodum assentior ad duo',
        'description': 'Lorem ipsum dolor sit amet, et nec putent quodsi, admodum assentior ad duo. Pri ad sapientem ocurreret incorrupte.',
        'category': 'Sentiment Algorithm',
        'tags': [
          'sunt',
          'sunt',
          'culpa'
        ],
        'price': {
          'sale': 0.00004
        },
        'ratings': {
          'rating': 5.00,
          'ratingCount': 30
        },
        'features': [
          'aliquip aliquip',
          'nulla laboris',
          'pariatur consequat'
        ],
        'photo': '../../../../assets/images/image-placeholder.png',
        'gallery': [
          '../../../../assets/images/image-placeholder.png',
          '../../../../assets/images/image-placeholder.png'
        ],
        'badge': {
          'text': '20% off',
          'color': '#0D47A1'
        }
      },
    ];
  }
}
