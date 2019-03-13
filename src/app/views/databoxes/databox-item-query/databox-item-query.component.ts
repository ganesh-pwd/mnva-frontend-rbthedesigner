import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { DataboxesService } from '../../../shared/services/databoxes/databoxes-services';
import { DataboxQueryDialogService } from '../../../shared/services/databoxes/dialogs-query/dialogs-query.services';
import { MainDataboxesDialogService } from '../../../shared/services/databoxes/dialogs/main-databoxes-dialog.service';
import { Subscription } from 'rxjs';
import { DatasourceService } from '../../../shared/services/datasource/datasource.service';

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
  selector: 'app-databox-item-query',
  animations: [egretAnimations],
  templateUrl: './databox-item-query.component.html',
  styleUrls: ['./databox-item-query.component.scss']
})
export class DataboxItemQueryComponent implements OnInit, OnDestroy {
  private getItemSub: Subscription;
  private req: Subscription;
  public data: any;
  public databoxItemData: any;
  public checked: boolean = true;
  public selectedOption;
  public isTwitterDatasourceSelected: boolean = false;

  // tslint:disable-next-line:max-line-length
  editorData = `( "Hino" OR Toyota OR Lexus OR Mercedes Benz OR "KIA" OR "Fiat" OR Suzuki OR [Mase(r|rr)ati] OR "BMW" OR hyundai OR mitsubishi ) AND NOT ( contiguo OR conjunto a OR "frente a" OR "norte" OR "oeste" OR "sur" OR metros )`;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['name', 'type', 'expression', 'action'];
  dataSource = categoryData;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private databoxesService: DataboxesService,
    private databoxQueryDialogService: DataboxQueryDialogService,
    private mainDataboxesDialogService: MainDataboxesDialogService,
    private datasourceService: DatasourceService
  ) {
    this.databoxesService.apiData$.subscribe(result => this.databoxItemData = result);
  }

  ngOnInit() {
    this.getSingleItem();
    // watch for route change
    this.req = this.router.events.subscribe((event) => {
      this.getSingleItem();
    });
    if (this.datasourceService.getSelectedDatasource() === 'Twitter') {
      this.isTwitterDatasourceSelected = true;
    };
  }

  ngOnDestroy() {
    if (this.getItemSub) {
      this.getItemSub.unsubscribe();
    }
    if (this.req) {
      this.req.unsubscribe();
    }
  }

  // Get databox items created by users with parameter id
  getSingleItem() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.getItemSub = this.databoxesService.getSingleItem(id).subscribe(data => {
      if (data) {
        this.data = data;
      }
    });
  }

	// navigate to databox details
  navigateToDatabox(folder: string, id: string, first: boolean) {
    const route = !first ? `databoxes/${folder.replace(/\s/, '-')}/${id}`
      : `databoxes/${folder.replace(/\s/, '-')}/${id}/initialize`;
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

  	// open databox query dialog
  openQueryDialog(title: string) {
    this.databoxQueryDialogService.confirm({ title: title })
      .subscribe((result) => { });
  }
}
