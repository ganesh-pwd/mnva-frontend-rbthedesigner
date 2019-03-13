import { MatDialogRef, MatDialog, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, Inject, OnDestroy, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MinervaAccountImageDialogService } from './minerva-account-image-dialog.service';
import { MinervaAccountChangeService } from './minerva-account-change-image.service';

@Component({
  selector: 'app-minerva-account-image-dialog',
  templateUrl: './minerva-account-image-dialog.component.html',
  styleUrls: ['./minerva-account-image-dialog.component.scss']
})
export class MinervaAccountImageDialogComponent implements OnInit, OnDestroy {
  private reqSubs: Subscription;
  private deleteSubs: Subscription;
  private reqImage: Subscription;

  constructor(public dialogRef: MatDialogRef<MinervaAccountImageDialogComponent>,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public el: ElementRef,
    private minervaAccountChangeService: MinervaAccountChangeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(){}

  ngOnDestroy() {
    if(this.reqSubs) this.reqSubs.unsubscribe();
    if(this.deleteSubs) this.deleteSubs.unsubscribe();
  }

  replaceImage() {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    const fileCount: number = inputEl.files.length;

    const formData = new FormData();

    if (fileCount > 0) { // a file was selected
      formData.append('photo', inputEl.files.item(0));
      this.minervaAccountChangeService.setImage(`assets/images/${inputEl.files.item(0).name}`);

    }
    this.dialog.closeAll();
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
