import { Injectable } from '@angular/core';
import { DataboxDB } from '../../fake-db/databox-items';
import { DataboxCategory } from '../../fake-db/databox-category';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataboxCategoryService {
  private databox_items: any[];
  private databox_category: any
  
  public loggedInUser: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
    const databoxDB = new DataboxDB();
    const databoxCategoryDB = new DataboxCategory();

    // logged in user
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    this.loggedInUser  = loggedInUser;
    this.databox_category = databoxCategoryDB.databox_categories;
    this.databox_items = JSON.parse(sessionStorage.getItem('databox_item')) || databoxDB.databox_items;
  }

  // get associated category items for the selected databoxes
  getItem(id): Observable<any> {
    const rows = this.databox_category;
    const filter = rows.filter(i => i.master_user_info === this.loggedInUser._id && i.databox_id === id)
    return of(filter.slice()).pipe(delay(500));
  }


  // 
  getCategoryData(id, category_name): Observable<any> {
    const rows   = this.databox_category;
    const filter = rows.filter(i => i.master_user_info === this.loggedInUser._id && i.databox_id === id);
    const categories = filter[0].categories.filter(el => el.name === category_name);

    return of(categories.slice()).pipe(delay(500));
  }


  // add new category
  addCategoryItem(id, details): Observable<any>{
    const rows  = this.databox_category;
    const index = rows.findIndex(i => i.master_user_info === this.loggedInUser._id && i.databox_id === id)
    const expression = details['optional-keywords'] ? `${details['required-keywords']} OR "${details['optional-keywords']}"` : `${details['required-keywords']}`;

    // get databox data and update category remaining
    const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
    const confirm_id_name = getDataboxItem.findIndex(el => el._id === this.router.url.split('/').filter(el => el.length === 24)[0]);
    const databox         = getDataboxItem[confirm_id_name];

    const sub_category_available = databox.sub_category_available_used;
    const category_available = databox.category_used;

    // if there's a pre-existing category list
    if(rows[index]){
      let maxIndex = this.getMaxIndex(rows[index].categories);
      
      rows[index].categories.push({
        'index': maxIndex,
        'name': details.name,
        'type': details.type,
        'expression': expression !== 'null' ? expression : details.query,
        'required-keywords': details['required-keywords'],
        'optional-keywords': details['optional-keywords'],
        'excluded-keywords': details['excluded-keywords'],
        'query': details.query
      }); 

      this.databox_category = rows;

        // update the databox data
        if(details.type === 'Category'){
          databox.category_used = category_available + 1;
          sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
          sessionStorage.setItem('databox_updated', `The Category for ${databox.databox_name} Databox has been updated`);
        } 

        if(details.type === 'Sub Category') {
          databox.sub_category_available_used = sub_category_available + 1;
          sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
          sessionStorage.setItem('databox_updated', `The Sub-Category ${databox.databox_name} Databox has been updated`);
        }

      return of(this.databox_category.slice()).pipe(delay(500));
    } 

    // if list is empty
    else {
      const index = this.getMaxIndex(this.databox_category);
      
      // set the data initially
      const data = {
        '_id': this.generateID(),
        'index': index + 1,
        'databox_id': id,
        'master_user_info': this.loggedInUser._id,
        'categories': [{
          'index': 0,
          'name': details.name,
          'type': details.type,
          'expression': expression !== 'null' ? expression : details.query,
          'required-keywords': details['required-keywords'],
          'optional-keywords': details['optional-keywords'],
          'excluded-keywords': details['excluded-keywords'],
          'query': details.query
        }]
      };

        // update the databox data
        if(details.type === 'Category'){
          databox.category_used = category_available + 1;
          sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
          sessionStorage.setItem('databox_updated', `The Category ${databox.databox_name} Databox has been updated`);
        } 

        if(details.type === 'Sub Category') {
          databox.sub_category_available_used = sub_category_available + 1;
          sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
          sessionStorage.setItem('databox_updated', `The Sub-Category ${databox.databox_name} Databox has been updated`);
        }

      this.databox_category.push(data);

      return of(this.databox_category.slice()).pipe(delay(500));
    }
  }

  // edit category
  editCategory(id, details, category_name): Observable<any>{
    const rows  = this.databox_category;
    const index = rows.findIndex(i => i.master_user_info === this.loggedInUser._id && i.databox_id === id)
    const category_index = rows[index].categories.findIndex(el => el.name === category_name);
    const expression = details['optional-keywords'] ? `${details['required-keywords']} OR "${details['optional-keywords']}"` : `${details['required-keywords']}`;

    // get databox data and update category remaining
    const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
    const confirm_id_name = getDataboxItem.findIndex(el => el._id === this.router.url.split('/').filter(el => el.length === 24)[0]);
    const databox         = getDataboxItem[confirm_id_name];

    const sub_category_available = databox.sub_category_available_used;
    const category_available = databox.category_used;

    if(category_index > -1){
      // update the databox data
      if(rows[index].categories[category_index].type !== details.type && details.type === 'Category'){
        databox.category_used = category_available + 1;
        databox.sub_category_available_used = sub_category_available - 1;
        sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
        sessionStorage.setItem('databox_updated', `The Category ${databox.databox_name} Databox has been updated`);
      } 

      if(rows[index].categories[category_index].type !== details.type && details.type === 'Sub Category') {
        databox.category_used = category_available - 1;
        databox.sub_category_available_used = sub_category_available + 1;
        sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
        sessionStorage.setItem('databox_updated', `The Sub-Category ${databox.databox_name} Databox has been updated`);
      }

      rows[index].categories[category_index].name = details.name;
      rows[index].categories[category_index].type = details.type;
      rows[index].categories[category_index].expression = expression !== 'null' ? expression : details.query,
      rows[index].categories[category_index]['required-keywords'] = details['required-keywords'];
      rows[index].categories[category_index]['optional-keywords'] = details['optional-keywords'];
      rows[index].categories[category_index]['excluded-keywords'] = details['excluded-keywords'];
      rows[index].categories[category_index]['query'] = details['query'];

      this.databox_category = rows;
    }

    return of(this.databox_category.slice()).pipe(delay(500));
  }

  // delete category
  deleteCategory(id, category_name): Observable<any>{
    const rows = this.databox_category;
    const index = rows.findIndex(i => i.master_user_info === this.loggedInUser._id && i.databox_id === id)
    const category_index = rows[index].categories.findIndex(el => el.name === category_name);

    // get databox data and update category remaining
    const getDataboxItem = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
    const confirm_id_name = getDataboxItem.findIndex(el => el._id === this.router.url.split('/').filter(el => el.length === 24)[0]);
    const databox         = getDataboxItem[confirm_id_name];

    const sub_category_available = databox.sub_category_available_used;
    const category_available = databox.category_used;

    if(category_index > -1){
      // update the databox data
      if(rows[index].categories[category_index].type === 'Category'){
        databox.category_used = category_available - 1;
        sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
        sessionStorage.setItem('databox_updated', `The Category ${databox.databox_name} Databox has been updated`);
      } 

      if(rows[index].categories[category_index].type === 'Sub Category') {
        databox.sub_category_available_used = sub_category_available - 1;
        sessionStorage.setItem('databox_item', JSON.stringify(getDataboxItem));
        sessionStorage.setItem('databox_updated', `The Sub-Category ${databox.databox_name} Databox has been updated`);
      }

      rows[index].categories.splice(category_index, 1);

      this.databox_category = rows;
    }

    return of(this.databox_category.slice()).pipe(delay(500));
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

  // get max index
  getMaxIndex(item) { return Math.max(...item.map(x => x.index)) }

 
  
}
