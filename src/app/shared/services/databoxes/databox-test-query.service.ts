import { Injectable } from '@angular/core';
import { DataboxTestQueryDB } from '../../fake-db/databox-item-test-query';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataboxesTestQueryService {
  private databox_items_test_query: any[];
  private databox_folders: any[];
  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
  public loggedInUser: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
    const databoxDB = new DataboxTestQueryDB();

    // logged in user
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    this.loggedInUser  = loggedInUser;
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
          'master_user_info': this.loggedInUser._id,
          'index': getDataboxTestQuery.length + 1,
          'guid': this.generateGUID(),
          'expression': expression !== 'null' ? expression : details['advance-query'],
          'required-keywords': details['required-keywords'],
          'optional-keywords': details['optional-keywords'],
          'excluded-keywords': details['excluded-keywords'],
          'advance-query': details['advance-query']
        }

        sessionStorage.setItem('databox_updated', `Query for ${details.databox_name} Databox has been updated`);
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


      // generate guID
      generateGUID() { return Math.round(Math.random() * 5000000000).toString(); }


      // get max index
      getMaxIndex(item) { return Math.max(...item.map(x => x.index)); }
}
