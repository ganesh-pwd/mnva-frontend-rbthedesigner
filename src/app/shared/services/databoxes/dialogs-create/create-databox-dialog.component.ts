import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import {
  Component,
  Inject,
  OnInit,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
import { DataboxTypeService } from '../databox-type-services';
import { DataboxesService } from '../databoxes-services';
import { egretAnimations } from '../../../animations/egret-animations';

@Component({
  selector: 'databoxes-dialog',
  animations: [egretAnimations],
  templateUrl: './create-databox-dialog.html',
  styleUrls: ['./create-databox-dialog.scss']
})
export class CreateDataboxDialogComponent implements OnInit, OnDestroy, AfterViewInit {
  private dialogScroll: PerfectScrollbar;
  private req: Subscription;
  private getSelectedSub: Subscription;

  public databoxItem: any[];
  public selectedDatabox: any;
  public selectedItem: any;

  customKeyword     : number = 0;
  customCategory    : number = 0;
  customSubCategory : number = 0;
  customDay         : number = 0;
  customDatabox     : number = 0;

  constructor(
    public dialogRef: MatDialogRef<CreateDataboxDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private databoxesService: DataboxesService,
    private databoxTypeService: DataboxTypeService
  ) {
    this.customDatabox = this.customKeyword + this.customCategory + this.customSubCategory + this.customDay;
  }

  ngOnInit() {
    this.getDataboxTypes();
  }

  ngOnDestroy() {
    if (this.req) {
      this.req.unsubscribe();
    }

    if (this.dialogScroll) {
      this.dialogScroll.destroy();
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  computeTotal(){
      this.customDatabox = this.customKeyword + this.customCategory + this.customSubCategory + this.customDay;
    }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dialogScroll = new PerfectScrollbar('#dialog-scroll', {
        suppressScrollX: true
      });
    });
  }

  // show databox type details on hover
  showDataboxTypeDetail(id) {
    this.getSelectedSub = this.databoxTypeService
      .getItemByID(id)
      .subscribe(data => {
        this.selectedDatabox = data;
      });
  }

  // create new databox
  createDatabox() {
    this.req = this.databoxesService
      .addItem(this.selectedItem.databox_type)
      .subscribe(x => {
        this.dialog.closeAll();
      });
  }

  // select databox type
  selectDatabox(item) {
    this.selectedItem = item;
  }

  // close selected databox
  closeSelectedDataboxType() {
    this.selectedDatabox = undefined;
    this.getSelectedSub.unsubscribe();
  }

  // get databox types
  getDataboxTypes() {
    this.req = this.databoxTypeService.getItems().subscribe(databoxItem => {
      this.databoxItem = databoxItem;
    });
  }
}
