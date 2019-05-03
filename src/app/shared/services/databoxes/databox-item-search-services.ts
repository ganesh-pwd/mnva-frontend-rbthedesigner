import { Injectable } from '@angular/core';
import { DataboxItemSearch } from '../../fake-db/databox-items-search';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NavigationService } from '../../services/navigation.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataboxItemSearchService {
  private databoxItemQuery: any[];


  constructor(private router: Router,
    private navigationService: NavigationService) {
    const databoxItemQuery = new DataboxItemSearch();
    this.databoxItemQuery = databoxItemQuery.databox_item_search;
  }


  // ******* Implement your APIs ********
  getItems(): Observable<any> {
    const rows = this.databoxItemQuery;

    if (!sessionStorage.getItem('databox_item_old')) {
      sessionStorage.setItem('databox_item_old', JSON.stringify(rows));
    }

    return of(rows.sort((a, b) => a.id - b.id).slice());
  }


	// Add Databox folder
  addRow(): Observable<any> {
    const rows = this.databoxItemQuery;
    const id = Math.max(...rows.map(x => x.id));

    rows.push({
      'id': id + 1,
      'date': '',
      'content': '',
      'paren': 'NULL',
      'author': 'Watson Joyce',
      'like': 0
    });

    return of(rows.sort((a, b) => a.id - b.id).slice()).pipe(delay(500));
  }


  // delete databox item handsontable
  deleteRow(id): Observable<any> {
    const rows = this.databoxItemQuery;
    const toBeDeleted = this.databoxItemQuery.find(x => x.id === id);
    rows.splice(rows.indexOf(toBeDeleted), 1);

    return of(rows.sort((a, b) => a.id - b.id).slice()).pipe(delay(500));
  }

  // reset row
  resetRows(): Observable<any> {
    this.databoxItemQuery = JSON.parse(sessionStorage.getItem('databox_item_old'));
    return of(this.databoxItemQuery.slice(0, 13).sort((a, b) => a.id - b.id).slice()).pipe(delay(500));
  }
}
