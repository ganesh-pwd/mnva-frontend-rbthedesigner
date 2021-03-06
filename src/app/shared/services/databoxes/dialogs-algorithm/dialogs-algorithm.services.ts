import { Observable, of } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { DataboxDialogsAlgorithmComponent } from './dialogs-algorithm.component';

interface confirmData {
  title?: string;
  checked?: boolean;
  connector?: string;
  algo_switch?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataboxAlgorithmDialogService {
  constructor(private dialog: MatDialog) {
  }

  public confirm(data: confirmData = {}): Observable<boolean> {
    data.title = data.title || 'Apply Enrichment';
    data.checked = data.checked || false;
    data.connector = data.connector;
    data.algo_switch = data.algo_switch || false;

    let dialogRef: MatDialogRef<DataboxDialogsAlgorithmComponent>;
    dialogRef = this.dialog.open(DataboxDialogsAlgorithmComponent, {
      width: '600px',
      disableClose: true,
      data: {
        title: data.title,
        checked: data.checked,
        connector: data.connector,
        algo_switch: data.algo_switch
      }
    });

    return dialogRef.afterClosed();
  }
}
