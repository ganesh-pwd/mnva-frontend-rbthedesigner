import { Observable, of, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { MinervaAccountDB } from '../../fake-db/minerva-accounts';
import { UserService } from '../auth/user-services';
import { ActivatedRoute, Router } from '@angular/router';

interface confirmData {
  title?: string
}

@Injectable({
  providedIn: 'root'
})
export class MinervaAccountService {
  public loggedInUser: any;
  public accounts: any[];

  constructor(private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    const accounts = new MinervaAccountDB();
    this.accounts = accounts.minerva_accounts;

    // logged in user
    userService.userData$.subscribe((user) => this.loggedInUser = user);
  }

  /* @GET MINERVA ACCOUNTS DATA FROM THE FAKE DB */

      getAllItems(): Observable<any> {
        const minerva_accounts = this.accounts.filter(el => el.account_id === this.loggedInUser._id);
        return of(minerva_accounts.slice());
      }



  /* @MINERVA ACCOUNTS CRUD OPERATIONS
    * addNewUser - will create a new minerva account user
  */

      // add new user
      addNewUser(details: any = {}): Observable<any> {
        const minerva_accounts = this.accounts.filter(el => el.account_id === this.loggedInUser._id);


        if(minerva_accounts.length === this.loggedInUser.max_created_users) 
          alert("You already created the max number of users");
        else {
          const data = {
            '_id': this.generateID(),
            'account_id': this.loggedInUser._id,
            'index': minerva_accounts.length + 1,
            'status': 'Pending',
            'name': details.name,
            'user_type': details.role,
            'profile_image': '../assets/images/face-6.jpg',
            'date_created': 'Pending',
            'email': details.email,
          }

          this.accounts.push(data);

          this.router.navigateByUrl('/accounts/minerva-notifications', { skipLocationChange: true })
          .then(() => sessionStorage.setItem('user_new', 'A New User has been invited'))
          .then(() => this.router.navigate(['/accounts/users']))
          .then(() => sessionStorage.removeItem('user_new'));
         
          return of(this.accounts.slice());
        }
      }

      // edit existing user
      editUser(details: any = {}, id): Observable<any> {
        const minerva_accounts = this.accounts.filter(el => el.account_id === this.loggedInUser._id);
        const user_details = minerva_accounts[minerva_accounts.findIndex(el => el._id === id)];

        user_details.name = details.name;
        user_details.user_type = details.role;
        user_details.email = details.email;

        this.accounts = minerva_accounts;

        this.router.navigateByUrl('/accounts/minerva-notifications', { skipLocationChange: true })
        .then(() => sessionStorage.setItem('user_update', 'A User has been successfully updated'))
        .then(() => this.router.navigate(['/accounts/users']))
        .then(() => sessionStorage.removeItem('user_update'));
       
        return of(this.accounts.slice());
      }

      // remove user 
      deleteUser(id: string, input): Observable<any>{
        if(input === 'delete'){
          const minerva_accounts = this.accounts.filter(el => el.account_id === this.loggedInUser._id);
          const user_details = minerva_accounts[minerva_accounts.findIndex(el => el._id === id)];

          minerva_accounts.splice(minerva_accounts.findIndex(el => el._id === id), 1);

          this.accounts = minerva_accounts;

          this.router.navigateByUrl('/accounts/minerva-notifications', { skipLocationChange: true })
          .then(() => sessionStorage.setItem('user_deleted', 'A User has been successfully deleted'))
          .then(() => this.router.navigate(['/accounts/users']))
          .then(() => sessionStorage.removeItem('user_deleted'));

        } else alert(`You didn't write the word 'delete' to confirm the deletion of the user account`);

        return of(this.accounts.slice());
      }

  /* @FUNCTIONS FOR GENERATING RANDOM ID AND MAX INDEX */

      // generate id with length 24
      generateID() {
        let id = '';
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 24; i++) {
          id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return id;
      }

      // get max index
      getMaxIndex(item) { return Math.max(...item.map(x => x.index)) }

 
}
