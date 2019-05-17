import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { DataboxesService } from '../../../shared/services/databoxes/databoxes-services';
import { databoxCategoryEditorDialogService } from '../../../shared/services/databoxes/dialogs-query/dialogs-query.services';
import { DataboxItemSearchService } from '../../../shared/services/databoxes/databox-item-search-services';
import { MainDataboxesDialogService } from '../../../shared/services/databoxes/dialogs/main-databoxes-dialog.service';
import { DataboxAddSuggestionService } from '../../../shared/services/databoxes/dialog-add-suggestions/dialog-add-suggestions.service';
import { DataboxCategoryService } from '../../../shared/services/databoxes/databox-category-creator-services';
import { UserService } from '../../../shared/services/auth/user-services';
import { HotTableRegisterer } from '@handsontable-pro/angular';
import { DataboxAlgorithmDialogService } from '../../../shared/services/databoxes/dialogs-algorithm/dialogs-algorithm.services';
import { MatPaginator, MatTableDataSource, MatSidenav} from '@angular/material';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-databox-item',
  animations: [egretAnimations],
  templateUrl: './databox-item.component.html',
  styleUrls: ['./databox-item.component.scss']
})

export class DataboxItemComponent implements OnInit, OnDestroy {
  private getItemSub: Subscription;
  private getTableReq: Subscription;
  private addRowReq: Subscription;
  private resetRowReq: Subscription;
  private req: Subscription;
  private databoxCategoryReq: Subscription;

  public data: any;
  public databoxItemData: any;
  public checked: boolean = false;
  public paginatedData: any;
  public selectedOption = false;
  public id: string;
  public mentions: number;
  public creditRemaining: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns: string[] = ['name', 'type', 'expression', 'action'];
  public dataSource: any;
  public selectedTab: number;

  /** Results table */
  public resultsTableColumns: string[] = ['content', 'category', 'subCategory'];
  public resultsDataSource: any;

