import { Injectable } from '@angular/core';
import { DataboxSuggestionDB } from '../../fake-db/databox-item-suggestions';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../auth/user-services';

@Injectable({
  providedIn: 'root'
})
export class DataboxSuggestionService {
  private databox_items_suggestion: any[];
  public loggedInUser: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {

    const databoxSuggestionDB = new DataboxSuggestionDB();

    // logged in user
    userService.userData$.subscribe((user) => this.loggedInUser = user);
    this.databox_items_suggestion = JSON.parse(sessionStorage.getItem('databox_items_suggestion')) || databoxSuggestionDB.databox_items_suggestion;

  }


  // ******* Implement your APIs ********

  /* @GET DATABOX ITEM SUGGESTIONS FROM THE FAKE DB */

      // get databox items suggestion for the currently logged in user
      getItems(id): Observable<any> {
        const rows = JSON.parse(sessionStorage.getItem('databox_items_suggestion')) || this.databox_items_suggestion;
        const databoxSuggestions = rows.filter(el => el.databox_id === id);
        return of(databoxSuggestions.slice()).pipe(delay(500));
      }


      // add new result suggestion
      addNewResultSuggestion(data){
        const databox_id = this.router.url.split('/').filter(el => el.length === 24)[0]
        const getDataboxSuggestion = JSON.parse(sessionStorage.getItem('databox_items_suggestion')) || this.databox_items_suggestion;
        const confirm_id_name  = getDataboxSuggestion.findIndex(el => el.databox_id === databox_id);

        // set the data
        if(getDataboxSuggestion[confirm_id_name]){
          getDataboxSuggestion[confirm_id_name].datasource_suggestion.push({
            'source': data.source,
            'page_name': data.page_name,
            'page_id': data.page_id,
            'page_country': data.page_country,
          });
        } else {
          getDataboxSuggestion.push(
            {
              '_id': this.generateID(),
              'databox_id': databox_id,
              'datasource_suggestion': [{
                'source': data.source,
                'page_name': data.page_name,
                'page_id': data.page_id,
                'page_country': data.page_country
              }]
            }
          );
        }

        this.databox_items_suggestion = getDataboxSuggestion;

        sessionStorage.setItem('databox_items_suggestion', JSON.stringify(getDataboxSuggestion));
        sessionStorage.setItem('databox_updated_suggestion', 'Result Suggestion has been successfully added');

        return of(getDataboxSuggestion.slice()).pipe(delay(500));
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

      private removeDataSimple(array, item_storage, index, updatedArray){
        array.splice(index, 1);
        updatedArray = array;
        sessionStorage.setItem(item_storage, JSON.stringify(updatedArray));
      }
}
