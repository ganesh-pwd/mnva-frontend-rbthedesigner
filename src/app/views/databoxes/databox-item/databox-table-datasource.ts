import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  id: number;
  date: string;
  content: string;
  paren: string;
  author: string;
}

// TODO: replace this with real data from your application
const DataboxResultItem: DataTableItem[] = [
  {
    id: 1, 
    date: '15-07-2018', 
    content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    paren: 'null',
    author: 'Sabores a lo Tico'
  },
  {
    id: 2, 
    date: '15-07-2018', 
    content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    paren: 'null',
    author: 'Sabores a lo Tico'
  },
  {
    id: 3, 
    date: '15-07-2018', 
    content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    paren: 'null',
    author: 'Sabores a lo Tico'
  },
  {
    id: 4, 
    date: '15-07-2018', 
    content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    paren: 'null',
    author: 'Sabores a lo Tico'
  },
  {
    id: 5, 
    date: '15-07-2018', 
    content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    paren: 'null',
    author: 'Sabores a lo Tico'
  },
  {
    id: 6, 
    date: '15-07-2018', 
    content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    paren: 'null',
    author: 'Sabores a lo Tico'
  },
  {
    id: 7, 
    date: '15-07-2018', 
    content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    paren: 'null',
    author: 'Sabores a lo Tico'
  },
  {
    id: 8, 
    date: '15-07-2018', 
    content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    paren: 'null',
    author: 'Sabores a lo Tico'
  },
  {
    id: 9, 
    date: '15-07-2018', 
    content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    paren: 'null',
    author: 'Sabores a lo Tico'
  },
  {
    id: 10, 
    date: '15-07-2018', 
    content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    paren: 'null',
    author: 'Sabores a lo Tico'
  },
  {
    id: 11, 
    date: '15-07-2018', 
    content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    paren: 'null',
    author: 'Sabores a lo Tico'
  },
  {
    id: 12, 
    date: '15-07-2018', 
    content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    paren: 'null',
    author: 'Sabores a lo Tico'
  },
  {
    id: 13, 
    date: '15-07-2018', 
    content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    paren: 'null',
    author: 'Sabores a lo Tico'
  },
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = DataboxResultItem;

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
        case 'author': return compare(a.author, b.author, isAsc);
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
