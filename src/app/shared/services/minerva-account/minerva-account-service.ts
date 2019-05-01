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

  getAllItems(): Observable<any> {
    const minerva_accounts = this.accounts.filter(el => el.master_user_info === this.loggedInUser._id);
    return of(minerva_accounts.slice());
  }


  // add new user
  addNewUser(details: any = {}): Observable<any> {
    const minerva_accounts = this.accounts.filter(el => el.master_user_info === this.loggedInUser._id);


    if(minerva_accounts.length === this.loggedInUser.max_created_users) 
      alert("You already created the max number of users");
    else {
      const data = {
        '_id': this.generateID(),
        'master_user_info': this.loggedInUser._id,
        'index': minerva_accounts.length + 1,
        'guid': this.generateGUID(),
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

  // generate id with length 24
  generateID() {
    let id = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 24; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return id;
  }

  // generate guID
  generateGUID() {
    return Math.round(Math.random() * 5000000000).toString();
  }

  // get max index
  getMaxIndex(item) { return Math.max(...item.map(x => x.index)) }

  // add new databox
  /*
  const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
    const index = this.getMaxIndex(getDataboxItem);
    const guid = this.generateGUID();
    const generatedId = sessionStorage.getItem('databox_id_new');
    const name = sessionStorage.getItem('databox_name_new');
    
    // set the data
    const data = {
      '_id': generatedId,
      'index': index + 1,
      'master_user_info': this.loggedInUser._id,
      'guid': 'c01da2d1-55e3-4acc-a1e3-' + guid,
      'first_create': false,
      'databox_name': sessionStorage.getItem('databox_edited_name') || 'Databox_' + name,
      'datasource': details.datasource || 'Facebook',
      'datasource_suggestion': [],
      'databox_type': 'Standard',
      'location': [...details.country]|| ['Costa Rica'],
      'last_updated': new Date(),
      'date_created': new Date(),
      'mentions': 1200,
      'algorithm_quota': 100,
      'mentions_per_day': 7.5,
      'page_search_name': 'Website',
      'expiry_date': 'No Configuration',
      'status': status,
      'historical': details.historical,
      'associated_account': this.loggedInUser.name,
      'associated_email': this.loggedInUser.email,
      'result': 1200,
      'keywords': '0/5',
      'category_available': 20,
      'category_used': 0,
      'sub_category_available': 20,
      'sub_category_available_used': 0,
      'query':  details.advance_query ,
      'optional-keywords': details.optional_keywords,
      'required-keywords': details.required_keywords,
      'excluded-keywords': details.excluded_keywords,
      'algorithmConnectors': [],
      'dataConnectors': [],
    };

    getDataboxItem.push(data);

    sessionStorage.removeItem('databox_item');
    sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));

    if(status === 'Draft')
      sessionStorage.setItem('databox_new', 'A New Databox with status Draft has been created');

    else sessionStorage.setItem('databox_new', 'A New Databox has been created');

    sessionStorage.removeItem('databox_name_new');
    sessionStorage.removeItem('databox_id_new');
    sessionStorage.removeItem('databox_edited_name');

    return of(getDataboxItem.slice()).pipe(delay(500));*/
}
