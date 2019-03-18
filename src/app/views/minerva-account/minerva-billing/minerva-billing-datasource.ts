import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  id: number;
  product_type: string;
  product_name: string;
  status: string;
  date_created: string;
  auto_renew: any;
  duration: string;
  expiration: string;
  price: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  {
    id: 0, 
    product_type: 'Databox',
    product_name: 'Banco Popular <br>Facebook | Costa Rica',
    status: 'No Configuration',
    date_created: '12 July 2018',
    auto_renew: true,
    duration: '3 Months',
    expiration: '10 days',
    price: 70,
  },
  {
    id: 1, 
    product_type: 'Databox',
    product_name: 'Banco Popular <br>Twitter | Costa Rica',
    status: 'No Configuration',
    date_created: '12 July 2018',
    auto_renew: true,
    duration: '3 Months',
    expiration: '10 days',
    price: 70,
  },
  {
    id: 2, 
    product_type: 'Databox',
    product_name: 'Banco Popular <br>Web | Costa Rica',
    status: 'Data Refreshing',
    date_created: '12 July 2018',
    auto_renew: true,
    duration: '3 Months',
    expiration: '10 days',
    price: 70,
  },
  {
    id: 3, 
    product_type: 'Databox',
    product_name: '',
    status: 'Expired',
    date_created: '12 July 2018',
    auto_renew: 'Renew',
    duration: '3 Months',
    expiration: 'Expired',
    price: 70,
  },
  {
    id: 4, 
    product_type: 'Account Features',
    product_name: '15 Users',
    status: 'Ready',
    date_created: '12 July 2018',
    auto_renew: 'One Time Purchase',
    duration: '',
    expiration: '',
    price: 30,
  },
  {
    id: 5, 
    product_type: 'Algorithms',
    product_name: 'Algorithm Credits',
    status: 'Ready',
    date_created: '12 July 2018',
    auto_renew: '',
    duration: '',
    expiration: '$250 remaining',
    price: 300,
  },
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MinervaBillingDataSource extends DataSource<DataTableItem> {
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
        case 'product_type': return compare(a.product_type, b.product_type, isAsc);
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
