import { Injectable } from '@angular/core';
import { TemplateGalleryDB } from '../../fake-db/template-gallery';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserService } from '../auth/user-services';

@Injectable({
  providedIn: 'root'
})
export class TemplateGalleryService {
  private template_gallery: any[];
  public loggedInUser: any;

  constructor(private userService: UserService) {
    const templateGalleryDB = new TemplateGalleryDB();
    this.template_gallery = templateGalleryDB.template_gallery_type;

    // logged in user
    userService.userData$.subscribe((user) => this.loggedInUser = user);
  }

  getAllItems() {
    const rows = this.template_gallery;
    const filter_by_logged_in_user = rows.filter(i => i.account_id === this.loggedInUser._id);
    return of(filter_by_logged_in_user.slice());
  }

  // ******* Implement your APIs ********
  getItemByLink(link) {
    const template_gallery_type = this.template_gallery.find(i => i.link === link && i.account_id === this.loggedInUser._id);
    return of(template_gallery_type);
  }
}
