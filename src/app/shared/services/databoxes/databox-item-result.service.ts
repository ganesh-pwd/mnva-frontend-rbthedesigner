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

  /* @DATABOX ITEM TABLE CRUD OPERATION
    * addItemResultTable - Create the databox item result table if the databox is new
    * addRow - Add row to the databox item result table
    * saveAllChanges - Save all changes to databox item result table
    * deleteRow - Delete a row to the databox item result table
    * removeResultTable - Delete databox item result table if the associated databox has been deleted
  */

      // create databox item result table
      addItemResultTable(id){
        const databoxItemResult = JSON.parse(sessionStorage.getItem('databox_item_result')) || this.databox_item_results;

        databoxItemResult.push({
          '_id': this.generateID(), 
          'databox_id': id,
          'index': this.getMaxIndex(databoxItemResult),
          'databox_item_result_table': [
            {
              '_id':0,
              'date': (new Date()).toLocaleDateString(), 
              'content': 'Te mereces un descanso de la carreras de diciembre. Celebremos que es viernes! #SiempreHayUnaRazonParaCelebrar #NosVemosEnApplebees',
              'parent': 'NULL',
              'author': this.loggedInUser.accountName,
              'category': 'Category 1',
              'subcategory': 'SubCategory1',
              'like': 0, 'share': 0, 'comment': 0, 'love': 0, 'sad': 0, 'angry': 0, 'pride': 0, 'laugh': 0
            },
          ]
        });

        this.databox_item_results = databoxItemResult;
        sessionStorage.setItem('databox_item_result', JSON.stringify(this.databox_item_results));
      }


    	// Add row to the databox item result table
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

      // delete databox item result table
      removeResultTable(id){
        const databoxItemResult = JSON.parse(sessionStorage.getItem('databox_item_result')) || this.databox_item_results;
        const index = databoxItemResult.findIndex(el => el.databox_id === id);

        // reusable code for removing data
        this.removeDataSimple(databoxItemResult, 'databox_item_result', index, this.databox_item_results);
      }


  /* @FUNCTIONS FOR GENERATING ID AND SETTING THE SELECTED DATABOX */
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

      private removeDataSimple(array, item_storage, index, updatedArray){
        array.splice(index, 1);
        updatedArray = array;
        sessionStorage.setItem(item_storage, JSON.stringify(updatedArray));
      }
}
