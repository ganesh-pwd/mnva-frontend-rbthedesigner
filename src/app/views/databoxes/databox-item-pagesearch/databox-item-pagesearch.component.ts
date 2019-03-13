import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit  } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { DataboxesService } from '../../../shared/services/databoxes/databoxes-services';
import { DataboxTypeService } from '../../../shared/services/databoxes/databox-type-services';
import { MainDataboxesDialogService } from '../../../shared/services/databoxes/dialogs/main-databoxes-dialog.service';
import { PageSearchTableDataSource } from './databox-pagesearch-datasource';

@Component({
  selector: 'app-databox-item-pagesearch',
  animations: [egretAnimations],
  templateUrl: './databox-item-pagesearch.component.html',
  styleUrls: ['./databox-item-pagesearch.component.scss']
})
export class DataboxItemPagesearchComponent implements OnInit {
  private getItemSub: Subscription;
  private req: Subscription;

  public data: any;
  public folder: string;
  public selectedOption;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: PageSearchTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['page_name', 'content'];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private databoxesService: DataboxesService,
    private mainDataboxesDialogService: MainDataboxesDialogService) {
  }

  ngOnInit() {
    this.getSingleItem();
    // watch for route change
    this.req = this.router.events.subscribe((event) => {
      this.getSingleItem();
    });

    // set table
    this.dataSource = new PageSearchTableDataSource(this.paginator, this.sort);
  }
  ngOnDestroy() {
    if (this.getItemSub) this.getItemSub.unsubscribe();
    if (this.req) this.req.unsubscribe();
  }

  // Get databox items created by users with parameter id
  getSingleItem() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const folder = this.activatedRoute.snapshot.paramMap.get('folder');
    const folderParam = (folder).replace(/\-/g, ' ');
    this.folder = folderParam;

    this.getItemSub = this.databoxesService.getSingleItem(id).subscribe(data => {
      if (data) {
        this.data = data;
      }
    });
  }

  // navigate to databox details
  navigateToDataboxPageSearch(folder: string, id: string) {
    const route = `databoxes/${folder.replace(/\s/, '-')}/${id}`;
    this.router.navigate([route]);
  }

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

}
