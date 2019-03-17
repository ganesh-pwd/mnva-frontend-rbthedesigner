import { Component, OnInit, ViewChild, OnDestroy, AfterContentChecked, } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { DataboxesService } from '../../../shared/services/databoxes/databoxes-services';
import { databoxCategoryEditorDialogService } from '../../../shared/services/databoxes/dialogs-query/dialogs-query.services';
import { DataboxTypeService } from '../../../shared/services/databoxes/databox-type-services';
import { DataboxItemSearchService } from '../../../shared/services/databoxes/databox-item-search-services';
import { MainDataboxesDialogService } from '../../../shared/services/databoxes/dialogs/main-databoxes-dialog.service';
import { DataTableDataSource } from './databox-table-datasource';
import * as Handsontable from 'handsontable-pro';
import { HotTableRegisterer } from '@handsontable-pro/angular';
import { DatasourceService } from '../../../shared/services/datasource/datasource.service';
import { DataboxAlgorithmDialogService } from '../../../shared/services/databoxes/dialogs-algorithm/dialogs-algorithm.services';

export interface Categories {
  name: string;
  type: string;
  expression: string;
}

const categoryData: Categories[] = [
  { name: 'Movistar', type: 'Category', expression: `movistar OR "movi"` },
  { name: 'Kolbi', type: 'Category', expression: `kolbi OR "kolbi"` },
  { name: 'Claro', type: 'Category', expression: `claro` },
  { name: 'Internet', type: 'Sub Category', expression: `internet` },
];

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
  private deleteRowReq: Subscription;
  private req: Subscription;

  public data: any;
  public databoxItemData: any;
  public checked: boolean = true;  
  public arrayData: any;
  public paginatedData: any;
  public folder: string;
  public selectedOption;
  public BasicQueryEditor: boolean = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['name', 'type', 'expression', 'action'];
  dataSource = categoryData;

  @ViewChild('hot') hot;
  @ViewChild('exportFile') exportFile;

  databoxItemTable: any;
  hotId: string = 'databoxItemTable';
  selectedHero: any;
  tableSettings: {};
  changeList: any[];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private hotRegisterer: HotTableRegisterer,
    private databoxesService: DataboxesService,
    private databoxAlgorithmDialogService: DataboxAlgorithmDialogService,    
    private databoxCategoryEditorDialogService: databoxCategoryEditorDialogService,    
    private databoxItemSearchService: DataboxItemSearchService,
    private mainDataboxesDialogService: MainDataboxesDialogService,
    private datasourceService: DatasourceService
    ) {
    this.databoxesService.apiData$.subscribe(result => this.databoxItemData = result);    
  }

  ngOnInit() {
    this.getSingleItem();
    // watch for route change
    this.req = this.router.events.subscribe((event) => {
      if (this.getItemSub) this.getItemSub.unsubscribe();
      this.getSingleItem();
    });
    if (this.datasourceService.getSelectedDatasource() === 'Twitter') {
      this.BasicQueryEditor = true;
    };

    // load databox item table data
    this.getDataboxItemSearch();

    let newData = this.paginatedData['items'].map(el => {
      let arr = [];
      for (let item in el) {
        arr.push(el[item]);
      }

      return arr;
    });

    this.arrayData = [
      [0, '15/01/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_1', 100],
      [1, '15/02/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_2', 100],
      [2, '15/03/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_3', 100],
      [3, '15/04/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_4', 100],
      [4, '15/05/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_5', 100],
      [5, '15/06/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_6', 100],
      [6, '15/07/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_7', 100],
      [7, '15/08/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_8', 100],
      [8, '15/09/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_9', 100],
      [9, '15/10/2018', 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees', 'NULL', 'Sabores a lo Tico_10', 100]
    ]

    this.createTable();
  }

  ngOnDestroy() {
    if (this.getItemSub) this.getItemSub.unsubscribe();
    if (this.getTableReq) this.getTableReq.unsubscribe();
    if (this.addRowReq) this.addRowReq.unsubscribe();
    if (this.resetRowReq) this.resetRowReq.unsubscribe();
    if (this.req) this.req.unsubscribe();
  }

  // create databox search table
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
      stretchH: 'all',
      dropdownMenu: ['make_read_only', 'alignment', '---------', 'filter_by_condition', 'filter_by_value', '---------', 'filter_action_bar'],
      licenseKey: '0ec2b-f4364-2b674-c443e-0b024',
      hiddenColumns: {
        indicators: true
      },
      columns: [
        { data: 'date', title: '  Date', type: 'date', width: '100px' },
        { data: 'content', title: '  Content', width: '300px' },
        { data: 'paren', title: '  Paren  ' },
        { data: 'author', title: '  Author  ' },
        { data: 'like', title: '  Like  ', className: "htCenter" },
        { data: 'report_sent', type: 'checkbox', checkedTemplate: 'yes', className: "htCenter", uncheckedTemplate: 'no', title: '  Report Sent' },
        { data: 'alert_sent', type: 'checkbox', checkedTemplate: 'yes', className: "htCenter", uncheckedTemplate: 'no', title: '  Alert Sent' },
        {
          data: 'action',
          readOnly: true,
          title: '  Action',
          className: "htCenter",
          renderer(hotInstance, td, row, column, prop, value, cellProperties) {
            td.innerHTML = `<button class="fa fa-trash"></button>`;
            td.style.textAlign = "center";
            return td;
          }
        },
      ],
      afterChange: (changes, source) => {
        if (source) {
          const hotInstance = this.hotRegisterer.getInstance(this.hotId);

          let item = {
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
          let data = hotInstance.getDataAtRow(td.row);

          for (let i = 0; i < data.length; i++) {
            hotInstance.setCellMeta(td.row, i, 'readOnly', JSON.parse("false"));
          }
        }

        // Delete Row
        if (coords.realTarget.className === 'fa fa-trash') {
          let data = hotInstance.getDataAtRowProp(td.row, 'id');
          this.deleteRow(data);
        }
      },
    };
  }

  downloadCSV() {
    const hotInstance = this.hotRegisterer.getInstance(this.hotId);

    hotInstance.getPlugin('exportFile').downloadFile('csv', {
      bom: false,
      columnDelimiter: ',',
      columnHeaders: false,
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
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const folder = this.activatedRoute.snapshot.paramMap.get('folder');
    const folderParam = (folder).replace(/\-/g, ' ');
    this.folder = folderParam;

    this.getItemSub = this.databoxesService.getSingleItem(id).subscribe(data => {
      if (data) this.data = data;
    });
  }

  // paginate databox search table
  paginateDatabox(items, page?, per_page?) {
    var page = page || 1,
      per_page = per_page || 10,
      offset = (page - 1) * per_page,

      paginatedItems = items.slice(offset).slice(0, per_page),
      total_pages = Math.ceil(items.length / per_page);

    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: (total_pages > page) ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      items: paginatedItems
    };
  }

  // add new row to databox search table
  addRow() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const route = `/databoxes/${this.folder.replace(/\s/, '-')}/${id}/${this.paginatedData.total_pages}`;

    this.addRowReq = this.databoxItemSearchService.addRow().subscribe(data => {
      this.router.navigateByUrl('/databoxes', { skipLocationChange: true }).then(() =>
        this.router.navigate([route]));
    });
  }

  // remove a row from databox search table
  deleteRow(row) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const route = `/databoxes/${this.folder.replace(/\s/, '-')}/${id}`;

    this.deleteRowReq = this.databoxItemSearchService.deleteRow(row).subscribe(data => {
      this.router.navigateByUrl('/databoxes', { skipLocationChange: true }).then(() =>
        this.router.navigate([route]));
    })
  }

  // save all data
  saveAllData() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const route = `/databoxes/${this.folder.replace(/\s/, '-')}/${id}`;

    this.router.navigateByUrl('/databoxes', { skipLocationChange: true }).then(() =>
      this.router.navigate([route]));
  }

  // reset databox search table default rows
  resetAllRow() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const route = `/databoxes/${this.folder.replace(/\s/, '-')}/${id}`;

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
  navigateToNextPage(folder: string, id: string) {
    let route;

    if (this.paginatedData.next_page === null) {
      route = `databoxes/${folder.replace(/\s/, '-')}/${id}/${this.paginatedData.total_pages}`;
    } else {
      route = `databoxes/${folder.replace(/\s/, '-')}/${id}/${this.paginatedData.next_page}`;
    }

    this.router.navigate([route]);
  }

  // navigate to prev page
  navigateToPrevPage(folder: string, id: string) {
    let route;

    if (this.paginatedData.pre_page === null || this.paginatedData.pre_page === 1) {
      route = `databoxes/${folder.replace(/\s/, '-')}/${id}`;
    } else {
      route = `databoxes/${folder.replace(/\s/, '-')}/${id}/${this.paginatedData.pre_page}`;
    }
    this.router.navigate([route]);
  }

  // open databox dialog
  openDialog(title: string, data: string, input: boolean, folder: string) {
    this.mainDataboxesDialogService.confirm({
      title: title,
      data: data,
      input: input,
      folder: folder
    }).subscribe((result) => {
      this.selectedOption = result;
    });
  }

  // open category editor dialog
  openQueryDialog(title: string) {
    this.databoxCategoryEditorDialogService.confirm({ title: title })
      .subscribe((result) => { });
  }

  // navigate to databox details
  navigateToDatabox(folder: string, id: string, first: boolean) {
    const route = !first ? `databoxes/${folder.replace(/\s/, '-')}/${id}`
      : `databoxes/${folder.replace(/\s/, '-')}/${id}/initialize`;
    this.router.navigate([route]);
  }

  // open databox query dialog
  openMentionsDialog(title: string) {
    this.databoxMentionsDialogService.confirm({ title: title })
      .subscribe((result) => { });
  }  
}
