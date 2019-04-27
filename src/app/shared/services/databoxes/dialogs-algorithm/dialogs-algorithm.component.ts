import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { egretAnimations } from '../../../animations/egret-animations';
import { Subscription } from 'rxjs';
import { DataboxesService } from '../databoxes-services';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  	selector: 'app-dialogs-algorithm',
  	templateUrl: './dialogs-algorithm.component.html',
  	styleUrls: ['./dialogs-algorithm.component.scss']
})
export class DataboxDialogsAlgorithmComponent implements OnInit, OnDestroy {

	constructor(public dialogRef: MatDialogRef<DataboxDialogsAlgorithmComponent>,
		public dialog: MatDialog, 
		public snackBar: MatSnackBar,
		private router: Router,
		private databoxesService: DataboxesService,
		@Inject(MAT_DIALOG_DATA) public data:any) {}

	private reqSubs: Subscription;
	private deleteSubs: Subscription;

	ngOnInit(){}

	ngOnDestroy(){
		if(this.reqSubs) this.reqSubs.unsubscribe();
		if(this.deleteSubs) this.deleteSubs.unsubscribe();
	}

	// update connectors
	updateConnector(automatic?: boolean){
		
		this.reqSubs = this.databoxesService
		.addAlgorithmConnector(this.data.connector, automatic ? true : this.data.checked)
		.subscribe(result => {
			this.dialogRef.close(false);
			
			let url = this.router.url;

			this.router.navigateByUrl('/template-gallery', { skipLocationChange: true })
			.then(() => sessionStorage.setItem('selectedTabDatabox', '2'))
			.then(() => sessionStorage.removeItem('databox_updated'))
			.then(() => this.router.navigate(['/databoxes']))
			.then(() => this.router.navigate([url]))
			.then(() => sessionStorage.removeItem('selectedTabDatabox'));
		})
	}
}
