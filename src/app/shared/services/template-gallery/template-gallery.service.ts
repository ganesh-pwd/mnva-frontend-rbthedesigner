import { Injectable } from '@angular/core';
import { TemplateGalleryDB } from '../../fake-db/template-gallery';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateGalleryService {
  private template_gallery: any[];

  constructor() {
    const templateGalleryDB = new TemplateGalleryDB();
    this.template_gallery = templateGalleryDB.template_gallery_type;
  }


  // ******* Implement your APIs ********
  getItemByLink(link) {
    const template_gallery_type = this.template_gallery.find(i => i.link === link);
    return of(template_gallery_type);
  }
}
