import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-dialogs-connectivity',
  templateUrl: './dialogs-connectivity.component.html',
  styleUrls: ['./dialogs-connectivity.component.scss']
})
export class DataboxDialogsConnectivityComponent implements OnInit, OnDestroy, AfterViewInit {
  private dialogScroll: PerfectScrollbar;
  private reqSubs: Subscription;
  private deleteSubs: Subscription;
  public panelOpenState = false;
  public checked = true;

  constructor(
    public dialogRef: MatDialogRef<DataboxDialogsConnectivityComponent>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.reqSubs) this.reqSubs.unsubscribe();
    if (this.deleteSubs) this.deleteSubs.unsubscribe();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dialogScroll = new PerfectScrollbar('#dialog-scroll', {
        suppressScrollX: true
      });
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
