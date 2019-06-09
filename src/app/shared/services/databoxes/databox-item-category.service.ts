import { Injectable } from '@angular/core';
import { DataboxDB } from '../../fake-db/databox-items';
import { DataboxCategory } from '../../fake-db/databox-category';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../auth/user-services';

@Injectable({
  providedIn: 'root'
})
export class DataboxCategoryService {
  private databox_items: any[];
  private databox_category: any;
  
  private categoryItems = new BehaviorSubject<any>(null);
  private testData = new BehaviorSubject<any>(null);

  public categoryItems$ = this.categoryItems.asObservable();
  public testData$ = this.testData.asObservable();

  public loggedInUser: any;

  constructor(private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute) {
    const databoxDB = new DataboxDB();
    const databoxCategoryDB = new DataboxCategory();

    // logged in user
    userService.userData$.subscribe((user) => this.loggedInUser = user);
    this.databox_category = JSON.parse(sessionStorage.getItem('databox_item_categories')) || databoxCategoryDB.databox_categories;
    this.databox_items = JSON.parse(sessionStorage.getItem('databox_item')) || databoxDB.databox_items;
  }

  /* @GET DATABOX CATEGORY EXPRESSIONS FROM THE FAKE DB */

      // get associated category items for the selected databoxes
      getItem(id): Observable<any> {
        const rows = JSON.parse(sessionStorage.getItem('databox_item_categories')) || this.databox_category;
        const filter = rows.filter(i => i.databox_id === id);

        return of(filter.slice()).pipe(delay(500));
      }


      // get list databox of category expressions
      getCategoryData(id, category_name): Observable<any> {
        const rows   = JSON.parse(sessionStorage.getItem('databox_item_categories')) || this.databox_category;
        const filter = rows.filter(i => i.databox_id === id);
        const categories = filter[0].categories.filter(el => el.name === category_name);

        return of(categories.slice()).pipe(delay(500));
      }

      // get databox category temporary data (category that hasn't been saved yet)
      getCategoryDataTemp(id, category_name): Observable<any> {
        const rows   = JSON.parse(sessionStorage.getItem('databoxCategory'));
        const categories = rows.categories.filter(el => el.name === category_name);

        return of(categories.slice()).pipe(delay(500));
      }

      // set databox category items
      setCategoryItem(data){
        this.categoryItems.next(data);
      }

      // set test data
      setTestDataItem(data){
        this.testData.next(data);
      }


  /* @DATABOX CATEGORY CRUD OPERATION
    * addCategoryItem - Add new Databox Category Expression
    * addCategoryTemp - Add new category if category table are already created
    * editCategoryTemp - Update Databox Category Expression
    * deleteCategory - Delete Databox Category Expression
    * saveChangesToDB - Save all changes to fake db and session storage
    * removeCategoryTable - Delete the category table if the associated databox has been deleted
  */

      // create databox category table for the associated databox
      addCategoryItem(id, details){
        const categoryItems  = JSON.parse(sessionStorage.getItem('databox_item_categories')) || this.databox_category;

        // set the data initially
        const data = {
          '_id': this.generateID(),
          'databox_id': id,
          'category_available': 20,
          'category_used': 0,
          'sub_category_available': 20,
          'sub_category_available_used': 0,
          'categories': []
        };

        categoryItems.push(data);

        this.databox_category = categoryItems;
        sessionStorage.setItem('databox_item_categories', JSON.stringify(categoryItems));
      }


