import { Injectable } from '@angular/core';
import { TemplateGalleryDB } from '../../fake-db/template-gallery';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TemplateGalleryService {
  private template_gallery: any[];
  public loggedInUser: any;

  constructor() {
    const templateGalleryDB = new TemplateGalleryDB();
    this.template_gallery = templateGalleryDB.template_gallery_type;

    // logged in user
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    this.loggedInUser = loggedInUser;
  }

  getAllItems() {
    const rows = this.template_gallery;
    const filter_by_logged_in_user = rows.filter(i => i.master_user_info === this.loggedInUser._id);
    return of(filter_by_logged_in_user.slice());
  }

  // ******* Implement your APIs ********
  getItemByLink(link) {
    const template_gallery_type = this.template_gallery.find(i => i.link === link && i.master_user_info === this.loggedInUser._id);
    return of(template_gallery_type);
  }
}
