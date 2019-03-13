import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { egretAnimations } from '../../../shared/animations/egret-animations';
import { DataboxesService } from '../../../shared/services/databoxes/databoxes-services';
import { DataboxTypeService } from '../../../shared/services/databoxes/databox-type-services';
import { MainDataboxesDialogService } from '../../../shared/services/databoxes/dialogs/main-databoxes-dialog.service';
import { CreateDataboxDialogService } from '../../../shared/services/databoxes/dialogs-create/create-databox-dialog.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-databox-folder',
  animations: [egretAnimations],
  templateUrl: './databox-folder.component.html',
  styleUrls: ['./databox-folder.component.scss']
})
export class DataboxFolderComponent implements OnInit, OnDestroy {
  private getItemSub: Subscription;
  private getSelectedSub: Subscription;
  private req: Subscription;

  public databoxes: any;
  public folder: string;
  public folderName: string;
  public selectedOption;
  public isFolderAdded;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private databoxesService: DataboxesService,
    private databoxTypeService: DataboxTypeService,
    private createDataboxDialogService: CreateDataboxDialogService,
    private mainDataboxesDialogService: MainDataboxesDialogService,
    public snackBar: MatSnackBar) {
    this.isFolderAdded = sessionStorage.getItem('added_databox_folder');
    if (this.isFolderAdded) this.openSnackBar(this.isFolderAdded);
  }

  ngOnInit() {
    this.getItemsByFolder();
    // watch for route change
    this.req = this.router.events.subscribe((event) => {
      this.getItemsByFolder();
    });
  }
  ngOnDestroy() {
    if (this.getItemSub) this.getItemSub.unsubscribe();
    if (this.req) this.req.unsubscribe();

    sessionStorage.removeItem('added_databox_folder');
  }

  // open snackbar
  openSnackBar(message: string) {
    this.snackBar.open(message, 'close', { duration: 5000 });
  }

  // open databox dialog based on parameter
  openDialog(title: string, data: string, input: boolean, folder: string) {
    this.mainDataboxesDialogService.confirm({
      title: title,
      data: data,
      input: input,
      folder: folder
    }).subscribe((result) => {
      this.selectedOption = result;
    });
  }

  // open create databox dialog
  createDatabox(title: string = "my title", data: string = "my data", input: boolean) {
    this.createDataboxDialogService.confirm({
      title: title,
      data: data,
      input: input
    }).subscribe((result) => {
      this.selectedOption = result;
    });
  }

  navigateToDatabox(folder: string, id: string, first: boolean) {
    const route = !first ? `databoxes/${folder.replace(/\s/, '-')}/${id}`
      : `databoxes/${folder.replace(/\s/, '-')}/${id}/initialize`;
    this.router.navigate([route]);
  }

  // Get databox items created by users with parameter foldername
  getItemsByFolder() {
    const folder = this.activatedRoute.snapshot.paramMap.get('folder');
    const folderParam = (folder).replace(/\-/g, ' ');
    this.folder = folderParam;
    this.getItemSub = this.databoxesService.getItemsByFolder(folderParam)
      .subscribe(data => {
        this.databoxes = data;
      });
  }
}