  @ViewChild('hot') hot;
  @ViewChild('exportFile') exportFile;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSidenav) private sideNav: MatSidenav;

  public databoxItemTable: any;
  public hotId: string = 'databoxItemTable';
  public selectedHero: any;
  public tableSettings: {};
  public changeList: any[];
  public suggestResultForm: FormGroup;
  public categoryRemaining: number;
  public categoryUsed: number;
  public subcategoryRemaining: number;
  public subCategoryUsed: number;

  public sentiment: boolean = false;
  public topicRecognition: boolean = false;
  public genderAuthor: boolean = false;
  public entityRecognition: boolean = false;
  public loggedInUser;
  public testCategory: any;

  /* @SET CHART DATA */
  // Doughnuts
  public sharedChartOptions: any = {
    responsive: true,
    legend: {
      display: false,
      position: 'bottom'
    }
  };
  public doughnutOptions: any = Object.assign({
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  }, this.sharedChartOptions);
  public doughnutChartColors: any[] = [{
    backgroundColor: ['#fb8a01', '#19b4d7', '#3c4650', '#4caf50']
  }];
  public doughnutChartCategoryLabels = ['Category Mentions', 'Category Remaining'];
  public doughnutChartSubCategoryLabels = ['SubCategory Mentions', 'SubCategory Remaining'];
  public doughnutChartType = 'doughnut';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private hotRegisterer: HotTableRegisterer,
    private databoxesService: DataboxesService,
    private databoxAlgorithmDialogService: DataboxAlgorithmDialogService,
    private databoxCategoryEditorDialogService: databoxCategoryEditorDialogService,
    private databoxItemSearchService: DataboxItemSearchService,
    private databoxAddSuggestionService: DataboxAddSuggestionService,
    private mainDataboxesDialogService: MainDataboxesDialogService,
    private databoxCategoryService: DataboxCategoryService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private loader: AppLoaderService
    ) {
      this.data = [];
      this.id   = this.activatedRoute.snapshot.paramMap.get('id');

      this.databoxesService.apiData$.subscribe(result => this.databoxItemData = result);

      // category items
      this.databoxCategoryService.categoryItems$.subscribe(_result => {
        this.dataSource = _result || [];
      });

      // test category data
      this.databoxCategoryService.testData$.subscribe(_result => {
         this.testCategory = _result;
      });

      this.selectedTab = parseInt(sessionStorage.getItem('selectedTabDatabox')) || 0;
      userService.userData$.subscribe((user) => this.loggedInUser = user); 
    }


  ngOnInit() {
    setTimeout(() => this.loader.open(), 50);
    // get databox details
    this.getSingleItem();

    // load databox item table data
    this.getDataboxItemSearch();

    this.paginatedData['items'].map(el => {
      const arr = [];
      for (let item in el) {
        arr.push(el[item]);
      }

      return arr;
    });

    // create databox item result table (handsontable)
    this.createTable();
    this.suggestResultFormGroup();

    setTimeout(() => document.getElementById('head').click(), 500);
  }

  ngOnDestroy() {
    if (this.getItemSub) { this.getItemSub.unsubscribe(); }
    if (this.getTableReq) { this.getTableReq.unsubscribe(); }
    if (this.addRowReq) { this.addRowReq.unsubscribe(); }
    if (this.resetRowReq) { this.resetRowReq.unsubscribe(); }
    if (this.req) {this.req.unsubscribe(); }

    sessionStorage.removeItem('databoxCategory');
    sessionStorage.removeItem('databoxCategoryTestData');
    
    this.databoxCategoryService.setTestDataItem(null);
  }

  // build queryForm
  suggestResultFormGroup() {
    this.suggestResultForm = this.formBuilder.group({
      'page-name': [null, Validators.compose([Validators.required])],
      'page-id': [null, Validators.compose([Validators.required])],
      'page-country': [null, Validators.compose([Validators.required])],
    });
  }

  slideToggle(data) {
    switch (true) {
      case data === 'sentiment': {
        if(this.sentiment)
          this.sentiment = false;
        else this.sentiment = true;

        break;
      }

      case data === 'topicRecognition': {
        if(this.topicRecognition)
          this.topicRecognition = false;
        else this.topicRecognition = true;

        break;
      }

      case data === 'genderAuthor': {
        if(this.genderAuthor)
          this.genderAuthor = false;
        else this.genderAuthor = true;

        break;
      }

      case data === 'entityRecognition': {
        if(this.entityRecognition)
          this.entityRecognition = false;
        else this.entityRecognition = true;

        break;
      }
    }
  }


  clickSlideToggle(data){
    switch (true) {
      case data === 'sentiment': {
        if(this.sentiment)
          this.sentiment = false;
        else this.sentiment = true;

        setTimeout(() => this.openAlgorithmDialog('Apply Enrichment', this.sentiment, data, true), 300);

        break;
      }

      case data === 'topicRecognition': {
        if(this.topicRecognition)
          this.topicRecognition = false;
        else this.topicRecognition = true;

        setTimeout(() => this.openAlgorithmDialog('Apply Enrichment', this.topicRecognition, data, true), 300);

        break;
      }

      case data === 'genderAuthor': {
        if(this.genderAuthor)
          this.genderAuthor = false;
        else this.genderAuthor = true;

        setTimeout(() => this.openAlgorithmDialog('Apply Enrichment', this.genderAuthor, data, true), 300);

        break;
      }

      case data === 'entityRecognition': {
        if(this.entityRecognition)
          this.entityRecognition = false;
        else this.entityRecognition = true;

        setTimeout(() => this.openAlgorithmDialog('Apply Enrichment', this.entityRecognition, data, true), 300);

        break;
      }
    }
  }


  // get databox table search item
  getDataboxItemSearch() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const page = this.activatedRoute.snapshot.paramMap.get('page');

    this.getTableReq = this.databoxItemSearchService.getItems(id)
    .subscribe(data => {
      this.databoxItemTable = data;
      this.paginatedData    = this.paginateDatabox(this.databoxItemTable, page ? parseInt(page) : 1);
    });
  }

  // Get databox items created by users with parameter id
  getSingleItem() {
    this.databoxesService
      .getSingleItem(this.id)
      .subscribe(
        (data) => {
          if (data && data.status === 'Active' || data.status === 'Paused') {
            this.mentions = data.mentions;
            this.creditRemaining = data.credit_remaining;
            this.categoryRemaining = data.category_available - data.category_used;
            this.subcategoryRemaining = data.sub_category_available - data.sub_category_available_used;

            this.categoryUsed = data.category_used;
            this.subCategoryUsed = data.sub_category_available_used;

            this.data = data;
            this.selectedOption = true;

            // get databox categories
            this.getDataboxCategory(this.id);

            // slide apply automatically toggle
            data.algorithmConnectors.forEach(el => this.slideToggle(el));

            this.loader.close();
          }
          if (!data) this.router.navigate(['/sessions/404']);
        },
        (err) => this.router.navigate(['/sessions/404']));
  }

  // Get Databox Category
  getDataboxCategory(id) {
    this.databoxCategoryReq = this.databoxCategoryService
    .getItem(id)
    .subscribe(result => {
      if (result[0]) this.databoxCategoryService.setCategoryItem(result[0].categories); 
      else this.databoxCategoryService.setCategoryItem(null); 
    });
  }

  


  /* @DATABOXES DIALOG POP UPS */

      // open category editor dialog
      openQueryDialog(title: string, databox: any, editCategory?: boolean, category?: any) {
        this.databoxCategoryEditorDialogService.confirm({ 
          title: title, 
          databox: databox,
          editCategory: editCategory,
          category: category
        }).subscribe((result) => { });
      }

      // modify databox
      modifyDataboxDialog(title: string, data: string, input: boolean) {
        this.mainDataboxesDialogService.confirm({
          title: title,
          data: data,
          input: input
        }).subscribe((result) => {
          this.selectedOption = result;
        });
      }

      // open databox query dialog
      openAlgorithmDialog(title: string, checked: boolean, connector: any, algo_switch?: boolean) {
        this.databoxAlgorithmDialogService.confirm({ 
          title: title, 
          checked: checked, 
          connector: connector,
          algo_switch: algo_switch 
        }).subscribe((result) => { });
      }

      openAddSuggestion(){
        this.databoxAddSuggestionService.confirm({ 
          title: `Suggest Result From a Specific ${this.data.page_search_name}`, 
          field: this.data.page_search_name})
        .subscribe((result) => { });
      }

      // add suggestion
      openAddSuggestionPreField(){
        let body = {
          'source': this.data.page_search_name,
          'page_name': this.suggestResultForm.get('page-name').value,
          'page_id': this.suggestResultForm.get('page-id').value,
          'page_country': this.suggestResultForm.get('page-country').value,
        }

        this.databoxAddSuggestionService.confirm({ title: `Suggest Result From a Specific ${this.data.page_search_name}`, data: body, field: this.data.page_search_name}).subscribe((result) => { });
      }

      // cancel changes for categorized your data
      cancelChanges(){
        const getTempData = sessionStorage.getItem('databoxCategoryTestData') || sessionStorage.getItem('databoxCategory');

        if(getTempData)
          this.openQueryDialog('Cancel Changes', this.data);
        else {
          let url = this.router.url;

          this.router.navigateByUrl('/template-gallery', { skipLocationChange: true })
          .then(() => this.router.navigate(['/databoxes']))
          .then(() => this.router.navigate([url]))
        }
      }


  /* @DATABOX ITEM HANDSONTABLE DATA FUNCTIONS */

      // paginate databox search table
      paginateDatabox(items, page?, per_page?) {
        var npage = page || 1,
          per_page = per_page || 10,
          offset = (npage - 1) * per_page,

          paginatedItems = items.slice(offset).slice(0, per_page),
          total_pages = Math.ceil(items.length / per_page);

        return {
          page: npage,
          per_page: per_page,
          pre_page: npage - 1 ? npage - 1 : null,
          next_page: (total_pages > npage) ? npage + 1 : null,
          total: items.length,
          total_pages: total_pages,
          items: paginatedItems
        };
      }

      // add new row to databox search table
      addNewRow() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        const route = `/databoxes/${id}/${this.paginatedData.total_pages}`;

        this.addRowReq = this.databoxItemSearchService.addRow(id).subscribe(data => {
          if (data) {
            this.router.navigateByUrl('/databoxes', { skipLocationChange: true })
            .then(() => this.router.navigate([route]));
          }
        });
      }

      // remove a row from databox search table
      deleteRow(row) {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        const route = `/databoxes/${id}`;

        this.resetRowReq = this.databoxItemSearchService.deleteRow(id, row).subscribe(data => {
          if (data) {
            this.router.navigateByUrl('/databoxes', { skipLocationChange: true })
            .then(() => this.router.navigate([route]));
          }
        });
      }

      // save all data
      saveAllData() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        const route = `/databoxes/${id}`;

        this.addRowReq = this.databoxItemSearchService.saveAllChanges(id, this.paginatedData['items'])
        .subscribe(data => {
          this.router.navigateByUrl('', { skipLocationChange: true })
          .then(() => this.router.navigate([route]));
        });
      }

      // reset databox search table default rows
      resetAllRow() {
        const name = this.activatedRoute.snapshot.paramMap.get('name');
        const route = `/databoxes/${name}`;

        this.resetRowReq = this.databoxItemSearchService.resetRows()
          .subscribe(data => {
            this.router.navigateByUrl('/databoxes', { skipLocationChange: true })
              .then(() => this.router.navigate([route]));
          });
      }

      
      // download the table
      downloadCSV() {
        const hotInstance = this.hotRegisterer.getInstance(this.hotId);

        hotInstance.getPlugin('exportFile').downloadFile('csv', {
          bom: false,
          columnDelimiter: ',',
          columnHeaders: true,
          exportHiddenColumns: true,
          exportHiddenRows: true,
          fileExtension: 'csv',
          filename: `Databox-item-Page-${this.paginatedData.page}-${this.data._id}-CSV-file_[YYYY]-[MM]-[DD]`,
          mimeType: 'text/csv',
          rowDelimiter: '\r\n',
          rowHeaders: true
        });
      }

      // navigate to databox page search
      navigateToDataboxPageSearch(folder: string, id: string) {
        const route = `databoxes/${folder.replace(/\s/, '-')}/page-search/${id}`;
        this.router.navigate([route]);
      }

      // navigate to next page
      navigateToNextPage(id: string) {
        let route;

        if (this.paginatedData.next_page === null) {
          route = `databoxes/${id}/${this.paginatedData.total_pages}`;
        } else {
          route = `databoxes/${id}/${this.paginatedData.next_page}`;
        }

        this.router.navigate([route]);
      }

      // navigate to prev page
      navigateToPrevPage(id: string) {
        let route;

        if (this.paginatedData.pre_page === null || this.paginatedData.pre_page === 1) {
          route = `databoxes/${id}`;
        } else {
          route = `databoxes/${id}/${this.paginatedData.pre_page}`;
        }
        this.router.navigate([route]);
      }

      // create databox item result handsontable
      createTable(): any {
        return this.tableSettings = {
          data: this.paginatedData['items'],
          rowHeights: 20,
          observeChanges: true,
          columnSorting: true,
          renderAllRows: true,
          contextMenu: true,
          filters: true,
          allowInsertColumn: true,
          autoWrapRow: true,
          autoColumnSize: true,
          display: scroll,
          stretch: 'all',
          dropdownMenu: ['make_read_only', 'alignment', '---------', 'filter_by_condition', 'filter_by_value', '---------', 'filter_action_bar'],
          licenseKey: '0ec2b-f4364-2b674-c443e-0b024',
          hiddenColumns: {
            indicators: true
          },
          columns: [
            { data: 'date', title: 'Date', type: 'date' },
            { data: 'content', title: 'Content', width: '600px' },
            { data: 'parent', title: 'Parent', className: 'htCenter' },
            { data: 'author', title: 'Author', className: 'htCenter' },
            { data: 'category', title: 'Category', className: 'htCenter' },
            { data: 'subcategory', title: 'SubCategory', className: 'htCenter' },
            { data: 'like', title: 'Like', className: 'htCenter' },
            { data: 'share', title: 'Share', className: 'htCenter' },
            { data: 'comment', title: 'Comment', className: 'htCenter' },
            { data: 'love', title: 'Love', className: 'htCenter' },
            { data: 'sad', title: 'Sad', className: 'htCenter' },
            { data: 'angry', title: 'Angry', className: 'htCenter' },
            { data: 'pride', title: 'Pride', className: 'htCenter' },
            { data: 'laugh', title: 'Laugh', className: 'htCenter' },
            { data: 'report_sent', type: 'checkbox', checkedTemplate: 'yes', className: 'htCenter', uncheckedTemplate: 'no', title: 'Report Sent' },
            { data: 'alert_sent', type: 'checkbox', checkedTemplate: 'yes', className: 'htCenter', uncheckedTemplate: 'no', title: 'Alert Sent' },
            {
              data: 'action',
              readOnly: true,
              title: 'Action',
              className: 'htCenter',
              renderer(hotInstance, td, row, column, prop, value, cellProperties) {
                td.innerHTML = `<button class="fa fa-trash"></button>`;
                td.style.textAlign = 'center';
                return td;
              }
            },
          ],
          afterChange: (changes, source) => {
            if (source) {
              const hotInstance = this.hotRegisterer.getInstance(this.hotId);

              const item = {
                id: source[0][0],
                column: source[0][1],
                oldData: source[0][2],
                newData: source[0][3]
              }
            }
          },
          afterOnCellMouseDown: (event, coords, td, src) => {
            const hotInstance = this.hotRegisterer.getInstance(this.hotId);

            // Edit Row
            if (coords.realTarget.className === 'fa fa-pencil') {
              const data = hotInstance.getDataAtRow(td.row);

              for (let i = 0; i < data.length; i++) {
                hotInstance.setCellMeta(td.row, i, 'readOnly', JSON.parse('false'));
              }
            }

            // Delete Row
            if (coords.realTarget.className === 'fa fa-trash') {
              const data = hotInstance.getDataAtRowProp(td.row, 'id');
              this.deleteRow(data);
            }
          },
        };
      }
}

// Databox item second table interface
export interface DataTableItem {
  id: number;
  date: string;
  content: string;
  parent: string;
  author: string;
}

// Databox item second table data
const DataboxResultItem: DataTableItem[] = [
  {
    id: 1, date: '15-07-2018', content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    parent: 'Null', author: 'Sabores a lo Tico'
  }
];