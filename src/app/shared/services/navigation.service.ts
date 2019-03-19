import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DataboxDB } from '../fake-db/databox-items';
import { DataboxFolderDB } from '../fake-db/databox-folders';
import { TemplateGalleryDB } from '../fake-db/template-gallery';

interface IMenuItem {
  type: string;       // Possible values: link/dropDown/icon/separator/extLink
  name?: string;      // Used as display text for item and title for separator type
  state?: string;     // Router state
  icon?: string;      // Material icon name
  tooltip?: string;   // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: any[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string;       // Display text
  state?: string;     // Router state
  icon?: string;
  sub?: IChildItem[];
}

interface IBadge {
  color: string;      // primary/accent/warn/hex color codes(#fff000)
  value: string;      // Display text
}

@Injectable()
export class NavigationService {
  databox_items: any[];
  databox_folder: any[];
  template_gallery: any[];

  constructor() {
    const databoxDB = new DataboxDB();
    const databoxFolderDB = new DataboxFolderDB();
    const templateGalleryDB = new TemplateGalleryDB();

    this.databox_items = JSON.parse(sessionStorage.getItem('databox_item')) ||  databoxDB.databox_items;
    this.databox_folder = JSON.parse(sessionStorage.getItem('databox_folder')) || databoxFolderDB.databox_folders;
    this.template_gallery = templateGalleryDB.template_gallery_type;

  }

  // initialize databox menu items
  initDataboxItems(databox_item_rows): any[] {
    return databox_item_rows.reduce((result, el) => {
      result[el.folder] = result[el.folder] || [];

      result[el.folder].push({
          name: `<span class="databox-name">${el.databox_name}</span>
                <br> ${el.datasource} | ${el.location}`,
          state: el.first_create ? `${el._id}/initialize` : `${el._id}`
      });

      return result;
    }, {});
  }

  // initialize databox folders menu items
  initDataboxFolders(folder_rows, databox_items): any[] {
    return folder_rows.reduce((result, el) => {
      result = result || [];

      if (el.databoxes.length <= 0) {
        result.push({
          name: el.folder,
          state: `${el.folder.replace(/\s/g, '-')}`,
          type: 'dropDown',
          sub: []
        });
      } else {
        result.push({
          name: el.folder,
          type: 'dropDown',
          state: `${el.folder.replace(/\s/g, '-')}`,
          sub: [
            ...databox_items[el.folder]
          ]
        });
      }

      return result;
    }, []);
  }

  initializeGallery(gallery) {
    return gallery.reduce((result, el) => {
      result = result || [];

      result.push({
          name: el.type,
          state: `${el.link}`
      })

      return result;
    }, []);
  }

  // get databoxes dynamically
  getNavigationSidebar() {
    const databox_item_rows   = JSON.parse(sessionStorage.getItem('databox_item')) || this.databox_items;
    const databox_folder_rows = JSON.parse(sessionStorage.getItem('databox_folder')) || this.databox_folder;
    const databoxItems = this.initDataboxItems(databox_item_rows);
    const databoxMenu  = this.initDataboxFolders(databox_folder_rows, databoxItems);
    const template_gallery = this.initializeGallery(this.template_gallery);

    const arr = [{
        name: 'Databoxes',
        type: 'dropDown',
        tooltip: 'Acocunt Type',
        icon: 'widgets',
        state: 'databoxes',
        sub: [...databoxMenu]
      },
      {
        name: 'Template Gallery',
        type: 'dropDown',
        tooltip: 'charts',
        icon: 'pie_chart',
        state: 'template-gallery',
        sub: [...template_gallery]
      },
      {
        name: 'Products',
        type: 'dropDown',
        tooltip: 'shopping_cart',
        icon: 'shopping_cart',
        state: 'products',
        sub: [
          { name: 'Account Type', state: 'account-type' },
          { name: 'Algorithm Credit', state: 'algorithm-credit' },
          { name: 'Account Features', state: 'account-feautures' },
          { name: 'Licenses', state: 'licenses' },
          { name: 'Advance Templates', state: 'advanced-templates' },
          { name: 'Media Recordings', state: 'media-recordings' }
        ]
      }];

     return of(arr);
  }

}
