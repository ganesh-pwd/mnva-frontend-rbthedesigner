import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateGalleryLinkComponent } from './template-gallery-link.component';

describe('MainTemplateGalleryComponent', () => {
  let component: TemplateGalleryLinkComponent;
  let fixture: ComponentFixture<TemplateGalleryLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateGalleryLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateGalleryLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
