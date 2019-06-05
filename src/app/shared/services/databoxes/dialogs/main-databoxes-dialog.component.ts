import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataboxesService } from '../databox-item-main.services';
import { DataboxesTestQueryService } from '../databox-item-test-query.service';
import { DataboxConnectorService } from '../databox-item-connector.service';
import { Subscription } from 'rxjs';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { DataboxConnectivityDialogService } from '../dialogs-connectivity/dialogs-connectivity.services';

@Component({
  selector: 'databoxes-dialog',
  animations: [egretAnimations],
  templateUrl: './main-databoxes-dialog.html',
  styleUrls: ['./main-databoxes-dialog.scss']
})
export class MainDataboxDialogComponent implements OnInit, OnDestroy {
  private reqSubs: Subscription;
  private deleteSubs: Subscription;
  public inputData: string;
  public deleteDataInfo: boolean = false;
  public databox_id_new: string;
  public email: boolean = false;

  constructor(private router: Router,
    private databoxesService: DataboxesService,
    private databoxesTestQueryService: DataboxesTestQueryService,
    private databoxConnectivityDialogService: DataboxConnectivityDialogService,
    private databoxConnectorService: DataboxConnectorService,
    public dialogRef: MatDialogRef<MainDataboxDialogComponent>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.databox_id_new = this.generateID();
  }

  ngOnDestroy() {
    if (this.reqSubs) this.reqSubs.unsubscribe();
    if (this.deleteSubs) this.deleteSubs.unsubscribe();
  }

  // generate id with length 24
  generateID() {
    let id = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 24; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return id;
  }

  // generate guID for random databox name
  generateGUID() {
    return Math.round(Math.random() * 500000).toString();
  }

  // initialize create new databox
  createDataboxInit() {
    sessionStorage.setItem('databox_name_new', `${this.generateGUID()}`);
    sessionStorage.setItem('databox_id_new', this.databox_id_new );
    sessionStorage.removeItem('databox_edited_name');
    sessionStorage.removeItem('databox_test_query_bool');
    sessionStorage.removeItem('databox_test_query');
    this.dialogRef.close(false);
    this.router.navigate([`/databoxes/create-databox/${this.databox_id_new}`]);
  }

  // save databox with status as draft
  saveAsDraft() {
    this.reqSubs = this.databoxesService.addItem(this.data.details, 'Draft')
    .subscribe((result) => {
      this.dialogRef.close(false);
      this.router.navigate(['/databoxes'])
      .then(() => {
        sessionStorage.removeItem('databox_new');
        sessionStorage.removeItem('databox_test_query_bool');
        sessionStorage.removeItem('databox_test_query');
      });
    });
  }

  // edit databox name if it's not yet created
  editDataboxNotCreated() {
    sessionStorage.setItem('databox_edited_name', this.inputData);
    this.dialogRef.close(false);

    // refresh
    const url = this.router.url;
    this.router
      .navigateByUrl('/databoxes', { skipLocationChange: true })
      .then(() => this.router.navigate([url]));
  }

  // edit databox name if it's already created
  editDataboxCreated() {
    this.reqSubs = this.databoxesService
      .editDataboxName(this.inputData)
      .subscribe((result) => this.dialogRef.close(false));
  }

  // update databox
  updateDatabox() {
    this.reqSubs = this.databoxesService
    .updateDatabox(this.data.details, 'Draft')
    .subscribe((result) => {
      this.dialogRef.close(false);
      sessionStorage.removeItem('databox_test_query_bool');
      sessionStorage.removeItem('databox_test_query');
    });
  }

  // delete a databox item
  deleteDatabox() {
    const deleteData = () => this.databoxesService.deleteDatabox(this.inputData, this.data.details._id);

    if (!deleteData()) { this.dialogRef.close(false); }
    else { this.deleteDataInfo = true; }
  }

  // build databox query
  testQuery() {
    console.log(this.data.details)

    this.reqSubs = this.databoxesTestQueryService
    .testQueryDatabox(this.data.details)
    .subscribe((result) => {
      this.dialogRef.close(false);

      let url = this.router.url;

      this.router.navigateByUrl('/template-gallery', { skipLocationChange: true })
      .then(() => sessionStorage.removeItem('databox_updated'))
      .then(() => this.router.navigate(['/databoxes']))
      .then(() => this.router.navigate([url]))
      .then(() => sessionStorage.removeItem('selectedTabDatabox'))
      .then(() => sessionStorage.setItem('databox_test_query_bool', 'true'))
      .then(() => {
        this.snackBar.open('The Databox Query has been successfully built', 'close');
        setTimeout(() => this.snackBar.dismiss(), 3000);
      });
    });
  }


  // update connectors
  updateConnector(automatic?: boolean) {
    this.reqSubs = this.databoxConnectorService
    .addDataConnector(this.data.connector, automatic ? true : this.data.checked)
    .subscribe(result => {
      if (automatic && this.data.connector === 'email') {
        this.databoxConnectivityDialogService
          .confirm({
            title: 'Email Notifications',
            datasource: result[0].datasource
          })
          .subscribe(result => {});
      }
      this.dialogRef.close(false);

      const url = this.router.url;

      this.router.navigateByUrl('/template-gallery', { skipLocationChange: true })
      .then(() => sessionStorage.removeItem('databox_updated'))
      .then(() => this.router.navigate(['/databoxes']))
      .then(() => this.router.navigate([url]));
    });
  }

  cancelConnector() {
    this.dialogRef.close(false);
    const url = this.router.url;

    this.router.navigateByUrl('/template-gallery', { skipLocationChange: true })
    .then(() => sessionStorage.removeItem('databox_updated'))
    .then(() => this.router.navigate(['/databoxes']))
    .then(() => this.router.navigate([url]))
  }

  // cancel databox changes
  cancelChanges() {
    sessionStorage.removeItem('databox_edited_name');
    if (sessionStorage.getItem('databox_test_query_bool')){
      const url = this.router.url.split('/').filter(el => el !== 'edit-query').join('/');

      this.router.navigate([url])
      .then(() => {
        sessionStorage.removeItem('databox_test_query_bool');
        sessionStorage.removeItem('databox_test_query');
      });
    } else this.router.navigate(['/databoxes']);

    this.dialogRef.close(false);
  }

  // reset dialog box
  close() {
    this.deleteDataInfo = false;
    this.dialogRef.close(false);
  }
}
