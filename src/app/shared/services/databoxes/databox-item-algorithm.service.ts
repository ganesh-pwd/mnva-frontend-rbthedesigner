import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AlgorithmCreditsDB } from '../../fake-db/algorithm-credit';

@Injectable({
  providedIn: 'root'
})
export class DataboxAlgorithmsService {
  private algorithm_credits_items: any[];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) {
    const algorithm_credits_list = new AlgorithmCreditsDB();
    this.algorithm_credits_items = algorithm_credits_list.algorithm_credit;

  }

  // ******* Implement your APIs ********

  /* @GET ALGORITHM CREDIT DETAILS DATA FROM THE FAKE DB */

      // get the algorithm credits
      getItems(): Observable<any> {
        const rows = this.algorithm_credits_items
          .filter(el => 
            ['Sentiment', 'Topic Recognition', 'Gender Author', 'Entity Recognition']
            .indexOf(el.display_text) > -1);

        return of(rows.slice()).pipe(delay(500));
      }

      // get algorithm credits details
      getSingleItem(id){
        const filterItem = this.algorithm_credits_items.find(el => el._id === id);

        if(filterItem && filterItem.icon)
          return filterItem.icon;
      }
}
