import { Observable, of } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { DataboxDialogsAlgorithmComponent } from './dialogs-algorithm.component';

interface confirmData {
  title?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataboxAlgorithmDialogService {
  constructor(private dialog: MatDialog) {
  }

  public confirm(data: confirmData = {}): Observable<boolean> {
    data.title = data.title || 'Apply Enrichment';

    let dialogRef: MatDialogRef<DataboxDialogsAlgorithmComponent>;
    dialogRef = this.dialog.open(DataboxDialogsAlgorithmComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: data.title
      }
    });

    return dialogRef.afterClosed();
  }
}
