import { Observable, of } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { DataboxDialogsMentionsComponent } from './dialogs-mentions.component';

interface ConfirmData {
  title?: string;
  data?: any;
  update?: boolean;
  mentions?: any;
}

@Injectable({
  providedIn: 'root'
})
export class DataboxMentionsDialogService {
  constructor(private dialog: MatDialog) {
  }

  public confirm(data: ConfirmData = {}): Observable<boolean> {
    data.title = data.title || 'Apply Mentions';
    data.update = data.update || false;
    data.data = data.data || {};
    data.mentions = data.mentions;

    let dialogRef: MatDialogRef<DataboxDialogsMentionsComponent>;
    dialogRef = this.dialog.open(DataboxDialogsMentionsComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title : data.title,
        data  : data.data,
        update: data.update,
        mentions: data.mentions
      }
    });

    return dialogRef.afterClosed();
  }
}
