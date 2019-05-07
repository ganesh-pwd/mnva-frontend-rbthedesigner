import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedTemplatesLinkComponent } from './advanced-templates-link.component';

describe('AdvancedTemplatesLinkComponent', () => {
  let component: AdvancedTemplatesLinkComponent;
  let fixture: ComponentFixture<AdvancedTemplatesLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedTemplatesLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedTemplatesLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
