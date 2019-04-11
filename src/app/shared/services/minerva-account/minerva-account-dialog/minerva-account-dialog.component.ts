import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-minerva-account-dialog',
  templateUrl: './minerva-account-dialog.component.html',
  styleUrls: ['./minerva-account-dialog.component.scss']
})
export class MinervaAccountDialogComponent implements OnInit, OnDestroy {
  private reqSubs: Subscription;
  private deleteSubs: Subscription;

  constructor(public dialogRef: MatDialogRef<MinervaAccountDialogComponent>,
    public dialog: MatDialog, public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.reqSubs) this.reqSubs.unsubscribe();
    if (this.deleteSubs) this.deleteSubs.unsubscribe();
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
