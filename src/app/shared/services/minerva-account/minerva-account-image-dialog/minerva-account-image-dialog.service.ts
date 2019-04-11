import { Observable, of, BehaviorSubject } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { MinervaAccountImageDialogComponent } from './minerva-account-image-dialog.component';

interface confirmData {
  title?: string
}

@Injectable({
  providedIn: 'root'
})
export class MinervaAccountImageDialogService {
  constructor(private dialog: MatDialog) {}

  public confirm(data:confirmData = {}): Observable<boolean> {
    data.title = data.title || 'Delete Account';

    let dialogRef: MatDialogRef<MinervaAccountImageDialogComponent>;
    dialogRef = this.dialog.open(MinervaAccountImageDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: data.title
      }
    });

    return dialogRef.afterClosed();
  }
}