      // add new category if category table are already created
      addCategoryTemp(id, details): Observable<any>{
        const rows  = JSON.parse(sessionStorage.getItem('databox_item_categories')) || this.databox_category;
        const index = rows.findIndex(i => i.databox_id === id);

        // QUERY EXPRESSION BUILDER
        const requiredKeywords = details['required_keywords'].map((el,i,arr) => i !== (arr.length - 1) ? el.concat(" AND ") : `${el}`).join("");
        const optionalKeywords = details['optional_keywords'].map((el,i,arr) => i !== (arr.length - 1) ? el.concat(" OR ") : `${el}`).join("");
        const excludedKeywords = details['excluded_keywords'].map((el,i,arr) => i !== (arr.length - 1) ? el.concat(" AND ") : `${el}`).join("");

        const expression = details['optional_keywords'].length > 0 && details['excluded_keywords'].length === 0 ? `((${requiredKeywords}) OR "(${optionalKeywords})")` 
          : details['optional_keywords'].length > 0 && details['excluded_keywords'].length > 0 ? `((${requiredKeywords}) OR ("${optionalKeywords}")) AND ( NOT (${excludedKeywords}))` 
          : details['optional_keywords'].length === 0 && details['excluded_keywords'].length > 0 ? `(${requiredKeywords}) AND (NOT (${excludedKeywords}))` 
          : `${requiredKeywords}`;

        // set to local storage
        if(rows[index] && !sessionStorage.getItem('databoxCategory')) 
          sessionStorage.setItem('databoxCategory', JSON.stringify(rows[index]))

        // SET SESSION STORAGE TO VARIABLE
        let tempData = JSON.parse(sessionStorage.getItem('databoxCategory'));
        let maxIndex = this.getMaxIndex(tempData.categories);
        
        tempData.categories.push({
          'index': maxIndex + 1,
          'name': details.name,
          'type': details.type,
          'expression': details['query_type'] === 'basic' ? expression : details['query'],
          'required_keywords': details['required_keywords'],
          'optional_keywords': details['optional_keywords'],
          'excluded_keywords': details['excluded_keywords'],
          'query_type': details['query_type'],
          'query': details.query
        }); 

        sessionStorage.setItem('databoxCategory', JSON.stringify(tempData));
        tempData = JSON.parse(sessionStorage.getItem('databoxCategory'));
        return of(tempData.categories.slice()).pipe(delay(500));
      }


      // save all changes to fake db
      saveChangesToDB(id): Observable<any>{
        const rows  = JSON.parse(sessionStorage.getItem('databox_item_categories')) || this.databox_category;
        const index = rows.findIndex(i => i.databox_id === id);
        const tempData = JSON.parse(sessionStorage.getItem('databoxCategory'));

        // get databox data and update category remaining
        const databox = rows[index];
        const sub_category_available = tempData.sub_category_available;
        const category_available = tempData.category;

        tempData.category_used = tempData.categories.filter(el => el.type === 'Category').length;
        tempData.sub_category_available_used = tempData.categories.filter(el => el.type === 'Sub Category').length;

        rows[index] = tempData;
        this.databox_category = rows;

        // set databox categories
        sessionStorage.setItem('databox_item_categories', JSON.stringify(this.databox_category));
        sessionStorage.setItem('databox_updated', `New Category expressions has been added for ${databox.databox_name} Databox`);
        sessionStorage.removeItem('databoxCategory');

        return of(this.databox_category.slice()).pipe(delay(500));
      }


      // test category
      testCategory(id){
        const tempData = JSON.parse(sessionStorage.getItem('databoxCategory')) || this.databox_category;
        sessionStorage.setItem('databoxCategoryTestData', sessionStorage.getItem('databoxCategory'));

        this.setTestDataItem(tempData);
      }


