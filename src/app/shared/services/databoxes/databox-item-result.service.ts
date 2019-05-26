import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NavigationService } from '../../services/navigation.service';
import { Router } from '@angular/router';
import { DataboxResultDB } from '../../fake-db/databox-item-results';
import { UserService } from '../auth/user-services';

@Injectable({
  providedIn: 'root'
})
export class DataboxItemResultService {
  private databoxItemQuery: any[];
  private databox_item_results: any[];
  private databox_folders: any[];
  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
  public loggedInUser: any;

  constructor(private router: Router,
    private navigationService: NavigationService,
    private userService: UserService) {
    const databoxDB = new DataboxResultDB();

    // logged in user
    userService.userData$.subscribe((user) => this.loggedInUser = user);
    this.databox_item_results = JSON.parse(sessionStorage.getItem('databox_item_result')) || databoxDB.databox_items_result;
  }


  // ******* Implement your APIs ********
  getItems(id): Observable<any> {
    const rows = JSON.parse(sessionStorage.getItem('databox_item_result')) || this.databox_item_results;
    const filter = rows.filter(el => el.databox_id === id);

    return of(filter[0].databox_item_result_table.sort((a, b) => a.id - b.id).slice());
  }


	// Add Databox folder
  addRow(id): Observable<any> {
    const rows = JSON.parse(sessionStorage.getItem('databox_item_result')) || this.databox_item_results;
    const confirm_id_name = rows.findIndex(el => el.databox_id === id);
    const databox         = rows[confirm_id_name];

    rows[confirm_id_name].databox_item_result_table.push({
      '_id': databox.databox_item_result_table.length + 1,
      'date': (new Date()).toLocaleDateString(),
      'content': 'NULL',
      'parent': 'NULL',
      'author': this.loggedInUser.name,
      'category': '',
      'subcategory': '',
      'like': 0, 'share': 0, 'comment': 0, 'love': 0, 'sad': 0, 'angry': 0, 'pride': 0, 'laugh': 0
    });

    sessionStorage.setItem('databox_item_result', JSON.stringify(rows));

    return of(rows[confirm_id_name].databox_item_result_table.sort((a, b) => a.id - b.id).slice()).pipe(delay(500));
  }


  // save all changes to fake db
  saveAllChanges(id, items): Observable<any> {
    const rows = JSON.parse(sessionStorage.getItem('databox_item_result')) || this.databox_item_results;
    const confirm_id_name = rows.findIndex(el => el.databox_id === id);
    const databox         = rows[confirm_id_name];

    rows[confirm_id_name].databox_item_result_table = items

    sessionStorage.removeItem('databox_item_result');
    sessionStorage.setItem('databox_item_result', JSON.stringify(rows));

    return of(rows[confirm_id_name].databox_item_result_table.slice()).pipe(delay(500));
  }


  // delete databox item handsontable
  deleteRow(id, row): Observable<any> {
    const rows = JSON.parse(sessionStorage.getItem('databox_item_result')) || this.databox_item_results;
    const confirm_id_name = rows.findIndex(el => el.databox_id === id);
    const databox         = rows[confirm_id_name];

    const toBeDeleted = databox.databox_item_result_table.find(x => x.id === row);

    // remove row
    rows[confirm_id_name].databox_item_result_table
    .splice(rows[confirm_id_name].databox_item_result_table.indexOf(toBeDeleted), 1);

    sessionStorage.removeItem('databox_item_result');
    sessionStorage.setItem('databox_item_result', JSON.stringify(rows));

    return of(rows[confirm_id_name].databox_item_result_table.sort((a, b) => a.id - b.id).slice()).pipe(delay(500));
  }

  // reset row
  resetRows(): Observable<any> {
    this.databoxItemQuery = JSON.parse(sessionStorage.getItem('databox_item_old'));
    return of(this.databoxItemQuery.slice(0, 13).sort((a, b) => a.id - b.id).slice()).pipe(delay(500));
  }
}
