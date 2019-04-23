import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HistoricalDB } from '../../fake-db/historical';

@Injectable({
  providedIn: 'root'
})
export class HistoricalService {
  selectedHistorical = 'Facebook';
  historical: any[];

  constructor() {
    const historicalDB = new HistoricalDB();
    this.historical = historicalDB.historical;
  }

  getHistorical(): Observable<any> {
    return of(this.historical.slice());
  }

  setHistorical(historical: any): void {
    this.selectedHistorical = historical;
  }

  getSelectedHistorical(): string {
    return this.selectedHistorical;
  }
}
