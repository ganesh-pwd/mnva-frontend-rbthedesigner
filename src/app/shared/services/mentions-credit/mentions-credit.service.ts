import { Injectable } from '@angular/core';
import { MentionsCreditsDB } from '../../fake-db/mentions-credit';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MentionsCreditService {
  private mentions_credit: any[];

  constructor() {
    const mentionsCreditsDB = new MentionsCreditsDB();

    this.mentions_credit = mentionsCreditsDB.mentions_credit;
  }

  // ******* Implement your APIs ********
  getItems(): Observable<any> {
    const rows = this.mentions_credit;

    return of(rows)
      .pipe(
        delay(500),
        map((data: any) => {
          return data;
        })
      )
  }
}
