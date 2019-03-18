import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  id: number;
  algorithm: string;
  price: any;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  {
      'id': 0,
      'algorithm': 'Sentiment',
      'description': ' Vim falli insolens persequeris no. Eu pri aeque semper, dicunt malorum reprehendunt ex mea, viderer inimicus vim ne.',
      'price': '$0.00004 mention'
    },
    {
      id: 1,
      'algorithm': 'Gender author',
      'description': ' Vim falli insolens persequeris no. Eu pri aeque semper, dicunt malorum reprehendunt ex mea, viderer inimicus vim ne.',
      'price': '$0.00004 mention'
    },
    {
      'id': 2,
      'algorithm': 'Image recognition',
      'description': ' Vim falli insolens persequeris no. Eu pri aeque semper, dicunt malorum reprehendunt ex mea, viderer inimicus vim ne.',
      'price': '$0.00004 mention'
    },
    {
      'id': 3,
      'algorithm': 'Lorem Ipsum',
      'description': ' Vim falli insolens persequeris no. Eu pri aeque semper, dicunt malorum reprehendunt ex mea, viderer inimicus vim ne.',
      'price': '$0.00004 mention'
    },
    {
      'id': 4,
      'algorithm': 'Ipsum',
      'description': ' Vim falli insolens persequeris no. Eu pri aeque semper, dicunt malorum reprehendunt ex mea, viderer inimicus vim ne.',
      'price': '$0.00004 mention'
    },
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'algorithm': return compare(a.algorithm, b.algorithm, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
