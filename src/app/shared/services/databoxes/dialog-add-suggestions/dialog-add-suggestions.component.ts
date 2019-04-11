import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
  MatSnackBar
} from '@angular/material';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DataboxesService } from '../databoxes-services';
import { Subscription } from 'rxjs';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-suggestion',
  templateUrl: './dialog-add-suggestions.component.html'
})
export class DataboxDialogAddSuggestionComponent implements OnInit, OnDestroy {
  private reqSubs: Subscription;
  private deleteSubs: Subscription;

  public suggestResultForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DataboxDialogAddSuggestionComponent>,
    private databoxesService: DataboxesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.suggestResultFormGroup();
  }

  ngOnDestroy() {
    if (this.reqSubs) this.reqSubs.unsubscribe();
    if (this.deleteSubs) this.deleteSubs.unsubscribe();
  }

  // build queryForm
  suggestResultFormGroup() {
    this.suggestResultForm = this.formBuilder.group({
      'page-name': [null, Validators.compose([Validators.required])],
      'page-id': [null, Validators.compose([Validators.required])],
      'page-country': [null, Validators.compose([Validators.required])]
    });

    console.log(this.data.data.page_name);

    if (this.data.data) {
      this.suggestResultForm.setValue({
        'page-name': this.data.data.page_name,
        'page-id': this.data.data.page_id,
        'page-country': this.data.data.page_country
      });
    }
  }

  // add suggestion
  addSuggestion() {
    let body = {
      source: this.data.field,
      page_name: this.suggestResultForm.get('page-name').value,
      page_id: this.suggestResultForm.get('page-id').value,
      page_country: this.suggestResultForm.get('page-country').value
    };

    this.reqSubs = this.databoxesService
      .addNewResultSuggestion(body)
      .subscribe(result => this.dialogRef.close(false));
  }
}
