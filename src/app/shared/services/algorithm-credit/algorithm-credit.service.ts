import { Injectable } from '@angular/core';
import { AlgorithmCreditsDB } from '../../fake-db/algorithm-credit';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmCreditService {
  private algorithm_credit: any[];

  constructor() {
    const algorithmCreditsDB = new AlgorithmCreditsDB();

    this.algorithm_credit = algorithmCreditsDB.algorithm_credit;
  }

  // ******* Implement your APIs ********
  getItems(): Observable<any> {
    const rows = this.algorithm_credit;
    return  of(rows.slice()).pipe(delay(500));
  }
}
