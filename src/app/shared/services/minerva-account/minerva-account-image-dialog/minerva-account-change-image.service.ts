import { Observable, of, BehaviorSubject } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { UserService } from '../../auth/user-services';
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

  constructor(private dialog: MatDialog, private userService: UserService) {
    // logged in user
    userService.userData$.subscribe((user) => {
      this.loggedInUser = user;
      if(user) this.setImage(user.profile_image);
    });
    
  }

  setImage(image) {
    this.image.next(image);
  }
}
