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
import { MatPaginator, MatTableDataSource} from '@angular/material';
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
  public arrayData: any;
  public paginatedData: any;
  public selectedOption = false;
  public id: string;
  public mentions: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumns: string[] = ['name', 'type', 'expression', 'action'];
  public dataSource: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  public displayedColumnsSecondTable: string[] = ['date', 'content', 'parent', 'author'];
  public databoxSecondTable = new MatTableDataSource(<any> DataboxResultItem);

  public selectedTab: number;

  @ViewChild('hot') hot;
  @ViewChild('exportFile') exportFile;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public databoxItemTable: any;
  public databoxCategories: any;
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
      this.databoxesService.apiData$.subscribe(result => this.databoxItemData = result);
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

    this.arrayData = [
      // tslint:disable-next-line:max-line-length
      [0, '15/01/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_1', 'Category1', 'SubCategory1', 100, 100, 100, 100, 100, 100, 100,100],
      [1, '15/02/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_2', 'Category1', 'SubCategory1', 100, 100, 100, 100, 100, 100, 100,100],
      [2, '15/03/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_3', 'Category1', 'SubCategory1', 100, 100, 100, 100, 100, 100, 100,100],
      [3, '15/04/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_4', 'Category1', 'SubCategory1', 100, 100, 100, 100, 100, 100, 100,100],
      [4, '15/05/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_5', 'Category2', 'SubCategory1', 100, 100, 100, 100, 100, 100, 100,100],
      [5, '15/06/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_6', 'Category2', 'SubCategory2', 100, 100, 100, 100, 100, 100, 100,100],
      [6, '15/07/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_7', 'Category2', 'SubCategory2',100, 100, 100, 100, 100, 100, 100,100],
      [7, '15/08/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_8', 'Category3', 'SubCategory2', 100, 100, 100, 100, 100, 100, 100,100],
      [8, '15/09/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_9', 'Category3', 'SubCategory2', 100, 100, 100, 100, 100, 100, 100,100],
      [9, '15/10/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_10', 'Category3', 'SubCategory3', 100, 100, 100, 100, 100, 100, 100,100]
    ]

    this.createTable();
    this.databoxSecondTable.paginator = this.paginator;
    this.suggestResultFormGroup();

    setTimeout(() => document.getElementById('head').click(), 500);
  }

  ngOnDestroy() {
    if (this.getItemSub) { this.getItemSub.unsubscribe(); }
    if (this.getTableReq) { this.getTableReq.unsubscribe(); }
    if (this.addRowReq) { this.addRowReq.unsubscribe(); }
    if (this.resetRowReq) { this.resetRowReq.unsubscribe(); }
    if (this.req) {this.req.unsubscribe(); }
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

  // get databox table search item
  getDataboxItemSearch() {
    const page = this.activatedRoute.snapshot.paramMap.get('page');

    this.getTableReq = this.databoxItemSearchService.getItems().subscribe(data => {
      this.databoxItemTable = data;
      this.paginatedData = this.paginateDatabox(this.databoxItemTable, page ? parseInt(page) : 1);
    });
  }

  // Get databox items created by users with parameter id
  getSingleItem() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.databoxesService
      .getSingleItem(this.id)
      .subscribe(
        (data) => {
          if (data && data.status === 'Active' || data.status === 'Paused') {
            this.mentions = data.mentions;
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
  getDataboxCategory(id){
    this.databoxCategoryReq = this.databoxCategoryService
    .getItem(id)
    .subscribe(result => {
      if(result[0]){
        this.databoxCategories = result[0].categories;
        this.dataSource = result[0].categories || categoryData;
      }
    });
  }

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

    this.databoxItemSearchService.addRow().subscribe(data => {
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

    this.databoxItemSearchService.deleteRow(row).subscribe(data => {
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

    this.router.navigateByUrl('', { skipLocationChange: true })
    .then(() => this.router.navigate([route]));
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
  openAlgorithmDialog(title: string, checked: boolean, connector) {
    this.databoxAlgorithmDialogService.confirm({ 
      title: title, 
      checked: checked, 
      connector: connector 
    }).subscribe((result) => { });
  }

  openAddSuggestion(){
    this.databoxAddSuggestionService.confirm({ title: `Suggest Result From a Specific ${this.data.page_search_name}`, data: {}, field: this.data.page_search_name}).subscribe((result) => { });
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

  // create databox item result handsontable
  createTable(): any {
    /**/
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
        { data: 'parent', title: 'Parent' },
        { data: 'author', title: 'Author' },
        { data: 'category', title: 'Category' },
        { data: 'subcategory', title: 'SubCategory' },
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

// category table interface
export interface Categories {
  name: string;
  type: string;
  expression: string;
}

// Databox item second table interface
export interface DataTableItem {
  id: number;
  date: string;
  content: string;
  parent: string;
  author: string;
}

// category table data
const categoryData: Categories[] = [
  { name: 'Movistar', type: 'Category', expression: `movistar OR "movi"` },
  { name: 'Kolbi', type: 'Category', expression: `kolbi OR "kolbi"` },
  { name: 'Claro', type: 'Category', expression: `claro` },
  { name: 'Internet', type: 'Sub Category', expression: `internet` },
];

// Databox item second table data
const DataboxResultItem: DataTableItem[] = [
  {
    id: 1, date: '15-07-2018', content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    parent: 'Null', author: 'Sabores a lo Tico'
  },
  {
    id: 2, date: '15-07-2018', content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    parent: 'Null', author: 'Sabores a lo Tico'
  },
  {
    id: 3, date: '15-07-2018', content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    parent: 'Null', author: 'Sabores a lo Tico'
  },
  {
    id: 4, date: '15-07-2018', content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    parent: 'Null', author: 'Sabores a lo Tico'
  },
  {
    id: 5, date: '15-07-2018', content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    parent: 'Null', author: 'Sabores a lo Tico'
  },
  {
    id: 6, date: '15-07-2018', content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    parent: 'Null', author: 'Sabores a lo Tico'
  },
  {
    id: 7, date: '15-07-2018', content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    parent: 'Null', author: 'Sabores a lo Tico'
  },
  {
    id: 8, date: '15-07-2018', content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    parent: 'Null', author: 'Sabores a lo Tico'
  },
  {
    id: 9, date: '15-07-2018', content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    parent: 'Null', author: 'Sabores a lo Tico'
  },
  {
    id: 10, date: '15-07-2018', content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    parent: 'Null', author: 'Sabores a lo Tico'
  },
  {
    id: 11, date: '15-07-2018', content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    parent: 'Null', author: 'Sabores a lo Tico'
  },
  {
    id: 12, date: '15-07-2018', content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    parent: 'Null', author: 'Sabores a lo Tico'
  },
  {
    id: 13, date: '15-07-2018', content: 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
    parent: 'Null', author: 'Sabores a lo Tico'
  },
];