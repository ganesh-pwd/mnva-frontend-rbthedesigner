import { Observable, of } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { DataboxDialogsConnectivityComponent } from './dialogs-connectivity.component';

interface confirmData {
  title?: string;
  datasource?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataboxConnectivityDialogService {
  constructor(private dialog: MatDialog) {
  }

  public confirm(data:confirmData = {}): Observable<boolean> {
    data.title = data.title || 'Email Notification';
    data.datasource = data.datasource;

    let dialogRef: MatDialogRef<DataboxDialogsConnectivityComponent>;
    dialogRef = this.dialog.open(DataboxDialogsConnectivityComponent, {
      width: '800px',
      disableClose: true,
      data: {
        title: data.title,
        datasource: data.datasource
      }
    });

    return dialogRef.afterClosed();
  }
}