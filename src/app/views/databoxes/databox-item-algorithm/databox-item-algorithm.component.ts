import { Component, OnInit, ViewChild, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { DataboxesService } from '../../../shared/services/databoxes/databoxes-services';
import { DataboxTypeService } from '../../../shared/services/databoxes/databox-type-services';
import { DataboxAlgorithmDialogService } from '../../../shared/services/databoxes/dialogs-algorithm/dialogs-algorithm.services';
import { MainDataboxesDialogService } from '../../../shared/services/databoxes/dialogs/main-databoxes-dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-databox-item-algorithm',
  animations: [egretAnimations],
  templateUrl: './databox-item-algorithm.component.html',
  styleUrls: ['./databox-item-algorithm.component.scss']
})
export class DataboxItemAlgorithmComponent implements OnInit, OnDestroy {
  private getItemSub: Subscription;
  private req: Subscription;

  public data: any;
  public databoxItemData: any;
  public checked: boolean = true;
  public selectedOption;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private databoxesService: DataboxesService,
    private databoxAlgorithmDialogService: DataboxAlgorithmDialogService,
    private mainDataboxesDialogService: MainDataboxesDialogService) {
    this.databoxesService.apiData$.subscribe(result => this.databoxItemData = result);
  }

  ngOnInit() {
    this.getSingleItem();
    // watch for route change
    this.req = this.router.events.subscribe((event) => {
      this.getSingleItem();
    });

  }
  ngOnDestroy() {
    if (this.getItemSub) this.getItemSub.unsubscribe();
    if (this.req) this.req.unsubscribe();
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
  openAlgorithmDialog(title: string) {
    this.databoxAlgorithmDialogService.confirm({ title: title })
      .subscribe((result) => { });
  }
}
