import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DatasourceDB } from '../../fake-db/datasource';

@Injectable({
  providedIn: 'root'
})
export class DatasourceService {
  selectedDatasource = 'Facebook';
  datasource: any[];

  constructor() {
    const datasourceDB = new DatasourceDB();
    this.datasource = datasourceDB.datasource;
  }

  getDatasource(): Observable<any> {
    return of(this.datasource.slice());
  }

  setDatasource(datasource: any): void {
    this.selectedDatasource = datasource;
  }

  getSelectedDatasource(): string {
    return this.selectedDatasource;
  }
}
