import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { DataboxesService } from '../../../shared/services/databoxes/databox-item-main.services';
import { MainDataboxesDialogService } from '../../../shared/services/databoxes/dialogs/main-databoxes-dialog.service';
import { DataboxConnectorService } from '../../../shared/services/databoxes/databox-item-connector.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-databoxes',
  animations: [egretAnimations],
  templateUrl: './main-databoxes.component.html',
  styleUrls: ['./main-databoxes.component.scss']
})
export class MainDataboxesComponent implements OnDestroy, AfterViewInit {
  private getItemSub: Subscription;
  private getDataConnectorReq: Subscription;

  public databoxes: any[];
  public selectedOption;

  public isDataboxDeleted;
  public isDataboxAdded;
  public isDataboxUpdated;

  public databoxSearch: string;
  public databox_id_new: string;

  public databoxConnectors: any;
  public algorithmConnectors: any[];

  public dataConnectors;
  public connectorsDetails: any[];

  constructor(
    private databoxesService: DataboxesService,
    private mainDataboxesDialogService: MainDataboxesDialogService,
    private databoxConnectorService: DataboxConnectorService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {

    this.isDataboxDeleted = sessionStorage.getItem('deleted_databox_true');
    if (this.isDataboxDeleted) this.openSnackBar(this.isDataboxDeleted);  

    this.isDataboxAdded = sessionStorage.getItem('databox_new');
    if (this.isDataboxAdded) this.openSnackBar(this.isDataboxAdded);  

    this.isDataboxUpdated = sessionStorage.getItem('databox_updated');
    if (this.isDataboxUpdated) this.openSnackBar(this.isDataboxUpdated);  
  }

  ngAfterViewInit() {
    this.databox_id_new = this.generateID();

    // get databox items
    this.getDataboxes();
  }

  ngOnDestroy() {
    if (this.getItemSub) this.getItemSub.unsubscribe();
    if (this.getDataConnectorReq) this.getDataConnectorReq.unsubscribe();
  }

  // navigate to databox details
  navigateToDatabox(id: string, first: boolean, status: string) {
    const route = !first ? `databoxes/${id}` : `databoxes/${id}/initialize`;

    if(status === 'Draft') this.router.navigate([`/databoxes/create-databox/${id}`]);
    else this.router.navigate([route]);
  }

  // Get databox items created by users
  getDataboxes() {
    this.getItemSub = this.databoxesService.getItems()
      .subscribe(result => {
        if (result) {
          this.databoxes = result;
          this.getDataboxConnectors();
        }
      });
  }

  // get databox connectors
  getDataboxConnectors() {
    this.getDataConnectorReq = this.databoxConnectorService
    .getAllItems()
    .subscribe(result => {
      if(result) this.databoxConnectors = result;
    });
  }

  filterConnector(id){
    return this.databoxConnectorService.getSingleItem(id);
  }

  // check databox connectors
  checkAlgorithmConnectors(databox, connector){
    const filter = databox.algorithmConnectors.findIndex(el => el === connector);

    return filter > -1 ? true : false;
  }

  checkDataConnectors(databox, connector){
    const filter = databox.dataConnectors.findIndex(el => el === connector);

    return filter > -1 ? true : false;
  }

    // open confirmation dialog
    openDialog(title: string, data: string, input: boolean) {
      this.mainDataboxesDialogService.confirm({ title: title, data: data, input: input })
        .subscribe((result) => this.selectedOption = result);
    }

    // modify databox
    modifyDataboxDialog(title: string, data: string, input: boolean, details: any) {
      this.mainDataboxesDialogService.confirm({
        title: title,
        data: data,
        input: input,
        details: details
      }).subscribe((result) => {
        this.selectedOption = result;
      });
    }

    // open create databox dialog
    createDatabox(title: string = 'my title', data: string = 'my data', input: boolean) {
      this.mainDataboxesDialogService.confirm({ title: title, data: data, input: input })
        .subscribe((result) => this.selectedOption = result);
    }

    // open snackbar
    openSnackBar(message: string) {
      this.snackBar.open(message, 'close');

      setTimeout(() => {
        /**/
        if(this.isDataboxAdded) sessionStorage.removeItem('databox_new');
        if(this.isDataboxDeleted) sessionStorage.removeItem('deleted_databox_true');
        if(this.isDataboxUpdated) sessionStorage.removeItem('databox_updated');

        this.snackBar.dismiss();
      }, 3000);
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

  // generate guID
  generateGUID() {
    return Math.round(Math.random() * 500000).toString();
  }

  // initialize create new database if no dialog
  createDataboxInit() {
    sessionStorage.setItem('databox_name_new', `${this.generateGUID()}`);
    sessionStorage.setItem('databox_id_new', this.databox_id_new );
    sessionStorage.removeItem('databox_edited_name');
    this.router.navigate([`/databoxes/create-databox/${this.databox_id_new}`]);
  }
}
