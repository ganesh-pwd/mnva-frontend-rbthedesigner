import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItems {
  id: number;
  payment_date: string;
  invoice_number: string;
  product: string;
  amount: number;
  download: any;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItems[] = [
  {
    id: 0, 
    payment_date: '12 July 2018',
    invoice_number: '40-2018',
    product: 'Banco Popular <br>Facebook | Costa Rica',
    amount: 70,
    download: 'invoice',
  },
  {
    id: 1, 
    payment_date: '12 July 2018',
    invoice_number: '40-2018',
    product: 'Banco Popular <br>Twitter | Costa Rica',
    amount: 70,
    download: 'invoice',
  },
  {
    id: 2, 
    payment_date: '12 July 2018',
    invoice_number: '40-2018',
    product: 'Banco Popular <br>Web | Costa Rica',
    amount: 70,
    download: 'invoice',
  },
  {
    id: 3, 
    payment_date: '12 July 2018',
    invoice_number: '40-2018',
    product: 'Credit Algorithm',
    amount: 120,
    download: 'invoice',
  }
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MinervaBillingHistoryDataSource extends DataSource<DataTableItems> {
  data: DataTableItems[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<DataTableItems[]> {
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
  private getPagedData(data: DataTableItems[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItems[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'product': return compare(a.product, b.product, isAsc);
        case 'amount': return compare(a.amount, b.amount, isAsc);
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
