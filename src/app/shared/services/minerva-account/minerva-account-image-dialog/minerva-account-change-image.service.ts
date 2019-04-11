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
  public loggedInUser: any;

  constructor(private dialog: MatDialog) {
    this.loggedInUser = sessionStorage.getItem('loggedInUser')
      ? JSON.parse(sessionStorage.getItem('loggedInUser')).profile_image
      : '../assets/images/face-7.jpg';

    this.setImage(this.loggedInUser);
  }

  setImage(image) {
    this.image.next(image);
  }
}
