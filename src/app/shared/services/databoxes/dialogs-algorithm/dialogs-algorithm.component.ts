import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  	selector: 'app-dialogs-algorithm',
  	templateUrl: './dialogs-algorithm.component.html',
  	styleUrls: ['./dialogs-algorithm.component.scss']
})
export class DataboxDialogsAlgorithmComponent implements OnInit, OnDestroy {

	constructor(public dialogRef: MatDialogRef<DataboxDialogsAlgorithmComponent>,
		public dialog: MatDialog, public snackBar: MatSnackBar,
		@Inject(MAT_DIALOG_DATA) public data:any) {}

	private reqSubs: Subscription;
	private deleteSubs: Subscription;

	ngOnInit(){}

	ngOnDestroy(){
		if(this.reqSubs) this.reqSubs.unsubscribe();
		if(this.deleteSubs) this.deleteSubs.unsubscribe();
	}
}
