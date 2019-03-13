import { Observable, of } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { MinervaAccountDialogComponent } from './minerva-account-dialog.component';

interface confirmData {
  title?: string
}

@Injectable({
  providedIn: 'root'
})
export class MinervaAccountDialogService {
  constructor(private dialog: MatDialog) {
  }

  public confirm(data:confirmData = {}): Observable<boolean> {
    data.title = data.title || 'Delete Account';

    let dialogRef: MatDialogRef<MinervaAccountDialogComponent>;
    dialogRef = this.dialog.open(MinervaAccountDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: data.title
      }
    });

    return dialogRef.afterClosed();
  }
}