import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatTable } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { egretAnimations } from '../../../animations/egret-animations';
import { Subscription } from 'rxjs';
import { DataboxCategoryService } from '../databox-category-creator-services';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
	selector: 'app-dialogs-query',
  animations: [egretAnimations],
	templateUrl: './dialogs-query.component.html',
	styleUrls: ['./dialogs-query.component.scss']
})
export class DataboxDialogsQueryComponent implements OnInit, OnDestroy {
  private reqSubs: Subscription;
  private addCategoryReq: Subscription;
  private deleteSubs: Subscription;

  public queryForm: FormGroup;
  public categoryName: string;
  public showQuery: string = 'basic';

  @ViewChild('categoryTable') table: MatTable<any>;

  // tslint:disable-next-line:max-line-length
  editorData = `Type your desired keywords`;

  constructor(public dialogRef: MatDialogRef<DataboxDialogsQueryComponent>,
    public dialog: MatDialog, 
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private databoxCategoryService: DataboxCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    console.log(data)
  }

  ngOnInit() {
    this.queryFormGroup();
    this.getDataboxCategory();
  }

  ngOnDestroy() {
    if (this.reqSubs) this.reqSubs.unsubscribe();

  }

  // get databox category 
  getDataboxCategory(){
    let getTempData = sessionStorage.getItem('databoxCategory');

    if(!this.data.editCategory && !getTempData){
      this.reqSubs = this.databoxCategoryService
      .getItem(this.data.databox._id)
      .subscribe(result => {
        this.setValueOfForm(this.data.databox, result[0]);
      }); 
    } 
    // set form value based on databox item details
    else if(this.data.editCategory && !getTempData){
      this.reqSubs = this.databoxCategoryService
        .getCategoryData(this.data.databox._id, this.data.category)
        .subscribe(result => {
          let category = result[0];

          this.queryForm.setValue({
            'required-keywords' : category['required-keywords'] || null,
            'optional-keywords' : category['optional-keywords'] || null,
            'excluded-keywords' : category['excluded-keywords'] || null,
            'advance-query' : category['query'] || null,
            'category-name' : category['name'] || null,
            'category-type' : category['type'] || 'Category'
          });
        });
    }

    // set form value based on databox item details
    else if(this.data.editCategory && getTempData){
      this.reqSubs = this.databoxCategoryService
        .getCategoryDataTemp(this.data.databox._id, this.data.category)
        .subscribe(result => {
          let category = result[0];

          this.queryForm.setValue({
            'required-keywords' : category['required-keywords'] || null,
            'optional-keywords' : category['optional-keywords'] || null,
            'excluded-keywords' : category['excluded-keywords'] || null,
            'advance-query' : category['query'] || null,
            'category-name' : category['name'] || null,
            'category-type' : category['type'] || 'Category'
          });
        });
    }
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
      'optional-keywords': [null],
      'excluded-keywords': [null],
      'advance-query': [null],
      'category-name': [null, Validators.compose([Validators.required])],
      'category-type': ['Category']
    });
  }

  // set initial value of query form
  setValueOfForm(databox, databox_category) {
    // set form value based on databox item details
    this.queryForm.setValue({
      'required-keywords': null,
      'optional-keywords': null,
      'excluded-keywords': null,
      'advance-query': null,
      'category-name': null,
      'category-type': 'Category'
    });
  }

  // add new category name
  addCategoryExpression(){
    let valid = true;

    if((!this.queryForm.get('required-keywords').value && this.showQuery === 'basic') 
      || (!this.queryForm.get('category-name').value && this.showQuery === 'basic')){
      this.snackBar.open("You need to add a required keywords", 'close');
      valid = false;
    }

    if((!this.queryForm.get('advance-query').value && this.showQuery === 'advance') 
      || (!this.queryForm.get('category-name').value && this.showQuery === 'advance')){
      this.snackBar.open("You need to add an advance query", 'close');
      valid = false;
    }
      
    if(valid) {
      this.snackBar.dismiss();

      let body = {
        'required-keywords': this.showQuery === 'basic' ? this.queryForm.get('required-keywords').value : null,
        'optional-keywords': this.showQuery === 'basic' ? this.queryForm.get('optional-keywords').value : null,
        'excluded-keywords': this.showQuery === 'basic' ? this.queryForm.get('excluded-keywords').value : null,
        'query': this.showQuery === 'advance' ? this.queryForm.get('advance-query').value : null,
        'name': this.queryForm.get('category-name').value,
        'type': this.queryForm.get('category-type').value
      }

      // close dialog
      this.dialogRef.close(false);

      // add new category
      this.addCategoryReq = this.databoxCategoryService
      .addCategoryTemp(this.data.databox._id, body)
      .subscribe(_result => {
        let url = this.router.url;

        this.databoxCategoryService.setCategoryItem(_result)
      });
    }
  }

  // edit category
  editCategoryExpression(){
    let valid = true;

    if((!this.queryForm.get('required-keywords').value && this.showQuery === 'basic') 
      || (!this.queryForm.get('category-name').value && this.showQuery === 'basic')){
      this.snackBar.open("You need to add a required keywords", 'close');
      valid = false;
    }

    if((!this.queryForm.get('advance-query').value && this.showQuery === 'advance') 
      || (!this.queryForm.get('category-name').value && this.showQuery === 'advance')){
      this.snackBar.open("You need to add an advance query", 'close');
      valid = false;
    }
      
    if(valid) {
      this.snackBar.dismiss();

      let body = {
        'required-keywords': this.showQuery === 'basic' ? this.queryForm.get('required-keywords').value : null,
        'optional-keywords': this.showQuery === 'basic' ? this.queryForm.get('optional-keywords').value : null,
        'excluded-keywords': this.showQuery === 'basic' ? this.queryForm.get('excluded-keywords').value : null,
        'query': this.showQuery === 'advance' ? this.queryForm.get('advance-query').value : null,
        'name': this.queryForm.get('category-name').value,
        'type': this.queryForm.get('category-type').value
      }

      // close dialog
      this.dialogRef.close(false);

      // add new category
      this.addCategoryReq = this.databoxCategoryService
      .editCategoryTemp(this.data.databox._id, body, this.data.category)
      .subscribe(result => {
        let url = this.router.url;

        this.databoxCategoryService.setCategoryItem(result);
         
        if(!sessionStorage.getItem('databoxCategory')){
          
          this.router.navigateByUrl('/template-gallery', { skipLocationChange: true })
          .then(() => sessionStorage.setItem('selectedTabDatabox', '1'))
          .then(() => sessionStorage.removeItem('databox_updated'))
          .then(() => this.router.navigate(['/databoxes']))
          .then(() => this.router.navigate([url]))
          .then(() => sessionStorage.removeItem('selectedTabDatabox'));
        }
      });
    }
  }

  // save all categories to fake db
  saveChangesToDB(){
    // close dialog
    this.dialogRef.close(false);

    // add new category
    this.addCategoryReq = this.databoxCategoryService
    .saveChangesToDB(this.data.databox._id)
    .subscribe(_result => {
      let url = this.router.url;

      this.router.navigateByUrl('/template-gallery', { skipLocationChange: true })
      .then(() => sessionStorage.setItem('selectedTabDatabox', '1'))
      .then(() => sessionStorage.removeItem('databox_updated'))
      .then(() => this.router.navigate(['/databoxes']))
      .then(() => this.router.navigate([url]))
      .then(() => sessionStorage.removeItem('selectedTabDatabox'));
    });
  }

  // cancel all changes
  cancelChanges(){
    let url = this.router.url;

    // close dialog
    this.dialogRef.close(false);
    this.databoxCategoryService.setTestDataItem(null);
    this.router.navigateByUrl('/template-gallery', { skipLocationChange: true })
      .then(() => sessionStorage.removeItem('databoxCategoryTestData'))
      .then(() => sessionStorage.removeItem('databoxCategory'))
      .then(() => this.router.navigate(['/databoxes']))
      .then(() => this.router.navigate([url]))
  }

  // test category save to temp session storage
  testCategory(){
    // close dialog
    this.dialogRef.close(false);

    this.databoxCategoryService.testCategory(this.data.databox._id);
  }


  // delete category
  deleteCategoryExpression(){
    // close dialog
    this.dialogRef.close(false);

    this.deleteSubs = this.databoxCategoryService
    .deleteCategory(this.data.databox._id, this.data.category)
    .subscribe(result => {
      let url = this.router.url;

      this.router.navigateByUrl('/template-gallery', { skipLocationChange: true })
      .then(() => sessionStorage.setItem('selectedTabDatabox', '1'))
      .then(() => sessionStorage.removeItem('databox_updated'))
      .then(() => this.router.navigate(['/databoxes']))
      .then(() => this.router.navigate([url]))
      .then(() => sessionStorage.removeItem('selectedTabDatabox'))
      .then(() => {
        this.snackBar.open('The Category has been successfully deleted', 'close');
        setTimeout(() => this.snackBar.dismiss(), 3000);
      });
    });
  }


}
