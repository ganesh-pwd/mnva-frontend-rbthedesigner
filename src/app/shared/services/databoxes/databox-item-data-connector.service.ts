import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DataConnectorDB } from '../../fake-db/data-connector';

@Injectable({
  providedIn: 'root'
})
export class DataboxDataConnectorService {
  private databox_data_connectors: any[];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
    const dataconnectors_list = new DataConnectorDB();
    this.databox_data_connectors = dataconnectors_list.data_connectors;

  }

  // ******* Implement your APIs ********

  /* @GET ALGORITHM CREDIT DETAILS DATA FROM THE FAKE DB */

      // get the dataconnectors
      getItems(): Observable<any> {
        const rows = this.databox_data_connectors
          .filter(el => 
            ['Email', 'Slack', 'Apple TV']
            .indexOf(el.display_text) > -1);

        return of(rows.slice()).pipe(delay(500));
      }

      // get dataconnectors details
      getSingleItem(id){
        const filterItem = this.databox_data_connectors.find(el => el._id === id);

        if(!!filterItem)
          return filterItem.icon;
      }

      getAssociatedConnector(id):Observable<any>{
        const filterItem = this.databox_data_connectors.find(el => el._id === id);

        if(!!filterItem)
          return filterItem.icon;
      }
}
