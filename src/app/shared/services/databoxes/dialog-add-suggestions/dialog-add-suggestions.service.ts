import { Observable, of } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { DataboxDialogAddSuggestionComponent } from './dialog-add-suggestions.component';


interface ConfirmData {
  title?: string;
  data?: any;
  field?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataboxAddSuggestionService {
  constructor(private dialog: MatDialog) {
  }

  public confirm(data: ConfirmData = {}): Observable<boolean> {
    data.title = data.title || 'Apply Mentions';
    data.data = data.data || {};
    data.field = data.field;

    let dialogRef: MatDialogRef<DataboxDialogAddSuggestionComponent>;
    dialogRef = this.dialog.open(DataboxDialogAddSuggestionComponent, {
      width: '500px',
      disableClose: true,
      data: {
        title : data.title,
        data  : data.data,
        field : data.field,
      }
    });

    return dialogRef.afterClosed();
  }
}
