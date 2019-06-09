import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NavigationService } from '../../services/navigation.service';
import { Router } from '@angular/router';
import { DataboxMentionsDB } from '../../fake-db/databox-item-mentions';
import { UserService } from '../auth/user-services';

@Injectable({
  providedIn: 'root'
})
export class DataboxItemMentionService {
  private databoxItemQuery: any[];
  private databox_item_mention: any[];
  private databox_folders: any[];
  public loggedInUser: any;

  constructor(private router: Router,
    private navigationService: NavigationService,
    private userService: UserService) {
    const databoxMentionDB = new DataboxMentionsDB();

    // logged in user
    userService.userData$.subscribe((user) => this.loggedInUser = user);
    this.databox_item_mention = JSON.parse(sessionStorage.getItem('databox_item_mention')) || databoxMentionDB.databox_items_mentions;
  }


  // ******* Implement your APIs ********
      // get all databox mentions for the currently selected databox (observable)
      getItems(id): Observable<any> {
        const rows = JSON.parse(sessionStorage.getItem('databox_item_mention')) || this.databox_item_mention;
        const filter = rows.filter(el => el.databox_id === id);

        return of(filter[0].databox_item_result_table.sort((a, b) => a.id - b.id).slice());
      }

      // get the databox mention for the selected databox (normal function)
      getSingleItem(id){
        const rows = JSON.parse(sessionStorage.getItem('databox_item_mention')) || this.databox_item_mention;
        const filter = rows.find(el => el.databox_id === id);

        if(filter)
          return filter;
      }

      //create databox mention table
      addDataboxItemMention(id, details){
        const databoxItemMentions = JSON.parse(sessionStorage.getItem('databox_item_mention')) || this.databox_item_mention;

        databoxItemMentions.push({
          '_id': this.generateID(), 
          'databox_id': id,
          'mentions': details.mentions,
          'mentions_per_day': details.mentions_per_day
        });
  
        this.databox_item_mention = databoxItemMentions;
        sessionStorage.setItem('databox_item_mention', JSON.stringify(this.databox_item_mention));
      }

      // remove the databox item mention after the databox has been deleted
      removeDataboxItemMention(id){
        const databoxItemMentions = JSON.parse(sessionStorage.getItem('databox_item_mention')) || this.databox_item_mention;
        const index = databoxItemMentions.findIndex(el => el.databox_id === id);

        // reusable code for removing data
        this.removeDataSimple(databoxItemMentions, 'databox_item_mention', index, this.databox_item_mention);
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
