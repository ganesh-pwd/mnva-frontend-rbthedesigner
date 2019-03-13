import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { MinervaAccountDialogService } from '../../../shared/services/minerva-account/minerva-account-dialog/minerva-account-dialog.service';
import { MinervaBillingDataSource } from './minerva-billing-datasource';
import { MinervaBillingHistoryDataSource } from './minerva-billing-history-datasource';
import { MinervaAccountImageDialogService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-image-dialog.service';
import { MinervaAccountChangeService } from '../../../shared/services/minerva-account/minerva-account-image-dialog/minerva-account-change-image.service';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild("historyPaginator") historyPaginator: MatPaginator;
  @ViewChild(MatSort) historySort: MatSort;
  userImage: string;
  dataSource: MinervaBillingDataSource;
  dataSourceBillingHistory: MinervaBillingHistoryDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['product_type', 'product_name', 'status', 'date_created', 'auto_renew', 'duration', 'expiration', 'price'];
  displayedColumnsBillingHistory = ['payment_date', 'invoice_number', 'product', 'amount', 'download'];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private minervaAccountDialogService: MinervaAccountDialogService,
    private minervaAccountImageDialogService: MinervaAccountImageDialogService,
    private minervaAccountChangeService: MinervaAccountChangeService) {
    this.getReqImage = minervaAccountChangeService.image$.subscribe(result => this.userImage = result);
  }

  ngOnInit() {
    // set table
    this.dataSource = new MinervaBillingDataSource(this.paginator, this.sort);
    this.dataSourceBillingHistory = new MinervaBillingHistoryDataSource(this.historyPaginator, this.historySort);
  }
  ngOnDestroy() {
    if (this.getItemSub) this.getItemSub.unsubscribe();
    if (this.req) this.req.unsubscribe();
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
}
