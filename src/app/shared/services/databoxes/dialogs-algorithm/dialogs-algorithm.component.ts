import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataboxesService } from '../databoxes-services';
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
		@Inject(MAT_DIALOG_DATA) public data: any) {}

	private reqSubs: Subscription;
	private deleteSubs: Subscription;

	ngOnInit() { }

	ngOnDestroy() {
		if(this.reqSubs) this.reqSubs.unsubscribe();
		if(this.deleteSubs) this.deleteSubs.unsubscribe();
	}

	// update connectors, if update automatically button was clicked
	updateConnector(automatic?: boolean){ this.switchAlgorithm(automatic ? true : this.data.checked); }

	// switch algorithm off
	switchAlgorithmOff(){ this.switchAlgorithm(false); }

	// switch algorithm on
	switchAlgorithmOn(){ this.switchAlgorithm(true); }

	// switch algorithm service
	switchAlgorithm(switch_data: boolean){
		this.reqSubs = this.databoxesService
		.addAlgorithmConnector(this.data.connector, switch_data)
		.subscribe(result => {
			this.dialogRef.close(false);
			
			const url = this.router.url;

			this.router.navigateByUrl('/template-gallery', { skipLocationChange: true })
			.then(() => sessionStorage.setItem('selectedTabDatabox', '2'))
			.then(() => sessionStorage.removeItem('databox_updated'))
			.then(() => this.router.navigate(['/databoxes']))
			.then(() => this.router.navigate([url]))
			.then(() => sessionStorage.removeItem('selectedTabDatabox'));
		});
	}
}
