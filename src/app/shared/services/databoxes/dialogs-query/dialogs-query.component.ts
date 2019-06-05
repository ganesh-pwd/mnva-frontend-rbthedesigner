import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar, MatTable, MatChipInputEvent } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { egretAnimations } from '../../../animations/egret-animations';
import { Subscription } from 'rxjs';
import { DataboxCategoryService } from '../databox-item-category.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

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

  public visible = true;
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public requiredKeywords: string[] = [];
  public optionalKeywords: string[] = [];
  public excludeKeywords: string[] = [];
  public chipInputPlaceholder: string;

  @ViewChild('categoryTable') table: MatTable<any>;

  // tslint:disable-next-line:max-line-length
  public editorData = `Type your desired keywords`;
  public editorDataAdv = `Please type your query`;

  constructor(public dialogRef: MatDialogRef<DataboxDialogsQueryComponent>,
    public dialog: MatDialog, 
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private databoxCategoryService: DataboxCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

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
      .subscribe(result => this.setValueOfForm(this.data.databox, result[0])); 
    } 

    // set form value based on databox item details
    else if(this.data.editCategory && !getTempData){
      this.reqSubs = this.databoxCategoryService
        .getCategoryData(this.data.databox._id, this.data.category)
        .subscribe(result => this.setQueryValue(result[0]));
    }

    // set form value based on databox item details
    else if(this.data.editCategory && getTempData){
      this.reqSubs = this.databoxCategoryService
        .getCategoryDataTemp(this.data.databox._id, this.data.category)
        .subscribe(result => this.setQueryValue(result[0]));
    }
  }

  // show basic query
  showBasicQuery() { this.showQuery = 'basic'; }

  // show advanced query
  showAdvanceQuery() { this.showQuery = 'advance'; }

  // build queryForm
  queryFormGroup() {
    this.queryForm = this.formBuilder.group({
      'advance_query': [null],
      'category_name': [null, Validators.compose([Validators.required])],
      'category_type': ['Category']
    });
  }

  // set initial value of query form
  setValueOfForm(databox, databox_category) {
    // set form value based on databox item details
    this.queryForm.setValue({
      'advance_query': null,
      'category_name': null,
      'category_type': 'Category'
    });
  }

  setQueryValue(category){
    this.requiredKeywords = [...category['required_keywords']];
    this.optionalKeywords = [...category['optional_keywords']];
    this.excludeKeywords  = [...category['excluded_keywords']];

    this.queryForm.setValue({
      'advance_query' : category['query'] || category['expression'],
      'category_name' : category['name'] || null,
      'category_type' : category['type'] || 'Category'
    });
  }

  // add new category name
  addCategoryExpression(){
    let valid = true;

    // if form is invalid and query type is basic
    if((this.requiredKeywords.length === 0 && this.showQuery === 'basic') 
      || (!this.queryForm.get('category_name').value && this.showQuery === 'basic')){
      this.snackBar.open("You need to add a required keywords", 'close');
      valid = false;
    }

    // if form is invalid and query type is advance
    if((!this.queryForm.get('advance_query').value && this.showQuery === 'advance') 
      || (!this.queryForm.get('category_name').value && this.showQuery === 'advance')){
      this.snackBar.open("You need to add an advance query", 'close');
      valid = false;
    }
    
    // if form is valid
    if(valid) {
      this.snackBar.dismiss();

      let body = {
        'required_keywords': this.showQuery === 'basic' ? this.requiredKeywords : [],
        'optional_keywords': this.showQuery === 'basic' ? this.optionalKeywords : [],
        'excluded_keywords': this.showQuery === 'basic' ? this.excludeKeywords : [],
        'query': this.showQuery === 'advance' ? this.queryForm.get('advance_query').value : null,
        'query_type': this.showQuery,
        'name': this.queryForm.get('category_name').value,
        'type': this.queryForm.get('category_type').value
      }

      // close dialog
      this.dialogRef.close(false);

      // add new category
      this.addCategoryReq = this.databoxCategoryService
      .addCategoryTemp(this.data.databox._id, body)
      .subscribe(_result => this.databoxCategoryService.setCategoryItem(_result));
    }
  }

  /* @DATABOX MAT CHIP FUNCTIONS */

      // Will add new mat-chip item
      add(event: MatChipInputEvent, keywordType: string): void {
        const input = event.input;
        const value = event.value;

        // Add keywords
        if ((value || '').trim()) {
          // for required keywords
          if (keywordType === 'required') 
            this.requiredKeywords.push(value.trim());
          
          // for optional keywords
          else if (keywordType === 'optional') 
            this.optionalKeywords.push(value.trim());

          // for excluded keywords
          else if (keywordType === 'exclude') 
            this.excludeKeywords.push(value.trim());
        }

        // Reset the input value
        if (input) input.value = '';
      }


      // Will remove mat chip item
      remove(keyword: any): void {
        const indexRequired = this.requiredKeywords.indexOf(keyword);
        const indexOptional = this.optionalKeywords.indexOf(keyword);
        const indexExclude  = this.excludeKeywords.indexOf(keyword);

        // for required keywords
        if (indexRequired >= 0) 
          this.requiredKeywords.splice(indexRequired, 1);
        
        // for optional keywords
        else if (indexOptional >= 0) 
          this.optionalKeywords.splice(indexOptional, 1);

        // for excluded keywords
        else if (indexExclude >= 0) 
          this.excludeKeywords.splice(indexExclude, 1);
      }

  // edit category
  editCategoryExpression(){
    let valid = true;

    // if form is invalid and query type is basic
    if((this.requiredKeywords.length === 0 && this.showQuery === 'basic') 
      || (!this.queryForm.get('category_name').value && this.showQuery === 'basic')){
      this.snackBar.open("You need to add a required keywords", 'close');
      valid = false;
    }

    // if form is invalid and query type is advance
    if((!this.queryForm.get('advance_query').value && this.showQuery === 'advance') 
      || (!this.queryForm.get('category_name').value && this.showQuery === 'advance')){
      this.snackBar.open("You need to add an advance query", 'close');
      valid = false;
    }
      
    if(valid) {
      this.snackBar.dismiss();

      let body = {
        'required_keywords': this.showQuery === 'basic' ? this.requiredKeywords : [],
        'optional_keywords': this.showQuery === 'basic' ? this.optionalKeywords : [],
        'excluded_keywords': this.showQuery === 'basic' ? this.excludeKeywords : [],
        'query': this.showQuery === 'advance' ? this.queryForm.get('advance_query').value : null,
        'name': this.queryForm.get('category_name').value,
        'type': this.queryForm.get('category_type').value,
        'query_type': this.showQuery,
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
