import { Observable, of } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { DataboxDialogsQueryComponent } from './dialogs-query.component';

interface confirmData {
  title?: string,
  databox?: any,
  editCategory?: boolean,
  category?: any
}

@Injectable({
  providedIn: 'root'
})
export class databoxCategoryEditorDialogService {
  constructor(private dialog: MatDialog) {
  }

  public confirm(data:confirmData = {}): Observable<boolean> {
    data.title    = data.title || 'Create Category';
    data.databox  = data.databox || {};
    data.editCategory = data.editCategory || false;
    data.category = data.category || '';

    let dialogRef: MatDialogRef<DataboxDialogsQueryComponent>;
    dialogRef = this.dialog.open(DataboxDialogsQueryComponent, {
      width: data.title === 'Create Category' || data.title === 'Edit Category' ? '800px' : '500px',
      disableClose: true,
      data: {
        title: data.title,
        databox: data.databox,
        editCategory: data.editCategory,
        category: data.category
      }
    });

    return dialogRef.afterClosed();
  }
}