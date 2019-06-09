import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
  MatSnackBar
} from '@angular/material';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  Router
} from '@angular/router'

import { DataboxesService } from '../databox-item-main.services';
import { UserService } from '../../auth/user-services';
import { Subscription } from 'rxjs';
import { AppLoaderService } from '../../../services/app-loader/app-loader.service';
import { UserPlanDetailsService } from '../../auth/user-plan-details.service';

@Component({
  selector: 'app-dialogs-mentions',
  templateUrl: './dialogs-mentions.component.html',
  styleUrls: ['./dialogs-mentions.component.scss']
})
export class DataboxDialogsMentionsComponent implements OnInit, OnDestroy {

  private reqSubs: Subscription;
  private updateMentionsReq: Subscription;
  private deleteSubs: Subscription;

  public databoxMention: number;
  public loggedInUser;
  public userPlanDetails;

  constructor(
    public dialogRef: MatDialogRef<DataboxDialogsMentionsComponent>,
    private databoxesService: DataboxesService,
    private userService: UserService,
    private userPlanDetailsService: UserPlanDetailsService,
    private router: Router,
    private loader: AppLoaderService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    userService.userData$.subscribe((user) => this.loggedInUser = user);
    userPlanDetailsService.userPlanData$.subscribe((user) => this.userPlanDetails = user);
    this.databoxMention = this.data.mentions;
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.reqSubs) this.reqSubs.unsubscribe();
    if (this.deleteSubs) this.deleteSubs.unsubscribe();
  }

  // create new databox
  createNewDatabox() {
    this.dialogRef.close(false);
    this.loader.open();
    setTimeout(() => {
      this.updateMentionCount(this.databoxMention).then(res => {
        this.reqSubs = this.databoxesService
          .addItem(this.data.data)
          .subscribe(x => {
            this.router.navigate(['/databoxes'])
            .then(() => sessionStorage.removeItem('databox_new'))
            this.loader.close();
          });
      });
    }, 500);
  }

  // compute remaining mentions
  updateMentionCount(mention){
    return new Promise(resolve => {
      this.updateMentionsReq = this.userPlanDetailsService.computeRemainingMention(mention, this.loggedInUser._id)
      .subscribe((result) => resolve(result));
    })
  }

  // create and update databox if status is Draft
  updateCreateDatabox() {
    this.dialogRef.close(false);
    this.loader.open();
    setTimeout(() => {
      this.updateMentionCount(this.data.mentions).then(res => {
        this.reqSubs = this.databoxesService
        .updateDatabox(this.data.data, 'Active')
        .subscribe((result) => {
          this.loader.close();
        });
      });
    }, 500)
  }

  updateDatabox() {
    this.reqSubs = this.databoxesService
    .updateDatabox(this.data.details, 'Draft')
    .subscribe((result) => this.dialogRef.close(false));
  }

  // go to mentions page and add more credits
  goToMentions(){
    this.dialogRef.close(false);
    this.router.navigate(['/products/mentions-credit']);
  }
}
