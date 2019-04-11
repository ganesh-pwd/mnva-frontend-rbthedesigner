import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { DataboxesService } from '../../../shared/services/databoxes/databoxes-services';
import { MainDataboxesDialogService } from '../../../shared/services/databoxes/dialogs/main-databoxes-dialog.service';
import { DataboxConnectivityDialogService } from '../../../shared/services/databoxes/dialogs-connectivity/dialogs-connectivity.services';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-databox-item-connectivity',
  animations: [egretAnimations],
  templateUrl: './databox-item-connectivity.component.html',
  styleUrls: ['./databox-item-connectivity.component.scss']
})
export class DataboxItemConnectivityComponent implements OnInit, OnDestroy {
  private getItemSub: Subscription;
  private req: Subscription;

  public data: any;
  public databoxItemData: any;
  public selectedOption;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private databoxesService: DataboxesService,
    private mainDataboxesDialogService: MainDataboxesDialogService,
    private databoxConnectivityDialogService: DataboxConnectivityDialogService
  ) {
    this.databoxesService.apiData$.subscribe(
      result => (this.databoxItemData = result)
    );
  }

  ngOnInit() {
    this.getSingleItem();
  }

  ngOnDestroy() {
    if (this.getItemSub) this.getItemSub.unsubscribe();
    if (this.req) this.req.unsubscribe();
  }

  // Get databox items created by users with parameter id
  getSingleItem() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");

    this.getItemSub = this.databoxesService.getSingleItem(id).subscribe(
      data => {
        if (data) this.data = data;
        else this.router.navigate(["/sessions/404"]);
      },
      // if there's error
      error => this.router.navigate(["/sessions/404"])
    );
  }

  // navigate to databox details
  navigateToDatabox(id: string, first: boolean) {
    const route = !first ? `databoxes/${id}` : `databoxes/${id}/initialize`;
    this.router.navigate([route]);
  }

  // open main databox dialog
  openDialog(title: string, data: string, input: boolean) {
    this.getItemSub = this.mainDataboxesDialogService
      .confirm({
        title: title,
        data: data,
        input: input
      })
      .subscribe(result => {
        this.selectedOption = result;
      });
  }

  // open notification dialog
  openNotificationDialog(title: string) {
    this.getItemSub = this.databoxConnectivityDialogService
      .confirm({
        title: title
      })
      .subscribe(result => {});
  }
}
