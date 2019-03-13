import { Observable, of } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { CreateDataboxDialogComponent } from './create-databox-dialog.component';

interface confirmData {
  title?: string,
  data?: string,
  input?: boolean,
  folder?: string
}

@Injectable({
  providedIn: 'root'
})
export class CreateDataboxDialogService {
  constructor(private dialog: MatDialog) {
  }

  public confirm(data:confirmData = {}): Observable<boolean> {
    data.title = data.title || 'Confirm';
    data.data  = data.data || 'Are you sure?';
    data.input = data.input;
    data.folder = data.folder;

    let dialogRef: MatDialogRef<CreateDataboxDialogComponent>;
    dialogRef = this.dialog.open(CreateDataboxDialogComponent, {
      width: data.input ? '380px' : '500px',
      disableClose: true,
      data: {
        title: data.title, 
        data: data.data, 
        input: data.input, 
        folder: data.folder
      }
    });

    return dialogRef.afterClosed();
  }
}