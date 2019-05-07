import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
  public receive_email_group: FormGroup;
  public receive_aggregated_report_group: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DataboxDialogsConnectivityComponent>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.receive_emailGroup();
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

  // build receive_email
  receive_emailGroup() {
    this.receive_email_group = this.formBuilder.group({
      'receiver-email': [null, Validators.compose([Validators.required, Validators.email])],
      'summary-report-check': [null, Validators.compose([Validators.required])],
      'days-received': [null, Validators.compose([Validators.required])],
    });

    this.receive_aggregated_report_group = this.formBuilder.group({
      'receiver-email': [null, Validators.compose([Validators.required, Validators.email])],
      'summary-report-check': [null, Validators.compose([Validators.required])],
      'days-received': [null, Validators.compose([Validators.required])],
    });
  }

  // set initial value of query form
  setValueOfForm(databox, databox_category) {
    // set form value based on databox item details
    this.receive_email_group.setValue({
      'receiver-email': null,
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
