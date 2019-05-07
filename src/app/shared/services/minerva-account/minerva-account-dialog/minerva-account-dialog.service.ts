import { Observable, of } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { MinervaAccountDialogComponent } from './minerva-account-dialog.component';

interface confirmData {
  title?: string,
  details?: any,
  delete?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class MinervaAccountDialogService {
  constructor(private dialog: MatDialog) {
  }

  public confirm(data:confirmData = {}): Observable<boolean> {
    data.title = data.title || 'Delete Account';
    data.details = data.details || {};
    data.delete = data.delete || false;

    let dialogRef: MatDialogRef<MinervaAccountDialogComponent>;
    dialogRef = this.dialog.open(MinervaAccountDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: data.title,
        details: data.details,
        delete: data.delete
      }
    });

    return dialogRef.afterClosed();
  }
}