import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { egretAnimations } from '../../../animations/egret-animations';
import { Subscription } from 'rxjs';
import { DataboxCategoryService } from '../databox-category-creator-services';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-dialogs-query',
  animations: [egretAnimations],
	templateUrl: './dialogs-query.component.html',
	styleUrls: ['./dialogs-query.component.scss']
})
export class DataboxDialogsQueryComponent implements OnInit, OnDestroy {
  private reqSubs: Subscription;
  private deleteSubs: Subscription;

  public queryForm: FormGroup;
  public categoryName: string;
  public showQuery: string = 'basic';

  // tslint:disable-next-line:max-line-length
  editorData = `( "Hino" OR Toyota OR Lexus OR Mercedes Benz OR "KIA" OR "Fiat" OR Suzuki OR [Mase(r|rr)ati] OR "BMW" OR hyundai OR mitsubishi ) AND NOT ( contiguo OR conjunto a OR "frente a" OR "norte" OR "oeste" OR "sur" OR metros )`;

  constructor(public dialogRef: MatDialogRef<DataboxDialogsQueryComponent>,
    public dialog: MatDialog, 
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private databoxCategoryService: DataboxCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 

  }

  ngOnInit() {
    console.log(this.data.databox);

    this.queryFormGroup();
    this.getDataboxCategory();
  }

  ngOnDestroy() {
    if (this.reqSubs) this.reqSubs.unsubscribe();
    if (this.deleteSubs) this.deleteSubs.unsubscribe();
  }

  // get databox category 
  getDataboxCategory(){
    this.reqSubs = this.databoxCategoryService
    .getItem(this.data.databox._id)
    .subscribe(result => {
      this.setValueOfForm(this.data.databox, result[0]);
    }); 
  }

  // show basic query
  showBasicQuery() {
    this.showQuery = 'basic';
  }

  // show advanced query
  showAdvanceQuery() {
    this.showQuery = 'advance';
  }

  // build queryForm
  queryFormGroup() {
    this.queryForm = this.formBuilder.group({
      'required-keywords': [null, Validators.compose([Validators.required])],
      'optional-keywords': [null, Validators.compose([Validators.required])],
      'excluded-keywords': [null, Validators.compose([Validators.required])],
      'advance-query': [null, Validators.compose([Validators.required])],
      'category-name': [null, Validators.compose([Validators.required])],
      'category-type': [null, Validators.compose([Validators.required])]
    });
  }

  // set initial value of query form
  setValueOfForm(databox, databox_category) {
    const data = {
      'required-keywords': this.editorData,
      'optional-keywords': this.editorData,
      'excluded-keywords': this.editorData,
      'advance-query': this.editorData
    };

    // set form value based on databox item details
    this.queryForm.setValue({
      'required-keywords': data['required-keywords'],
      'optional-keywords': data['optional-keywords'],
      'excluded-keywords': data['excluded-keywords'],
      'advance-query': data['advance-query'],
      'category-name': null,
      'category-type': 'Category'
    });
  }
}
