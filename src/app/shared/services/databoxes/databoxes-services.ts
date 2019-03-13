import { Injectable } from '@angular/core';
import { DataboxDB } from '../../fake-db/databox-items';
import { DataboxFolderDB } from '../../fake-db/databox-folders';
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

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
    const databoxDB = new DataboxDB();
    const databoxFolderDB = new DataboxFolderDB();

    this.databox_items = JSON.parse(sessionStorage.getItem('databox_item')) || databoxDB.databox_items;
    this.databox_folders = JSON.parse(sessionStorage.getItem('databox_folder')) || databoxFolderDB.databox_folders;
  }

  // ******* Implement your APIs ********
  getItems(): Observable<any> {
    const rows = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
    return of(rows.slice()).pipe(delay(500));
  }

  // get databox by folder name
  getItemsByFolder(folderName) {
    const row = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
    const databox_item = row.filter(i => i.folder === folderName);
    return of(databox_item).pipe(delay(500));
  }

  // get databox by user
  getItemByUser(item) {
    const row = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
    const databox_item = row.filter(i => i.associated_email === item.associated_email);
    return of(databox_item).pipe(delay(500));
  }

  // get databox by id
  getSingleItem(id) {
    const row = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
    const databox_item = row.find(i => i._id === id);
    this.setSingleItemData(databox_item);
    return of(databox_item).pipe(delay(500));
  }

  // set brand result data dynamically and watch for changes
  setSingleItemData(data) {
    this.apiData.next(data);
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

  // get all databox folders
  getDataboxFolders() {
    const rows = JSON.parse(sessionStorage.getItem('databox_folder')) || this.databox_folders;
    return rows.slice();
  }

  // filter databox folders
  filterDataboxFolders(databoxFolders, folder_name) {
    return databoxFolders.find(x => x.folder === folder_name);
  }

  // get max index
  getMaxIndex(item) {
    return Math.max(...item.map(x => x.index));
  }

  // add databox item
  addItem(databox_type?: string): Observable<any> {
    let folder_name = (this.activatedRoute.snapshot['_routerState'].url).split('/');
    folder_name = folder_name[2] ? folder_name[2].replace(/\-/, ' ') : 'Blank Folder';

    const getDataboxFolders = JSON.parse(sessionStorage.getItem('databox_folder')) || this.getDataboxFolders();
    const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
    const filter_databox_folder = this.filterDataboxFolders(getDataboxFolders, folder_name);

    const index = this.getMaxIndex(getDataboxItem);
    const guid = this.generateGUID();
    const generatedId = this.generateID();
    // set the data
    const data = {
      '_id': generatedId,
      'index': index + 1,
      'guid': 'c01da2d1-55e3-4acc-a1e3-' + guid,
      'folder': folder_name,
      'first_create': true,
      'databox_name': 'Databox_' + (index + 1),
      'datasource': 'Facebook',
      'databox_type': databox_type,
      'location': 'Costa Rica',
      'last_updated': new Date(),
      'mentions': 0,
      'page_search_name': 'Website',
      'expiry_date': 'No Configuration',
      'status': 'No Configuration',
      'historical': '',
      'associated_account': 'William Joyce',
      'associated_email': 'william_joyce@minerva.com',
      'result': 0,
      'keywords': '5/5',
      'category': '5/5',
      'sub_category': '5/5',
      'query': '',
    };

    filter_databox_folder.databoxes.push({ 'databox_id': generatedId });
    getDataboxItem.push(data);

    sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
    sessionStorage.setItem('databox_folder', JSON.stringify(getDataboxFolders));
    sessionStorage.setItem('databox_new', 'A new Databox have been created');

    this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
      this.router.navigate([`/databoxes/${data.folder.replace(/\s/, '-')}/${data._id}/initialize`]));

    return of(getDataboxItem.slice()).pipe(delay(500));
  }

  // update item
  updateItem(id, item) {
    this.databox_items = this.databox_items.map(i => {
      if (i._id === id) {
        return Object.assign({}, i, item);
      }
      return i;
    });
    return of(this.databox_items.slice()).pipe(delay(500));
  }

  // remove item
  removeItem(row) {
    const i = this.databox_items.indexOf(row);
    this.databox_items.splice(i, 1);
    return of(this.databox_items.slice()).pipe(delay(500));
  }
}
