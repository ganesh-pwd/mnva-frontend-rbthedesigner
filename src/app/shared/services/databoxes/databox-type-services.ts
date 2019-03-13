import { Injectable } from '@angular/core';
import { DataboxTypeDB } from '../../fake-db/databox-types';
import { DataboxFolderDB } from '../../fake-db/databox-folders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { NavigationService } from '../../services/navigation.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataboxTypeService {
  private databox_type: any[];
  private databox_folders: any[];

  constructor(private router: Router) {
    const databoxTypeDB = new DataboxTypeDB();
    const databoxFolderDB = new DataboxFolderDB();
    this.databox_type = databoxTypeDB.databox_type;
    this.databox_folders = JSON.parse(sessionStorage.getItem('databox_folder')) || databoxFolderDB.databox_folders;
  }

  // ******* Implement your APIs ********
  getItems(): Observable<any> {
    return of(this.databox_type.slice());
  }

  getItemByID(id) {
    const databox_type = this.databox_type.find(i => i._id === id);
    return of(databox_type);
  }

  getFolders() {
    const row = JSON.parse(sessionStorage.getItem('databox_folder')) || this.databox_folders;
    return of(row);
  }

  // get a databox folder filtered by folder name
  getFolderData(name) {
    const folders = JSON.parse(sessionStorage.getItem('databox_folder')) || this.databox_folders;
    const databox_folder = folders.find(i => i.folder === name);
    return of(databox_folder);
  }

  // Add Databox folder
  addFolder(folderName) {
    const rows = JSON.parse(sessionStorage.getItem('databox_folder')) || this.databox_folders;
    const index = Math.max(...rows.map(x => x.index));

    rows.push({
      'index': index + 1,
      'folder': folderName,
      'databoxes': []
    });

    sessionStorage.setItem('added_databox_folder', 'A new Databox folder have been added');
    sessionStorage.setItem('databox_folder', JSON.stringify(rows));

    this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/databoxes/' + folderName.replace(/\s/g, '-')]));

    return of(rows.sort((a, b) => a.index - b.index).slice()).pipe();
  }

  // Delete Databox folder
  deleteFolder(row) {
    const rows = JSON.parse(sessionStorage.getItem('databox_folder')) || this.databox_folders;
    const i = rows.find(x => x.index === row);

    rows.splice(rows.indexOf(i), 1);

    sessionStorage.setItem('delete_databox_folder', 'A new Databox folder have been deleted');
    sessionStorage.setItem('databox_folder', JSON.stringify(rows));

    this.router.navigateByUrl('', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/databoxes']));

    return of(rows).pipe(delay(500));
  }
}
