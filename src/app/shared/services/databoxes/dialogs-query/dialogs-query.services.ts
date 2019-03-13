import { Observable, of } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { DataboxDialogsQueryComponent } from './dialogs-query.component';

interface confirmData {
  title?: string
}

@Injectable({
  providedIn: 'root'
})
export class DataboxQueryDialogService {
  constructor(private dialog: MatDialog) {
  }

  public confirm(data:confirmData = {}): Observable<boolean> {
    data.title = data.title || 'Create Category';

    let dialogRef: MatDialogRef<DataboxDialogsQueryComponent>;
    dialogRef = this.dialog.open(DataboxDialogsQueryComponent, {
      width: '800px',
      disableClose: true,
      data: {
        title: data.title
      }
    });

    return dialogRef.afterClosed();
  }
}