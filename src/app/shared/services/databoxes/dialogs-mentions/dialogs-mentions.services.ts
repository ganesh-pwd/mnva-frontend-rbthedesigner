import { Observable, of } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { DataboxDialogsMentionsComponent } from './dialogs-mentions.component';

interface confirmData {
  title?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataboxMentionsDialogService {
  constructor(private dialog: MatDialog) {
  }

  public confirm(data: confirmData = {}): Observable<boolean> {
    data.title = data.title || 'Apply Mentions';

    let dialogRef: MatDialogRef<DataboxDialogsMentionsComponent>;
    dialogRef = this.dialog.open(DataboxDialogsMentionsComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title: data.title
      }
    });

    return dialogRef.afterClosed();
  }
}
