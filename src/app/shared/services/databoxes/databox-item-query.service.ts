import { Injectable } from '@angular/core';
import { DataboxDB } from '../../fake-db/databox-items';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../auth/user-services';
import { DataboxResultDB } from '../../fake-db/databox-item-results';
import { DataboxQueryDB } from '../../fake-db/databox-item-query';

@Injectable({
  providedIn: 'root'
})
export class DataboxesQueryService {
  private databox_item_query: any[];
  private loggedInUser: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    
    const databoxItemQueryDB = new DataboxQueryDB();

    // logged in user
    userService.userData$.subscribe((user) => this.loggedInUser = user);
    this.databox_item_query = JSON.parse(sessionStorage.getItem('databox_item_query')) || databoxItemQueryDB.databox_items_query;
  }


  // ******* Implement your APIs ********

  /* @GET DATABOX DATA FROM THE FAKE DB */
      // get databox by id
      getSingleItem(id) {
        const row = JSON.parse(sessionStorage.getItem('databox_item_query')) || this.databox_item_query;

        // filter by id and by account_id (currently logged in user)
        const databox_item_query = row.find(i => i.databox_id === id);

        return of(databox_item_query).pipe(delay(500));
      }


  /* @FUNCTIONS FOR GENERATING ID AND SETTING THE SELECTED DATABOX */
      // get max index
      getMaxIndex(item) { return Math.max(...item.map(x => x.index)) }

      // generate id with length 24
      generateID() {
        let id = '';
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 24; i++) {
          id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return id;
      }
}
