import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  	selector: 'app-dialogs-mentions',
  	templateUrl: './dialogs-mentions.component.html',
  	styleUrls: ['./dialogs-mentions.component.scss']
})
export class DataboxDialogsMentionsComponent implements OnInit, OnDestroy {

	constructor(public dialogRef: MatDialogRef<DataboxDialogsMentionsComponent>,
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
