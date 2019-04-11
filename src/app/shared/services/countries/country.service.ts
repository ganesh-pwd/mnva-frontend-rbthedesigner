import { Injectable } from '@angular/core';
import { CountryDB } from '../../fake-db/countries';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  countries: any[];

  constructor() {
    const countryDB = new CountryDB();
    this.countries = countryDB.countries;
  }

  getCountries(): Observable<any> {
    return of(this.countries.slice());
  }
}
