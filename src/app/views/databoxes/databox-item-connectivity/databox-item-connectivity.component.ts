import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { DataboxesService } from '../../../shared/services/databoxes/databox-item-main.services';
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

  public email: boolean = false;
  public slack: boolean = false;
  public appleTV: boolean = false;

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
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.getItemSub = this.databoxesService.getSingleItem(id).subscribe(
      data => {
        if (data) {
          // if status is draft
          if(data.status === 'Draft') 
            this.router.navigate([`/databoxes/create-databox/${data._id}`]);
          
          this.data = data;

          // slide toggle if element is found on databox 
          data.dataConnectors.forEach(el => this.slideToggle(el));
        }
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
  openDialog(title: string, data: string, input: boolean, checked: boolean, connector: string) {
    this.getItemSub = this.mainDataboxesDialogService
      .confirm({
        title: title,
        data: data,
        input: input,
        checked: checked,
        connector: connector
      })
      .subscribe(result => {
        this.selectedOption = result;
      });
  }

  // open notification dialog
  openNotificationDialog(title: string, datasource: string) {
    if (this.email) {
      this.getItemSub = this.databoxConnectivityDialogService
        .confirm({
          title: title,
          datasource: datasource
        })
        .subscribe(result => {});
    }
  }

  clickSlideToggle(data) {
    switch (true) {
      case data === 'email': {
        if (this.email) {
          this.email = false;
        } else {
          this.email = true;
        }
        setTimeout(() => {
          this.openDialog('Connect to Email Notification',
            'Lorem ipsum dolor sit amet, veri modus conceptam mel cu, has in dictas discere qualisque, saperet ullamcorper ad eum. Lorem ipsum dolor sit amet, veri modus conceptam mel cu, has in dictas discere qualisque, saperet ullamcorper ad eum.', 
            false, this.email, 'email');
        }, 300);
        break;
      }

      case data === 'slack': {
        if(this.slack)
          this.slack = false;
        else this.slack = true;
        setTimeout(() => {
          this.openDialog('Connect to Slack',
            'Lorem ipsum dolor sit amet, veri modus conceptam mel cu, has in dictas discere qualisque, saperet ullamcorper ad eum. Lorem ipsum dolor sit amet, veri modus conceptam mel cu, has in dictas discere qualisque, saperet ullamcorper ad eum.', 
            false, this.slack, 'slack');
        }, 300);

        break;
      }

      case data === 'appleTV': {
        if(this.appleTV)
          this.appleTV = false;
        else this.appleTV = true;

        setTimeout(() => {
          this.openDialog('Connect to Apple TV', 
            'Lorem ipsum dolor sit amet, veri modus conceptam mel cu, has in dictas discere qualisque, saperet ullamcorper ad eum. Lorem ipsum dolor sit amet, veri modus conceptam mel cu, has in dictas discere qualisque, saperet ullamcorper ad eum.', 
            false, this.appleTV, 'appleTV');
        }, 300);
        break;
      }
    }
  }

  slideToggle(data) {
    switch (true) {
      case data === 'email': {
        this.email ? this.email = false : this.email = true;
        break;
      }
      case data === 'slack': {
        this.slack ? this.slack = false : this.slack = true;
        break;
      }

      case data === 'appleTV': {
        this.appleTV ? this.appleTV = false : this.appleTV = true;
        break;
      }
    }
  }
}
