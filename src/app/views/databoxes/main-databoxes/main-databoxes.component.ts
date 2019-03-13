import { Component, OnInit, OnDestroy } from '@angular/core';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { DataboxesService } from '../../../shared/services/databoxes/databoxes-services';

import { MainDataboxesDialogService } from '../../../shared/services/databoxes/dialogs/main-databoxes-dialog.service';
import { CreateDataboxDialogService } from '../../../shared/services/databoxes/dialogs-create/create-databox-dialog.service';
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
  private getSelectedSub: Subscription;

  public databoxes: any[];
  public folderName: string;
  public selectedOption;
  public isFolderDeleted;

  constructor(private databoxesService: DataboxesService,
    private createDataboxDialogService: CreateDataboxDialogService,
    private mainDataboxesDialogService: MainDataboxesDialogService,
    private router: Router,
    public snackBar: MatSnackBar) {

    this.isFolderDeleted = sessionStorage.getItem('delete_databox_folder');
    if (this.isFolderDeleted) this.openSnackBar(this.isFolderDeleted);
  }

  ngOnInit() {
    this.getDataboxes();
  }
  ngOnDestroy() {
    if (this.getItemSub) this.getItemSub.unsubscribe();
    sessionStorage.removeItem('delete_databox_folder');
  }

  // open confirmation dialog
  openDialog(title: string, data: string, input: boolean) {
    this.mainDataboxesDialogService.confirm({ title: title, data: data, input: input })
      .subscribe((result) => {
        this.selectedOption = result;
      });
  }

  // open create databox dialog
  createDatabox(title: string = 'my title', data: string = 'my data', input: boolean) {
    this.createDataboxDialogService.confirm({ title: title, data: data, input: input })
      .subscribe((result) => {
        this.selectedOption = result;
      });
  }

  // open snackbar
  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', { duration: 5000 });
  }

  // navigate to databox details
  navigateToDatabox(folder: string, id: string, first: boolean) {
    const route = !first ? `databoxes/${folder.replace(/\s/, '-')}/${id}`
      : `databoxes/${folder.replace(/\s/, '-')}/${id}/initialize`;
    this.router.navigate([route]);
  }

  // navigate to folder
  navigateToFolder(folder: string) {
    const route = `databoxes/${folder.replace(/\s/, '-')}`;

    this.router.navigate([route]);
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
}
