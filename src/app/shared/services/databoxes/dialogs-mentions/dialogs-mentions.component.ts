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

import { DataboxesService } from '../databoxes-services';
import { UserService } from '../../auth/user-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialogs-mentions',
  templateUrl: './dialogs-mentions.component.html',
  styleUrls: ['./dialogs-mentions.component.scss']
})
export class DataboxDialogsMentionsComponent implements OnInit, OnDestroy {

  private reqSubs: Subscription;
  private updateMentionsReq: Subscription;
  private deleteSubs: Subscription;

  public databoxMention: number = 1200;
  public loggedInUser;

  constructor(
    public dialogRef: MatDialogRef<DataboxDialogsMentionsComponent>,
    private databoxesService: DataboxesService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.reqSubs) this.reqSubs.unsubscribe();
    if (this.deleteSubs) this.deleteSubs.unsubscribe();
  }

  // create new databox
  createNewDatabox() {
    this.updateMentionCount(this.databoxMention).then(res => {
      console.log(res);

      this.reqSubs = this.databoxesService
        .addItem(this.data.data)
        .subscribe(x => {
          this.dialogRef.close(false);
          this.router.navigate(['/databoxes']).then(() => window.location.reload());
        });
    });
  }

  // compute remaining mentions
  updateMentionCount(mention){
    return new Promise(resolve => {
      this.updateMentionsReq = this.userService.computeRemainingMention(mention)
      .subscribe((result) => resolve(result));
    })
  }

  // create and update databox if status is Draft
  updateCreateDatabox() {
    this.updateMentionCount(this.databoxMention).then(res => {
      console.log(res);

      this.reqSubs = this.databoxesService
      .updateDatabox(this.data.data, 'Active')
      .subscribe((result) => {
        
        this.dialogRef.close(false);
      });
    });
  }

  // go to mentions page and add more credits
  goToMentions(){
    this.dialogRef.close(false);
    this.router.navigate(['/products/mentions-credit']);
  }
}
