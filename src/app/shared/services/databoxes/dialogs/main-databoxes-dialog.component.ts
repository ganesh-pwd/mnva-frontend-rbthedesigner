import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { DataboxTypeService } from '../databox-type-services';
import { Subscription } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'databoxes-dialog',
  templateUrl: './main-databoxes-dialog.html',
  styleUrls: ['./main-databoxes-dialog.scss']
})
export class MainDataboxDialogComponent implements OnInit, OnDestroy {
  private reqSubs: Subscription;
  private deleteSubs: Subscription;
  public folderName: string;

  constructor(private databoxTypeService: DataboxTypeService,
    public dialogRef: MatDialogRef<MainDataboxDialogComponent>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.reqSubs) this.reqSubs.unsubscribe();
    if (this.deleteSubs) this.deleteSubs.unsubscribe();
  }

  addFolder() {
    if (!this.folderName) {
      this.folderName = 'Folder Name';
    }
    this.reqSubs = this.databoxTypeService.addFolder(this.folderName)
      .subscribe(x => {
        return this.dialog.closeAll();
      });
  }

  deleteFolder(name) {
    this.reqSubs = this.databoxTypeService.getFolderData(name)
      .subscribe(x => {
        this.deleteSubs = this.databoxTypeService.deleteFolder(x.index)
          .subscribe(x => {
            return this.dialog.closeAll();
          });
      });
  }
}
