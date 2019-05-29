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

  /* @DATABOX ITEM QUERY CRUD OPERATION
    * addItemQuery - Create the query table for the associated databox if the databox is new
    * updateItemQuery - Update the databox item query
    * removeItemQuery - Delete databox item query if the associated databox has been deleted
  */

      // create databox item query
      addItemQuery(id, details){
        // QUERY EXPRESSION BUILDER
        const requiredKeywords = details['required-keywords'].map((el,i,arr) => i !== (arr.length - 1) ? el.concat(" AND ") : `${el}`).join("");
        const optionalKeywords = details['optional-keywords'].map((el,i,arr) => i !== (arr.length - 1) ? el.concat(" OR ") : `${el}`).join("");
        const excludedKeywords = details['excluded-keywords'].map((el,i,arr) => i !== (arr.length - 1) ? el.concat(" AND ") : `${el}`).join("");

        const expression = details['optional-keywords'].length > 0 && details['excluded-keywords'].length === 0 ? `((${requiredKeywords}) OR "(${optionalKeywords})")` 
          : details['optional-keywords'].length > 0 && details['excluded-keywords'].length > 0 ? `((${requiredKeywords}) OR ("${optionalKeywords}")) AND ( NOT (${excludedKeywords}))` 
          : details['optional-keywords'].length === 0 && details['excluded-keywords'].length > 0 ? `(${requiredKeywords}) AND (NOT (${excludedKeywords}))` 
          : `${requiredKeywords}`;

        const databoxItemQuery = JSON.parse(sessionStorage.getItem('databox_item_query')) || this.databox_item_query;

        databoxItemQuery.push({
          '_id': this.generateID(), 
          'databox_id': id,
          'query-type': details['query-type'],
          'expression': expression,
          'query':  details['advance-query'] ,
          'optional-keywords': details['optional-keywords'],
          'required-keywords': details['required-keywords'],
          'excluded-keywords': details['excluded-keywords'],
        });

        this.databox_item_query = databoxItemQuery;
        sessionStorage.setItem('databox_item_query', JSON.stringify(this.databox_item_query));
      }

      // update databox item query
      updateItemQuery(id, details){
        const databoxItemQuery = JSON.parse(sessionStorage.getItem('databox_item_query')) || this.databox_item_query;
        const index = databoxItemQuery.findIndex(el => el.databox_id === id);

        // QUERY EXPRESSION BUILDER
        const requiredKeywords = details['required-keywords'].map((el,i,arr) => i !== (arr.length - 1) ? el.concat(" AND ") : `${el}`).join("");
        const optionalKeywords = details['optional-keywords'].map((el,i,arr) => i !== (arr.length - 1) ? el.concat(" OR ") : `${el}`).join("");
        const excludedKeywords = details['excluded-keywords'].map((el,i,arr) => i !== (arr.length - 1) ? el.concat(" AND ") : `${el}`).join("");

        const expression = details['optional-keywords'].length > 0 && details['excluded-keywords'].length === 0 ? `((${requiredKeywords}) OR "(${optionalKeywords})")` 
          : details['optional-keywords'].length > 0 && details['excluded-keywords'].length > 0 ? `((${requiredKeywords}) OR ("${optionalKeywords}")) AND (NOT (${excludedKeywords}))` 
          : details['optional-keywords'].length === 0 && details['excluded-keywords'].length > 0 ? `(${requiredKeywords}) AND (NOT (${excludedKeywords}))` 
          : `${requiredKeywords}`;

        databoxItemQuery[index]['query-type'] = details['query-type'];
        databoxItemQuery[index]['expression'] = expression;
        databoxItemQuery[index]['optional-keywords'] = details['optional-keywords'];
        databoxItemQuery[index]['required-keywords'] = details['required-keywords'];
        databoxItemQuery[index]['excluded-keywords'] = details['excluded-keywords'];
        databoxItemQuery[index]['query'] = details['advance-query'];

        this.databox_item_query = databoxItemQuery;
        sessionStorage.setItem('databox_item_query', JSON.stringify(this.databox_item_query));
      }

      // delete databox item query
      removeItemQuery(id){
        const databoxItemQuery = JSON.parse(sessionStorage.getItem('databox_item_query')) || this.databox_item_query;
        const index = databoxItemQuery.findIndex(el => el.databox_id === id);

        // reusable code for removing data
        this.removeDataSimple(databoxItemQuery, 'databox_item_query', index, this.databox_item_query);
      }



  /* @FUNCTIONS FOR GENERATING ID AND SETTING THE SELECTED DATABOX */
      // reusable function for removing data
      private removeDataSimple(array, item_storage, index, updatedArray){
        array.splice(index, 1);
        updatedArray = array;
        sessionStorage.setItem(item_storage, JSON.stringify(updatedArray));
      }

      // get max index
      private getMaxIndex(item) { return Math.max(...item.map(x => x.index)) }

      // generate id with length 24
      private generateID() {
        let id = '';
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 24; i++) {
          id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return id;
      }
}
