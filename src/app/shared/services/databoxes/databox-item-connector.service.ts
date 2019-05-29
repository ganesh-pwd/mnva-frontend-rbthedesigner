import { Injectable } from '@angular/core';
import { DataboxItemConnectorDB } from '../../fake-db/databox-item-connectors';
import { DataboxDB } from '../../fake-db/databox-items';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../auth/user-services';


@Injectable({
  providedIn: 'root'
})
export class DataboxConnectorService {
  private databox_item_connectors: any[];
  private databox_items: any[];
  public loggedInUser: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {

    const databoxConnectorDB = new DataboxItemConnectorDB();
    const databoxDB = new DataboxDB();
    
    this.databox_item_connectors = JSON.parse(sessionStorage.getItem('databox_item_connectors')) || databoxConnectorDB.databox_item_connectors;
    this.databox_items = JSON.parse(sessionStorage.getItem('databox_item')) || databoxDB.databox_items;
    // logged in user
    userService.userData$.subscribe((user) => this.loggedInUser = user);
  }


  // ******* Implement your APIs ********

  /* @GET DATABOX CONNECTOR DATA FROM THE FAKE DB */
      getAllItems(){
        const row = JSON.parse(sessionStorage.getItem('databox_item_connectors')) || this.databox_item_connectors;
        return of(row.slice());
      }

      // get databox by id
      getSingleItem(id) {
        const row = JSON.parse(sessionStorage.getItem('databox_item_connectors')) || this.databox_item_connectors;

        // filter by id and by databox id 
        const databox_item_connector = row.find(i => i.databox_id === id);
        return databox_item_connector;
      }

      // create data connector table if databox is new
      addConnectorTable(id){
        const databoxConnectors  = JSON.parse(sessionStorage.getItem('databox_item_connectors')) || this.databox_item_connectors;

        // set the data initially
        const data = {
          '_id': this.generateID(),
          'databox_id': id, // Foreign key
          'algorithmConnectors': [],
          'dataConnectors': [],
        };

        databoxConnectors.push(data);

        this.databox_item_connectors = databoxConnectors;
        sessionStorage.setItem('databox_item_connectors', JSON.stringify(databoxConnectors));
      }


  /* @DATABOX CONNECTORS FUNCTION
    * addAlgorithmConnector - will add or update the databox algorithm connectors
    * addDataConnector - will add or update the databox data connectors
  */

      // Add/update new algorithm connector
      addAlgorithmConnector(connector, checked): Observable<any>  {
        const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
        const confirm_id_name  = getDataboxItem.findIndex(el => el._id === this.router.url.split('/').filter(el => el.length === 24)[0]);
        const databox          = getDataboxItem[confirm_id_name];

        const databox_item_connectors = JSON.parse(sessionStorage.getItem('databox_item_connectors')) || this.databox_item_connectors;
        const dataConnector = databox_item_connectors.findIndex(el => el.databox_id === databox._id);

        console.log(databox._id, dataConnector, databox_item_connectors)
        const index = databox_item_connectors[dataConnector].algorithmConnectors.findIndex(el => el === connector);

        // set the data
        if(index === -1 && checked === true)
          databox_item_connectors[dataConnector].algorithmConnectors.push(connector);

        if(index > -1 && checked === false)
          databox_item_connectors[dataConnector].algorithmConnectors.splice(index, 1);;

        databox.last_updated = new Date();

        this.databox_item_connectors = databox_item_connectors;

        sessionStorage.setItem('databox_item_connectors', JSON.stringify(databox_item_connectors));
        sessionStorage.setItem('databox_updated', `Algorithm Connector for ${databox.databox_name} Databox has been updated`);

        return of(databox_item_connectors[dataConnector].dataConnectors.slice()).pipe(delay(500));
      }


      // Add/update new Data connector
      addDataConnector(connector, checked): Observable<any>  {
        const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
        const confirm_id_name  = getDataboxItem.findIndex(el => el._id === this.router.url.split('/').filter(el => el.length === 24)[0]);
        const databox          = getDataboxItem[confirm_id_name];

        const databox_item_connectors = JSON.parse(sessionStorage.getItem('databox_item_connectors')) || this.databox_item_connectors;
        const dataConnector = databox_item_connectors.findIndex(el => el.databox_id === databox._id);

        console.log(databox._id, dataConnector, databox_item_connectors)
        const index = databox_item_connectors[dataConnector].dataConnectors.findIndex(el => el === connector);

        // set the data
        if(index === -1 && checked === true)
          databox_item_connectors[dataConnector].dataConnectors.push(connector);

        if(index > -1 && checked === false)
          databox_item_connectors[dataConnector].dataConnectors.splice(index, 1);;

        databox.last_updated = new Date();

        this.databox_item_connectors = databox_item_connectors;

        sessionStorage.setItem('databox_item_connectors', JSON.stringify(databox_item_connectors));
        sessionStorage.setItem('databox_updated', `Data Connector for ${databox.databox_name} Databox has been updated`);

        return of(databox_item_connectors[dataConnector].dataConnectors.slice()).pipe(delay(500));
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
}
