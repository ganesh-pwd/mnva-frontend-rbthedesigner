import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { MinervaAccountDialogService } from '../../../shared/services/minerva-account/minerva-account-dialog/minerva-account-dialog.service';
import { MinervaBillingDataSource } from './minerva-billing-datasource';
import { MinervaBillingHistoryDataSource } from './minerva-billing-history-datasource';
import { MinervaAccountImageDialogService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-image-dialog.service';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';
import { UserService } from '../../../shared/services/auth/user-services';
import { DataboxesService } from '../../../shared/services/databoxes/databoxes-services';

@Component({
  selector: 'app-minerva-billing',
  animations: [egretAnimations],
  templateUrl: './minerva-billing.component.html',
  styleUrls: ['./minerva-billing.component.scss']
})
export class MinervaBillingComponent implements OnInit, OnDestroy {
  private getItemSub: Subscription;
  private getReqImage: Subscription;
  private req: Subscription;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  @ViewChild('historyPaginator') historyPaginator: MatPaginator;
  @ViewChild(MatSort) public historySort: MatSort;

  @ViewChild('databoxQuotaSort') databoxQuotaSort: MatSort;
  @ViewChild('databoxQuotaPaginator') databoxQuotaPaginator: MatPaginator;

  userImage: string;
  dataSource: MinervaBillingDataSource;
  datasourceDataboxQuota;
  dataSourceBillingHistory: MinervaBillingHistoryDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['product_type', 'product_name', 'period', 'price'];
  displayedColumnsBillingHistory = ['payment_date', 'invoice_number', 'product', 'amount', 'download'];
  displayedColumnsDataboxQuota = ['databox_name', 'status', 'date_created', 'mentions_quota', 'algorithm_quota'];

  public loggedInUser;
  public databoxes;
  public databoxes_sorted;

  constructor(
    private router: Router,
    private minervaAccountDialogService: MinervaAccountDialogService,
    private minervaAccountImageDialogService: MinervaAccountImageDialogService,
    private minervaAccountChangeService: MinervaAccountChangeService,
    private userService: UserService,
    private databoxesService: DataboxesService,
  ) {
    this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result);
    if ('photoUrl' in sessionStorage) {
      this.userImage = sessionStorage.getItem('photoUrl');
    }
    userService.userData$.subscribe((user) => this.loggedInUser = user);
  }

  ngOnInit() {
    this.getDataboxes();
    this.dataSourceBillingHistory = new MinervaBillingHistoryDataSource(this.historyPaginator, this.historySort);
    this.dataSource = new MinervaBillingDataSource(this.paginator, this.sort);
  }

  ngOnDestroy() {
    if (this.getItemSub) this.getItemSub.unsubscribe();
    if (this.req) this.req.unsubscribe();
  }

  //
  getDataboxes() {
    this.req = this.databoxesService.getItems().subscribe((result) => {
      if (result) {
        this.databoxes = result;

        const product_history = result.map(el => {
          return {
            id: el._id,
            payment_date: new Date(el.date_created),
            invoice_number: el.guid,
            product: `<strong>${el.databox_name}</strong> 
              <br>${el.datasource} | ${el.location}`,
            amount: 40,
            download: 'invoice'
          };
        });

        // Set table dynamically
        this.datasourceDataboxQuota = new MatTableDataSource(<any> result);
        this.dataSource = new MinervaBillingDataSource(this.paginator, this.sort);
        this.dataSourceBillingHistory = new MinervaBillingHistoryDataSource(this.historyPaginator, this.historySort, product_history);

        this.datasourceDataboxQuota.paginator = this.databoxQuotaPaginator;
        this.datasourceDataboxQuota.sort = this.databoxQuotaSort;
      }
    });
  }

  openDialog(title: string) {
    this.minervaAccountDialogService.confirm({
      title: title
    }).subscribe((result) => { });
  }

  changeImageDialog(title: string) {
    this.minervaAccountImageDialogService.confirm({ title: title })
      .subscribe(result => { });
  }

  sortData(sort) {
      const data = this.databoxes.slice();
      if (!sort.active || sort.direction === '') {
        this.databoxes_sorted = data;
        return;
      }

      this.databoxes_sorted = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'name': return compare(a.databox_name, b.databox_name, isAsc);
          default: return 0;
        }
      });
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}