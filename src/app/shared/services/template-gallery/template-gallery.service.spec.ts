import { TestBed, inject } from '@angular/core/testing';

import { TemplateGalleryService } from './template-gallery.service';

describe('TemplateGalleryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemplateGalleryService]
    });
  });

  it('should be created', inject([TemplateGalleryService], (service: TemplateGalleryService) => {
    expect(service).toBeTruthy();
  }));
});
