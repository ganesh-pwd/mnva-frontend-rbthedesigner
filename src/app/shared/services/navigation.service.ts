import { Injectable } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { DataboxDB } from '../fake-db/databox-items';
import { TemplateGalleryDB } from '../fake-db/template-gallery';
import { TemplateGalleryService } from '../services/template-gallery/template-gallery.service';
import { UserService } from '../../shared/services/auth/user-services';
import { Router, NavigationEnd } from '@angular/router';

interface IMenuItem {
  type: string;       // Possible values: link/dropDown/icon/separator/extLink
  name?: string;      // Used as display text for item and title for separator type
  state?: string;     // Router state
  icon?: string;      // Material icon name
  tooltip?: string;
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
  private templateGalleryReq: Subscription;

  databox_items: any[];
  template_gallery: any[];
  databoxDB: any;

  constructor(private templateGalleryService: TemplateGalleryService, 
    private router: Router, 
    private userService: UserService) {

    const databoxDB = new DataboxDB();
    this.databoxDB = databoxDB;

    this.getTemplateGallery();

    this.router.events.subscribe((routeChange) => {
      if (routeChange instanceof NavigationEnd) {
        // filter template gallery by currently logged in user
        this.getTemplateGallery();
      }
    });
  }

  // get template gallery
  getTemplateGallery(){
    this.templateGalleryReq = this.templateGalleryService.getAllItems()
    .subscribe(result => this.template_gallery = result.map(el => el));
  }

  // initialize databox without folders menu items
  initDataboxWithoutFolders(): any[] {
    const databox_items = JSON.parse(sessionStorage.getItem('databox_item')) || this.databoxDB.databox_items;

    return databox_items.map(el => {
      return {
        name: el.databox_name,
        state: `${el._id}`,
        type: 'dropDown'
      };
    });
  }

  initializeGallery(gallery) {
    if (gallery) {
      return gallery.reduce((result, el) => {
        result = result || [];

        result.push({
            name: el.type,
            state: `${el.link}`
        });

        return result;
      }, []);
    } else return []
  }

  // get databoxes dynamically
  getNavigationSidebar() {
    const template_gallery = this.initializeGallery(this.template_gallery);

    const arr = [{
        name: 'Databoxes',
        type: 'dropDown',
        tooltip: 'Databoxes',
        icon: 'widgets',
        state: 'databoxes',
        image_icon: '../assets/images/icon-databox.png',
        class: 'databox'
      },
      {
        name: 'Template Gallery',
        type: 'dropDown',
        tooltip: 'charts',
        icon: 'pie_chart',
        state: 'template-gallery',
        image_icon: '../assets/images/icon-gallery.png',
        class: 'gallery',
        sub: [...template_gallery]
      },
      {
        name: 'Products',
        type: 'dropDown',
        tooltip: 'shopping_cart',
        icon: 'shopping_cart',
        state: 'products',
        image_icon: '../assets/images/icon-products.png',
        class: 'products',
        sub: [
          { name: 'Account Type', state: 'account-type' },
          { name: 'Algorithm Credit', state: 'algorithm-credit' },
          { name: 'Mentions Credit', state: 'mentions-credit' },
          { name: 'Licenses', state: 'licenses' },
          { name: 'Advanced Templates', state: 'advanced-templates' },
          { name: 'Media Recordings', state: 'media-recordings' }
        ]
      }];

     return of(arr);
  }
}
