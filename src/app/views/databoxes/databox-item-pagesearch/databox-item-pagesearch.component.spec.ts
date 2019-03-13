import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataboxItemPagesearchComponent } from './databox-item-pagesearch.component';

describe('DataboxItemPagesearchComponent', () => {
  let component: DataboxItemPagesearchComponent;
  let fixture: ComponentFixture<DataboxItemPagesearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataboxItemPagesearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataboxItemPagesearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
