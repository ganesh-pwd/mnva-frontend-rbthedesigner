import { Injectable } from '@angular/core';
import { DataboxDB } from '../../fake-db/databox-items';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataboxesService {
  private databox_items: any[];
  private databox_folders: any[];
  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
  public loggedInUser: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
    const databoxDB = new DataboxDB();

    // logged in user
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    this.loggedInUser = loggedInUser;
    this.databox_items = JSON.parse(sessionStorage.getItem('databox_item')) || databoxDB.databox_items;
  }

  // ******* Implement your APIs ********
  getItems(): Observable<any> {
    const rows = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
    const filter_by_logged_in_user = rows.filter(i => i.master_user_info === this.loggedInUser._id)
    return of(filter_by_logged_in_user.slice()).pipe(delay(500));
  }


  // get databox by id
  getSingleItem(id) {
    const row = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;

    // filter by id and by master_user_info (currently logged in user)
    const databox_item = row.find(i => i._id === id 
      && i.master_user_info === this.loggedInUser._id);

    this.setSingleItemData(databox_item);

    return of(databox_item).pipe(delay(500));
  }

  // set brand result data dynamically and watch for changes
  setSingleItemData(data) {
    this.apiData.next(data);
  }

  // generate guID
  generateGUID() {
    return Math.round(Math.random() * 5000000000).toString();
  }

  // get max index
  getMaxIndex(item) { return Math.max(...item.map(x => x.index)) }

  // add databox item
  addItem(details: any = {}, status = 'Active'): Observable<any> {
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
    databox.query      = details.advance_query;
    databox['optional-keywords']  =  details.optional_keywords;
    databox['required-keywords']  =  details.required_keywords;
    databox['excluded-keywords']  =  details.excluded_keywords;
    databox.last_updated = new Date();

    sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
    sessionStorage.setItem('databox_updated', `The ${databox.databox_name} Databox has been updated`);
    sessionStorage.removeItem('databox_edited_name');

    this.router.navigate(['/databoxes']);

    return of(getDataboxItem.slice()).pipe(delay(500));
  }


  // add new result suggestion
  addNewResultSuggestion(data){
    const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
    const confirm_id_name  = getDataboxItem.findIndex(el => el._id === this.router.url.split('/').filter(el => el.length === 24)[0]);
    const databox          = getDataboxItem[confirm_id_name];

    // set the data
    databox.datasource_suggestion.push({
      'source': data.source,
      'page_name': data.page_name,
      'page_id': data.page_id,
      'page_country': data.page_country,
    });

    sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
    sessionStorage.setItem('databox_updated_suggestion', 'Result Suggestion has been successfully added');

    let url = this.router.url;

    this.router.navigateByUrl('', { skipLocationChange: true })
    .then(() => sessionStorage.removeItem('databox_updated'))
    .then(() => this.router.navigate([url]));

    return of(getDataboxItem.slice()).pipe(delay(500));
  }


  // update item status
  updateItem(id, item) {
    this.databox_items = this.databox_items.map(i => {
      if (i._id === id) {
        return Object.assign({}, i, item);
      }
      return i;
    });
    return of(this.databox_items.slice()).pipe(delay(500));
  }


  // remove databox item based on databox name
  deleteDatabox(name, id?: string){
    const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
    const index           = getDataboxItem.findIndex(el => el.databox_name === name);
    const confirm_id_name = getDataboxItem.findIndex(el => el._id === (this.router.url.split('/').filter(el => el.length === 24)[0] || id));

    console.log(confirm_id_name, index)

    // remove the record
    if (index > -1 && index === confirm_id_name) {
      getDataboxItem.splice(index, 1);
      
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

  // build the test query
  testQueryDatabox(details: any = {}): Observable<any> {
    const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
    const confirm_id_name  = getDataboxItem.findIndex(el => el._id === this.router.url.split('/').filter(el => el.length === 24)[0]);
    const databox          = getDataboxItem[confirm_id_name];

    // set the data
    databox.query = details.advance_query;
    databox['optional-keywords']  =  details.optional_keywords;
    databox['required-keywords']  =  details.required_keywords;
    databox['excluded-keywords']  =  details.excluded_keywords;
    databox.last_updated = new Date();

    sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
    sessionStorage.setItem('databox_updated', `Query for ${databox.databox_name} Databox has been updated`);

    return of(getDataboxItem.slice()).pipe(delay(500));
  }


  // update algorithmConnector
  addAlgorithmConnector(connector, checked): Observable<any>  {
    const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
    const confirm_id_name  = getDataboxItem.findIndex(el => el._id === this.router.url.split('/').filter(el => el.length === 24)[0]);
    const databox          = getDataboxItem[confirm_id_name];
    const findConnectorIndex = databox.algorithmConnectors.findIndex(el => el === connector);

    // set the data
    if(findConnectorIndex === -1 && checked === true)
      databox.algorithmConnectors.push(connector);

    if(findConnectorIndex > -1 && checked === false)
      databox.algorithmConnectors.splice(findConnectorIndex, 1);;

    databox.last_updated = new Date();

    sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
    sessionStorage.setItem('databox_updated', `Algorithm Connector for ${databox.databox_name} Databox has been updated`);
    
    return of(getDataboxItem.slice()).pipe(delay(500));
  }

  addDataConnector(connector, checked): Observable<any>  {
    const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
    const confirm_id_name  = getDataboxItem.findIndex(el => el._id === this.router.url.split('/').filter(el => el.length === 24)[0]);
    const databox          = getDataboxItem[confirm_id_name];
    const findConnectorIndex = databox.dataConnectors.findIndex(el => el === connector);

    // set the data
    if(findConnectorIndex === -1 && checked === true)
      databox.dataConnectors.push(connector);

    if(findConnectorIndex > -1 && checked === false)
      databox.dataConnectors.splice(findConnectorIndex, 1);;

    databox.last_updated = new Date();

    sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
    sessionStorage.setItem('databox_updated', `Data Connector for ${databox.databox_name} Databox has been updated`);
    
    return of(getDataboxItem.slice()).pipe(delay(500));
  }
}
