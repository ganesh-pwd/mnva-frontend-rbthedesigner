import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTemplateGalleryComponent } from './main-template-gallery.component';

describe('MainTemplateGalleryComponent', () => {
  let component: MainTemplateGalleryComponent;
  let fixture: ComponentFixture<MainTemplateGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainTemplateGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTemplateGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
