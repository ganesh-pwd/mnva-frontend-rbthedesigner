import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-dialogs-query',
	templateUrl: './dialogs-query.component.html',
	styleUrls: ['./dialogs-query.component.scss']
})
export class DataboxDialogsQueryComponent implements OnInit, OnDestroy {
  private reqSubs: Subscription;
  private deleteSubs: Subscription;
  public categoryName: string;

  constructor(public dialogRef: MatDialogRef<DataboxDialogsQueryComponent>,
    public dialog: MatDialog, public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.reqSubs) this.reqSubs.unsubscribe();
    if (this.deleteSubs) this.deleteSubs.unsubscribe();
  }
}
