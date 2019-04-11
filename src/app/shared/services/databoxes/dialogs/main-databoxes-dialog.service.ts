import { Observable, of } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { MainDataboxDialogComponent } from './main-databoxes-dialog.component';

interface ConfirmData {
  title?: string;
  data?: string;
  input?: boolean;
  update?: boolean;
  details?: any;
}

@Injectable({
  providedIn: 'root'
})
export class MainDataboxesDialogService {
  constructor(private dialog: MatDialog) {
  }

  public confirm(data: ConfirmData = {}): Observable<boolean> {
    data.title = data.title || 'Confirm';
    data.data  = data.data || 'Are you sure?';
    data.input = data.input;
    data.update = data.update || false;
    data.details = data.details || {};

    let dialogRef: MatDialogRef<MainDataboxDialogComponent>;
    dialogRef = this.dialog.open(MainDataboxDialogComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: data.title,
        data: data.data,
        input: data.input,
        update: data.update,
        details: data.details
      }
    });

    return dialogRef.afterClosed();
  }
}
