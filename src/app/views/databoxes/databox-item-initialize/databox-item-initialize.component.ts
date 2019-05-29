import { Component, OnInit, OnDestroy, ViewChild, ElementRef  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { egretAnimations } from '../../../shared/animations/egret-animations';
import { DataboxesService } from '../../../shared/services/databoxes/databox-item-main.services';
import { MainDataboxesDialogService } from '../../../shared/services/databoxes/dialogs/main-databoxes-dialog.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import * as hopscotch from 'hopscotch';

@Component({
  selector: 'app-databox-item-initialize',
  animations: [egretAnimations],
  templateUrl: './databox-item-initialize.component.html',
  styleUrls: ['./databox-item-initialize.component.scss']
})
export class DataboxItemInitializeComponent implements OnInit, OnDestroy {
  private getItemSub: Subscription;
  private req: Subscription;

  public data: any;
  public folder: string;
  public selectedOption;
  public databoxNew = sessionStorage.getItem('databox_new');

  @ViewChild('configurationID') configurationID: ElementRef;
  @ViewChild('queryID') queryID: ElementRef;
  @ViewChild('algorithmID') algorithmID: ElementRef;
  @ViewChild('databoxesButtonID') databoxesButtonID: ElementRef;
  @ViewChild('startDataboxesID') startDataboxesID: ElementRef;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private databoxesService: DataboxesService,
    private mainDataboxesDialogService: MainDataboxesDialogService,
    public snackBar: MatSnackBar) {
    if (this.databoxNew)
      this.snackBar.open('A new Databox has been created!',
        'close', { duration: 3000 });
  }

  ngOnInit() {
    this.getSingleItem();
  }
  ngOnDestroy() {
    if (this.getItemSub) this.getItemSub.unsubscribe();
    if (this.req) this.req.unsubscribe();
    sessionStorage.removeItem('databox_new');
    hopscotch.endTour(true);
  }

  // Get databox items created by users with parameter id
  getSingleItem() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const folder = this.activatedRoute.snapshot.paramMap.get('folder');
    const folderParam = (folder).replace(/\-/g, ' ');
    this.folder = folderParam;

    this.getItemSub = this.databoxesService.getSingleItem(id)
      .subscribe(data => {
        if (data) {
          this.data = data;
        }
      });
  }

  // navigate to databox details
  navigateToDatabox(folder: string, id: string) {
    const route = `databoxes/${folder.replace(/\s/, '-')}/${id}`;
    this.router.navigate([route]);
  }

  // Tour data
  doTour() {
    const tour = {
      id: "hello-hopscotch",
      showPrevButton: true,
      onEnd: () => {
        this.snackBar.open('Databox tour ended!', 'close', { duration: 3000 });
      },
      onClose: () => {
        this.snackBar.open('You just closed Databox Tour!', 'close', { duration: 3000 });
      },
      steps: [
        {
          title: "Step 1",
          content: "Lorem ipsum dolor sit amet, veri modus conceptam mel cu, has in dictas discere qualisque, saperet ullamcorper ad eum.",
          target: this.configurationID.nativeElement,
          placement: "bottom"
        },
        {
          title: "Step 2",
          content: "I am the step for element 2. Lorem ipsum dolor sit amet, veri modus conceptam mel cu, has in dictas discere qualisque, saperet ullamcorper ad eum.",
          target: this.queryID.nativeElement,
          placement: "bottom"
        },
        {
          title: "Step 3",
          content: "I am the step for element 3. Lorem ipsum dolor sit amet, veri modus conceptam mel cu, has in dictas discere qualisque, saperet ullamcorper ad eum.",
          target: this.algorithmID.nativeElement,
          placement: "left",
          yOffset: -20
        },
        {
          title: "Step 4",
          content: "I am the step for element 4. Lorem ipsum dolor sit amet, veri modus conceptam mel cu, has in dictas discere qualisque, saperet ullamcorper ad eum.",
          target: this.databoxesButtonID.nativeElement,
          placement: "bottom"
        },
        {
          title: "Step 5",
          content: "I am the step for element 5. Lorem ipsum dolor sit amet, veri modus conceptam mel cu, has in dictas discere qualisque, saperet ullamcorper ad eum.",
          target: this.startDataboxesID.nativeElement,
          placement: "top"
        },
      ]
    };
    hopscotch.endTour(true);
    hopscotch.startTour(tour);
  }

  openDialog(title: string, data: string, input: boolean) {
    this.mainDataboxesDialogService.confirm({
      title: title,
      data: data,
      input: input
    }).subscribe((result) => {
      this.selectedOption = result;
    });
  }

}
