import { Component, Input, OnInit } from '@angular/core';
import { MainDataboxesDialogService } from 'app/shared/services/databoxes/dialogs/main-databoxes-dialog.service';
import { DataboxesService } from 'app/shared/services/databoxes/databox-item-main.services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./side-toggle.component.scss']
})
export class SlideToggleComponent implements OnInit {
  @Input() public id: string;

  private req: Subscription;

  public data: any;
  public selectedOption = false;
  public databoxItemData: any;
  public status: string;

  constructor(
    private router: Router,
    private databoxesService: DataboxesService,
    private mainDataboxesDialogService: MainDataboxesDialogService,
  ) {
    this.data = [];
    this.databoxesService.apiData$.subscribe(result => this.databoxItemData = result);
  }

  ngOnInit() {
    this.getSingleItem();
    // watch for route change
    this.router.events.subscribe(() => {
      this.getSingleItem();
    });
  }

  ngOnDestroy(){
    if(this.req) this.req.unsubscribe();
  }

  // Get databox items created by users with parameter id
  getSingleItem() {

    this.databoxesService
      .getSingleItem(this.id)
      .subscribe(
        (data) => {
          if (data) {
            this.data = data;
            this.status = data.status;
          }
          if (data && data.status === 'Active') {
            this.selectedOption = true;
          }
        },
        (error) => {
          console.log('error', error);
        }
      );
  }

   // open databox dialog
   openDialog() {
    let title = '';
    let content = '';

    if (this.status === 'Active') {
      title = 'Pause Your Databox';
      content = 'Are you sure you want to pause your databox. Data will stop comming into your Databox, and mentions will stop being deducted from your plan.';
    } else {
      title = 'Activate Your Databox';
      content = 'Are you sure you want to activate your databox?';
    }

    this.mainDataboxesDialogService.confirm({
      title: title,
      data: content,
      input: false
    }).subscribe(result => {

      if (!result) {
        this.selectedOption = !this.selectedOption;
      }

      if ( this.status === 'Active' && result ) {
        this.selectedOption = false;
        this.req = this.databoxesService.updateItemStatus(this.id, 'Paused')
        .subscribe(_result => _result);
      }

      if ( this.status === 'Paused' && result ) {
        this.selectedOption = true;
        this.req = this.databoxesService.updateItemStatus(this.id, 'Active')
        .subscribe(_result => _result);
      }

    });
  }
}
