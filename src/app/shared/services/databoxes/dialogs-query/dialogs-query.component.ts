import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
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

  // tslint:disable-next-line:max-line-length
  editorData = `( "Hino" OR Toyota OR Lexus OR Mercedes Benz OR "KIA" OR "Fiat" OR Suzuki OR [Mase(r|rr)ati] OR "BMW" OR hyundai OR mitsubishi ) AND NOT ( contiguo OR conjunto a OR "frente a" OR "norte" OR "oeste" OR "sur" OR metros )`;

  constructor(public dialogRef: MatDialogRef<DataboxDialogsQueryComponent>,
    public dialog: MatDialog, 
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private databoxCategoryService: DataboxCategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 

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
    if(!this.data.editCategory){
      this.reqSubs = this.databoxCategoryService
      .getItem(this.data.databox._id)
      .subscribe(result => {
        this.setValueOfForm(this.data.databox, result[0]);
      }); 
    } 
    // set form value based on databox item details
    else {
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
            'category-type' : category['type'] || null
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
      'category-type': [null]
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
        'required-keywords': this.queryForm.get('required-keywords').value,
        'optional-keywords': this.queryForm.get('optional-keywords').value,
        'excluded-keywords': this.queryForm.get('excluded-keywords').value,
        'query': this.queryForm.get('advance-query').value,
        'name': this.queryForm.get('category-name').value,
        'type': this.queryForm.get('category-type').value
      }

      // close dialog
      this.dialogRef.close(false);

      // add new category
      this.addCategoryReq = this.databoxCategoryService
      .addCategoryItem(this.data.databox._id, body)
      .subscribe(result => {
        let url = this.router.url;

        this.router.navigateByUrl('/template-gallery', { skipLocationChange: true })
        .then(() => sessionStorage.setItem('selectedTabDatabox', '1'))
        .then(() => this.router.navigate(['/databoxes']))
        .then(() => this.router.navigate([url]))
        .then(() => sessionStorage.removeItem('selectedTabDatabox'));
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
        'required-keywords': this.queryForm.get('required-keywords').value,
        'optional-keywords': this.queryForm.get('optional-keywords').value,
        'excluded-keywords': this.queryForm.get('excluded-keywords').value,
        'query': this.queryForm.get('advance-query').value,
        'name': this.queryForm.get('category-name').value,
        'type': this.queryForm.get('category-type').value
      }

      // close dialog
      this.dialogRef.close(false);

      // add new category
      this.addCategoryReq = this.databoxCategoryService
      .editCategory(this.data.databox._id, body, this.data.category)
      .subscribe(result => {
        console.log(result)

        let url = this.router.url;

        this.router.navigateByUrl('/template-gallery', { skipLocationChange: true })
        .then(() => sessionStorage.setItem('selectedTabDatabox', '1'))
        .then(() => this.router.navigate(['/databoxes']))
        .then(() => this.router.navigate([url]))
        .then(() => sessionStorage.removeItem('selectedTabDatabox'));
      });
    }
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
