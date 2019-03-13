import { Observable, of, BehaviorSubject } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';

interface confirmData {
  title?: string
}

@Injectable({
  providedIn: 'root'
})
export class MinervaAccountChangeService {
  private image = new BehaviorSubject<string>(null);
  public image$ = this.image.asObservable();

  constructor(private dialog: MatDialog) {
    this.setImage('assets/images/face-7.jpg')
  }

  setImage(image){
    this.image.next(image);

  }
}