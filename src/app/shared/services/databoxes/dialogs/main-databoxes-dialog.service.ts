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
  checked?: boolean;
  connector?: string;
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
    data.checked = data.checked;
    data.connector = data.connector;

    let dialogRef: MatDialogRef<MainDataboxDialogComponent>;
    dialogRef = this.dialog.open(MainDataboxDialogComponent, {
      width: data.title === 'How to connect to Power BI'
        || data.title === 'How to connect to Tableau'
        || data.title === 'How to connect to Data Studio' 
        || data.title === 'Connect to Email Notification'
        || data.title === 'Connect to Slack'
        || data.title === 'Connect to Apple TV'? '600px' : '500px',
      disableClose: true,
      data: {
        title: data.title,
        data: data.data,
        input: data.input,
        update: data.update,
        details: data.details,
        checked: data.checked,
        connector: data.connector
      }
    });

    return dialogRef.afterClosed();
  }
}
