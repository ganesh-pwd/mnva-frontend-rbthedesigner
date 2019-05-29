import { Injectable } from '@angular/core';
import { DataboxDB } from '../../fake-db/databox-items';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../auth/user-services';
import { DataboxResultDB } from '../../fake-db/databox-item-results';
import { DataboxQueryDB } from '../../fake-db/databox-item-query';
import { DataboxCategory } from '../../fake-db/databox-category';
import { DataboxSuggestionDB } from '../../fake-db/databox-item-suggestions';
import { DataboxesQueryService } from './databox-item-query.service';
import { DataboxItemResultService } from './databox-item-result.service';
import { DataboxCategoryService } from './databox-item-category.service';
import { DataboxConnectorService } from './databox-item-connector.service';

@Injectable({
  providedIn: 'root'
})
export class DataboxesService {
  private databox_items: any[];
  private databox_items_suggestion: any[];


  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();

  public loggedInUser: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private databoxesQueryService: DataboxesQueryService,
    private databoxItemResultService: DataboxItemResultService,
    private databoxCategoryService: DataboxCategoryService,
    private databoxConnectorService: DataboxConnectorService) {

    const databoxDB = new DataboxDB();

    // logged in user
    userService.userData$.subscribe((user) => this.loggedInUser = user);
    this.databox_items = JSON.parse(sessionStorage.getItem('databox_item')) || databoxDB.databox_items;

    const databoxItemSuggestion = new DataboxSuggestionDB();
    this.databox_items_suggestion = JSON.parse(sessionStorage.getItem('databox_items_suggestion')) || databoxItemSuggestion.databox_items_suggestion;  }



  // ******* Implement your APIs ********

  /* @GET DATABOX DATA FROM THE FAKE DB */

      // get databox items for the currently logged in user
      getItems(): Observable<any> {
        const rows = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
        const filter_by_logged_in_user = rows.filter(i => i.account_id === this.loggedInUser._id);
        return of(filter_by_logged_in_user.slice()).pipe(delay(500));
      }


      // get databox by id
      getSingleItem(id) {
        const row = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;

        // filter by id and by account_id (currently logged in user)
        const databox_item = row.find(i => i._id === id && i.account_id === this.loggedInUser._id);

        this.setSingleItemData(databox_item);

        return of(databox_item).pipe(delay(500));
      }



  /* @DATABOX CRUD OPERATIONS 
    * addItem - will create new databox
    * editDataboxName - will update or set the databox name ONLY
    * updateDatabox - will update the overall data of the databox
    * addNewResultSuggestion - will create a new databox result suggestion
    * updateItemStatus - will update databox item status to either ACTIVE OR PAUSE
    * deleteDatabox - Will Delete the databox
  */

      // create a new databox item
      addItem(details: any = {}, status = 'Active'): Observable<any> {
        const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
        const index = this.getMaxIndex(getDataboxItem);
        const generatedId = sessionStorage.getItem('databox_id_new');
        const name = sessionStorage.getItem('databox_name_new');
        
        // set the data
        const data = {
          '_id': generatedId,
          'index': index + 1,
          'account_id': this.loggedInUser._id,
          'first_create': false,
          'databox_name': sessionStorage.getItem('databox_edited_name') || 'Databox_' + name,
          'datasource': details.datasource || 'Facebook',
          'location': [...details.country]|| ['Costa Rica'],
          'last_updated': new Date(),
          'date_created': new Date(),
          'mentions': 1200,
          'algorithm_quota': 100,
          'mentions_per_day': 7.5,
          'credit_remaining': 120,
          'page_search_name': details.datasource === 'Facebook' ? 'Facebook Page' : details.datasource,
          'expiry_date': 'No Configuration',
          'status': status,
          'historical': details.historical,
          'result': 1200,
          'category_available': 20,
          'category_used': 0,
          'sub_category_available': 20,
          'sub_category_available_used': 0,
          'algorithmConnectors': [],
          'dataConnectors': [],
          'include_comments': details.include_comments,
          'specify_max_number_result': details.specify_max_number_result,
          'monitor_only_news_media': details.monitor_only_news_media,
          'monitor_specific_page': details.monitor_specific_page,
          'facebook_page_id': details.facebook_page_id,
          'max_number_result': details.max_number_result || 1,
          'exclude_specific_pages': details.exclude_specific_pages || false,
          'excluded_pages': details.excluded_pages
        };

        getDataboxItem.push(data);

        sessionStorage.removeItem('databox_item');
        sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));

        // create result table
        this.databoxItemResultService.addItemResultTable(generatedId);

        // create databox item query
        this.databoxesQueryService.addItemQuery(generatedId, details);

        // create databox category
        this.databoxCategoryService.addCategoryItem(generatedId, details);

        // create databox connector service
        this.databoxConnectorService.addConnectorTable(generatedId);

        if(status === 'Draft')
          sessionStorage.setItem('databox_new', 'A New Databox with status Draft has been created');

        else sessionStorage.setItem('databox_new', 'A New Databox has been created');

        sessionStorage.removeItem('databox_name_new');
        sessionStorage.removeItem('databox_id_new');
        sessionStorage.removeItem('databox_edited_name');

        return of(getDataboxItem.slice()).pipe(delay(500));
      }

      // edit databox name if status is already active or draft
      editDataboxName(name): Observable<any>{
        const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
        const confirm_id_name = getDataboxItem.findIndex(el => el._id === this.router.url.split('/').filter(el => el.length === 24)[0]);
        const databox         = getDataboxItem[confirm_id_name];

        // set the data
        databox.databox_name = name;

        sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
        sessionStorage.setItem('databox_updated', `The ${databox.databox_name} Databox has been updated`);

        let url = this.router.url;

        this.router.navigateByUrl('/', { skipLocationChange: true })
        .then(() => sessionStorage.removeItem('databox_updated'))
        .then(()=>this.router.navigate([url]));

        return of(getDataboxItem.slice()).pipe(delay(500));
      }


      // update databox item
      updateDatabox(details: any = {}, status = 'Active'): Observable<any> {
        const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
        const confirm_id_name  = getDataboxItem.findIndex(el => el._id === this.router.url.split('/').filter(el => el.length === 24)[0]);
        const databox          = getDataboxItem[confirm_id_name];

        // set the data
        if (status === 'Active') databox.status = 'Active';
        
        databox.datasource = details.datasource || 'Facebook';
        databox.location   = [...details.country] || ['Costa Rica'];
        databox.historical = details.historical || 'Full Archive';
        databox.last_updated = new Date();
        databox.include_comments = details.include_comments;
        databox.specify_max_number_result = details.specify_max_number_result;
        databox.monitor_only_news_media = details.monitor_only_news_media;
        databox.monitor_specific_page = details.monitor_specific_page;
        databox.exclude_specific_pages = details.exclude_specific_pages;
        databox.facebook_page_id = details.facebook_page_id;
        databox.max_number_result = details.max_number_result;
        databox.excluded_pages = details.excluded_pages;

        // update databox item query
        this.databoxesQueryService.updateItemQuery(details.databox_id, details);

        sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
        sessionStorage.setItem('databox_updated', `The ${databox.databox_name} Databox has been updated`);
        sessionStorage.removeItem('databox_edited_name');

        this.router.navigate(['/databoxes']);

        return of(getDataboxItem.slice()).pipe(delay(500));
      }

      // update databox item status
      updateItemStatus(id, item) {
        const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
        const confirm_id_name= getDataboxItem.findIndex(el => el._id === id);
        const databox        = getDataboxItem[confirm_id_name];

        databox.status = item;

        sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
        sessionStorage.setItem('databox_updated', `The ${databox.databox_name} Databox Status has been set to ${item}`);
        sessionStorage.removeItem('databox_edited_name');

        let url = this.router.url;

        this.router.navigateByUrl('/template-gallery', { skipLocationChange: true })
        .then(() => sessionStorage.removeItem('databox_updated'))
        .then(() => this.router.navigate([url]));

        return of(getDataboxItem.slice()).pipe(delay(500));
      }


      // remove databox item based on databox name
      deleteDatabox(name, id: string){
        const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
        const index           = getDataboxItem.findIndex(el => el.databox_name === name);
        const confirm_id_name = getDataboxItem.findIndex(el => el._id === (this.router.url.split('/').filter(el => el.length === 24)[0] || id));

        // remove the record
        if (index > -1 && index === confirm_id_name) {
          getDataboxItem.splice(index, 1);

          // delete databox query
          this.databoxesQueryService.removeItemQuery(id);

          // delete databox item result
          this.databoxItemResultService.removeResultTable(id);

          // delete category table
          this.databoxCategoryService.removeCategoryTable(id);

          // delete suggestion table
          this.removeSuggestionTable(id);

          sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));

          this.router.navigateByUrl('/template-gallery', { skipLocationChange: true })
          .then(() => sessionStorage.setItem('deleted_databox_true', `The ${name} Databox has been successfully deleted.`))
          .then(() => this.router.navigate(['/databoxes']))
          .then(() => setTimeout(() => sessionStorage.removeItem('deleted_databox_true'), 1000));
          
        } else {
          // show databox does not exist
          return 'Not Exist';
        }
      }

          
      /* DELETE DATABOX ASSOCIATED TABLES */
          // delete databox suggestion table
          private removeSuggestionTable(id){
            const databoxItemSuggestion = JSON.parse(sessionStorage.getItem('databox_items_suggestion')) || this.databox_items_suggestion;
            const index = databoxItemSuggestion.findIndex(el => el.databox_id === id);
            
            // reusable code for removing data
            this.removeDataSimple(databoxItemSuggestion, 'databox_items_suggestion', index, this.databox_items_suggestion);
          }

      // reusable function for removing data
      private removeDataSimple(array, item_storage, index, updatedArray){
        array.splice(index, 1);
        updatedArray = array;
        sessionStorage.setItem(item_storage, JSON.stringify(updatedArray));
      }



  /* @FUNCTIONS FOR GENERATING ID AND SETTING THE SELECTED DATABOX */

      // set brand result data dynamically and watch for changes
      setSingleItemData(data) { this.apiData.next(data); }

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
