import { Observable, of, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { MinervaAccountDB } from '../../../fake-db/minerva-accounts';
import { UserService } from '../../auth/user-services';
interface confirmData {
  title?: string
}

@Injectable({
  providedIn: 'root'
})
export class MinervaAccountService {
  public loggedInUser: any;
  public accounts: any[];

  constructor(private userService: UserService) {
    const accounts = new MinervaAccountDB();
    this.accounts = accounts.minerva_accounts;

    // logged in user
    userService.userData$.subscribe((user) => this.loggedInUser = user);
  }

  getAllItems(): Observable<any> {
    const minerva_accounts = this.accounts.filter(el => el.master_user_info === this.loggedInUser._id);
    return of(minerva_accounts.slice());
  }
}
