import { Injectable } from '@angular/core';
import { DataboxTestQueryDB } from '../../fake-db/databox-item-test-query';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../auth/user-services';

@Injectable({
  providedIn: 'root'
})
export class DataboxesTestQueryService {
  private databox_items_test_query: any[];
  private databox_folders: any[];
  public loggedInUser: any;

  constructor(private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute) {
    const databoxDB = new DataboxTestQueryDB();

    // logged in user
    userService.userData$.subscribe((user) => this.loggedInUser = user);
    this.databox_items_test_query = databoxDB.databox_test_queries;
  }


  /* @DATABOX TEST QUERY OPERATIONS */

      // build the test query
      testQueryDatabox(details: any = {}): Observable<any> {
        const getDataboxTestQuery = this.databox_items_test_query;
        const confirm_id_name = getDataboxTestQuery.findIndex(el => el._id === this.router.url.split('/').filter(el => el.length === 24)[0]);
        const expression = details['optional-keywords'] ? `${details['required-keywords']} OR "${details['optional-keywords']}"` : `${details['required-keywords']}`;

        // set the data
        const data = {
          '_id': this.generateID(), 
          'databox_id': details.databox_id,
          'query-type': details['query-type'],
          'expression': '',
          'query':  details['advance-query'] ,
          'optional-keywords': details['optional-keywords'],
          'required-keywords': details['required-keywords'],
          'excluded-keywords': details['excluded-keywords'],
        }
        
        sessionStorage.setItem('databox_test_query', JSON.stringify(data));

        // push to array of databoxes
        getDataboxTestQuery.push(data);

        this.databox_items_test_query = getDataboxTestQuery;

        return of(getDataboxTestQuery.slice()).pipe(delay(500));
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
      getMaxIndex(item) { return Math.max(...item.map(x => x.index)); }
}