      // edit category
      editCategoryTemp(id, details, category_name): Observable<any>{

        // QUERY EXPRESSION BUILDER
        const requiredKeywords = details['required_keywords'].map((el,i,arr) => i !== (arr.length - 1) ? el.concat(" AND ") : `${el}`).join("");
        const optionalKeywords = details['optional_keywords'].map((el,i,arr) => i !== (arr.length - 1) ? el.concat(" OR ") : `${el}`).join("");
        const excludedKeywords = details['excluded_keywords'].map((el,i,arr) => i !== (arr.length - 1) ? el.concat(" AND ") : `${el}`).join("");

        const expression = details['optional_keywords'].length > 0 && details['excluded_keywords'].length === 0 ? `((${requiredKeywords}) OR "(${optionalKeywords})")` 
          : details['optional_keywords'].length > 0 && details['excluded_keywords'].length > 0 ? `((${requiredKeywords}) OR ("${optionalKeywords}")) AND ( NOT (${excludedKeywords}))` 
          : details['optional_keywords'].length === 0 && details['excluded_keywords'].length > 0 ? `(${requiredKeywords}) AND (NOT (${excludedKeywords}))` 
          : `${requiredKeywords}`;

        if(sessionStorage.getItem('databoxCategory')){
          const rows  = JSON.parse(sessionStorage.getItem('databoxCategory'));
          const category_index = rows.categories.findIndex(i => i.name === category_name);
         
          rows.categories[category_index].name = details.name;
          rows.categories[category_index].type = details.type;
          rows.categories[category_index].expression = details['query_type'] === 'basic' ? expression : details.query;
          rows.categories[category_index]['required_keywords'] = details['required_keywords'];
          rows.categories[category_index]['optional_keywords'] = details['optional_keywords'];
          rows.categories[category_index]['excluded_keywords'] = details['excluded_keywords'];
          rows.categories[category_index]['query_type'] = details['query_type'];
          rows.categories[category_index]['query'] = details['query'];

          // set to local storage
          sessionStorage.setItem('databoxCategory', JSON.stringify(rows));

          // SET SESSION STORAGE TO VARIABLE
          let tempData = JSON.parse(sessionStorage.getItem('databoxCategory'));

          return of(tempData.categories.slice()).pipe(delay(500));
        }  
        else if(!sessionStorage.getItem('databoxCategory')){
          const rows  = JSON.parse(sessionStorage.getItem('databox_item_categories')) || this.databox_category;
          const index = rows.findIndex(i => i.databox_id === id)
          const category_index = rows[index].categories.findIndex(el => el.name === category_name);
          
          if(category_index > -1){
            rows[index].categories[category_index].name = details.name;
            rows[index].categories[category_index].type = details.type;
            rows[index].categories[category_index].expression = details['query_type'] === 'basic' ? expression : details.query;
            rows[index].categories[category_index]['required_keywords'] = details['required_keywords'];
            rows[index].categories[category_index]['optional_keywords'] = details['optional_keywords'];
            rows[index].categories[category_index]['excluded_keywords'] = details['excluded_keywords'];
            rows[index].categories[category_index]['query_type'] = details['query_type'];
            rows[index].categories[category_index]['query'] = details['query'];

            // set to local storage
            sessionStorage.setItem('databoxCategory', JSON.stringify(rows[index]));

            // SET SESSION STORAGE TO VARIABLE
            let tempData = JSON.parse(sessionStorage.getItem('databoxCategory'));

            return of(tempData.categories.slice()).pipe(delay(500));
          }
        }
      }


      // delete category
      deleteCategory(id, category_name): Observable<any>{
        const rows = JSON.parse(sessionStorage.getItem('databox_item_categories')) || this.databox_category;
        const index = rows.findIndex(i => i.databox_id === id)
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

          // set databox categories
          sessionStorage.setItem('databox_item_categories', JSON.stringify(rows));
        }

        return of(this.databox_category.slice()).pipe(delay(500));
      }

      // delete category table
      removeCategoryTable(id){
        const databoxItemCategory = JSON.parse(sessionStorage.getItem('databox_item_categories')) || this.databox_category;
        const index = databoxItemCategory.findIndex(el => el.databox_id === id);

        // reusable code for removing data
        this.removeDataSimple(databoxItemCategory, 'databox_item_categories', index, this.databox_category);
      }



  /* @FUNCTIONS FOR GENERATING RANDOM ID AND MAX INDEX */

      // generate id with length 24
      private generateID() {
        let id = '';
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 24; i++) {
          id += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return id;
      }

      // get max index
      private getMaxIndex(item) { return Math.max(...item.map(x => x.index)) }

      // reusable function for removing data
      private removeDataSimple(array, item_storage, index, updatedArray){
        array.splice(index, 1);
        updatedArray = array;
        sessionStorage.setItem(item_storage, JSON.stringify(updatedArray));
      }
}
