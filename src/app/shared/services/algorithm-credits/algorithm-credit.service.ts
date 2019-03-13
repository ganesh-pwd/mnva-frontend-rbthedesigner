import { Injectable } from '@angular/core';
import { AlgorithmCreditsDB } from '../../fake-db/algorithm-credits';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmCreditService {
  private algorithm_credits: any[];

  constructor() {
    const algorithmCreditsDB = new AlgorithmCreditsDB();

    this.algorithm_credits = algorithmCreditsDB.algorithm_credits;
  }

  // ******* Implement your APIs ********
  getItems(): Observable<any> {
    const rows = this.algorithm_credits;
    return  of(rows.slice()).pipe(delay(500));
  }
}
