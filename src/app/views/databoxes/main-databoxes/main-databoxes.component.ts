import { Component, OnInit, OnDestroy } from '@angular/core';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { DataboxesService } from '../../../shared/services/databoxes/databox-item-main.services';
import { MainDataboxesDialogService } from '../../../shared/services/databoxes/dialogs/main-databoxes-dialog.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-databoxes',
  animations: [egretAnimations],
  templateUrl: './main-databoxes.component.html',
  styleUrls: ['./main-databoxes.component.scss']
})
export class MainDataboxesComponent implements OnInit, OnDestroy {
  private getItemSub: Subscription;

  public databoxes: any[];
  public selectedOption;

  public isDataboxDeleted;
  public isDataboxAdded;
  public isDataboxUpdated;

  public databoxSearch: string;
  public databox_id_new: string;

  editorData = `( Type your desired keywords )`;

  constructor(private databoxesService: DataboxesService,
    private mainDataboxesDialogService: MainDataboxesDialogService,
    private router: Router,
    public snackBar: MatSnackBar) {

    this.isDataboxDeleted = sessionStorage.getItem('deleted_databox_true');
    if (this.isDataboxDeleted) this.openSnackBar(this.isDataboxDeleted);  

    this.isDataboxAdded = sessionStorage.getItem('databox_new');
    if (this.isDataboxAdded) this.openSnackBar(this.isDataboxAdded);  

    this.isDataboxUpdated = sessionStorage.getItem('databox_updated');
    if (this.isDataboxUpdated) this.openSnackBar(this.isDataboxUpdated);  
  }

  ngOnInit() {
    this.databox_id_new = this.generateID();

    // get databox items
    this.getDataboxes();
  }

  ngOnDestroy() {
    if (this.getItemSub) this.getItemSub.unsubscribe();
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

  // navigate to databox details
  navigateToDatabox(id: string, first: boolean, status: string) {
    const route = !first ? `databoxes/${id}` : `databoxes/${id}/initialize`;

    if(status === 'Draft') this.router.navigate([`/databoxes/create-databox/${id}`]);
    else this.router.navigate([route]);
  }

  // Get databox items created by users
  getDataboxes() {
    this.getItemSub = this.databoxesService.getItems()
      .subscribe(data => {
        if (data) {
          this.databoxes = data;
        }
      });
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
