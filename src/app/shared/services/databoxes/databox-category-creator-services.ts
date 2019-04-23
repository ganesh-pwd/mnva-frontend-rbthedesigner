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



  
}
